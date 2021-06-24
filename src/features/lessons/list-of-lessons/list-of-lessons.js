import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchLessons, lessonsSelector, mentorLessonsSelector, fetchMentorLessons  } from '@/models/index.js';
import { Button, Search, WithLoading, Pagination, DoubleDateFilter } from '@/components/index.js';
import Icon from '@/icon.js';
import { commonHelpers } from "@/utils";
import classNames from 'classnames';
import styles from './list-of-lessons.scss';
import { Table } from '@components/table';
import {List} from "@components/list";

export const ListOfLessons = () => {
  const history = useHistory();
  const getAllLessons = useActions(fetchLessons);
  const getMentorsLessons = useActions(fetchMentorLessons);

  const allLessons = useSelector(lessonsSelector, shallowEqual);
  const mentorsLessons = useSelector(mentorLessonsSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const { data, isLoading } = (currentUser.role === 2) ? mentorsLessons : allLessons;

  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [rawLessonsList, setRawLessonsList] = useState([]);
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [visibleLessonsList, setVisibleLessonsList] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState();
  const [filterEndDate, setFilterEndDate] = useState();
  const [startDateFilterBorder, setStartDateFilterBorder] = useState({
    error: false
  });
  const INITIAL_CATEGORIES = [
    { id: 0, name: 'themeName', sortedByAscending: false, tableHead: 'themeName' },
    { id: 1, name: 'lessonDate', sortedByAscending: false, tableHead: 'lessonDate' },
    { id: 2, name: 'lessonTime', sortedByAscending: false, tableHead: 'lessonTime' },
  ];
  const [showBlocks, setShowBlocks] = useState(false);

  const [sortingCategories, setSortingCategories] = useState(INITIAL_CATEGORIES);

  const [currentPage, setCurrentPage] = useState(1);
  const [lessonsPerPage, setLessonsPerPage] = useState(9);
  const indexOfLast = currentPage * lessonsPerPage;
  const indexOfFirst = indexOfLast - lessonsPerPage;

  useEffect(() => {
      if (currentUser.role === 2) {
        getMentorsLessons(currentUser.id);
      } else {
        getAllLessons();
      }
  }, [currentUser, getAllLessons, getMentorsLessons]);

  useEffect(() => {
    if(data.length !== 0) {
      const lessonsData = data.map((lesson) => {
        const { date, time } = commonHelpers.transformDateTime({ dateTime: lesson.lessonDate });
        return {
          lessonShortDate: date,
          lessonTime: time,
          ...lesson,
        }
      });
      setRawLessonsList(lessonsData);
      setFilteredLessonsList(lessonsData);
    }
  }, [data]);

  useEffect(() => {
    setVisibleLessonsList(filteredLessonsList.slice(indexOfFirst, indexOfLast));
  }, [currentPage, filteredLessonsList]);

  useEffect(() => {
    const lessons = rawLessonsList.filter(
      (lesson) => lesson.themeName.toUpperCase().includes(searchLessonsThemeValue.toUpperCase()));
    setFilteredLessonsList(lessons);
    setCurrentPage(1);
  }, [searchLessonsThemeValue]);

  const handleSearchTheme = (inputValue) => {
    setSearchLessonsThemeValue(inputValue);
  };

  const addLesson = useCallback(() => history.push(paths.LESSON_ADD), [history]);
  const downloadThemes = useCallback(() => history.push(paths.THEMES_DOWNLOAD), [history]);
  const handleDetails = useCallback((id) => history.push(`${paths.LESSON_DETAILS}/${id}`), [history]);

  const handleEdit = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.LESSON_EDIT}/${id}`);
  }, [history]);

  const changeActiveCategory = (categories, activeCategoryName) => categories.map((category) => {
    if (category.name === activeCategoryName) {
      return { ...category, sortedByAscending: !category.sortedByAscending };
    }
    return { ...category, sortedByAscending: false };
  });

  const handleSortByParam = (data, categoryParams) => {
    const sortedLessons = data;
    setSortingCategories(changeActiveCategory(sortingCategories, categoryParams.sortingParam));
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
  }, [lessonsPerPage, currentPage]);

  const prevPage = useCallback((pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
  }, [currentPage]);

  const getLessonsList = useCallback(() => {
    const lessonsList = visibleLessonsList.map((lesson) => (
      <tr id={lesson.id} key={lesson.id} onClick={() => lessonDetails(lesson.id)} className={styles['table-row']}>
        <td className={"text-left"}>{lesson.themeName}</td>
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

    if (!lessonsList.length && !lessonsList.length || 
        !lessonsList.length && searchLessonsThemeValue) {
      return <tr><td colSpan="5" className="text-center">Lesson is not found</td></tr>;
    }
    return lessonsList;
  }, [visibleLessonsList, searchLessonsThemeValue]);

  const changeCountVisibleItems = useCallback((newNumber) => {
    const finish = currentPage * newNumber;
    const start = finish - newNumber;
    setVisibleLessonsList(filteredLessonsList.slice(start, finish));
    setLessonsPerPage(newNumber);
  }, [currentPage, filteredLessonsList]);

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

  const listProps = {
    data: visibleLessonsList,
    handleDetails,
    handleEdit,
    errors: [{
      message: 'Lesson is not found',
      check: [(!visibleLessonsList.length && !!filterStartDate) &&
      (!visibleLessonsList.length && !!filterEndDate) ||
      !visibleLessonsList.length && !!searchLessonsThemeValue]
    }],
    access: currentUser.role !== 3,
    fieldsToShow: ['themeName', 'lessonShortDate', 'lessonTime', 'edit']
  };

  return (
    <div className="container pt-5">
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
      <div className="row mr-0">
        <div className="col-12 card shadow p-3 mb-5 bg-white ml-2 mr-2">
          <div className="row align-items-center justify-content-between mt-2 mb-3">
            <div className="col-3">
              <div className="btn-group">
                <button type="button"
                        className="btn btn-secondary"
                        disabled={!showBlocks}
                        onClick={() => setShowBlocks(false)}>
                  <Icon icon="List" color="#2E3440" size={25}/>
                </button>
                <button type="button"
                        className="btn btn-secondary"
                        disabled={showBlocks}
                        onClick={() => setShowBlocks(true)}>
                  <Icon icon="Card" color="#2E3440" size={25}/>
                </button>
              </div>
            </div>
            <div className="col-3">
              <Search onSearch={handleSearchTheme} className={classNames(styles.text)} placeholder="Theme's name" />
            </div>
            {!showBlocks &&
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
                  onChange={(event) => {
                    changeCountVisibleItems(event.target.value);
                  }}
              >
                <option>9</option>
                <option>27</option>
                <option>45</option>
                <option>72</option>
                <option>99</option>
              </select>
            </div>
            }
              {currentUser.role !== 3 && (
                <div className="col-4 text-right">
                  <Button onClick={downloadThemes} type="button" className={classNames('btn btn-warning mr-3', styles['left-add-btn'])}>
                    Add theme('s)
                  </Button>
                  <Button onClick={addLesson} type="button">
                    <span>Add a lesson</span>
                  </Button>
                </div>
              )}
          </div>
          <div className="row align-items-center justify-content-end mb-3">
            <div className="col-6 offset-4">
              {<DoubleDateFilter 
                rawItemsList={rawLessonsList} 
                setFilteredItemsList={setFilteredLessonsList} 
                setCurrentPage={setCurrentPage}
                component={'lessons'}
              />}
            </div>
          </div>
          <WithLoading isLoading={isLoading} className="d-block mx-auto mt-3">
            {
              showBlocks ?
                  <div className="container d-flex flex-wrap">
                    <List listType={'block'} props={listProps}/>
                  </div>
                  :
                  <Table sortingCategories={sortingCategories}
                         currentUser={currentUser}
                         onClick={handleSortByParam}
                         data={filteredLessonsList}
                         access={{unruledUser: [3], unassigned: ''}}
                  >
                    <List props={listProps} listType={'list'}/>
                  </Table>
            }
          </WithLoading>
        </div>
        <div className={classNames('row justify-content-between align-items-center mb-3', styles.paginate)}>{paginationComponent()}</div>
      </div>
    </div>
  );
};
