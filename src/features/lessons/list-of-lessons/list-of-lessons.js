import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';
import { paths, useActions } from '@/shared';
import { fetchLessons, lessonsSelector } from '@/models/index.js';
import {
  Card, Search, Button, WithLoading,
} from '@/components/index.js';
import Icon from '@/icon.js';
import styles from './list-of-lessons.scss';
import { Pagination } from '@/components/pagination';

export const ListOfLessons = () => {
  const history = useHistory();

  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [searchLessonsDateValue, setSearchLessonsDateValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lessonsPerPage] = useState(12);

  const { data, isLoading } = useSelector(lessonsSelector, shallowEqual);

  const getLessons = useActions(fetchLessons);

  useEffect(() => {
    getLessons();
  }, [getLessons]);

  useEffect(() => {
    setFilteredLessonsList(data);
  }, [data]);

  useEffect(() => {
    const lessons = data.filter(
      (lesson) => lesson.themeName.toUpperCase().includes(searchLessonsThemeValue.toUpperCase()),
    ).filter(
      (lesson) => lesson.lessonDate.includes(searchLessonsDateValue),
    );
    setFilteredLessonsList(lessons);
  }, [searchLessonsDateValue, searchLessonsThemeValue]);

  const handleSearchTheme = (inputValue) => {
    setSearchLessonsThemeValue(inputValue);
  };

  const handleSearchDate = (event) => {
    const date = event.target.value;
    setSearchLessonsDateValue(date);
  };

  const addLesson = () => {
    history.push(paths.LESSON_ADD);
  };

  const editLesson = (id) => {
    history.push(`${paths.LESSON_EDIT}/${id}`);
  };

  const transformDateTime = (dateTime) => {
    const arr = dateTime.split('T');
    const date = arr[0].split('-');
    const resultDate = date.reverse().join('.');
    return {
      date: resultDate,
      time: arr[1].slice(0, 5),
    };
  };

  const getLessonsList = () => {
    const indexOfLastLesson = currentPage * lessonsPerPage;
    const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;

    const lessonsList = filteredLessonsList.slice(indexOfFirstLesson, indexOfLastLesson)
      .map((lesson) => {
        const { date, time } = transformDateTime(lesson.lessonDate);
        return (
          <Card
            key={lesson.id}
            id={lesson.id}
            title={lesson.themeName}
            iconName="Edit"
            onEdit={editLesson}
          >
            <p className={styles.timeDate}>Date: {date}</p>
            <p className={styles.timeDate}>Time: {time}</p>
          </Card>
        );
      });
    if (!lessonsList.length && searchLessonsDateValue) {
      return <h4>Lesson not found</h4>;
    } if (!lessonsList.length && searchLessonsThemeValue) {
      return <h4>Lesson not found</h4>;
    }
    return lessonsList;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={classNames("container", styles['list-wrapper'])}>
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
          <Search onSearch={handleSearchTheme} placeholder="Search lesson`s theme" />
          <Button onClick={addLesson} variant="warning">
            <Icon icon="Plus" className="icon" />
            Add a Lesson
          </Button>
        </div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
              getLessonsList()
            }
          </WithLoading>
        </div>
      </div>
      <Pagination itemsPerPage={lessonsPerPage} totalItems={filteredLessonsList.length} paginate={paginate}/>
    </div>
  );
};
