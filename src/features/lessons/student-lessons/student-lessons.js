import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { fetchLessonsByStudentId, studentLessonsSelector} from '@/models/index.js';
import { Search, WithLoading, Pagination } from '@/components/index.js';
import Icon from '@/icon.js';
import classNames from 'classnames';
import styles from '../list-of-lessons/list-of-lessons.scss';
import {commonHelpers} from "@/utils";

export const StudentLessons = () => {
  const history = useHistory();
  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [visibleLessonsList, setVisibleLessonsList] = useState([]);
  const [searchLessonsDateValue, setSearchLessonsDateValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [descendingSorts, setDescendingSorts] = useState({ id: true, themeName: false, lessonDate: false, lessonTime: false });
  const [prevSort, setPrevSort] = useState('id');
  const { data, isLoading } = useSelector(studentLessonsSelector, shallowEqual);
  const fetchStudentLessons = useActions(fetchLessonsByStudentId);

  const lessonsPerPage = 10;
  const indexOfLast = currentPage * lessonsPerPage;
  const indexOfFirst = indexOfLast - lessonsPerPage;
  const { id } = useParams();


  useEffect(() => {
    fetchStudentLessons(id);
  }, [fetchStudentLessons, id]);


  useEffect(() => {
    if(data.length !== 0) {
      const lessonsData = data.map((lesson) => {
        const {date, time} = commonHelpers.transformDateTime({ dateTime: lesson.lessonDate });
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
    const lessons = data.filter(
        (lesson) => lesson.lessonShortDate === searchLessonsDateValue);
    setFilteredLessonsList(lessons);
    setCurrentPage(1);
  }, [searchLessonsDateValue]);

  useEffect(() => {
    const lessons = data.filter(
        (lesson) => lesson.themeName.toUpperCase().includes(searchLessonsThemeValue.toUpperCase()),
    );
    setFilteredLessonsList(lessons);
    setCurrentPage(1);
  }, [searchLessonsThemeValue]);


  const lessonDetails = useCallback((id) => {
    history.push(`${paths.LESSON_DETAILS}/${id}`);
  }, [history]);


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

  const nextPage = useCallback((pageNumber) => {
    const totalPages = Math.ceil(filteredLessonsList?.length / lessonsPerPage);
    setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
  },[lessonsPerPage, currentPage]);

  const prevPage = useCallback((pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
  },[currentPage]);

  const getLessonsList = useCallback(() => {
    const lessonsList = visibleLessonsList.map((lesson) => (
        <tr id={lesson.id} key={lesson.id} onClick={() => lessonDetails(lesson.id)} className={styles['table-row']}>
          <td className="text-center">{lesson.id}</td>
          <td>{lesson.themeName}</td>
          <td>{lesson.lessonShortDate}</td>
          <td>{lesson.lessonTime}</td>
        </tr>
    ));
    if (!lessonsList.length && searchLessonsDateValue || !lessonsList.length && searchLessonsThemeValue) {
      return <tr><td colSpan="5" className="text-center">Lesson is not found</td></tr>;
    }
    return lessonsList;
  }, [visibleLessonsList, searchLessonsDateValue, searchLessonsThemeValue]);

  return (
      <div className="container">
        <div className="row justify-content-between align-items-center mb-3">
          <h2 className="col-6">Lessons</h2>
          {filteredLessonsList.length > lessonsPerPage ? <div className="col-2 text-right">{filteredLessonsList.length} lessons</div> : null}
          <div className="col-4 d-flex align-items-center justify-content-end">
            {filteredLessonsList.length > lessonsPerPage && !isLoading
            && (
                <Pagination
                    itemsPerPage={lessonsPerPage}
                    totalItems={filteredLessonsList.length}
                    paginate={paginate}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    page={currentPage}
                />
            )}
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
              <div className="col-3">
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
        </div>
      </div>
)
};
