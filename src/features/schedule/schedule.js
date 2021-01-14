import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { paths, useActions } from '@/shared';
import {
  schedulesSelector, fetchSchedules, globalLoadStudentGroups,
  loadStudentGroupsSelector, currentUserSelector,
} from '@/models';
import { Button, WithLoading } from '@/components';
import Icon from '@/icon';
import styles from './schedule.scss';

export const Schedule = () => {
  const [
    dispatchFetchSchedules,
    dispatchFetchGroups,
  ] = useActions([fetchSchedules, globalLoadStudentGroups]);

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const {
    data: schedules,
    isLoading: areSchedulesLoading,
    isLoaded: areSchedulesLoaded,
  } = useSelector(schedulesSelector, shallowEqual);
  const {
    data: groups,
    isLoading: areGroupsLoading,
    isLoaded: areGroupsLoaded,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const [currentWeek, setCurrentWeek] = useState([]);
  const [chosenDate, setChosenDate] = useState(new Date());

  const history = useHistory();

  const DAY_IN_MILLIS = 86400000;
  const WEEK_IN_MILLIS = DAY_IN_MILLIS * 7;

  useEffect(() => {
    dispatchFetchSchedules();
    dispatchFetchGroups();
  }, [dispatchFetchSchedules, dispatchFetchGroups]);

  useEffect(() => {
    const addZero = (num) => (num < 10 ? `0${num}` : num);

    if (areSchedulesLoaded && areGroupsLoaded) {
      const weekDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const firstDayOfWeek = new Date(chosenDate.getTime()
        - (chosenDate.getDay() - 1) * DAY_IN_MILLIS);

      const weekDays = weekDayNames.map((day, index) => {
        const currentDay = new Date(firstDayOfWeek.getTime() + index * DAY_IN_MILLIS);

        const lessons = schedules
          .filter((schedule) => schedule.dayNumber === index || schedule.repeatRate === 1)
          .sort((lesson, nextLesson) => (nextLesson.lessonStart < lesson.lessonStart ? 1 : -1));

        return {
          id: index,
          day,
          lessons,
          date: `${addZero(currentDay.getDate())}.${addZero(currentDay.getMonth() + 1)}`,
          isToday: new Date().toDateString() === currentDay.toDateString(),
          isPast: new Date(new Date().toDateString()).getTime() > currentDay.getTime(),
        };
      });

      setCurrentWeek(weekDays);
    }
  }, [areGroupsLoaded, areSchedulesLoaded, chosenDate, schedules, setCurrentWeek]);

  const handleNextWeek = () => {
    setChosenDate(new Date(chosenDate.getTime() + WEEK_IN_MILLIS));
  };

  const handlePreviousWeek = () => {
    setChosenDate(new Date(chosenDate.getTime() - WEEK_IN_MILLIS));
  };

  const handleInputDate = (event) => {
    setChosenDate(new Date(event.target.value));
  };

  const handleEditSchedule = (id) => {
    history.push(`${paths.SCHEDULE_EDIT}/${id}`);
  };

  const handleAddSchedule = () => {
    history.push(paths.SCHEDULE_ADD);
  };

  return (
    <div className="container">
      <WithLoading isLoading={areGroupsLoading || areSchedulesLoading} className="d-block mx-auto">
        <div className="row mb-4">
          <div className="col-3 d-flex justify-content-start pl-0">
            <input
              type="date"
              min={`${new Date().getFullYear() - 1}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
              max={`${new Date().getFullYear() + 1}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
              onChange={handleInputDate}
              className={styles['date-input']}
            />
            <Button
              className="ml-2"
              variant="warning"
              onClick={() => setChosenDate(new Date())}
            >
              Today
            </Button>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <button
              type="button"
              className={styles['change-week-btn']}
              onClick={handlePreviousWeek}
            >
              <Icon icon="Arrow" className={classNames(styles.arrow, styles['arrow-left'])} />
            </button>
            <h4 className="mb-0">{currentWeek[0]?.date} - {currentWeek[currentWeek.length - 1]?.date}</h4>
            <button
              type="button"
              className={styles['change-week-btn']}
              onClick={handleNextWeek}
            >
              <Icon icon="Arrow" className={styles.arrow} />
            </button>
          </div>
          {[3, 4].includes(currentUser.role) ? (
            <div className="col-3 d-flex justify-content-end pr-0">
              <Button variant="warning" onClick={handleAddSchedule}>
                <Icon icon="Plus" className="icon" />
                Add schedule
              </Button>
            </div>
          ) : null}
        </div>
        <section className={classNames('row', 'justify-content-center')}>
          { currentWeek.map(({ id, isToday, day, date, lessons, isPast }) => (
            <div key={id} className={classNames('col', 'px-0', { [styles['current-day']]: isToday }, styles['day-column'])}>
              <hgroup className={styles['day-column-header']}>
                <h5 className="text-center">{day}</h5>
                <h5 className="text-center">{date}</h5>
              </hgroup>
              <ul className={styles['lessons-list']}>
                { lessons.map(({ id: lessonId, studentGroupId, lessonEnd, lessonStart }) => (
                  <li key={lessonId} className={styles['lessons-list__item']}>
                    <p className={styles['lessons-list__group-name']}>
                      {groups.find((group) => studentGroupId === group.id).name}
                    </p>
                    <div className={styles['lessons-list__details']}>
                      <Badge
                        variant={classNames(
                          { primary: isToday },
                          { secondary: isPast && !isToday },
                          { warning: !isToday && !isPast },
                        )}
                      >
                        {lessonStart.substring(0, 5)} - {lessonEnd.substring(0, 5)}
                      </Badge>
                      {[3, 4].includes(currentUser.role) ? (
                        <button
                          type="button"
                          className={styles['edit-button']}
                          onClick={() => handleEditSchedule(lessonId)}
                        >
                          <Icon icon="Edit" viewBox="0 0 45 45" size={20} />
                        </button>
                      ) : null}
                    </div>
                  </li>
                )) }
              </ul>
            </div>
          )) }
        </section>
      </WithLoading>
    </div>
  );
};
