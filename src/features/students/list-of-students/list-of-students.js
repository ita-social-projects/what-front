import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { paths, useActions } from '@/shared';
import {
  loadStudents, loadActiveStudents,
  studentsSelector, activeStudentsSelector,
} from '@/models';
import { WithLoading, Pagination, Search, Button } from '@/components';
import Icon from '@/icon';
import styles from './list-of-students.scss';

export const ListOfStudents = () => {
  const {
    data: activeStudents,
    isLoading: areActiveStudentsLoading,
  } = useSelector(activeStudentsSelector, shallowEqual);

  const {
    data: allStudents,
    isLoading: areAllStudentsLoading,
  } = useSelector(studentsSelector, shallowEqual);

  const [
    dispatchLoadStudents,
    dispatchLoadActiveStudents,
  ] = useActions([loadStudents, loadActiveStudents]);

  const history = useHistory();

  const [students, setStudents] = useState([]);
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ]);
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

  const searchStudents = (searchedStudents) => searchedStudents.filter(({ firstName, lastName }) => `${firstName} ${lastName}`
    .toLowerCase().includes(searchFieldValue.toLowerCase()));

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

    setVisibleStudents(students.slice(indexOfFirstStudent, indexOfLastStudent));
  },
  [activeStudents, areActiveStudentsLoading, allStudents, areAllStudentsLoading, isShowDisabled]);

  useEffect(() => {
    setVisibleStudents(students.slice(indexOfFirstStudent, indexOfLastStudent));
  }, [currentPage, students]);

  useEffect(() => {
    if (isShowDisabled) {
      const disabledStudents = getDisabledStudents();
      const searchedStudents = searchStudents(disabledStudents);

      setStudents(searchedStudents.map((student, index) => ({ index, ...student })));
    } else {
      const searchedStudents = searchStudents(activeStudents);

      setStudents(searchedStudents.map((student, index) => ({ index, ...student })));
    }
  }, [searchFieldValue, isShowDisabled]);

  const handleSortByParam = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    const sortedStudents = [...visibleStudents].sort((prevStudent, currentStudent) => {
      if (prevStudent[sortingParam] > currentStudent[sortingParam]) {
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

    setVisibleStudents(sortedStudents);
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

  return (
    <div className="container">
      <div className="row d-flex justify-content-between align-items-center mb-3 px-3 py-2">
        <h2 className="col-6">Students</h2>
        <div className="col-2 text-right">{students.length > studentsPerPage ? `${students.length} students` : null}</div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          {students.length > studentsPerPage && !areActiveStudentsLoading && !areAllStudentsLoading
          && (
            <Pagination
              itemsPerPage={studentsPerPage}
              totalItems={students.length}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          )}
        </div>
      </div>
      <div className="card shadow p-3 mb-5 bg-white rounded">
        <div className="row align-items-center px-3 py-2 mb-2">
          <div className="col-2">
            <button className="btn">
              <Icon icon="List" className={styles.icon} />
            </button>
            <button className="btn">
              <Icon icon="Cards" className={styles.icon} />
            </button>
          </div>
          <div className="col-4">
            <Search
              value={searchFieldValue}
              onSearch={handleSearch}
              placeholder="student's name"
            />
          </div>
          <div className="col-2 offset-2 custom-control custom-switch">
            <input
              value={isShowDisabled}
              type="checkbox"
              className="custom-control-input"
              id="show-disabled-check"
              onChange={handleShowDisabled}
            />
            <label className={classNames('custom-control-label', styles.switch)} htmlFor="show-disabled-check">Show disabled</label>
          </div>
          <div className="col-2">
            <Button
              className={styles.button}
              onClick={handleAddStudent}
            >
              Add a student
            </Button>
          </div>
        </div>
        <WithLoading isLoading={areActiveStudentsLoading || areAllStudentsLoading} className="d-block mx-auto my-2">
          <table className="table table-hover">
            <thead>
              <tr>
                {sortingCategories.map(({ id, name, tableHead, sortedByAscending }) => (
                  <th
                    key={id}
                    onClick={handleSortByParam}
                    data-sorting-param={name}
                    data-sorted-by-ascending={Number(sortedByAscending)}
                    className={styles.category}
                  >
                    {tableHead}
                  </th>
                ))}
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.map(({ id, index, firstName, lastName, email }) => (
                <tr
                  key={id}
                  onClick={() => handleDetails(id)}
                  data-student-id={id}
                  className={styles['table-row']}
                >
                  <td>{index + 1}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td
                    onClick={(event) => handleEdit(event, id)}
                    data-student-id={id}
                    className="d-flex justify-content-center"
                  >
                    <Icon icon="Pencil" className={styles.icon} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </WithLoading>
      </div>
    </div>
  );
};
