import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';
import { List } from '@components/list';
import { Table } from '@components/table';
import { useActions, paths } from '@/shared';
import {
  fetchActiveCourses,
  coursesActiveSelector,
  fetchNotActiveCourses,
  coursesNotActiveSelector,
  currentUserSelector,
} from '@/models/index.js';
import { Button, Search, WithLoading, Pagination } from '@/components/index.js';

import Icon from '@/icon.js';

import styles from './list-of-courses.scss';

export const ListOfCourses = () => {
  const history = useHistory();

  // this is needed for future work with redirect by arrow button
  // const location = useLocation();
  // const paginationPage = location?.state
  //   ? location?.state?.paginationPage?.currentPage
  //   : 1;

  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showBlocks, setShowBlocks] = useState(false);
  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'name', sortedByAscending: false, tableHead: 'Title' },
  ]);

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const {
    data: activeCourses,
    isLoading: areActiveCoursesLoading,
  } = useSelector(coursesActiveSelector, shallowEqual);

  const {
    data: notActiveCourses,
    isLoading: areNotActiveCoursesLoading,
  } = useSelector(coursesNotActiveSelector, shallowEqual);

  const [loadActiveCourses, loadNotActiveCourses] = useActions([
    fetchActiveCourses,
    fetchNotActiveCourses,
  ]);

  useEffect(() => {
    if (!isShowDisabled) {
      loadActiveCourses();
    }
  }, [isShowDisabled, loadActiveCourses]);

  useEffect(() => {
    if (activeCourses.length > 0) {
      setFilteredCourses(activeCourses);
    }
  }, [activeCourses]);

  useEffect(() => {
    if (notActiveCourses.length > 0) {
      setFilteredCourses(notActiveCourses);
    }
  }, [notActiveCourses]);

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    if (!isShowDisabled) {
      setFilteredCourses(
        activeCourses.filter(({ name }) =>
          name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredCourses(
        notActiveCourses.filter(({ name }) =>
          name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
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
        // state: { currentPage },
      });
    },
    [history]
  );

  const handleEdit = useCallback(
    (event, id) => {
      event.stopPropagation();
      history.push({
        pathname: `${paths.COURSE_EDIT}/${id}`,
        // state: { currentPage },
      });
    },
    [history]
  );

  const handleSortByParam = (data, categoryParams) => {
    const sortedCourses = data;
    setSortingCategories(
      changeActiveCategory(sortingCategories, categoryParams.sortingParam)
    );
    setFilteredCourses(sortedCourses);
  };

  const handleShowDisabled = (event) => {
    setIsShowDisabled(!isShowDisabled);
    if (event.target.checked) {
      loadNotActiveCourses();
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
        {filteredCourses.length > 0 && (
          <span className="col-2 text-right">
            {visibleCourses.length} of {filteredCourses.length} courses
          </span>
        )}
      </div>
      <div className="row mr-0">
        <div className="col-12 card shadow p-3 mb-5 bg-white ml-2 mr-2">
          <div className="row align-items-center justify-content-between mt-2 mb-3">
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
                  data-testid="showCardBlocks"
                >
                  <Icon icon="Card" color="#2E3440" size={25} />
                </button>
              </div>
            </div>
            <div className="col-2" data-testid="searchInputWrap">
              <Search onSearch={handleSearch} placeholder="Course`s title" />
            </div>
            <div className="col-3 offset-1 custom-control custom-switch text-right">
              <input
                type="checkbox"
                onClick={handleShowDisabled}
                className={classNames(
                  'custom-control-input',
                  styles['custom-control-input']
                )}
                id="switchDisabled"
              />
              <label
                className={classNames(
                  'custom-control-label',
                  styles['custom-control-label']
                )}
                htmlFor="switchDisabled"
              >
                Disabled Courses
              </label>
            </div>
            <div className="col-2 text-right">
              {[8, 4].includes(currentUser.role) && (
                <Button onClick={addCourse}>
                  <span data-testid="addCourseBtnText">Add a course</span>
                </Button>
              )}
            </div>
          </div>
          <WithLoading
            isLoading={areActiveCoursesLoading || areNotActiveCoursesLoading}
            className="d-block mx-auto m-0"
          >
            {showBlocks ? (
              <div
                className="container d-flex flex-wrap"
                data-testid="cardBlocks"
              >
                <List listType="block" props={listProps} />
              </div>
            ) : (
              <Table
                sortingCategories={sortingCategories}
                currentUser={currentUser}
                onClick={handleSortByParam}
                data={isShowDisabled ? notActiveCourses : activeCourses}
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
          {filteredCourses.length > 0 && (
            <Pagination
              items={filteredCourses}
              setVisibleItems={setVisibleCourses}
            />
          )}
        </div>
      </div>
    </div>
  );
};
