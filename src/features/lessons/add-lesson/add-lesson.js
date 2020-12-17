import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Formik, Field, Form, FieldArray,
} from 'formik';
import classNames from 'classnames';
import { useSelector, shallowEqual } from 'react-redux';
import * as Yup from 'yup';

import { Button } from '@/components';
import { useActions, paths } from '@/shared';

import {
  mentorsSelector,
  activeStudentsSelector,
  loadStudentGroupsSelector,
  addLessonSelector,
  fetchMentors,
  globalLoadStudentGroups,
  loadActiveStudents,
  addLesson,
} from '@/models/index.js';

import styles from './add-lesson.scss';

export const AddLesson = () => {
  const history = useHistory();

  const [markError, setMarkError] = useState(false);
  const [mentorError, setMentorError] = useState(false);
  const [groupError, setGroupError] = useState(false);
  const [studentsGroup, setStudentsGroup] = useState(null);
  const [mentorInput, setMentorInput] = useState('');
  const [btnSave, setBtnSave] = useState(false);
  const [classRegister, setClassRegister] = useState(false);
  const [formData, setFormData] = useState([]);

  const {
    data: mentors,
    isLoading: mentorsLoading,
    isLoaded: mentorsIsLoaded,
    error: mentorsError,
  } = useSelector(mentorsSelector, shallowEqual);

  const {
    studentGroups: data,
    isLoading: groupsLoading,
    isLoaded: groupsIsLoaded,
    error: groupsError,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const {
    data: students,
    isLoaded: studentsIsLoaded,
    error: studentsError,
  } = useSelector(activeStudentsSelector, shallowEqual);

  const {
    isLoaded: addIsLoaded,
    error: addError,
  } = useSelector(addLessonSelector, shallowEqual);

  const [
    getMentors,
    getGroups,
    getStudents,
    createLesson,
  ] = useActions([fetchMentors, globalLoadStudentGroups, loadActiveStudents, addLesson]);

  useEffect(() => {
    if (!mentorsIsLoaded && !mentorError) {
      getMentors();
    }
  }, [mentorsError, mentorsIsLoaded, getMentors]);

  useEffect(() => {
    if (!groupsIsLoaded && !groupsError) {
      getGroups();
    }
  }, [groupsError, groupsIsLoaded, getGroups]);

  useEffect(() => {
    if (!studentsIsLoaded && !studentsError) {
      getStudents();
    }
  }, [studentsError, studentsIsLoaded, getStudents]);

  useEffect(() => {
    if (!addError && addIsLoaded) {
      history.push(paths.LESSONS);
    }
  }, [addError, addIsLoaded, history]);

  const capitalizeTheme = (str) => str.toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');

  const validateForm = Yup.object().shape({
    themeName: Yup.string()
      .min(2, 'Invalid lesson theme: too short')
      .max(50, 'Invalid lesson theme: too long')
      .matches(
        '^[A-Za-zа-яА-ЯёЁ ]+$',
        'Invalid lesson theme',
      ),
  });

  const openStudentDetails = useCallback((id) => {
    history.push(`${paths.STUDENTS}/${id}`);
  }, [history]);

  const handleCancel = useCallback(() => {
    history.push(paths.LESSONS);
  }, [history]);

  const onSubmit = (values) => {
    const { lessonDate, themeName } = values;
    const lessonVisits = formData.map((lessonVisit) => {
      const {
        presence, studentId, studentMark,
      } = lessonVisit;
      return (
        {
          comment: '',
          presence,
          studentId,
          studentMark,
        }
      );
    });

    const mentorData = mentors.find((mentor) => mentor.email === mentorInput);

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
    const studentD = studentsGroup.studentIds.map(
      (id) => students.find((student) => student.id === id),
    );

    const studentsData = studentD.map((student) => ({
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
    }));

    const resultLessonVisits = studentsData.map((student) => ({
      ...student,
      studentMark: 0,
      presence: false,
      comment: '',
    }));
    setFormData(resultLessonVisits);
  };

  const openClassRegister = () => {
    if (studentsGroup) {
      getFormData();
      setBtnSave(true);
      setClassRegister(true);
      setGroupError(false);
    }
    if (!studentsGroup) {
      setGroupError(true);
    }
  };

  const hideClassRegister = () => {
    setBtnSave(false);
    setClassRegister(false);
    setGroupError(false);
  };

  const handleMentorChange = (ev) => {
    setMentorInput(ev.target.value);
    const mentorData = mentors.find((mentor) => mentor.email === ev.target.value);

    if (mentorData) {
      setMentorError(false);
    } else {
      setMentorError(true);
    }
  };

  const handleGroupChange = (ev) => {
    const resultGroup = groups.find((group) => group.name.toUpperCase() === ev.target.value.toUpperCase());
    setStudentsGroup(null);
    if (resultGroup) {
      setStudentsGroup(resultGroup);
      setGroupError(false);
      setBtnSave(false);
      setClassRegister(false);
    } else {
      setGroupError(true);
    }
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

  const handlePresenceChange = (ev) => {
    const arrIndex = ev.target.dataset.id;
    formData[arrIndex].presence = !formData[arrIndex].presence;
    formData[arrIndex].studentMark = 0;
  };

  return (
    <div className="container">
      <div className={classNames(styles.page, 'mx-auto', `${classRegister ? 'col-12' : 'col-8'}`)}>
        <div className="d-flex flex-row">
          {groupsError && mentorsError && studentsError && (
            <div className="col-12 alert-danger">
              Server Problems
            </div>
          )}
          <div className={`${classRegister ? 'col-6' : 'col-12'}`}>
            <Formik
              initialValues={{
                themeName: '',
                groupName: '',
                lessonDate: '',
                mentorEmail: '',
                formData,
              }}
              onSubmit={onSubmit}
              validationSchema={validateForm}
            >
              {({ errors }) => (
                <Form id="form" className={classNames(styles.size, 'd-flex flex-row')}>
                  <div className="col-12">
                    <h3>Add a Lesson</h3>
                    <hr />
                    <div className="mt-5 form-group row">
                      <label htmlFor="inputLessonTheme" className="col-sm-4 col-form-label">Lesson Theme:</label>
                      <div className="col-sm-8">
                        <Field
                          type="text"
                          className={classNames('form-control', { 'border-danger': errors.themeName })}
                          name="themeName"
                          id="inputLessonTheme"
                          placeholder="Lesson Theme"
                          required
                        />
                        {
                          errors.themeName
                            ? <div className={styles.error}>{errors.themeName}</div>
                            : null
                        }
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputGroupName" className="col-sm-4 col-form-label">Group Name:</label>
                      <div className="col-sm-8 input-group">
                        <input
                          name="groupName"
                          id="inputGroupName"
                          type="text"
                          className={classNames('form-control group-input', { 'border-danger': groupError })}
                          placeholder="Group Name"
                          onChange={handleGroupChange}
                          onFocus={hideClassRegister}
                          list="group-list"
                          disabled={groupsLoading}
                          required
                        />
                        <datalist id="group-list">
                          {groups.map(({ id, name }) => (
                            <option key={id}>{name}</option>
                          ))}
                        </datalist>
                      </div>
                      {
                            groupError
                              ? <div className={classNames('col-8 offset-4', styles.error)}>Invalid group name</div>
                              : null
                          }
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label" htmlFor="choose-date/time">Lesson Date/Time:</label>
                      <div className="col-md-8">
                        <Field
                          className="form-control"
                          type="datetime-local"
                          name="lessonDate"
                          id="choose-date/time"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label" htmlFor="mentorEmail">Mentor Email:</label>
                      <div className="col-md-8 input-group">
                        <input
                          className={classNames('form-control group-input', { 'border-danger': mentorError })}
                          type="text"
                          name="mentorEmail"
                          id="mentorEmail"
                          list="mentor-list"
                          placeholder="Mentor Email"
                          onChange={handleMentorChange}
                          disabled={mentorsLoading}
                          required
                        />
                        <datalist id="mentor-list">
                          {mentors.map(({ id, email }) => (
                            <option key={id} value={email} />
                          ))}
                        </datalist>
                      </div>
                      {
                            mentorError
                              ? <div className={classNames('col-8 offset-4', styles.error)}>Invalid mentor email</div>
                              : null
                          }
                    </div>
                  </div>
                  { classRegister && formData && (
                  <div className="col-lg-12">
                    <FieldArray name="formData">
                      {(arrayHelpers) => (
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
                              { formData && formData.length > 0 && (
                                formData.map((lessonVisit, index) => (
                                  <tr key={lessonVisit.studentId}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>
                                      <a href="#" onClick={() => openStudentDetails(lessonVisit.studentId)}>
                                        { lessonVisit.studentName }
                                      </a>
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
                                        min="2"
                                        placeholder=""
                                        onChange={handleMarkChange}
                                        data-id={index}
                                        disabled={!formData[index].presence}
                                        required
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
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={classNames(styles.placement, 'col-12')}>
          <button form="form" type="button" className="btn btn-secondary btn-lg" onClick={handleCancel}>Cancel</button>
          {btnSave
            ? <button form="form" type="submit" className="btn btn-success btn-lg">Save</button>
            : (
              <Button
                className="btn btn-success btn-lg"
                onClick={openClassRegister}
              >
                Class Register
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};
