import React, { useState, useEffect } from 'react';
import { Card, Search, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import classNames from 'classnames';
import styles from './list-of-students.scss';
import { dataList } from './students-dataList.js';

export const ListOfStudents = () => {
  const [searchStudentValue, setSearchStudentValue] = useState('');
  const [filteredStudentsList, setFilteredStudentsList] = useState([]);

  useEffect(() => {
    const students = dataList.filter((student) => student.name.toUpperCase()
      .includes(searchStudentValue.toUpperCase()));
      setFilteredStudentsList(students);
  }, [searchStudentValue]);

  const handleSearch = (inputValue) => {
    setSearchStudentValue(inputValue);
  };

  const addStudent = () => {
  };
  const studentDetails = (id) => {
  };
  const studentEditing = (id) => {
  };

  const studentsList = () => {

    return filteredStudentsList.map((student) => (
      <Card
        key={student.id}
        id={student.id}
        buttonName='Details'
        iconName='Edit'
        onEdit={studentEditing}
        onDetails={studentDetails}
        > <span>{student.name}</span>
      </Card>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles.heading, 'col-12 mb-2')}>
          <div className={styles.search_container}>
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
}