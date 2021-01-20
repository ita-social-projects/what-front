import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchLessons, lessonsSelector } from '@/models/index.js';
import { Search, WithLoading, Pagination } from '@/components/index.js';
import classNames from 'classnames';
import Icon from '@/icon.js';
import styles from './list-of-lessons.scss';

export const ListOfLessons = () => {
  const history = useHistory();
  
  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [searchLessonsDateValue, setSearchLessonsDateValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lessonsPerPage] = useState(10);
  const [lessonsNew, setLessonsNew] = useState([]);
  
  const [arrowActive, setArrowState] = useState([false, false, false, false]);
  
  const toggleSort = (key) => {
    arrowActive[key] = arrowActive[key] ? false : true;
    setArrowState(arrowActive);
  };
  
  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'theme', sortedByAscending: false, tableHead: 'Theme' },
    { id: 2, name: 'date', sortedByAscending: false, tableHead: 'Date' },
    { id: 3, name: 'time', sortedByAscending: false, tableHead: 'Time' },
  ]);
  
  const { data, isLoading } = useSelector(lessonsSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  
  const getLessons = useActions(fetchLessons);
  
  useEffect(() => {
    getLessons();
  }, [getLessons]);
  
  useEffect(() => {
    setFilteredLessonsList(data);
  }, [data]);

  // useEffect(() => {
  //   if (data.length && !isLoading) {
  //     setLessonsNew(data.map((lesson, index) => ({index, ...lesson})));
  //   }
  // }, [data])
  //
  // console.log(setLessons)
  
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
  
  const lessonDetails = useCallback((id) => {
    history.push(`${paths.LESSON_DETAILS}/${id}`);
  })
  
  const editLesson = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.LESSON_EDIT}/${id}`);
  })
  
  const transformDateTime = (dateTime) => {
    const arr = dateTime.split('T');
    const date = arr[0].split('-');
    const resultDate = date.reverse().join('.');
    return {
      date: resultDate,
      time: arr[1].slice(0, 5),
    };
  };
  
  const handleSortByParam = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;
    const sortedLessons = [...filteredLessonsList].sort((prev, current) => {
      if (prev > current) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });

    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === sortingParam) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    }));
    
    setFilteredLessonsList(sortedLessons);
  };
  
  
  const getLessonsList = () => {
    const indexOfLastLesson = currentPage * lessonsPerPage;
    const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
    const lessonsList = filteredLessonsList.slice(indexOfFirstLesson, indexOfLastLesson)
      .sort((a, b) => {
        return a.lessonDate > b.lessonDate ? -1 : a.lessonDate < b.lessonDate ? 1 : 0;
      })
      .map((lesson, index) => {
        const { date, time } = transformDateTime(lesson.lessonDate);
        return (
          <tr id={lesson.id} key={lesson.id} onClick={() => lessonDetails(lesson.id)}>
            <td className="text-center">{index + 1}</td>
            <td>{lesson.themeName}</td>
            <td>{date}</td>
            <td>{time}</td>
            {currentUser.role !== 2 ?
            <td onClick={(e) => {
                editLesson(e, lesson.id)}
                }>
              <Icon className={classNames(styles.edit)} icon="Edit" color="#2E3440" size={30} />
            </td> : null}
          </tr>
        );
      });
    
    if (!lessonsList.length && searchLessonsDateValue || !lessonsList.length && searchLessonsThemeValue) {
      return <td colSpan="5" className="text-center">Lesson is not found</td>;
    }
    return lessonsList;
  };
  
  
  const paginate = (pageNumber) => {
    if(currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };
  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(filteredLessonsList.length / lessonsPerPage);
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
    <div className="container">
      <div className="row">
        <div className="d-flex w-100 justify-content-between">
          <h3>
            Lessons
          </h3>
          <div className="d-flex justify-content-end w-50">
            <div className="col-4">
              {filteredLessonsList.length > lessonsPerPage ? <span className="text-right">{filteredLessonsList.length} lessons</span> : null}
            </div>
            {filteredLessonsList.length > lessonsPerPage && !isLoading &&
              <Pagination
                itemsPerPage={lessonsPerPage}
                totalItems={filteredLessonsList.length}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            }
          </div>
        </div>
        <div className={classNames(styles.page, 'container pt-4')}>
          <div className="d-flex justify-content-between pb-3">
            <div className="d-flex justify-content-start">
              <div>
                <Icon icon="List" color="#2E3440" size={40} className="px-1" />
                <Icon icon="Card" color="#2E3440" size={40} className="px-1" />
              </div>
              <div className="px-2">
                <Search onSearch={handleSearchTheme} className={classNames(styles.text)} placeholder="Theme's name" />
              </div>
              <div className="px-2">
                <input
                  className={classNames(styles.date, 'form-control')}
                  type="date"
                  name="lesson_date"
                  required
                  onChange={handleSearchDate}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              {currentUser.role !== 2 &&
                <div>
                  <button
                    className={classNames(styles.button)}
                    onClick={addLesson}
                  >
                    <span className="text-white">Add a lesson</span>
                  </button>
                </div>
              }
            </div>
          </div>
          <WithLoading isLoading={isLoading}>
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-center align-middle"
                    onClick={handleSortByParam}
                  >
                    <button
                      className={classNames(styles['button-sort'], `${arrowActive[0] ? classNames(styles.descending) : ''}`)}
                      onClick={() => toggleSort(0)}
                    >
                      <span className="font-weight-bolder">#</span>
                      <span className="pl-2">
                        <Icon className={classNames(styles['arrow-down'])} icon="DropDown" color="#2E3440" size={32} />
                        <Icon className={classNames(styles['arrow-up'])} icon="DropUp" color="#2E3440" size={32} />
                      </span>
                    </button>
                  </th>
                  <th
                    scope="col"
                    onClick={handleSortByParam}
                  >
                    <button
                      className={classNames(styles['button-sort'], `${arrowActive[1] ? classNames(styles.descending) : ''}`)}
                      onClick={() => toggleSort(1)}
                    >
                      <span className="font-weight-bolder">Theme Name</span>
                      <span className="pl-2">
                        <Icon className={classNames(styles['arrow-down'])} icon="DropDown" color="#2E3440" size={32} />
                        <Icon className={classNames(styles['arrow-up'])} icon="DropUp" color="#2E3440" size={32} />
                      </span>
                    </button>
                  </th>
                  <th
                    scope="col"
                    onClick={handleSortByParam}
                  >
                    <button
                      className={classNames(styles['button-sort'], `${arrowActive[2] ? classNames(styles.descending) : ''}`)}
                      onClick={() => toggleSort(2)}
                    >
                      <span className="font-weight-bolder">Date</span>
                      <span className="pl-2">
                        <Icon className={classNames(styles['arrow-down'])} icon="DropDown" color="#2E3440" size={32} />
                        <Icon className={classNames(styles['arrow-up'])} icon="DropUp" color="#2E3440" size={32} />
                      </span>
                    </button>
                  </th>
                  <th
                    scope="col"
                    onClick={handleSortByParam}
                  >
                    <button
                      className={classNames(styles['button-sort'], `${arrowActive[3] ? classNames(styles.descending) : ''}`)}
                      onClick={() => toggleSort(3)}
                    >
                      <span className="font-weight-bolder">Time</span>
                      <span className="pl-2">
                        <Icon className={classNames(styles['arrow-down'])} icon="DropDown" color="#2E3440" size={32} />
                        <Icon className={classNames(styles['arrow-up'])} icon="DropUp" color="#2E3440" size={32} />
                      </span>
                    </button>

                  </th>
                  {currentUser.role !== 2 ? <th scope="col" className="align-middle">Edit</th> : null}
                </tr>
              </thead>
              <tbody>
                {getLessonsList()}
              </tbody>
            </table>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};
