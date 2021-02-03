import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchLessonsByStudentId, lessonsSelector } from '@/models/index.js';
import { Button, Search, WithLoading, Pagination } from '@/components/index.js';
import Icon from '@/icon.js';
import classNames from 'classnames';
import styles from './student-lessons.scss';

export const StudentLessons = () => {
  /*const history = useHistory();
  const [searchLessonsThemeValue, setSearchLessonsThemeValue] = useState('');
  const [filteredLessonsList, setFilteredLessonsList] = useState([]);
  const [visibleLessonsList, setVisibleLessonsList] = useState([]);
  const [searchLessonsDateValue, setSearchLessonsDateValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [descendingSorts, setDescendingSorts] = useState({ id: true, themeName: false, lessonDate: false, lessonTime: false });
  const [prevSort, setPrevSort] = useState('id');
  const { data, isLoading } = useSelector(lessonsSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const getLessons = useActions(fetchLessonsByStudentId(currentUser.id));

  console.log(currentUser);
*/
  return (
    <div>Hello</div>
)
}