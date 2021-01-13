import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchLessons, lessonsSelector } from '@/models/index.js';
import { Card, Search, Button, WithLoading, Pagination } from '@/components/index.js';
import classNames from 'classnames';
import styles from './list-of-lessons.scss';
import Icon from '@/icon.js';

export const ListOfLessons = () => {
  const history = useHistory();

  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [searchLessonsDateValue, setSearchLessonsDateValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lessonsPerPage] = useState(12);

  const { data, isLoading } = useSelector(lessonsSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

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

  const lessonDetails = (id) => {
    history.push(`${paths.LESSON_DETAILS}/${id}`);
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
      .sort((a, b) => {
        return a.lessonDate < b.lessonDate ? -1 : a.lessonDate > b.lessonDate ? 1 : 0;
      })
      .map((lesson) => {
        const { date, time } = transformDateTime(lesson.lessonDate);
          return (
            <Card
              key={lesson.id}
              id={lesson.id}
              title={lesson.themeName}
              buttonName="Details"
              iconName={currentUser.role !== 3 ? "Edit" : null}
              onEdit={currentUser.role !== 3 ? editLesson : null}
              onDetails={() => lessonDetails(lesson.id)}
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
    if(currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(filteredLessonsList.length / 12);
    setCurrentPage((prev) => {
      if (prev === totalPages) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  const prevPage = (pageNumber) => {
    setCurrentPage((prev) => {
      if (prev - 1 === 0) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  return (
    <div className={classNames("container", styles['list-wrapper'])}>
      <div className="row">
        <div className="col-md-2 text-left">
          <input
            className={classNames('form-control ', styles['calendar-input'])}
            type="date"
            name="lesson_date"
            required
            onChange={handleSearchDate}
          />
        </div>
        <div className="col-md-4 offset-md-2 text-center pl-3">
          <Search onSearch={handleSearchTheme} placeholder="Lesson's name" />
        </div>
        {currentUser.role !== 3 && 
          <div className="col-md-4 col-12 text-right">
            <Button onClick={addLesson} variant="warning">
              <Icon icon="Plus" className="icon" />
                Add a lesson
            </Button>
          </div>
        }
      </div>
      <div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
              getLessonsList()
            }
          </WithLoading>
        </div>
      </div>
      {filteredLessonsList.length > 12 && !isLoading &&
        <Pagination 
          itemsPerPage={lessonsPerPage} 
          totalItems={filteredLessonsList.length} 
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      }
    </div>
  );
};
