import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useActions } from '@/shared';
import {
  fetchSchedulesByGroupId, schedulesByGroupIdSelector,
  loadStudentGroupById, loadStudentGroupByIdSelector,
} from '@/models';
import { Schedule } from '../schedule-base/schedule.js';

export const ScheduleGroup = () => {
  const { id } = useParams();
  const [
    dispatchFetchScheduleById,
    dispatchFetchScheduleByGroup,
  ] = useActions([fetchSchedulesByGroupId, loadStudentGroupById]);

  const schedulesData = useSelector(schedulesByGroupIdSelector, shallowEqual);
  const groupData = useSelector(loadStudentGroupByIdSelector, shallowEqual);

  useEffect(() => {
    dispatchFetchScheduleById(id);
    dispatchFetchScheduleByGroup(id);
  }, [dispatchFetchScheduleByGroup, dispatchFetchScheduleById, id]);

  return (
    <Schedule
      schedulesData={schedulesData}
      groupsData={groupData}
    />
  );
};
