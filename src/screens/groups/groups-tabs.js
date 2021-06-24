import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { number } from 'prop-types';

import { paths, useActions } from '../../shared/index.js';
import { Tabs, Tab } from '../../components/index.js';
import { EditGroup, GroupDetails } from '../../features/index.js';
import {
  loadStudentGroupByIdSelector, loadStudentGroupById, activeStudentsSelector,
  loadActiveStudents, fetchActiveMentors, mentorsActiveSelector,
  coursesSelector, fetchCourses,
} from '../../models/index.js';

export const GroupsTabs = ({ index }) => {
  const { id } = useParams();
  const group = useSelector(loadStudentGroupByIdSelector, shallowEqual);
  const mentors = useSelector(mentorsActiveSelector, shallowEqual);
  const courses = useSelector(coursesSelector, shallowEqual);
  const students = useSelector(activeStudentsSelector, shallowEqual);

  const [
    dispatchLoadGroup,
    dispatchLoadStudents,
    dispatchLoadMentors,
    dispatchLoadCourses,
  ] = useActions([loadStudentGroupById, loadActiveStudents, fetchActiveMentors, fetchCourses]);

  useEffect(() => {
    dispatchLoadGroup(id);
    dispatchLoadStudents();
    dispatchLoadMentors();
    dispatchLoadCourses();
  }, [dispatchLoadGroup, dispatchLoadStudents, dispatchLoadMentors, dispatchLoadCourses, id]);

  const history = useHistory();

  useEffect(() => {
    if (group.error) {
      history.push(paths.NOT_FOUND);
    }
  }, [group, history]);

  return (
    <Tabs defaultIndex={index} linkBack="/groups" className="container w-50 pt-5">
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
