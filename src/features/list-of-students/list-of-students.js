import React from 'react';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, Search, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import { actions, searchStudentValue } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import styles from './list-of-students.scss';
import { dataList } from './students-data-list.js';

export const ListOfStudents = () => {
  // Search input
  const { setSearchStudentValue } = useActions(actions);
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

  const studentsList = () => {
    const listByStudentName = dataList.filter((student) => student.name.toUpperCase()
      .includes(searchStudentName.toUpperCase()));

    return listByStudentName.map((student) => (
      <Card
        key={student.uuid}
        id={student.uuid}
        buttonName="Details"
        iconName="Edit"
        onEdit={cardEditing}
        onDetails={cardDetails}
      > { student.name }
      </Card>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles.heading, 'col-12 mb-3')}>
          <div className={styles.search__container}>
            <Search onSearch={handleSearch} placeholder="Enter a student's name" />
          </div>
          <Button onClick={addStudent} variant="warning">
            <Icon icon="Plus" className="icon" />
            Add a Student
          </Button>
        </div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          {
            studentsList()
          }
        </div>
      </div>
    </div>
  );
};