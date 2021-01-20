import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared/index.js';
import { Formik, Field, Form } from 'formik';

import Icon from '@/icon.js';

import classNames from 'classnames';
import {
  mentorsActiveSelector,
  activeStudentsSelector,
  fetchActiveMentors,
  loadActiveStudents,
  fetchCourses,
  coursesSelector,
  addStudentGroup,
  addStudentGroupSelector,
} from '@/models/index.js';
import { addAlert } from '@/features';
import { editGroupValidation } from '@features/validation/validation-helpers.js';
import styles from './start-group.scss';

import { WithLoading, Button } from '../../../components/index.js';

export const StartGroup = () => {
  const history = useHistory();

  const [groupMentors, setGroupMentors] = useState([]);
  const [mentorInputError, setMentorInputError] = useState('');
  const [groupStudents, setGroupStudents] = useState([]);
  const [studentInputError, setStudentInputError] = useState('');

  const [dispatchAddGroup, dispatchAddAlert] = useActions([addStudentGroup, addAlert]);
  const {
    isLoading: isAdding,
    isLoaded: isAdded,
    error: addingError,
  } = useSelector(addStudentGroupSelector, shallowEqual);

  const {
    data: courses,
    isLoading: coursesIsLoading,
  } = useSelector(coursesSelector, shallowEqual);

  const [loadCourses] = useActions([fetchCourses]);

  const {
    data: mentorsData,
    isLoading: mentorsIsLoading,
    isLoaded: mentorsIsLoaded,
    error: mentorsError,
  } = useSelector(mentorsActiveSelector, shallowEqual);

  const {
    data: studentsData,
    isLoading: studentsIsLoading,
    isLoaded: studentsIsLoaded,
    error: studentsError,
  } = useSelector(activeStudentsSelector, shallowEqual);

  const [
    getMentors,
    getStudents,
  ] = useActions([fetchActiveMentors, loadActiveStudents]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    if (!mentorsIsLoaded && !mentorsError) {
      getMentors();
    }
  }, [mentorsError, mentorsIsLoaded, getMentors]);

  useEffect(() => {
    if (!studentsIsLoaded && !studentsError) {
      getStudents();
    }
  }, [studentsError, studentsIsLoaded, getStudents]);

  useEffect(() => {
    if (!isAdding && isAdded && !addingError) {
      history.push(paths.GROUPS);
      dispatchAddAlert('The group has been successfully added!', 'success');
    }
    if (!isAdding && !isAdded && addingError) {
      dispatchAddAlert(addingError);
    }
  }, [isAdded, addingError, isAdding, history, dispatchAddAlert]);

  const addMentor = (mentorFullInfo, clearField) => {
    const [selectedMentorEmail] = mentorFullInfo.split(' ').reverse();
    const mentor = mentorsData.find(({ email }) => email === selectedMentorEmail);
    if (mentor) {
      clearField();
      setMentorInputError('');
      setGroupMentors((prevState) => [...prevState, mentor]);
    } else {
      setMentorInputError('Mentor not found');
    }
  };

  const addStudent = (studentFullInfo, clearField) => {
    const [selectedStudentEmail] = studentFullInfo.split(' ').reverse();
    const student = studentsData.find(({ email }) => email === selectedStudentEmail);

    if (student) {
      clearField();
      setStudentInputError('');
      setGroupStudents((prevState) => [...prevState, student]);
    } else {
      setStudentInputError('Student not found');
    }
  };

  const removeMentor = useCallback((mentorId) => {
    setGroupMentors(groupMentors.filter(({ id }) => id !== mentorId));
  }, [groupMentors]);

  const removeStudent = useCallback((studentId) => {
    setGroupStudents(groupStudents.filter(({ id }) => id !== studentId));
  }, [groupStudents]);

  const handleSubmit = (values) => {
    const { name, startDate, finishDate, courseId } = values;
    const mentorsId = [];
    const studentsId = [];

    groupMentors.forEach((mentor) => {
      mentorsId.push(mentor.id);
    });

    groupStudents.forEach((mentor) => {
      studentsId.push(mentor.id);
    });

    const groupObject = {
      name,
      courseId,
      startDate: new Date(startDate).toISOString().substring(0, 19),
      finishDate: new Date(finishDate).toISOString().substring(0, 19),
      studentIds: studentsId,
      mentorIds: mentorsId,
    };
    dispatchAddGroup(groupObject);
  };

  const handleReset = () => {
    setGroupStudents([]);
    setGroupMentors([]);
    setStudentInputError('');
    setMentorInputError('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8 card shadow">
          <Formik
            initialValues={{
              name: '',
              startDate: '',
              finishDate: '',
              courseId: '',
              mentors: '',
              students: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={editGroupValidation}
          >
            {({ values, errors, setFieldValue, isValid, dirty }) => (
              <Form className="px-2 py-4" name="start-group">
                <h3>Group starting</h3>
                <hr />
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <label className="mb-0" htmlFor="name">Group name</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      className={classNames('form-control', { 'border-danger': errors.name })}
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="group name"
                    />
                    {errors.name && <p className="w-100 text-danger mb-0">{errors.name}</p>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <label className="mb-0" htmlFor="course">Course</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      as="select"
                      className={classNames('custom-select')}
                      name="courseId"
                      id="course"
                    >
                      <WithLoading isLoading={coursesIsLoading}>{
                      courses.map((course) => (
                        <option value={course.id} key={course.id}>{course.name}</option>
                      ))
                      }
                      </WithLoading>
                    </Field>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <label className="mb-0" htmlFor="start-date">Start date</label>
                  </div>
                    <div className="col-md-8">
                      <Field
                        className={classNames('form-control', { 'border-danger': errors.startDate })}
                        type="date"
                        name="startDate"
                        id="startDate"
                        required
                      />
                      {errors.startDate && <p className="text-danger mb-0">{errors.startDate}</p>}
                    </div>
                </div>
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <label className="mb-0" htmlFor="finish-date">Finish date</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      className={classNames('form-control', { 'border-danger': errors.finishDate })}
                      type="date"
                      name="finishDate"
                      id="finishDate"
                      required
                    />
                    {errors.finishDate && <p className="text-danger mb-0">{errors.finishDate}</p>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="mb-0" htmlFor="students">Mentors' data</label>
                  </div>
                  <div className="col-md-8">
                    <div className="d-flex">
                      <Field
                        className="form-control"
                        name="mentors"
                        id="mentors"
                        list="mentors-list"
                      />
                      <datalist id="mentors-list">
                        {
                              mentorsData
                                .filter(({ id }) => !groupMentors
                                  .find((mentor) => mentor.id === id))
                                .map(({
                                  id, firstName, lastName, email,
                                }) => <option key={id} value={`${firstName} ${lastName} ${email}`} />)
                            }
                      </datalist>
                      <Button
                        variant="warning"
                        onClick={() => addMentor(values.mentors, () => setFieldValue('mentors', ''))}
                      >
                        <Icon icon="Plus" />
                      </Button>
                    </div>
                    <div className="w-100">
                      <ul className="col-md-12 d-flex flex-wrap justify-content-between p-0">
                        {
                            groupMentors.map(({ id, firstName, lastName }) => (
                              <li
                                key={id}
                                className={classNames(
                                  'd-flex bg-light border border-outline-secondary rounded',
                                  styles['datalist-item'],
                                )}
                              >
                                {firstName} {lastName}
                                <button
                                  type="button"
                                  className="btn p-0 ml-auto mr-2 font-weight-bold text-danger"
                                  onClick={() => removeMentor(id)}
                                >
                                  X
                                </button>
                              </li>
                            ))
                          }
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="mb-0" htmlFor="students">Students' data</label>
                  </div>
                  <div className="col-md-8">
                    <div className="d-flex">
                      <Field
                        className="form-control"
                        name="students"
                        id="students"
                        list="student-list"
                      />
                      <datalist id="student-list">
                        {
                              studentsData
                                .filter(({ id }) => !groupStudents
                                  .find((mentor) => mentor.id === id))
                                .map(({
                                  id, firstName, lastName, email,
                                }) => <option key={id} value={`${firstName} ${lastName} ${email}`} />)
                            }
                      </datalist>
                      <Button
                        variant="warning"
                        onClick={() => addStudent(values.students, () => setFieldValue('students', ''))}
                      >
                        <Icon icon="Plus" />
                      </Button>
                    </div>
                    <div className="w-100">
                        <ul className="col-12 d-flex flex-wrap justify-content-between p-0">
                          {
                            groupStudents.map(({ id, firstName, lastName }) => (
                              <li
                                key={id}
                                className={classNames(
                                  'd-flex bg-light border border-outline-secondary rounded',
                                  styles['datalist-item'],
                                )}
                              >
                                {firstName} {lastName}
                                <button
                                  type="button"
                                  className="btn p-0 ml-auto mr-2 font-weight-bold text-danger"
                                  onClick={() => removeStudent(id)}
                                >
                                  X
                                </button>
                              </li>
                            ))
                          }
                        </ul>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-around mt-4">
                  <input
                    type="reset"
                    className="btn btn-secondary w-25"
                    name="reset-btn"
                    value="Clear all"
                    onClick={handleReset}
                  />
                  <input type="submit" name="submit-btn" className="btn btn-success w-25" value="Create" disabled={!isValid || !dirty || isAdding} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );};