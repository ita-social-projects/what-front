import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared';
import {
  fetchCourses,
  coursesSelector,
  currentUserSelector,
} from '@/models/index.js';
import {
  Button,
  Search,
  WithLoading,
  Pagination,
  RowsOption,
} from '@/components/index.js';

import Icon from '@/icon.js';

import classNames from 'classnames';
import styles from './list-of-courses.scss';
import { List } from '@components/list';
import { Table } from '@components/table';

export const ListOfCourses = () => {
  const history = useHistory();
  const pagPage = useLocation();
  const paginationPage = pagPage.state
    ? pagPage.state.paginationPage.paginationPage
    : 1;

  const [visibleCourses, setVisibleCourses] = useState([]);

  const [coursesPerPage, setcoursesPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(paginationPage);

  const [searchValue, setSearchValue] = useState('');
  const [showBlocks, setShowBlocks] = useState(false);

  const [filteredCourses, setFilteredCourses] = useState([]);

  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'name', sortedByAscending: false, tableHead: 'Title' },
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
    setVisibleCourses(
      filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
    );
  }, [currentPage, filteredCourses]);

  const coursesList = () => {
    const courses = visibleCourses.map((course) => (
      <tr
        key={course.id}
        onClick={() => courseDetails(course.id)}
        className={styles['table-row']}
        data-student-id={course.id}
      >
        <td className="text-left">{course.name}</td>
        {(currentUser.role === 8 || currentUser.role === 4) && (
          <td
            className="text-center"
            onClick={(event) => courseEdit(event, course.id)}
            data-student-id={course.id}
          >
            <Icon
              icon="Edit"
              className={styles.scale}
              color="#2E3440"
              size={30}
            />
          </td>
        )}
      </tr>
    ));

    if (!courses.length && searchValue) {
      return <h4>Course is not found</h4>;
    }
    return courses;
  };

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    setVisibleCourses(
      data.filter(({ name }) =>
        name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  const changeActiveCategory = (categories, activeCategoryName) =>
    categories.map((category) => {
      if (category.name === activeCategoryName) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    });

  const addCourse = () => {
    history.push(paths.COURSE_ADD);
  };

  const handleDetails = useCallback(
    (id) => {
      history.push({
        pathname: `${paths.COURSE_DETAILS}/${id}`,
        state: { currentPage },
      });
    },
    [history, currentPage]
  );

  const handleEdit = useCallback(
    (event, id) => {
      event.stopPropagation();
      history.push({
        pathname: `${paths.COURSE_EDIT}/${id}`,
        state: { currentPage },
      });
    },
    [history, currentPage]
  );

  const handleSortByParam = (data, categoryParams) => {
    const sortedCourses = data;
    setSortingCategories(
      changeActiveCategory(sortingCategories, categoryParams.sortingParam)
    );
    setFilteredCourses(sortedCourses);
    setVisibleCourses(
      sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse)
    );
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
    if (data.length > coursesPerPage) {
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
    }
  };

  const listProps = {
    data: visibleCourses,
    handleDetails,
    handleEdit,
    errors: [
      {
        message: 'Course is not found',
        check: [!visibleCourses.length && !!searchValue],
      },
    ],
    access: currentUser.role === 8 || currentUser.role === 4,
    fieldsToShow: ['name', 'edit'],
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Courses</h2>
        <span className="col-2 text-right">
          {visibleCourses.length} of {filteredCourses.length} courses
        </span>
        <div className="col-4 d-flex align-items-center justify-content-end">
          {paginationComponent()}
        </div>
      </div>
      <div className="row mr-0">
        <div className="col-12 card shadow p-3 mb-5 bg-white ml-2 mr-2">
          <div className="row align-items-center mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={!showBlocks}
                  onClick={() => setShowBlocks(false)}
                >
                  <Icon icon="List" color="#2E3440" size={25} />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={showBlocks}
                  onClick={() => setShowBlocks(true)}
                >
                  <Icon icon="Card" color="#2E3440" size={25} />
                </button>
              </div>
            </div>
            <div className="col-3">
              <Search onSearch={handleSearch} placeholder="Course`s title" />
            </div>
            {!showBlocks && (
              <div className="col-2 d-flex">
                <label
                  className={classNames(styles['label-for-select'])}
                  htmlFor="change-visible-people"
                >
                  Rows
                </label>
                <RowsOption
                  id={'change-visible-people'}
                  onChange={changeCountVisibleItems}
                  optionsValues={[9, 27, 45, 72, 99]}
                />
              </div>
            )}
            <div className="col-2 offset-3 text-right">
              {[8, 4].includes(currentUser.role) && (
                <Button onClick={addCourse}>
                  <span>Add a course</span>
                </Button>
              )}
            </div>
          </div>
          <WithLoading isLoading={isLoading} className="d-block mx-auto m-0">
            {showBlocks ? (
              <div className="container d-flex flex-wrap">
                <List listType={'block'} props={listProps} />
              </div>
            ) : (
              <Table
                sortingCategories={sortingCategories}
                currentUser={currentUser}
                onClick={handleSortByParam}
                data={filteredCourses}
                access={{ unruledUser: [1, 2], unassigned: '' }}
              >
                <List listType="list" props={listProps} />
              </Table>
            )}
          </WithLoading>
        </div>
        <div
          className={classNames(
            'row justify-content-between align-items-center mb-3',
            styles.paginate
          )}
        >
          {paginationComponent()}
        </div>
      </div>
    </div>
  );
};
