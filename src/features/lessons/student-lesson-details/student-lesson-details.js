import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { shallowEqual, useSelector } from 'react-redux';
import {
  fetchMentors,
  loadStudentGroupById,
  loadStudentGroupByIdSelector,
  fetchLessonById,
  lessonByIdSelector,
  studentLessonsSelector,
  mentorIdSelector,
  fetchMentorById,
  fetchLessonsByStudentId,
  currentUserSelector,
} from '@/models';
import { commonHelpers } from '@/utils';
import { Badge } from 'react-bootstrap';
import { WithLoading } from '@/components';
import classNames from 'classnames';
import Icon from '@/icon';
import styles from './student-lesson-details.scss';

export const StudentLessonDetails = () => {
  const history = useHistory();
  const { id } = useParams();

  const [studentsGroup, setStudentsGroup] = useState({});
  const [lessonData, setLessonData] = useState('');

  const {
    currentUser,
  } = useSelector(currentUserSelector, shallowEqual);

  const {
    data: lessonById,
    isLoading: lessonByIdIsLoading,
    isLoaded: lessonByIdIsLoaded,
  } = useSelector(lessonByIdSelector, shallowEqual);

  const {
    data: lessons,
    isLoading: lessonsIsLoading,
    isLoaded: lessonsIsLoaded,
  } = useSelector(studentLessonsSelector, shallowEqual);

  const {
    data: group,
    isLoading: groupIsLoading,
    isLoaded: groupIsLoaded,
  } = useSelector(loadStudentGroupByIdSelector, shallowEqual);

  const {
    data: mentor,
    isLoading: mentorIsLoading,
    isLoaded: mentorIsLoaded,
  } = useSelector(mentorIdSelector, shallowEqual);

  const [
    fetchStudentLessons,
    loadLessonById,
    loadGroupById] = useActions([fetchLessonsByStudentId, fetchLessonById, loadStudentGroupById]);
    // loadMentorById, fetchMentorById,

  useEffect(() => {
    if (!lessonByIdIsLoaded) loadLessonById(id); // to get groupId & mentorId
    if (!lessonsIsLoaded) fetchStudentLessons(currentUser.id);
  }, [lessonByIdIsLoaded, lessonsIsLoaded]);

  useEffect(() => {
      if(!groupIsLoaded && lessonData) {
          loadGroupById(+lessonData.studentGroupId);
      }
  }, [groupIsLoaded, lessonData]);

  console.log('groupById', group);

  useEffect(() => {
    if (lessonsIsLoaded) {
      if (!lessons) {
        history.push(paths.NOT_FOUND);
      } else {
        const lesson = lessons.find((lesson) => lesson.id === Number(id));
        const { date, time } = commonHelpers.transformDateTime({ dateTime: lesson.lessonDate });
        const lessonData = {
          lessonShortDate: date,
          lessonTime: time,
          ...lesson,
        };
        setLessonData(lessonData);
      }
    }
  }, [lessons, lessonsIsLoaded]);

  const handleCancel = useCallback(() => {
    history.push(`${paths.LESSON_BY_STUDENT_ID}/${currentUser.id}`);
  }, [history]);

  return (
    <div className="container">
      <div className={classNames(styles.page, 'col-12')}>
        <h3>Lesson details</h3>
        <hr />
        <div className="col-12 d-flex flex-lg-row flex-md-column flex-sm-column">
          <WithLoading
            isLoading={lessonsIsLoading || lessonByIdIsLoading
                        || !lessons || !lessonById}
            className={styles['loader-centered']}
          >
            <div className="col-lg-5 col-md-8 col-sm-12 mb-2">
              <div className="mt-3 mb-4 row">
                <div className="col-sm-5 font-weight-bolder"><span>Lesson Theme: </span></div>
                <div className="col-sm-7"><span>{lessonData.themeName}</span></div>
              </div>
              <div className="row mb-4">
                <div className="col-sm-5 font-weight-bolder">
                  <span>Lesson Date: </span>
                </div>
                <div className="col-sm-7">
                  {lessonData.lessonShortDate}
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-sm-5 font-weight-bolder">
                  <span>Lesson Time: </span>
                </div>
                <div className="col-sm-7">
                  {lessonData.lessonTime}
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center col-sm-3">Presence</th>
                    <th scope="col" className="text-center col-sm-3">Mark</th>
                    <th scope="col" className="text-center col-sm-6">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="col" className="text-center font-weight-bolder">
                        <span>{lessonData.presence
                            ? <Icon icon="Present" /> : <Icon icon="Absent" />}
                          </span>
                      </td>
                    <td scope="col" className="text-center font-weight-bolder">{lessonData.mark}</td>
                    <td scope="col" className="text-center">fsdffffdfsfsfsdffffffff ffffff ff ffff fffffffffff ffff fffffff ffff fffffff ffffffffff fffff fff fffffffff dgdfgdfgdfgdfgdfg {lessonData.comment}</td>
                  </tr>
                </tbody>
              </table>
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
