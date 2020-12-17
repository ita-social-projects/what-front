import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import { useActions, paths } from '../../shared/index.js';
import { Tabs, Tab } from '../../components/index.js';
import { EditGroup, GroupDetails } from '../../features/index.js';
import {
  loadStudentGroupsSelector, loadStudentGroupsById, studentsSelector,
  loadStudents, fetchMentors, mentorsSelector,
  coursesSelector, fetchCourses,
} from '../../models/index.js';

export const GroupsTabs = () => {
  const { id } = useParams();
  const groups = useSelector(loadStudentGroupsSelector, shallowEqual);
  const mentors = useSelector(mentorsSelector, shallowEqual);
  const courses = useSelector(coursesSelector, shallowEqual);
  const students = useSelector(studentsSelector, shallowEqual);

  const [
    dispatchLoadGroup,
    dispatchLoadStudents,
    dispatchLoadMentors,
    dispatchLoadCourses,
  ] = useActions([loadStudentGroupsById, loadStudents, fetchMentors, fetchCourses]);

  useEffect(() => {
    dispatchLoadGroup(id);
    dispatchLoadStudents();
    dispatchLoadMentors();
    dispatchLoadCourses();
  }, [dispatchLoadGroup, dispatchLoadStudents, dispatchLoadMentors, dispatchLoadCourses, id]);

  const history = useHistory();

  if (groups.error) {
    history.push(paths.NOT_FOUND);
  }

  return (
    <Tabs linkBack={paths.GROUPS} className="container w-50">
      <Tab title="Group details" tabIndex={0}>
        <GroupDetails
          id={Number(id)}
          studentGroupData={groups}
          mentorsData={mentors}
          coursesData={courses}
          studentsData={students}
        />
      </Tab>
      <Tab title="Edit group" tabIndex={1}>
        <EditGroup id={Number(id)} />
      </Tab>
    </Tabs>
  );
};
