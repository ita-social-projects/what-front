import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';

import { paths, useActions } from '@/shared';
import {
  currentUserSelector,
  fetchLessons,
  lessonsSelector,
  mentorLessonsSelector,
  fetchMentorLessons,
} from '@/models/index.js';
import {
  Button,
  Search,
  WithLoading,
  Pagination,
  DoubleDateFilter,
} from '@/components/index.js';
import Icon from '@/icon.js';
import { commonHelpers } from '@/utils';
import { Table } from '@components/table';
import { List } from '@components/list';

import styles from './list-of-lessons.scss';


export const ListOfLessons = () => {
  const history = useHistory();
  const getAllLessons = useActions(fetchLessons);
  const getMentorsLessons = useActions(fetchMentorLessons);

  const allLessons = useSelector(lessonsSelector, shallowEqual);
  const mentorsLessons = useSelector(mentorLessonsSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const { data, isLoading } =
    currentUser.role === 2 ? mentorsLessons : allLessons;

  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [rawLessonsList, setRawLessonsList] = useState([]);
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [visibleLessonsList, setVisibleLessonsList] = useState([]);

  const INITIAL_CATEGORIES = [
    {
      id: 0,
      name: 'themeName',
      sortedByAscending: false,
      tableHead: 'Theme Name',
    },
    {
      id: 1,
      name: 'lessonDate',
      sortedByAscending: false,
      tableHead: 'Lesson Date',
    },
    {
      id: 2,
      name: 'lessonTime',
      sortedByAscending: false,
      tableHead: 'Lesson Time',
    },
  ];
  const [showBlocks, setShowBlocks] = useState(false);

  const [sortingCategories, setSortingCategories] = useState(
    INITIAL_CATEGORIES
  );

  useEffect(() => {
    if (currentUser.role === 2) {
      getMentorsLessons(currentUser.id);
    } else {
      getAllLessons();
    }
  }, [currentUser, getAllLessons, getMentorsLessons]);

  useEffect(() => {
    if (data.length !== 0) {
      const lessonsData = data.map((lesson) => {
        const { date, time } = commonHelpers.transformDateTime({
          dateTime: lesson.lessonDate,
        });
        return {
          lessonShortDate: date,
          lessonTime: time,
          ...lesson,
        };
      });
      setRawLessonsList(lessonsData);
      setFilteredLessonsList(lessonsData);
    }
  }, [data]);

  useEffect(() => {
    const lessons = rawLessonsList.filter((lesson) =>
      lesson.themeName
        .toUpperCase()
        .includes(searchLessonsThemeValue.toUpperCase())
    );
    setFilteredLessonsList(lessons);
  }, [searchLessonsThemeValue]);

  const handleSearchTheme = (inputValue) => {
    setSearchLessonsThemeValue(inputValue);
  };

  const addLesson = useCallback(() => history.push(paths.LESSON_ADD), [
    history,
  ]);
  const downloadThemes = useCallback(
    () => history.push(paths.THEMES_DOWNLOAD),
    [history]
  );
  const handleDetails = useCallback(
    (id) => history.push(`${paths.LESSON_DETAILS}/${id}`),
    [history]
  );

  const handleEdit = useCallback(
    (event, id) => {
      event.stopPropagation();
      history.push(`${paths.LESSON_EDIT}/${id}`);
    },
    [history]
  );

  const changeActiveCategory = (categories, activeCategoryName) =>
    categories.map((category) => {
      if (category.name === activeCategoryName) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    });

  const handleSortByParam = (data, categoryParams) => {
    const sortedLessons = data;
    setSortingCategories(
      changeActiveCategory(sortingCategories, categoryParams.sortingParam)
    );
    setFilteredLessonsList(sortedLessons);
  };

  const listProps = {
    data: visibleLessonsList,
    handleDetails,
    handleEdit,
    errors: [
      {
        message: 'Lesson is not found',
        check: [
          (!visibleLessonsList.length && !visibleLessonsList.length) ||
            (!visibleLessonsList.length && !!searchLessonsThemeValue),
        ],
      },
    ],
    access: currentUser.role !== 8,
    fieldsToShow: ['themeName', 'lessonShortDate', 'lessonTime', 'edit'],
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Lessons</h2>
        {!isLoading ? (
          <div className="col-2 text-right">
            {visibleLessonsList.length} of {filteredLessonsList.length} lessons
          </div>
        ) : null}
      </div>
      <div className="row mr-0">
        <div className="col-12 card shadow p-3 mb-5 bg-white ml-2 mr-2">
          <div className="row align-items-center justify-content-between mt-2 mb-3">
            <div className="col-3">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={!showBlocks}
                  onClick={() => setShowBlocks(false)}
                >
                  <Icon icon="List" color="#2E3440" size={25} />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={showBlocks}
                  onClick={() => setShowBlocks(true)}
                >
                  <Icon icon="Card" color="#2E3440" size={25} />
                </button>
              </div>
            </div>
            <div className="col-3">
              <Search
                onSearch={handleSearchTheme}
                className={classNames(styles.text)}
                placeholder="Theme's name"
              />
            </div>

            {currentUser.role !== 8 && (
              <div className="col-4 text-right">
                <Button
                  onClick={downloadThemes}
                  type="button"
                  className={classNames(
                    'btn btn-warning mr-3',
                    styles['left-add-btn']
                  )}
                >
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
              {
                <DoubleDateFilter
                  rawItemsList={rawLessonsList}
                  setFilteredItemsList={setFilteredLessonsList}
                  component={'lessons'}
                />
              }
            </div>
          </div>
          <WithLoading isLoading={isLoading} className="d-block mx-auto mt-3">
            {showBlocks ? (
              <div className="container d-flex flex-wrap">
                <List listType={'block'} props={listProps} />
              </div>
            ) : (
              <Table
                sortingCategories={sortingCategories}
                currentUser={currentUser}
                onClick={handleSortByParam}
                data={filteredLessonsList}
                access={{ unruledUser: [8], unassigned: '' }}
              >
                <List props={listProps} listType={'list'} />
              </Table>
            )}
          </WithLoading>
        </div>
        <div
          className={classNames(
            'row justify-content-between align-items-center mb-3',
            styles.paginate
          )}
        >
          <Pagination
            items={filteredLessonsList}
            setVisibleItems={setVisibleLessonsList}
          />
        </div>
      </div>
    </div>
  );
};