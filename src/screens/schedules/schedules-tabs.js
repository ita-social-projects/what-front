import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { number } from 'prop-types';

import { paths, useActions } from '@/shared';
import { Tabs, Tab } from '@/components';
import { EditSchedule } from '@/features';
import {
  currentUserSelector,
  schedulesByGroupIdSelector,
  loadStudentGroupsSelector,
  themesSelector,
  mentorsSelector,
  fetchSchedulesByGroupId,
  globalLoadStudentGroups,
  fetchThemes,
  fetchMentors,
} from '@/models';

export const SchedulesTabs = ({ index }) => {
  const { id } = useParams();
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const schedule = useSelector(schedulesByGroupIdSelector, shallowEqual);
  const groups = useSelector(loadStudentGroupsSelector, shallowEqual);
  const mentors = useSelector(mentorsSelector, shallowEqual);
  const themes = useSelector(themesSelector, shallowEqual);

  const [ dispatchLoadScheduleById, dispatchLoadStudentGroups, dispatchLoadThemes, dispatchLoadMentors
] = useActions([ fetchSchedulesByGroupId, globalLoadStudentGroups, fetchThemes, fetchMentors]);

  useEffect(() => {
    dispatchLoadScheduleById(id);
    dispatchLoadStudentGroups();
    dispatchLoadThemes();
    dispatchLoadMentors();
  }, [ dispatchLoadScheduleById, dispatchLoadStudentGroups, dispatchLoadThemes, dispatchLoadMentors, id]);

  const history = useHistory();

  useEffect(() => {
    if (schedule.error || groups.error) {
      history.push(paths.NOT_FOUND);
    }
  }, [schedule, history]);

  const studentGroupData = groups.data.filter(group => group.id === schedule.data.studentGroupId)[0]
  const group = {
      data: studentGroupData,
      isLoading: false,
      isLoaded: true,
      error: ''
    };

  if (currentUser.role === 8 || currentUser.role === 4) {
  return (
    <Tabs linkBack={paths.SCHEDULE} className="container w-60 pt-6">
      <Tab title = "Edit Schedule"  isActive/>
        <EditSchedule 
          id = {Number(id)}
          schedulesData = {schedule}
          groupData = {group}
          themesData = {themes}
          mentorsData = {mentors}
        />
    </Tabs>
  );
  }
};

SchedulesTabs.propTypes = {
    index: number.isRequired,
  };