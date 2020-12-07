import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Card, Search, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import styles from './list-of-lessons.scss';
import { dataList } from './lessons-dataList.js';
import { fetchLessons } from '../../models/index.js';
import {shallowEqual, useSelector} from "react-redux";
import {counterActions, counterIsLoadingSelector} from "@/features";
import {useActions} from "@/shared";

export const ListOfLessons = () => {
  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [searchLessonsThemeDateValue, setSearchLessonsThemeDateValue] = useState('');

  const isLoading = useSelector(counterIsLoadingSelector, shallowEqual);
  const { fetchLesson } = useActions(lessonsActions);

  useEffect(() => {
    const lessons = dataList.filter(
      (lesson) => lesson.themeName.toUpperCase().includes(searchLessonsThemeValue.toUpperCase()),
    ).filter(
      (lesson) => lesson.date.includes(searchLessonsThemeDateValue),
    );
    setFilteredLessonsList(lessons);
  }, [searchLessonsThemeDateValue, searchLessonsThemeValue]);

  const handleSearchDate = (event) => {
    setSearchLessonsThemeDateValue(event.target.value);
  };
  const handleSearch = (inputValue) => {
    setSearchLessonsThemeValue(inputValue);
  };

  const lessonAdding = () => {
  };

  const lessonEditing = (id) => {
  };

  const studentsList = () => filteredLessonsList.map((lesson) => (
    <Card
      key={lesson.id}
      id={lesson.id}
      title={lesson.themeName}
      iconName="Edit"
      date={lesson.date}
      onEdit={lessonEditing}
    />
  ));

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles.heading, 'col-12 mb-2')}>
          <div>
            <input
              className={classNames('form-control ', styles['calendar-input'])}
              type="date"
              name="lesson_date"
              required
              onChange={handleSearchDate}
            />
          </div>
          <Search onSearch={handleSearch} placeholder="Enter a lesson theme name" />
          <Button onClick={lessonAdding} variant="warning">
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