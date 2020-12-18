import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { number } from 'prop-types';

import { useActions } from '../../shared/index.js';
import { Tabs, Tab } from '../../components/index.js';
import { EditGroup, GroupDetails } from '../../features/index.js';
import {
  loadStudentGroupsByIdSelector, loadStudentGroupsById, activeStudentsSelector,
  loadActiveStudents, fetchMentors, mentorsSelector,
  coursesSelector, fetchCourses,
} from '../../models/index.js';

export const GroupsTabs = ({ index }) => {
  const { id } = useParams();
  const group = useSelector(loadStudentGroupsByIdSelector, shallowEqual);
  const mentors = useSelector(mentorsSelector, shallowEqual);
  const courses = useSelector(coursesSelector, shallowEqual);
  const students = useSelector(activeStudentsSelector, shallowEqual);

  const [
    dispatchLoadGroup,
    dispatchLoadStudents,
    dispatchLoadMentors,
    dispatchLoadCourses,
  ] = useActions([loadStudentGroupsById, loadActiveStudents, fetchMentors, fetchCourses]);

  useEffect(() => {
    dispatchLoadGroup(id);
    dispatchLoadStudents();
    dispatchLoadMentors();
    dispatchLoadCourses();
  }, [dispatchLoadGroup, dispatchLoadStudents, dispatchLoadMentors, dispatchLoadCourses, id]);

  const history = useHistory();

  useEffect(() => {
    if (group.error) {
      history.push('/404');
    }
  }, [group, history]);

  return (
    <Tabs defaultIndex={index} linkBack="/groups" className="container w-50">
      <Tab title="Group details">
        <GroupDetails
          id={Number(id)}
          studentGroupData={group}
          mentorsData={mentors}
          coursesData={courses}
          studentsData={students}
        />
      </Tab>
      <Tab title="Edit group">
        <EditGroup
          id={Number(id)}
          studentGroupData={group}
          mentorsData={mentors}
          coursesData={courses}
          studentsData={students}
        />
      </Tab>
    </Tabs>
  );
};

GroupsTabs.propTypes = {
  index: number.isRequired,
};
