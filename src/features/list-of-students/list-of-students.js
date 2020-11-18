import React from 'react';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, Search, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import { actions, searchStudentValue } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import styles from './list-of-students.scss';
import { data } from './students-dataList.js';

export const ListOfStudents = () => {
  // Search input
  const setSearchStudentValue = useActions(actions);
  const searchStudentName = useSelector(searchStudentValue, shallowEqual);

  const handleSearch = (inputValue) => {
    setSearchStudentValue(inputValue);
  };

  // Add a Student
  const addStudent = () => {
  };

  // Student's details
  const cardDetails = (id) => {
  };

  // Edit Student's details
  const cardEditing = (id) => {
  };

  const setStudentsList = () => {
    const listByStudentName = data.filter((student) => student.firstName.toUpperCase()
      .includes(searchStudentName.toUpperCase()));

    return listByStudentName.map((student) => (
      <Card
        key={student.id}
        id={student.id}
        children={[student.firstName, student.lastName]}
        button="Details"
        onEdit={cardEditing}
        onDetails={cardDetails}
      />
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles['heading'], 'col-12')}>
          <Search onSearch={handleSearch} placeholder="Enter a student's name" className="col-4" />
          <Button onClick={addStudent} variant="warning">
            <Icon icon="Plus" size={20} className="icon" />
            Add a Student
          </Button>
        </div>
        <hr className="col-8" />
        <div className={classNames(styles['content'], 'col-12 d-flex flex-row flex-wrap justify-content-center')}>
          {
            setStudentsList()
          }
        </div>
      </div>
    </div>
  );
};