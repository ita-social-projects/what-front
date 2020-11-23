import React from 'react';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { Card, Search, Button } from '../../components/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { listOfLessonsActions, searchTheme, searchDate } from './redux/index.js';
import Icon from '../../icon.js';
import styles from './list-of-lessons.scss';
import { dataList } from './lessons.js';

export const ListOfLessons = () => {
  const { setSearchLessonTheme, setSearchLessonDate } = useActions(listOfLessonsActions);

  const searchThemeName = useSelector(searchTheme, shallowEqual);
  const searchThemeDate = useSelector(searchDate, shallowEqual);

  const handleSearchTheme = (inputValue) => {
    setSearchLessonTheme(inputValue);
  };
  const handleSearchDate = (event) => {
    const date = event.target.value;
    setSearchLessonDate(date);
  };

  const handleAddLesson = () => {
  };
  const handleEditLesson = (id) => {
  };
  

  const lessonsList = () => {
    const listByTheme = dataList.filter((lesson) => lesson.themeName.toUpperCase()
    .includes(searchThemeName.toUpperCase()));

    return listByTheme.map((lesson) => (
      <Card
        key={lesson.id}
        id={lesson.id}
        button="Details"
        onEdit={handleEditLesson}
      > { handleEditLesson.themeName }
      </Card>
    ));
    }

  return (
    <div className="container">
      <div className="row">
        <div className={classNames(styles['list-head'], 'col-12')}>
          <input
            className={classNames('form-control ', styles['calendar-input'])}
            type="date"
            name="lesson date"
            required
            onChange={handleSearchDate}
            placeholder="year-month-day"
          />
          <Search onSearch={handleSearchTheme} placeholder="Enter a lesson theme"/>
          <Button onClick={handleAddLesson} variant="warning">
            <Icon icon="Plus" size={20} className="icon" />
            Add a lesson
          </Button>
        </div>
        <hr className="col-8" />
        <div className={classNames(styles['lesson-list'], 'col-12')}>
          {
               lessonsList()
          }
        </div>
      </div>
    </div>
  );
};
