import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { actions, searchCourseValue } from './redux/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { dataCourses } from './courses-data-list.js';
import { Card, Search, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import classNames from 'classnames';
import styles from './list-of-courses.scss';

export const ListOfCourses = () => {
  const { setSearchCourseValue } = useActions(actions);
  const searchCourseName = useSelector(searchCourseValue, shallowEqual);

  const handleSearch = (inputValue) => {
    setSearchCourseValue(inputValue);
  };

  const addCourse = () => {
  };

  const courseDetails = (id) => {
  };

  const courseEdit = (id) => {
  };

  const coursesList = () => {
    const listByCourseName = dataCourses.filter((course) => course.name.toUpperCase()
      .includes(searchCourseName.toUpperCase()));

    return listByCourseName.map((course) => (
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
      </div>
    </div>
  );
}