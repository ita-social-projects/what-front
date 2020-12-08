import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { useActions } from '../../shared/index.js';
import {
  Card, Search, Button, WithLoading,
} from '../../components/index.js';
import Icon from '../../icon.js';
import {
  loadActiveStudents, activeStudentsSelector,
} from '../../models/index.js';
import styles from './list-of-students.scss';

export const ListOfStudents = () => {
  const [fetchStudents] = useActions([loadActiveStudents]);

  const [filteredStudentsList, setFilteredStudentsList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useSelector(activeStudentsSelector, shallowEqual);

  const history = useHistory();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    setFilteredStudentsList(data);
  }, [data]);

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    setFilteredStudentsList(data.filter(({ firstName, lastName }) => {
      const name = `${firstName} ${lastName}`;

      return name.toLowerCase().includes(inputValue.toLowerCase());
    }));
  };

  const addStudent = () => {
    history.push('/add-student');
  };

  const studentDetails = (id) => {
    history.push(`/students/${id}`);
  };

  const studentEditing = (id) => {
    history.push(`/students/edit-student/${id}`);
  };

  const getStudents = () => {
    const students = filteredStudentsList.map(({ id, firstName, lastName }) => (
      <Card
        key={id}
        id={id}
        buttonName="Details"
        iconName="Edit"
        onEdit={() => studentEditing(id)}
        onDetails={() => studentDetails(id)}
      >
        <p className="mb-2">{firstName} {lastName}</p>
      </Card>
    ));

    if (!students.length && searchValue) {
      return <h4>Student not found</h4>;
    }

    return students;
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles.heading, 'col-12 mb-2')}>
          <div className={styles['search-container']}>
            <Search onSearch={handleSearch} placeholder="Enter a student's name" />
          </div>
          <div className={styles['button-container']}>
            <Button onClick={addStudent} variant="warning">
              <Icon icon="Plus" className="icon" />
              Add a Student
            </Button>
          </div>
        </div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
              getStudents()
            }
          </WithLoading>
        </div>
      </div>
    </div>
  );
};
