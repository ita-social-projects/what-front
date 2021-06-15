import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { shallowEqual, useSelector } from 'react-redux';
import {
  studentsSelector,
  fetchMentors,
  fetchLessons,
  globalLoadStudentGroups,
  lessonsSelector,
  loadStudents,
  loadStudentGroupsSelector,
  mentorsSelector,
} from '@/models';
import {commonHelpers} from "@/utils";
import { Badge } from 'react-bootstrap';
import { WithLoading } from '@/components';
import Icon from '@/icon';

import classNames from 'classnames';
import styles from './lesson-details.scss';


export const LessonDetails = () => {
  const history = useHistory();

  const { id } = useParams();

  const [studentsGroup, setStudentsGroup] = useState({});
  const [lesson, setLesson] = useState({});
  const [formData, setFormData] = useState([]);
  const [mentor, setMentor] = useState({});

  const [
    loadLessons,
    loadMentors,
    loadGroups,
    fetchStudents,
  ] = useActions([fetchLessons, fetchMentors, globalLoadStudentGroups, loadStudents]);

  const {
    data: lessons,
    isLoading: lessonsIsLoading,
    isLoaded: lessonsIsLoaded,
  } = useSelector(lessonsSelector, shallowEqual);

  const {
    data: mentors,
    isLoading: mentorsIsLoading,
    isLoaded: mentorsIsLoaded,
  } = useSelector(mentorsSelector, shallowEqual);

  const {
    data: groups,
    isLoading: groupsIsLoading,
    isLoaded: groupsIsLoaded,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const {
    data: students,
    isLoading: studentsIsLoading,
    isLoaded: studentsIsLoaded,
  } = useSelector(studentsSelector, shallowEqual);

  useEffect(() => {
    if(!lessonsIsLoaded) loadLessons();
    if(!studentsIsLoaded) fetchStudents();
    if(!groupsIsLoaded) loadGroups();
    if(!mentorsIsLoaded) loadMentors();
  }, [loadLessons, fetchStudents, loadGroups, loadMentors]);

  useEffect(() => {
    if (lessonsIsLoaded) {
      const lesson = lessons.find((lesson) => lesson.id === Number(id));
      if (!lesson) {
        history.push(paths.NOT_FOUND);
      } else {
        const {date, time} = commonHelpers.transformDateTime({ dateTime: lesson.lessonDate });
        const lessonsData = {
            lessonShortDate: date,
            lessonTime: time,
            ...lesson,
          };
        setLesson(lessonsData);
      }
    }
  }, [lessons]);

  const getFormData = () => {
    const uniqueIds = [...new Set(studentsGroup.studentIds)];
    const studentD = uniqueIds.map((id) => students.find((student) => student.id === id));

    const studentsData = studentD.map((student) => (
      {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
      }
    ));

    const resultLessonVisits = studentsData.sort((a, b) => {
      if (a.studentName < b.studentName) {
        return -1;
      }
      if (a.studentName > b.studentName) {
        return 1;
      }
    })
      .map((student, index) => ({
        ...lesson.lessonVisits[index],
        ...student,
      }));

    setFormData(resultLessonVisits);
  };

  useEffect(() => {
    if (lesson && groups.length) {
      const group = groups?.find((group) => group.id === lesson.studentGroupId);

      if (group && studentsIsLoaded && !studentsIsLoading) {
        setStudentsGroup(group);
        if (studentsGroup && students) {
          getFormData();
        }
      }
    }
  }, [groups, students, studentsIsLoaded, studentsIsLoading, lesson, studentsGroup]);

  useEffect(() => {
    if (lesson && mentorsIsLoaded && !mentorsIsLoading) {
      const mentor = mentors?.find((mentor) => mentor.id === lesson.mentorId);
      if (mentor) {
        setMentor(mentor);
      }
    }
  }, [lesson, mentorsIsLoaded, !mentorsIsLoading]);

  useEffect(() => {
    if (!lessons && lessonsIsLoaded) {
      history.push(paths.NOT_FOUND);
    }
  }, [lessons, history, lessonsIsLoaded]);

  const openStudentDetails = useCallback((studentId) => {
    history.push(`${paths.STUDENTS_DETAILS}/${studentId}`);
  }, [history]);

  const handleCancel = useCallback(() => {
    history.push(paths.LESSONS);
  }, [history]);

  return (
    <div className="container">
      <div className={classNames(styles.page, 'mx-auto', 'col-12')}>
        <div className="d-flex flex-row">
          <WithLoading
            isLoading={lessonsIsLoading || mentorsIsLoading || groupsIsLoading
                || studentsIsLoading || !lesson || !formData.length}
            className={styles['loader-centered']}
          >
            <div className="col-6">
              <h3>Lesson details</h3>
              <hr />
              <div className="d-flex flex-row w-100">
                <div className="col-12">
                  <div className="mt-3 mb-4 row">
                    <div className="col-sm-6 font-weight-bolder"><span>Lesson Theme: </span></div>
                    <div className="col-sm-6"><span>{lesson?.themeName}</span></div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-sm-6 font-weight-bolder d-flex align-items-center">
                      <span>Mentor name: </span>
                    </div>
                    <div className="col-sm-6 lead">
                      <Badge pill className={styles.bg_colour}>
                        <Link
                          to={`${paths.MENTORS_DETAILS}/${mentor.id}`}
                          className="text-decoration-none text-white"
                        >{`${mentor.firstName} ${mentor.lastName}`}
                        </Link>
                      </Badge>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-sm-6 font-weight-bolder d-flex align-items-center">
                      <span>Group name: </span>
                    </div>
                    <div className="col-sm-6 lead">
                      <Badge pill className={styles.bg_colour}>
                        <Link
                          to={`${paths.GROUPS_DETAILS}/${studentsGroup?.id}`}
                          className="text-decoration-none text-white"
                        >{studentsGroup?.name}
                        </Link>
                      </Badge>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-sm-6 font-weight-bolder">
                      <span>Lesson Date: </span>
                    </div>
                    <div className="col-sm-6">
                      {lesson?.lessonShortDate}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 font-weight-bolder">
                      <span>Lesson Time: </span>
                    </div>
                    <div className="col-sm-6">
                      {lesson?.lessonTime}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" aria-label="first_col" />
                        <th scope="col">Full Student`s Name</th>
                        <th scope="col" className="text-center">Mark</th>
                        <th scope="col" className="text-center">Presence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.map((lessonVisit, index) => (
                        <tr key={lessonVisit.studentId}>
                          <th scope="row">{ index + 1 }</th>
                          <td>
                            <p
                            className={classNames(styles.link)}
                            onClick={() => openStudentDetails(lessonVisit.studentId)}
                          >
                            { lessonVisit.studentName }
                          </p>
                          </td>
                          <td className="text-center align-content-center">
                            <div>{lessonVisit.presence && lessonVisit.studentMark}</div>
                          </td>
                          <td className="text-center font-weight-bolder">
                            <span>{lessonVisit.presence ? <Icon icon="Present" /> : <Icon icon="Absent" />}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </WithLoading>
        </div>
        <div className="col-12 mt-3">
          <button
            form="form"
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={handleCancel}
          >Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
