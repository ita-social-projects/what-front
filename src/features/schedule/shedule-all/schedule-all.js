import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { useActions } from '@/shared';
import {
  schedulesSelector, fetchSchedules,
  globalLoadStudentGroups, loadStudentGroupsSelector,
} from '@/models';
import { Schedule } from '../schedule-base/index.js';

export const AllSchedules = () => {
  const schedulesData = useSelector(schedulesSelector, shallowEqual);
  const groupsData = useSelector(loadStudentGroupsSelector, shallowEqual);

  const [
    dispatchFetchSchedules,
    dispatchFetchGroups,
  ] = useActions([fetchSchedules, globalLoadStudentGroups]);

  useEffect(() => {
    dispatchFetchSchedules();
    dispatchFetchGroups();
  }, [dispatchFetchSchedules, dispatchFetchGroups]);

  return (
    <Schedule
      schedulesData={schedulesData}
      groupsData={groupsData}
    />
  );
};
