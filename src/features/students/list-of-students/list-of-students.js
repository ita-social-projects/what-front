import React, {useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { paths, useActions } from '@/shared';
import {
  loadStudents, loadActiveStudents,
  studentsSelector, activeStudentsSelector, currentUserSelector,
} from '@/models';
import { WithLoading, Pagination, Search, Button } from '@/components';
import { addAlert } from '@/features';
import Icon from '@/icon';
import styles from './list-of-students.scss';
import {List} from "@components/list";
import {Table} from "@components/table";

export const ListOfStudents = () => {
  const {
    data: activeStudents,
    isLoading: areActiveStudentsLoading,
    error: activeStudentsError,
  } = useSelector(activeStudentsSelector, shallowEqual);

  const {
    data: allStudents,
    isLoading: areAllStudentsLoading,
    error: allStudentsError,
  } = useSelector(studentsSelector, shallowEqual);

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [
    dispatchLoadStudents,
    dispatchLoadActiveStudents,
    dispatchAddAlert,
  ] = useActions([loadStudents, loadActiveStudents, addAlert]);

  const history = useHistory();

  const [students, setStudents] = useState([]);
  const [visibleStudents, setVisibleStudents] = useState([]);

  const INITIAL_CATEGORIES = [
    { id: 0, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 1, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 2, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ];

  const [sortingCategories, setSortingCategories] = useState(INITIAL_CATEGORIES);
  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const [showBlocks, setShowBlocks] = useState(false);

  const [studentsPerPage, setStudentsPerPage] = useState(9);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const getDisabledStudents = () => {
    const activeStudentIds = activeStudents.map(({ id }) => id);

    return allStudents.filter(({ id }) => !activeStudentIds.includes(id));
  };

  const searchStudents = (searchedStudents, value) => searchedStudents.filter(({ firstName, lastName }) => `${firstName} ${lastName}`
    .toLowerCase().includes(value.toLowerCase()));

  const changeActiveCategory = (categories, activeCategoryName) => categories.map((category) => {
    if (category.name === activeCategoryName) {
      return { ...category, sortedByAscending: !category.sortedByAscending };
    }
    return { ...category, sortedByAscending: false };
  });

  const downloadStudents = () => {
    history.push(paths.STUDENTS_BY_GROUP_ID);
  };

  useEffect(() => {
    dispatchLoadActiveStudents();
  }, [dispatchLoadActiveStudents]);

  useEffect(() => {
    if (isShowDisabled && allStudents.length && !areAllStudentsLoading) {
      const disabledStudents = getDisabledStudents();

      setStudents(disabledStudents.map((student, index) => ({ index, ...student })));
    }
    if (!isShowDisabled && activeStudents.length && !areActiveStudentsLoading) {
      setStudents(activeStudents.map((student, index) => ({ index, ...student })));
    }
    setSortingCategories(INITIAL_CATEGORIES);
    setVisibleStudents(students.slice(indexOfFirstStudent, indexOfLastStudent));
  },
  [activeStudents, areActiveStudentsLoading, allStudents, areAllStudentsLoading, isShowDisabled]);

  useEffect(() => {
    setVisibleStudents(students.slice(indexOfFirstStudent, indexOfLastStudent));
  }, [currentPage, students]);

  useEffect(() => {
    if (allStudentsError || activeStudentsError) {
      dispatchAddAlert(allStudentsError || activeStudentsError);
    }
  }, [activeStudentsError, allStudentsError, dispatchAddAlert]);

  useEffect(() => {
    if (isShowDisabled) {
      const disabledStudents = getDisabledStudents();
      const searchedStudents = searchStudents(disabledStudents, searchFieldValue);

      setStudents(searchedStudents.map((student, index) => ({ index, ...student })));
    } else {
      const searchedStudents = searchStudents(activeStudents, searchFieldValue);

      setStudents(searchedStudents.map((student, index) => ({ index, ...student })));
    }
    setCurrentPage(1);
  }, [searchFieldValue, isShowDisabled]);

  const handleSortByParam = (data, categoryParams) => {
    const sortedStudents = data;
    setSortingCategories(changeActiveCategory(sortingCategories, categoryParams.sortingParam));
    setStudents(sortedStudents);
    setVisibleStudents(students.slice(indexOfFirstStudent, indexOfLastStudent));
  };

  const handleShowDisabled = (event) => {
    setIsShowDisabled(!isShowDisabled);

    if (event.target.checked) {
      dispatchLoadStudents();
    } else {
      dispatchLoadActiveStudents();
    }
  };

  const handleEdit = (event, id) => {
    event.stopPropagation();
    history.push(`${paths.STUDENT_EDIT}/${id}`);
  };

  const handleDetails = (id) => {
    history.push(`${paths.STUDENTS_DETAILS}/${id}`);
  };

  const handleSearch = (value) => {
    setSearchFieldValue(value);
  };

  const handleAddStudent = () => {
    history.push(paths.UNASSIGNED_USERS);
  };

  const changeCountVisibleItems = (newNumber) => {
    const finish = currentPage * newNumber;
    const start = finish - newNumber;
    setVisibleStudents(students.slice(start, finish));
    setStudentsPerPage(newNumber);
  };

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(students?.length / studentsPerPage);

    setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
  };

  const prevPage = (pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
  };

  const listProps = {
      data: visibleStudents,
      handleDetails,
      handleEdit,
      errors: [{
          message: 'Loading has been failed',
          check: [!!allStudentsError, !!activeStudentsError]
      }, {
          message: 'Student is not found',
          check: [!visibleStudents.length, !!searchFieldValue]
      }],
      access: true,
    fieldsToShow: ['firstName', 'lastName', 'email', 'edit']
  };

  const paginationComponent = () => {
    if (students.length < studentsPerPage) {
      return (
        <Pagination
          itemsPerPage={studentsPerPage}
          totalItems={1}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      );
    }
    return (
      <Pagination
        itemsPerPage={studentsPerPage}
        totalItems={students.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        page={currentPage}
      />
    );
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Students</h2>
        <div className="col-2 text-right">
          {
           !areActiveStudentsLoading && !areAllStudentsLoading
          && `${visibleStudents.length} of ${students.length} students`
        }
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          {!areActiveStudentsLoading && !areAllStudentsLoading
          && (
            paginationComponent()
          )}
        </div>
      </div>
      <div className="row mr-0">
        <div className="col-12 card shadow p-3 mb-5 bg-white ml-2 mr-2">
          <div className="row align-items-center d-flex justify-content-between mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button type="button"
                        className="btn btn-secondary"
                        disabled={!showBlocks}
                        onClick={() => setShowBlocks(false)}>
                  <Icon icon="List" color="#2E3440" size={25}/>
                </button>
                <button type="button"
                        className="btn btn-secondary"
                        disabled={showBlocks}
                        onClick={() => setShowBlocks(true)}>
                  <Icon icon="Card" color="#2E3440" size={25}/>
                </button>
              </div>
            </div>
            <div className="col-3">
              <Search
                value={searchFieldValue}
                onSearch={handleSearch}
                placeholder="student's name"
              />
            </div>
            <div className="col-2 custom-control custom-switch text-right">
              <input
                value={isShowDisabled}
                type="checkbox"
                className={classNames('custom-control-input', styles['custom-control-input'])}
                id="show-disabled-check"
                onChange={handleShowDisabled}
              />
              <label
                className={classNames('custom-control-label', styles['custom-control-label'])}
                htmlFor="show-disabled-check"
              >
                Disabled students
              </label>
            </div>
            {!showBlocks &&
              <div className="col-1 d-flex">
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
                  <option>9</option>
                  <option>27</option>
                  <option>45</option>
                  <option>72</option>
                  <option>99</option>
                </select>
              </div>
            }
              {[3, 4].includes(currentUser.role) && (
                <div className="col-4 text-right">
                <Button onClick={downloadStudents} type="button" className={classNames('btn btn-warning ', styles['left-add-btn'])}>
                  Upload student('s)
                </Button>
                <Button onClick={handleAddStudent}><span>Add a student</span></Button>
              </div>
              )}
          </div>
          <WithLoading isLoading={areActiveStudentsLoading || areAllStudentsLoading} className="d-block mx-auto my-2">
            {
              showBlocks ?
                  <div className="container d-flex flex-wrap">
                    <List listType={'block'} props={listProps}/>
                  </div>
                  :
                  <Table
                      sortingCategories={sortingCategories}
                      currentUser={currentUser}
                      onClick={handleSortByParam}
                      data={students}
                      access={{unruledUser: [2], unassigned: ''}}
                  >
                    <List listType='list' props={listProps}/>
                  </Table>
            }

          </WithLoading>
        </div>
        <div className={classNames('row justify-content-between align-items-center mb-3', styles.paginate)}>{paginationComponent()}</div>
      </div>
    </div>
  );
};
