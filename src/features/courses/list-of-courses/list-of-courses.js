import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared';
import { fetchCourses, coursesSelector, currentUserSelector } from '@/models/index.js';
import { Button, Search, WithLoading, Pagination } from '@/components/index.js';

import Icon from '@/icon.js';

import classNames from 'classnames';
import styles from './list-of-courses.scss';

export const ListOfCourses = () => {
  const history = useHistory();

  const [visibleCourses, setVisibleCourses] = useState([]);

  const [coursesPerPage, setcoursesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchValue, setSearchValue] = useState('');

  const [filteredCourses, setFilteredCourses] = useState([]);

  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'id', sortedByAscending: false, tableHead: '#' },
    { id: 1, name: 'name', sortedByAscending: false, tableHead: 'Title' },
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

  useEffect(() => {
    setVisibleCourses(filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse));
  }, [currentPage, filteredCourses]);

  const coursesList = () => {
    const courses = visibleCourses
      .map((course) => (
        <tr key={course.id} onClick={(event) => courseDetails(course.id)} className={styles['table-row']} data-student-id={course.id}>
          <td className="text-center">{course.id}</td>
          <td>{course.name}</td>
          {(currentUser.role === 4 || currentUser.role === 3) &&
            <td
              className="text-center"
              onClick={(event) => courseEdit(event, course.id)}
              data-student-id={course.id}
            >
              <Icon icon="Edit" className={styles.scale} color="#2E3440" size={30} />
            </td>
          }
        </tr>
      ));

    if (!courses.length && searchValue) {
      return <h4>Course is not found</h4>;
    }
    return courses;
  };

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    setVisibleCourses(data.filter(({ name }) => name.toLowerCase().includes(inputValue.toLowerCase())));
  };

  const addCourse = () => {
    history.push(paths.COURSE_ADD);
  };

  const courseDetails = useCallback((id) => {
    history.push(`${paths.COURSE_DETAILS}/${id}`);
  }, [history]);

  const courseEdit = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.COURSE_EDIT}/${id}`);
  }, [history]);

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

    setFilteredCourses(sortedCourses);
    setVisibleCourses(sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse));
  };

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(filteredCourses.length / 10);
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

  const changeCountVisibleItems = (newNumber) => {
    const finish = currentPage * newNumber;
    const start = finish - newNumber;
    setVisibleCourses(data.slice(start, finish));
    setcoursesPerPage(newNumber);
  };

  const paginationComponent = () => {
    if (data.length < coursesPerPage) {
      return (
        <Pagination
          itemsPerPage={coursesPerPage}
          totalItems={1}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      );
    }
    return (
      <Pagination
        itemsPerPage={coursesPerPage}
        totalItems={data.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        page={currentPage}
      />
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Courses</h2>
        <span className="col-2 text-right">{visibleCourses.length} of {filteredCourses.length} courses</span>
        <div className="col-4 d-flex align-items-center justify-content-end">
          {paginationComponent()}
        </div>
      </div>
      <div className="row">
        <div className="col-12 card shadow p-3 mb-5 bg-white">
          <div className="row align-items-center mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" disabled><Icon icon="List" color="#2E3440" size={25} /></button>
                <button type="button" className="btn btn-outline-secondary" disabled><Icon icon="Card" color="#2E3440" size={25} /></button>
              </div>
            </div>
            <div className="col-3">
              <Search onSearch={handleSearch} placeholder="Course`s title" />
            </div>
            <div className="col-2 d-flex">
              <label
                className={classNames(styles['label-for-select'])}
                htmlFor="change-visible-people"
              >
                Rows
              </label>
              <select
                className={classNames('form-control', styles['change-rows'])}
                id="change-visible-people"
                onChange={(event) => { changeCountVisibleItems(event.target.value); }}
              >
                <option>10</option>
                <option>30</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>
            <div className="col-2 offset-3 text-right">
              {[3, 4].includes(currentUser.role) && (
              <Button onClick={addCourse}>
                <span>Add a course</span>
              </Button>
              )}
            </div>
          </div>
          <WithLoading isLoading={isLoading} className="d-block mx-auto m-0">
            <table className="table table-hover">
              <thead>
                <tr>
                  {sortingCategories.map(({ id, name, tableHead, sortedByAscending }) => (
                    <th
                      key={id}
                      className={styles['table-head']}
                    >
                      <span
                        data-sorting-param={name}
                        data-sorted-by-ascending={Number(sortedByAscending)}
                        onClick={handleSortByParam}
                        className={classNames({ [styles.rotate]: !sortedByAscending })}
                      >
                        {tableHead}
                      </span>
                    </th>
                  ))}
                  {(currentUser.role === 4 || currentUser.role === 3) && <th className="text-center">Edit</th>}
                </tr>
              </thead>
              <tbody>
                { coursesList() }
              </tbody>
            </table>
          </WithLoading>
        </div>
        <div className={classNames('row justify-content-between align-items-center mb-3', styles.paginate)}>{paginationComponent()}</div>
      </div>
    </div>
  );
};
