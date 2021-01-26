import React, { useCallback, useEffect, useState } from 'react';
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
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ];

  const [sortingCategories, setSortingCategories] = useState(INITIAL_CATEGORIES);
  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const studentsPerPage = 10;
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const getDisabledStudents = () => {
    const activeStudentIds = activeStudents.map(({ id }) => id);

    return allStudents.filter(({ id }) => !activeStudentIds.includes(id));
  };

  const searchStudents = (searchedStudents, value) => searchedStudents.filter(({ firstName, lastName }) => `${firstName} ${lastName}`
    .toLowerCase().includes(value.toLowerCase()));

  const getSortedByParam = (data, activeCategory) => {
    const { sortingParam, sortedByAscending } = activeCategory;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    return [...data].sort((prevItem, currentItem) => {
      if (prevItem[sortingParam] > currentItem[sortingParam]) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });
  };

  const changeActiveCategory = (categories, activeCategoryName) => categories.map((category) => {
    if (category.name === activeCategoryName) {
      return { ...category, sortedByAscending: !category.sortedByAscending };
    }
    return { ...category, sortedByAscending: false };
  });

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

  const handleSortByParam = useCallback((event) => {
    const categoryParams = event.target.dataset;
    const sortedStudents = getSortedByParam(students, categoryParams);

    setSortingCategories(changeActiveCategory(sortingCategories, categoryParams.sortingParam));
    setStudents(sortedStudents);
    setVisibleStudents(students.slice(indexOfFirstStudent, indexOfLastStudent));
  }, [sortingCategories, students]);

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

  const getStudentsRows = () => {
    const studentsRows = visibleStudents.map(({ id, index, firstName, lastName, email }) => (
      <tr
        key={id}
        onClick={() => handleDetails(id)}
        data-student-id={id}
        className={styles['table-row']}
      >
        <td className="text-center">{index + 1}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td
          className="text-center"
          onClick={(event) => handleEdit(event, id)}
        >
          <Icon icon="Edit" className={styles.scale} color="#2E3440" size={30} />
        </td>
      </tr>
    ));

    if (allStudentsError || activeStudentsError) {
      return <tr><td colSpan="5" className="text-center">Loading has been failed</td></tr>;
    }

    if (!visibleStudents.length && searchFieldValue) {
      return <tr><td colSpan="5" className="text-center">Student is not found</td></tr>;
    }

    return studentsRows;
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Students</h2>
        <div className="col-2 text-right">{
          students.length > studentsPerPage && !areActiveStudentsLoading && !areAllStudentsLoading
          && `${students.length} students`
        }
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          {students.length > studentsPerPage && !areActiveStudentsLoading && !areAllStudentsLoading
          && (
            <Pagination
              itemsPerPage={studentsPerPage}
              totalItems={students.length}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
              page={currentPage}
            />
          )}
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
              <Search
                value={searchFieldValue}
                onSearch={handleSearch}
                placeholder="student's name"
              />
            </div>
            <div className="col-2 offset-3 custom-control custom-switch text-right">
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
            <div className="col-2 text-right">
              {[3, 4].includes(currentUser.role) && (
                <Button onClick={handleAddStudent}><span>Add a student</span></Button>
              )}
            </div>
          </div>
          <WithLoading isLoading={areActiveStudentsLoading || areAllStudentsLoading} className="d-block mx-auto my-2">
            <table className="table table-hover">
              <thead>
                <tr>
                  {sortingCategories.map(({ id, name, tableHead, sortedByAscending }) => (
                    <th
                      key={id}
                      className={styles['table-head']}
                    >
                      <span
                        onClick={handleSortByParam}
                        data-sorting-param={name}
                        data-sorted-by-ascending={Number(sortedByAscending)}
                        className={classNames(styles.category, { [styles['category-sorted']]: !sortedByAscending })}
                      >
                        {tableHead}
                      </span>
                    </th>
                  ))}
                  <th className="text-center">Edit</th>
                </tr>
              </thead>
              <tbody>
                {getStudentsRows()}
              </tbody>
            </table>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};
