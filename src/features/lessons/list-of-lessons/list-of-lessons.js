import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchLessons, lessonsSelector, mentorLessonsSelector, fetchMentorLessons  } from '@/models/index.js';
import { Button, Search, WithLoading, Pagination } from '@/components/index.js';
import Icon from '@/icon.js';
import classNames from 'classnames';
import styles from './list-of-lessons.scss';

export const ListOfLessons = () => {
  const history = useHistory();
  const getAllLessons = useActions(fetchLessons);
  const getMentorsLessons = useActions(fetchMentorLessons);
  const allLessons = useSelector(lessonsSelector, shallowEqual);
  const mentorsLessons = useSelector(mentorLessonsSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const { data, isLoading } = (currentUser.role === 2) ? mentorsLessons : allLessons;

  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [visibleLessonsList, setVisibleLessonsList] = useState([]);
  const [searchLessonsDateValue, setSearchLessonsDateValue] = useState('');
  const [descendingSorts, setDescendingSorts] = useState({ id: true, themeName: false, lessonDate: false, lessonTime: false });
  const [prevSort, setPrevSort] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [lessonsPerPage, setLessonsPerPage] = useState(10);

  const indexOfLast = currentPage * lessonsPerPage;
  const indexOfFirst = indexOfLast - lessonsPerPage;

  useEffect(() => {
    if (currentUser.role === 2) {
      getMentorsLessons(currentUser.id);
    } else {
      getAllLessons();
    }
  }, []);

  export function transformDateTime(dateTime) {
    const arr = dateTime.toString().split('T');
    return {
      date: arr[0],
      time: arr[1],
    };
  }

  useEffect(() => {
    if(data.length !== 0) {
      const lessonsData = data.map((lesson) => {
        const {date, time} = transformDateTime(lesson.lessonDate);
        return {
          lessonShortDate: date,
          lessonTime: time,
          ...lesson,
        }
      });
      setFilteredLessonsList(lessonsData);
    }
  }, [data]);

  useEffect(() => {
    setVisibleLessonsList(filteredLessonsList.slice(indexOfFirst, indexOfLast));
  }, [currentPage, filteredLessonsList]);

  const handleSearchTheme = (inputValue) => setSearchLessonsThemeValue(inputValue);

  const handleSearchDate = (event) => setSearchLessonsDateValue(event.target.value);

  useEffect(() => {
    const lessons = filteredLessonsList.filter((lesson) => lesson.lessonShortDate === searchLessonsDateValue);
    setFilteredLessonsList(lessons);
    setCurrentPage(1);
  }, [searchLessonsDateValue]);

  useEffect(() => {
    const lessons = filteredLessonsList.filter(
      (lesson) => lesson.themeName.toUpperCase().includes(searchLessonsThemeValue.toUpperCase()),
    );
    setFilteredLessonsList(lessons);
    setCurrentPage(1);
  }, [searchLessonsThemeValue]);

  const addLesson = () => history.push(paths.LESSON_ADD);
  const downloadThemes = () => history.push(paths.THEMES_DOWNLOAD);
  const lessonDetails =(id) => history.push(`${paths.LESSON_DETAILS}/${id}`);

  const editLesson =(event, id) => {
    event.stopPropagation();
    history.push(`${paths.LESSON_EDIT}/${id}`);
  };

  const handleSortByParam = (key) => {
    if (prevSort === key) {
      descendingSorts[key] = !descendingSorts[key];
      setDescendingSorts(descendingSorts);
    } else {
      setDescendingSorts({ id: false, themeName: false, lessonDate: false, lessonTime: false });
    }
    setPrevSort(key);

    const sortedLessons = [...filteredLessonsList].sort((a, b) => {
      if (descendingSorts[key]) {
        return a[key] <= b[key] ? -1 : 1;
      }
      return b[key] <= a[key] ? -1 : 1;
    });
    setFilteredLessonsList(sortedLessons);
    setVisibleLessonsList(filteredLessonsList.slice(indexOfFirst, indexOfLast));
  };

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };
  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(filteredLessonsList?.length / lessonsPerPage);
    setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
  };
  const prevPage = (pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
  };

  const getLessonsList = () => {
    const lessonsList = visibleLessonsList.map((lesson) => (
      <tr id={lesson.id} key={lesson.id} onClick={() => lessonDetails(lesson.id)} className={styles['table-row']}>
        <td className="text-center">{lesson.id}</td>
        <td>{lesson.themeName}</td>
        <td>{lesson.lessonShortDate}</td>
        <td>{lesson.lessonTime}</td>
        {currentUser.role !== 3
          ? (
            <td
              className="text-center"
              onClick={(e) => {
                editLesson(e, lesson.id);
              }}
            >
              <Icon className={classNames(styles.edit)} icon="Edit" color="#2E3440" size={30} />
            </td>
          ) : null}
      </tr>
    ));

    if (!lessonsList.length && searchLessonsDateValue || !lessonsList.length && searchLessonsThemeValue) {
      return <tr><td colSpan="5" className="text-center">Lesson is not found</td></tr>;
    }
    return lessonsList;
  };

  const changeCountVisibleItems = (newNumber) => {
    const finish = currentPage * newNumber;
    const start = finish - newNumber;
    setVisibleLessonsList(filteredLessonsList.slice(start, finish));
    setLessonsPerPage(newNumber);
  };

  const paginationComponent = () => {
    if (filteredLessonsList.length < lessonsPerPage) {
      return (
        <Pagination
          itemsPerPage={lessonsPerPage}
          totalItems={1}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
          page={currentPage}
        />
      );
    }
    return (
      <Pagination
        itemsPerPage={lessonsPerPage}
        totalItems={filteredLessonsList.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        page={currentPage}
      />
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Lessons</h2>
        { !isLoading ? (
          <div className="col-2 text-right"> {visibleLessonsList.length} of {filteredLessonsList.length} lessons
          </div>
        ) : null}
        <div className="col-4 d-flex align-items-center justify-content-end">
          {paginationComponent()}
        </div>
      </div>
      <div className="row">
        <div className="col-12 card shadow p-3 mb-5 bg-white">
          <div className="row align-items-center mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" disabled><Icon icon="List" color="#2E3440" size={25} /></button>
                <button type="button" className="btn btn-outline-secondary" disabled><Icon icon="Card" color="#2E3440" size={25} /></button>
              </div>
            </div>
            <div className="col-2">
              <Search onSearch={handleSearchTheme} className={classNames(styles.text)} placeholder="Theme's name" />
            </div>
            <div className="col-2">
              <input
                className={classNames(styles.date, 'form-control')}
                type="date"
                name="lesson_date"
                required
                onChange={handleSearchDate}
              />
            </div>
            <div className="col-2 d-flex">
              <label
                className={classNames(styles['label-for-select'])}
                htmlFor="change-visible-people"
              >
                Rows
              </label>
              <select
                className={classNames('form-control', styles['change-rows'])}
                id="change-visible-people"
                onChange={(event) => { changeCountVisibleItems(event.target.value); }}
              >
                <option>10</option>
                <option>30</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>
            <div className="col-3 offset-1 text-right">
              {currentUser.role !== 3
              && (
              <div className="btn-group">
                <Button onClick={downloadThemes} type="button" className="btn btn-warning">
                  Add theme('s)
                </Button>
                <Button onClick={addLesson}>
                  <span>Add a lesson</span>
                </Button>
              </div>
              )}
            </div>
          </div>
          <WithLoading isLoading={isLoading} className="d-block mx-auto mt-3">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={classNames(styles['table-head'], `${descendingSorts.id ? classNames(styles.descending) : ''}`, 'text-center', 'align-middle')}
                    onClick={() => handleSortByParam('id')}
                  >
                    <button
                      className={classNames(styles['button-sort'], 'px-0')}
                    >
                      <span className="font-weight-bolder">#</span>
                      <span className="pl-2">
                        <Icon className={classNames(styles['arrow-down'])} icon="DropDown" color="#2E3440" size={25} />
                        <Icon className={classNames(styles['arrow-up'])} icon="DropUp" color="#2E3440" size={25} />
                      </span>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className={classNames(styles['table-head'], `${descendingSorts.themeName ? classNames(styles.descending) : ''}`)}
                    onClick={() => handleSortByParam('themeName')}
                  >
                    <button
                      className={classNames(styles['button-sort'], 'px-0')}
                    >
                      <span className="font-weight-bolder">Theme Name</span>
                      <span className="pl-2">
                        <Icon className={classNames(styles['arrow-down'])} icon="DropDown" color="#2E3440" size={25} />
                        <Icon className={classNames(styles['arrow-up'])} icon="DropUp" color="#2E3440" size={25} />
                      </span>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className={classNames(styles['table-head'], `${descendingSorts.lessonDate ? classNames(styles.descending) : ''}`)}
                    onClick={() => handleSortByParam('lessonDate')}
                  >
                    <button
                      className={classNames(styles['button-sort'], 'px-0')}
                    >
                      <span className="font-weight-bolder">Date</span>
                      <span className="pl-2">
                        <Icon className={classNames(styles['arrow-down'])} icon="DropDown" color="#2E3440" size={25} />
                        <Icon className={classNames(styles['arrow-up'])} icon="DropUp" color="#2E3440" size={25} />
                      </span>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className={classNames(styles['table-head'], `${descendingSorts.lessonTime ? classNames(styles.descending) : ''}`)}
                    onClick={() => handleSortByParam('lessonTime')}
                  >
                    <button
                      className={classNames(styles['button-sort'], 'px-0')}
                    >
                      <span className="font-weight-bolder">Time</span>
                      <span className="pl-2">
                        <Icon className={classNames(styles['arrow-down'])} icon="DropDown" color="#2E3440" size={25} />
                        <Icon className={classNames(styles['arrow-up'])} icon="DropUp" color="#2E3440" size={25} />
                      </span>
                    </button>
                  </th>
                  {currentUser.role !== 3 ? <th scope="col" className="text-center">Edit</th> : null}
                </tr>
              </thead>
              <tbody>
                {
                  getLessonsList()
                }
              </tbody>
            </table>
          </WithLoading>
        </div>
        <div className={classNames('row justify-content-between align-items-center mb-3', styles.paginate)}>{paginationComponent()}</div>
      </div>
    </div>
  );
};
