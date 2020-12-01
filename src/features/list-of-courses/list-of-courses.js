import React, { useState, useEffect } from 'react';
import { dataCourses } from './courses-data-list.js';
import { Card, Search, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import classNames from 'classnames';
import styles from './list-of-courses.scss';
import { createCourse, editCourse, getCourses } from '@/models/index.js';
import { useActions } from '@/shared/hooks/index.js';

export const ListOfCourses = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [loadCourses, createNewCourse, updateCourse] = useActions([getCourses, createCourse, editCourse])

  useEffect(() => {
    const courses = dataCourses.filter((course) => course.name.toUpperCase()
      .includes(searchValue.toUpperCase()));
      setFilteredCourses(courses);
  }, [searchValue]);

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
  };

  const addCourse = () => {
    const course = {
      name: 'new course'
    };
    createNewCourse(course);
  };

  const courseDetails = (id) => {
  };

  const id = 3

  const courseEdit = (id) => {
    const editedCourse = {
      name: 'editedNameCourse'
    };
    updateCourse(editedCourse, id)
  };

  const coursesList = () => {

    return filteredCourses.map((course) => (
      <Card
        key={course.id}
        id={course.id}
        buttonName='Details'
        iconName='Edit'
        onEdit={courseEdit}
        onDetails={courseDetails}
        >{course.name}
      </Card>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles['list-head'], 'col-12 mb-2')}>
          <div className={styles['search-container']}>
            <Search onSearch={handleSearch} placeholder="Enter a course's name" />
          </div>
          <Button onClick={addCourse} variant="warning" className={styles.button}>
            <Icon icon="Plus" className="icon" />
            Add a Course
          </Button>
        </div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          {
            coursesList()
          }
        </div>
        <button type='button' onClick={loadCourses}>Загрузить</button>
        <button type='button' onClick={addCourse}>Создать новый курс</button>
        <button type='button' onClick={() => courseEdit(id)}>Изменить курс</button>
      </div>
    </div>
  );
}