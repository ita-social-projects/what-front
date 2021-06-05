import React from 'react';
import { shape } from 'prop-types';
import { Badge, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { paths } from '@/shared';
import { WithLoading } from '@/components/index.js';
import {
  studentGroupByIdStateShape, studentsStateShape, mentorsStateShape, coursesStateShape,
} from '@/features/shared/index.js';
import styles from './group-details.scss';
import {commonHelpers} from "@/utils";

export const GroupDetails = ({
  studentGroupData, studentsData, mentorsData, coursesData,
}) => {
  const {
    data: group,
    isLoading: isGroupLoading,
    isLoaded: isGroupLoaded,
  } = studentGroupData;
  const {
    data: students,
    isLoading: areStudentsLoading,
    isLoaded: areStudentsLoaded,
  } = studentsData;
  const {
    data: mentors,
    isLoading: areMentorsLoading,
    isLoaded: areMentorsLoaded,
  } = mentorsData;
  const {
    data: courses,
    isLoading: areCoursesLoading,
    loaded: areCoursesLoaded,
  } = coursesData;

  const history = useHistory();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="w-100 card shadow p-4">
          <WithLoading
            isLoading={isGroupLoading || !isGroupLoaded || areMentorsLoading || !areMentorsLoaded
            || areCoursesLoading || !areCoursesLoaded}
            className={styles['loader-centered']}
          >
            <div className="d-flex flex-row text-left justify-content-between">
              <div className="d-flex flex-column">
                <h2>
                  Group: {group.name}
                </h2>
                <p className="m-0">
                  {commonHelpers.transformDateTime(4, group.startDate)}
                  &nbsp;-&nbsp;
                  {commonHelpers.transformDateTime(4, group.finishDate)}
                </p>
              </div>
              <div className="pt-3">
                <Link to={`${paths.SCHEDULE_BY_GROUP_ID}/${group.id}`}>
                  <span className={styles['schedule-link']}>View schedule</span>
                </Link>
              </div>
            </div>
            <hr className="p-0" />
            <div className="d-flex mb-2">
              <h4 className="pr-2 mb-2">
                Mentors:
              </h4>
              <div className="d-flex flex-wrap">
                { mentors
                  .filter((mentor) => group.mentorIds?.includes(mentor.id))
                  .map((mentor) => (
                    <div className="pr-2 lead" key={mentor.id}>
                      <Badge pill variant="info">
                        <Link
                          to={`${paths.MENTORS_DETAILS}/${mentor.id}`}
                          className="text-decoration-none text-light"
                        >
                          {mentor.firstName} {mentor.lastName}
                        </Link>
                      </Badge>
                    </div>
                  )) }
              </div>
            </div>
            <div className="d-flex align-items-center mb-2 lead">
              <h4 className="mb-2 pr-4">Course:</h4>
              <Badge pill variant="info">
                <Link
                  to={`${paths.COURSE_DETAILS}/${group.courseId}`}
                  className="text-decoration-none text-white"
                >
                  {courses.find((course) => course.id === group.courseId)?.name }
                </Link>
              </Badge>
            </div>
            <h4 className="h4 my-2">
              Students:
            </h4>
            <WithLoading isLoading={areStudentsLoading || !areStudentsLoaded}>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  { students
                    .filter((student) => group.studentIds?.includes(student.id))
                    .map((student, index) => (
                      <tr
                        key={student.id}
                        onClick={() => history.push(`${paths.STUDENTS_DETAILS}/${student.id}`)}
                        className={styles['table-row']}
                      >
                        <td>{index + 1}</td>
                        <td>{student.firstName} {student.lastName}</td>
                        <td>{student.email}</td>
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
  studentGroupData: shape(studentGroupByIdStateShape).isRequired,
  studentsData: shape(studentsStateShape).isRequired,
  mentorsData: shape(mentorsStateShape).isRequired,
  coursesData: shape(coursesStateShape).isRequired,
};
