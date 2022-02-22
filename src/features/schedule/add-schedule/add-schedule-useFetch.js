import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from '@/shared/index.js';
import {
  loadStudentGroupsSelector,
  mentorsActiveSelector,
  themesSelector,
  fetchActiveCourses,
  fetchActiveMentors,
  fetchThemes,
  createSchedule,
} from '@/models/index.js';

export const useFetching = () => {
  const groups = useSelector(loadStudentGroupsSelector, shallowEqual);

  const mentors = useSelector(mentorsActiveSelector, shallowEqual);

  const themes = useSelector(themesSelector, shallowEqual);

  const [
    dispatchFetchSchedules,
    dispatchFetchActiveMentors,
    dispatchFetchThemes,
    addSchedule,
  ] = useActions([fetchActiveCourses, fetchActiveMentors, fetchThemes, createSchedule]);

  useEffect(() => {
    dispatchFetchSchedules();
    dispatchFetchActiveMentors();
    dispatchFetchThemes();
  }, [
    dispatchFetchSchedules,
    dispatchFetchActiveMentors,
    dispatchFetchThemes,
  ]);

  return { groups, mentors, themes, addSchedule };
};