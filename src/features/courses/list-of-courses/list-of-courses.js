import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared';
import { fetchCourses, coursesSelector, currentUserSelector } from '@/models/index.js';

import classNames from 'classnames';
import { Search, Button, WithLoading, Pagination } from '../../../components/index.js';

import styles from './list-of-courses.scss';

const editIcon = (
  <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className={classNames("bi bi-pencil", styles.scale)} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
    <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
  </svg>
);

const iconTable = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-layout-text-sidebar" viewBox="0 0 16 16">
    <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z"/>
  </svg>
);

const iconCards = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
  </svg>
);

export const ListOfCourses = () => {
  console.log(styles);

  const history = useHistory();

  const [coursesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchValue, setSearchValue] = useState('');

  const [filteredCourses, setFilteredCourses] = useState([]);

  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: false, tableHead: '#' },
    { id: 1, name: 'title', sortedByAscending: false, tableHead: 'Title' },
  ]);

  const { data, isLoading } = useSelector(coursesSelector, shallowEqual); // array of courses ,true/false
  const { currentUser } = useSelector(currentUserSelector, shallowEqual); // role of user

  const [loadCourses] = useActions([fetchCourses]); // loading courses

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;


  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    setFilteredCourses(data);
  }, [data]);


  {filteredCourses.map(({ id, name }) => (
    <tr key={id} onClick={() => courseDetails(id)}>
      <td>{id}</td>
      <td>{name}</td>
      <td className="text-center" onClick={(event) => courseEdit(event, id)} data-student-id={id}>{editIcon}</td>
    </tr>
  ))}


  const coursesList = () => {
    const courses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
      .map((course) => (
        <tr key={course.id} onClick={(event) => courseDetails(course.id)} data-student-id={course.id}>
          <td>{course.id}</td>
          <td>{course.name}</td>
          <td className="text-center" onClick={(event) => courseEdit(event, course.id)} data-student-id={course.id}>{editIcon}</td>
        </tr>
      ));

    if (!courses.length && searchValue) {
      return <h4>Course is not found</h4>;
    }
    return courses;
  };

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    setFilteredCourses(data.filter(({ name }) => name.toLowerCase().includes(inputValue.toLowerCase())));
  };

  const addCourse = () => {
    history.push(paths.COURSE_ADD);
  };

  const courseDetails = useCallback((id) => {
    history.push(`${paths.COURSE_DETAILS}/${id}`);
  });

  const courseEdit = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.COURSE_EDIT}/${id}`);
  });

  const handleSortByParam = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    const sortedCourses = [...filteredCourses].sort((prevCourse, currentCourse) => {
      if (prevCourse[sortingParam] > currentCourse[sortingParam]) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });

    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === sortingParam) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    }));

    setFilteredCourses(sortedCourses)
  };


  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(filteredCourses.length / 12);
    setCurrentPage((prev) => {
      if (prev === totalPages) {
        return prev;
      }
      return pageNumber;
    });
  };

  const prevPage = (pageNumber) => {
    setCurrentPage((prev) => {
      if (prev - 1 === 0) {
        return prev;
      }
      return pageNumber;
    });
  };

  return (
      <div className="container">
        <div className="row justify-content-between align-items-center mb-3">
          <div className="col-6"><h2>Courses</h2></div>
          {filteredCourses.length > coursesPerPage ?
            <span className="col-2 text-right">{filteredCourses.length} courses</span> : null
          }
          <div className="col-4 align-items-center justify-content-end">
            {filteredCourses.length > coursesPerPage &&
            <Pagination
              itemsPerPage={coursesPerPage}
              totalItems={filteredCourses.length}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
              page={currentPage}
            />}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="card col-12 shadow p-3 mb-5 bg-white rounded">
            <div className="px-3 py-2 mb-2">
              <div className="row align-items-center">
                <div className="col-2">
                  <button className="btn">{iconTable}</button>
                  <button className="btn">{iconCards}</button>
                </div>
                <div className="col-4">
                  <Search  onSearch={handleSearch} placeholder="Course`s title" />
                </div>
                <div className="col-2 offset-4">
                  {currentUser.role === 4
                  && (
                      <Button onClick={addCourse} className={styles.btn}>
                        <span>Add a course</span>
                      </Button>
                  ) || currentUser.role === 3
                  && (
                      <Button onClick={addCourse} className={styles.btn}>
                        <span>Add a course</span>
                      </Button>
                  )}
                </div>
              </div>
            </div>
            <WithLoading isLoading={isLoading} className="d-block mx-auto m-0">
              <table className="table table-hover">
                <thead>
                  <tr>
                    {sortingCategories.map(({ id, title, tableHead, sortedByAscending}) => (
                      <th
                        key={id}
                        className={styles.tablehead}
                      >
                        <span
                          data-sorting-param={title}
                          data-sorted-by-ascending={Number(sortedByAscending)}
                          onClick={handleSortByParam}
                          className={classNames({[styles.rotate]: sortedByAscending})}
                        >
                        {tableHead}
                        </span>
                      </th>
                    ))}
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    coursesList()
                  }
                </tbody>
              </table>
            </WithLoading>
          </div>
        </div>
      </div>
  );
};
