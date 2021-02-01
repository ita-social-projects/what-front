import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { useActions, paths } from '@/shared';
import {
  mentorsActiveSelector, studentsSelector, loadStudentGroupsSelector,
  addLessonSelector, fetchActiveMentors, globalLoadStudentGroups,
  loadStudents, addLesson,
} from '@/models/index.js';

import { Button, WithLoading } from '@/components';
import { addLessonValidation } from '@features/validation/validation-helpers.js';
import { addAlert } from '@/features';
import { Formik, Field, Form, FieldArray } from 'formik';

import classNames from 'classnames';
import styles from './add-lesson.scss';

export const AddLesson = () => {
  const history = useHistory();

  const today = new Date().toISOString().substring(0, 19);

  const [markError, setMarkError] = useState(false);
  const [mentorError, setMentorError] = useState(false);
  const [groupError, setGroupError] = useState(false);
  const [studentsGroup, setStudentsGroup] = useState(null);
  const [formData, setFormData] = useState([]);

  const {
    data: mentors,
    isLoading: mentorsIsLoading,
    isLoaded: mentorsIsLoaded,
    error: mentorsError,
  } = useSelector(mentorsActiveSelector, shallowEqual);

  const {
    data: groups,
    isLoading: groupsIsLoading,
    isLoaded: groupsIsLoaded,
    error: groupsError,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const {
    data: students,
    isLoading: studentsIsLoading,
    isLoaded: studentsIsLoaded,
    error: studentsError,
  } = useSelector(studentsSelector, shallowEqual);

  const {
    isLoaded: lessonIsAdded,
    isLoading: lessonsIsAdding,
    error: addLessonError,
  } = useSelector(addLessonSelector, shallowEqual);

  const [
    getMentors,
    getGroups,
    getStudents,
    createLesson,
    dispatchAddAlert,
  ] = useActions([fetchActiveMentors, globalLoadStudentGroups, loadStudents, addLesson, addAlert]);

  useEffect(() => {
    getGroups()
    getMentors()
    getStudents()
  }, [getGroups, getMentors, getStudents]);

  useEffect(() => {
    if (!addLessonError && lessonIsAdded) {
      history.push(paths.LESSONS);
      dispatchAddAlert('The lesson has been added successfully!', 'success');
    }
    if (addLessonError && !lessonIsAdded) {
      dispatchAddAlert(addLessonError);
    }
  }, [addLessonError, lessonIsAdded, dispatchAddAlert, history]);

  const capitalizeTheme = (str) => str.toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');

  const openStudentDetails = useCallback((id) => {
    history.push(`${paths.STUDENTS_DETAILS}/${id}`);
  }, [history]);

  const handleCancel = useCallback(() => {
    history.push(paths.LESSONS);
  }, [history]);

  const onSubmit = (values) => {
    const { lessonDate, themeName, mentorEmail } = values;
    const lessonVisits = formData.map((lessonVisit) => {
      const {
        presence, studentId, studentMark,
      } = lessonVisit;
      return {
          comment: '',
          presence,
          studentId,
          studentMark,
        }
    });

    const mentorData = mentors.find((mentor) => mentor.email === mentorEmail);

    const theme = capitalizeTheme(themeName);

    const lessonObject = {
      lessonDate,
      themeName: theme,
      lessonVisits,
      studentGroupId: studentsGroup.id,
      mentorId: mentorData.id,
    };

    if (!mentorsError && lessonObject) {
      createLesson(lessonObject);
    }
  };

  const getFormData = () => {
    const uniqueIds = [...new Set(studentsGroup.studentIds)];

    const studentD = uniqueIds?.map(
      (id) => students.find((student) => student.id === id),
    );

    const activeStudents = studentD.filter((student) => student !== undefined);

    const studentsData = activeStudents.map((student) => (
      {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
      }
    ));

    const resultLessonVisits = studentsData.map((student) => ({
      ...student,
      studentMark: 0,
      presence: false,
      comment: '',
    }));
    setFormData(resultLessonVisits);
  };

  useEffect(() => {
    if (studentsGroup) {
      getFormData();
      setGroupError(false);
    } 
  }, [studentsGroup])

  const handleMentorChange = (event) => {
    const mentorData = mentors.find((mentor) => mentor.email === event.target.value);

    if (mentorData) {
      setMentorError(false);
    } else {
      setMentorError('Invalid email address');
    }
  };

  const handleGroupChange = (event) => {
    const resultGroup = groups.find((group) => group.name.toUpperCase() === event.target.value.toUpperCase());
    
    if(resultGroup && event.type === 'blur' || resultGroup && event.type === 'input') {
      setStudentsGroup(resultGroup);
      setGroupError(false);
    }

    if (event.type === 'blur' && event.target.value.length === 0) {
      setStudentsGroup(null);
      setGroupError("This field is required");
    } else 
    if(event.type === 'blur' && !resultGroup && event.target.value.length !== 0) {
      setStudentsGroup(null);
      setGroupError('Invalid group name');
    }
  };

  const handlePresenceChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    formData[arrIndex].presence = !formData[arrIndex].presence;
    formData[arrIndex].studentMark = 0;
  };

  const handleMarkChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    const mark = Number(ev.target.value);
    if (mark > 0 && mark < 13) {
      formData[arrIndex].studentMark = mark;
      setMarkError(false);
    } else {
      setMarkError(true);
      ev.target.value = '';
    }
  };

  return (
    <div className="container">
      <div className={classNames(styles.page, 'mx-auto col-12')}>
        <h3>Add a Lesson</h3>
        <hr />
        <div className="d-flex flex-row">
          {groupsError && mentorsError && studentsError && (
            <div className="col-12 alert-danger">
              Server Problems
            </div>
          )}
          <WithLoading
            isLoading={mentorsIsLoading || studentsIsLoading || groupsIsLoading}
            className="d-block my-0 mx-auto"
          >
            <div className="col-6">
              <Formik
                initialValues={{
                  themeName: '',
                  groupName: '',
                  lessonDate: '',
                  mentorEmail: '',
                  formData,
                }}
                onSubmit={onSubmit}
                validationSchema={addLessonValidation}
              >
                {({ errors, touched }) => (
                  <Form id="form" className="d-flex flex-row">
                    <div className="col-12">
                      <div className="form-group row mt-3">
                        <label htmlFor="inputLessonTheme" className="col-sm-4 col-form-label">Lesson Theme:</label>
                        <div className="col-sm-8">
                          <Field
                            type="text"
                            className={classNames('form-control', { 'border-danger': errors.themeName })}
                            name="themeName"
                            id="inputLessonTheme"
                            placeholder="Lesson Theme"
                          />
                          {touched.themeName || errors.themeName && <div className={styles.error}>{errors?.themeName}</div>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputGroupName" className="col-sm-4 col-form-label">Group Name*:</label>
                        <div className="col-sm-8 input-group">
                          <Field
                            name="groupName"
                            id="inputGroupName"
                            type="text"
                            className={classNames('form-control group-input', { 'border-danger': errors.groupName || groupError})}
                            placeholder="Group Name"
                            onBlur={handleGroupChange}
                            onInput={handleGroupChange}
                            list="group-list"
                          />
                          <datalist id="group-list">
                            {groups.map(({ id, name }) => (
                              <option key={id}>{name}</option>
                            ))}
                          </datalist>
                        </div>
                        {touched.groupError || (errors.groupName || groupError) && <div className={classNames('col-8 offset-4', styles.error)}>{errors?.groupName || groupError}</div>}
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label" htmlFor="choose-date/time">Lesson Date/Time:</label>
                        <div className="col-md-8">
                          <Field
                            className={classNames('form-control group-input', { 'border-danger': errors.lessonDate })}
                            type="datetime-local"
                            name="lessonDate"
                            id="choose-date/time"
                            max={today}
                          />
                        </div>
                        {touched.lessonDate || errors.lessonDate && <div className={classNames('col-8 offset-4', styles.error)}>{errors?.lessonDate}</div>}
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label" htmlFor="mentorEmail">Mentor Email:</label>
                        <div className="col-md-8 input-group">
                          <Field
                            type="text"
                            className={classNames('form-control', { 'border-danger': errors.mentorEmail || mentorError})}
                            name="mentorEmail"
                            id="mentorEmail"
                            list="mentor-list"
                            placeholder="Mentor Email"
                            onInput={handleMentorChange}
                          />
                          <datalist id="mentor-list">
                            {mentors.map(({ id, firstName, lastName, email }) => (
                              <option key={id} value={email}>
                                {`${firstName} ${lastName}`}
                              </option>
                            ))}
                          </datalist>
                        </div>
                        {touched.mentorEmail || (errors.mentorEmail || mentorError) && <div className={classNames('col-8 offset-4', styles.error)}>{errors?.mentorEmail || mentorError}</div>}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <FieldArray name="formData">
                        {() => (
                          <div className={classNames(styles.list, 'col-lg-12 pt-2')}>
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
                                { formData && formData.length > 0 && studentsGroup && (
                                  formData.map((lessonVisit, index) => (
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
                                      <td>
                                        <Field
                                          name={`formData[${index}].studentMark`}
                                          className={classNames(
                                            'form-control',
                                            { 'border-danger': markError },
                                            styles.mode,
                                          )}
                                          type="number"
                                          max="12"
                                          min="0"
                                          placeholder=""
                                          onChange={handleMarkChange}
                                          data-id={index}
                                          disabled={!formData[index].presence}
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          name={`formData[${index}].presence`}
                                          className={styles.mode}
                                          type="checkbox"
                                          onClick={handlePresenceChange}
                                          data-id={index}
                                          checked={formData[index].presence}
                                        />
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </WithLoading>
        </div>
        <div className={classNames(styles.placement, 'col-12')}>
          <button form="form" type="button" className="btn btn-secondary btn-lg" onClick={handleCancel}>Cancel</button>
          <button form="form" type="submit" className="btn btn-info btn-lg" disabled={lessonsIsAdding}>Save</button>
        </div>
      </div>
    </div>
  );
};
