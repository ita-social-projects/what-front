import React, { useEffect } from 'react';
import { number } from 'prop-types';
import { Badge, Table } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useActions } from '../../shared/index.js';
import { WithLoading } from '../../components/index.js';
import {
  studentGroupsSelector, loadStudentGroupsById, studentsSelector,
  loadStudents, fetchMentors, mentorsSelector,
  coursesSelector, fetchCourses,
} from '../../models/index.js';
import styles from './group-details.scss';

export const GroupDetails = ({ id }) => {
  const {
    studentGroupById: group,
    isLoading: isGroupLoading,
    isLoaded: isGroupLoaded,
    error: groupLoadingError,
  } = useSelector(studentGroupsSelector, shallowEqual);
  const { data: students, isLoading: areStudentsLoading } = useSelector(studentsSelector);
  const { mentors, isLoading: areMentorsLoading } = useSelector(mentorsSelector, shallowEqual);
  const {
    data: courses,
    isLoading: areCoursesLoading,
  } = useSelector(coursesSelector, shallowEqual);

  const [
    dispatchLoadGroup,
    dispatchLoadStudents,
    dispatchLoadMentors,
    dispatchLoadCourses,
  ] = useActions([loadStudentGroupsById, loadStudents, fetchMentors, fetchCourses]);
  const history = useHistory();

  useEffect(() => {
    dispatchLoadGroup(id);
    dispatchLoadStudents();
    dispatchLoadMentors();
    dispatchLoadCourses();
  }, [dispatchLoadGroup, dispatchLoadStudents, dispatchLoadMentors, dispatchLoadCourses, id]);

  if (groupLoadingError) {
    history.push('/404');
  }

  return (
    <div className="w-100">
      <div className="row justify-content-center">
        <div className="w-100 card shadow p-4">
          <WithLoading isLoading={isGroupLoading || !isGroupLoaded} className={styles['loader-centered']}>
            <div className="d-flex flex-row text-left justify-content-between">
              <div className="d-flex flex-column">
                <h2>
                  Group: {group.name}
                </h2>
                <p className="m-0">
                  {new Date(group.startDate).toLocaleDateString()}
                  &nbsp;-&nbsp;
                  {new Date(group.finishDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <hr className="p-0" />
            <div className="d-flex align-items-center mb-2">
              <h4 className="pr-2 mb-2">
                Mentors:
              </h4>
              <WithLoading isLoading={areMentorsLoading}>
                <div className="d-flex">
                  { mentors
                    .filter((mentor) => group.mentorIds?.includes(mentor.id))
                    .map((mentor) => (
                      <div className="pr-2" key={mentor.id}>
                        <Badge pill variant="warning">
                          {mentor.firstName} {mentor.lastName}
                        </Badge>
                      </div>
                    )) }
                </div>
              </WithLoading>
            </div>
            <div className="d-flex align-items-center mb-2">
              <h4 className="mb-2 pr-2">Course:</h4>
              <WithLoading isLoading={areCoursesLoading}>
                <Badge pill variant="primary">
                  {courses.find((course) => course.id === group.courseId)?.name}
                </Badge>
              </WithLoading>
            </div>
            <h4 className="h4 my-2">
              Students:
            </h4>
            <WithLoading isLoading={areStudentsLoading}>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  { students
                    .filter((student) => group.studentIds?.includes(student.id))
                    .map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                      </tr>
                    )) }
                </tbody>
              </Table>
            </WithLoading>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};

GroupDetails.propTypes = {
  id: number.isRequired,
};
