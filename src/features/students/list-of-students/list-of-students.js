import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { paths, useActions } from '@/shared';
import {
  loadStudents, loadActiveStudents,
  studentsSelector, activeStudentsSelector,
} from '@/models';
import { WithLoading, Search } from '@/components';
import Icon from '@/icon';

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
  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: false, tableHead: '#' },
    { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ]);
  const [isShowDisabled, setIsShowDisabled] = useState(false);

  useEffect(() => {
    dispatchLoadActiveStudents();
    dispatchLoadStudents();
  }, [dispatchLoadActiveStudents, dispatchLoadStudents]);

  useEffect(() => {
    if (isShowDisabled && allStudents.length && !areAllStudentsLoading) {
      const activeStudentIds = activeStudents.map(({ id }) => id);
      const disabledStudents = allStudents.filter(({ id }) => !activeStudentIds.includes(id));

      setStudents(disabledStudents.map((student, index) => ({ index, ...student })));
    }
    if (!isShowDisabled && activeStudents.length && !areActiveStudentsLoading) {
      setStudents(activeStudents.map((student, index) => ({ index, ...student })));
    }
  },
  [activeStudents, areActiveStudentsLoading, allStudents, areAllStudentsLoading, isShowDisabled]);

  const handleSortByParam = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    const sortedStudents = [...students].sort((prevStudent, currentStudent) => {
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

    setStudents(sortedStudents);
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
    event.preventDefault();
    history.push(`${paths.STUDENT_EDIT}/${id}`);
  };

  const handleDetails = (id) => {
    history.push(`${paths.STUDENTS_DETAILS}/${id}`);
  };

  return (
    <div className="container card shadow">
      <div className="row">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="show-disabled-check"
            onChange={handleShowDisabled}
          />
          <label className="custom-control-label" htmlFor="show-disabled-check">Show disabled</label>
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
                >
                  {tableHead}
                </th>
              ))}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {students.map(({ id, index, firstName, lastName, email }) => (
              <tr key={id} onClick={() => handleDetails(id)} data-student-id={id}>
                <td>{index + 1}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td onClick={(event) => handleEdit(event, id)} data-student-id={id}>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </WithLoading>
    </div>
  );
};
