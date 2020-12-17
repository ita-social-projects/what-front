import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared';
import { fetchCourses, coursesSelector } from '@/models/index.js';
import classNames from 'classnames';
import { Card, Search, Button, WithLoading } from '../../../components/index.js';
import Icon from '../../../icon.js';
import styles from './list-of-courses.scss';

export const ListOfCourses = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const { data, isLoading } = useSelector(coursesSelector, shallowEqual);

  const [loadCourses] = useActions([fetchCourses]);

  const history = useHistory();

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    setFilteredCourses(data);
  }, [data]);

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    setFilteredCourses(data.filter(({ name }) => name.toUpperCase().includes(inputValue.toUpperCase())));
  };

  const addCourse = () => {
    history.push(paths.COURSE_ADD);
  };

  const courseDetails = (id) => {
    history.push(`${paths.COURSE_DETAILS}/${id}`);
  };

  const courseEdit = (id) => {
    history.push(`${paths.COURSE_EDIT}/${id}`);
  };

  const coursesList = () => {
    const courses = filteredCourses.map((course) => (
      <Card
        key={course.id}
        id={course.id}
        buttonName="Details"
        iconName="Edit"
        onEdit={() => courseEdit(course.id)}
        onDetails={() => courseDetails(course.id)}
      >{course.name}
      </Card>
    ));

    if (!courses.length && searchValue) {
      return <h4>Courses not found</h4>;
    }
    return courses;
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
          <WithLoading isLoading={isLoading}>
            {
              coursesList()
            }
          </WithLoading>
        </div>
      </div>
    </div>
  );
};
