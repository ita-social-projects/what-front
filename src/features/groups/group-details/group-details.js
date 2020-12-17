import React from 'react';
import { shape } from 'prop-types';
import { Badge, Table } from 'react-bootstrap';

import { WithLoading } from '../../components/index.js';
import {
  studentGroupsByIdStateShape, studentsStateShape, mentorsStateShape, coursesStateShape,
} from '../../shared/index.js';
import styles from './group-details.scss';

export const GroupDetails = ({
  studentGroupData, studentsData, mentorsData, coursesData,
}) => {
  const {
    data: group,
    isLoading: isGroupLoading,
    isLoaded: isGroupLoaded,
  } = studentGroupData;
  const { data: students, isLoading: areStudentsLoading } = studentsData;
  const { data: mentors, isLoading: areMentorsLoading } = mentorsData;
  const { data: courses, isLoading: areCoursesLoading } = coursesData;

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
  studentGroupData: shape(studentGroupsByIdStateShape).isRequired,
  studentsData: shape(studentsStateShape).isRequired,
  mentorsData: shape(mentorsStateShape).isRequired,
  coursesData: shape(coursesStateShape).isRequired,
};
