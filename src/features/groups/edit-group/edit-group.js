import React, { useCallback, useEffect, useState, useRef } from 'react';
import { number, shape } from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import {
  coursesStateShape,
  mentorsStateShape,
  studentsStateShape,
  studentGroupByIdStateShape,
} from '@/features/shared';
import { addAlert } from '@/features';
import { paths, useActions } from '@/shared';
import { WithLoading, Button } from '@/components/index.js';
import { editStudentGroup, editStudentGroupSelector } from '@/models';
import Icon from '@/icon.js';
import { editGroupValidation } from '@features/validation/validation-helpers.js';
import styles from './edit-groups.scss';

export const EditGroup = ({
  id: groupId, studentGroupData, studentsData, mentorsData, coursesData,
}) => {
  const {
    isLoading: isEditing,
    isLoaded: isEdited,
    error: editingError,
  } = useSelector(editStudentGroupSelector, shallowEqual);

  const [dispatchEditGroup, dispatchAddAlert] = useActions([editStudentGroup, addAlert]);

  const history = useHistory();

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

  const [groupMentors, setGroupMentors] = useState([]);
  const [mentorInputError, setMentorInputError] = useState('');
  const [groupStudents, setGroupStudents] = useState([]);
  const [studentInputError, setStudentInputError] = useState('');

  const prevGroupMentors = usePrevious(groupMentors);
  const prevGroupStudents = usePrevious(groupStudents);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (!isEditing && isEdited && !editingError) {
      history.push(paths.GROUPS);
      dispatchAddAlert('The group has been successfully edited!', 'success');
    }
    if (!isEditing && !isEdited && editingError) {
      dispatchAddAlert(editingError);
    }
  }, [isEdited, editingError, isEditing, history, dispatchAddAlert]);

  useEffect(() => {
    if (mentors.length) {
      setGroupMentors(mentors.filter(({ id }) => group.mentorIds?.includes(id)));
    }
  }, [group.mentorIds, mentors]);

  useEffect(() => {
    if (students.length) {
      setGroupStudents(students.filter(({ id }) => group.studentIds?.includes(id)));
    }
  }, [group.studentIds, students]);

  const addMentor = (mentorFullInfo, clearField) => {
    const [selectedMentorEmail] = mentorFullInfo.split(' ').reverse();
    const mentor = mentors.find(({ email }) => email === selectedMentorEmail);

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
    const student = students.find(({ email }) => email === selectedStudentEmail);

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

  const handleSubmit = ({
    name, startDate, finishDate, courseId,
  }) => {
    const newGroupData = {
      id: groupId,
      name,
      courseId,
      startDate: new Date(startDate).toISOString().substring(0, 19),
      finishDate: new Date(finishDate).toISOString().substring(0, 19),
      studentIds: [...new Set(groupStudents.map(({ id }) => id))],
      mentorIds: [...new Set(groupMentors.map(({ id }) => id))],
    };

    dispatchEditGroup(newGroupData);
  };

  const handleReset = () => {
    setGroupStudents(students.filter(({ id }) => group.studentIds.includes(id)));
    setGroupMentors(mentors.filter(({ id }) => group.mentorIds.includes(id)));
    setStudentInputError('');
    setMentorInputError('');
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString().split('.').reverse()
    .join('-');

  return (
    <div className="w-100">
      <div className="justify-content-center">
        <div className="w-100 card shadow p-4">
          <WithLoading
            isLoading={isGroupLoading || !isGroupLoaded || areMentorsLoading || !areMentorsLoaded
          || areCoursesLoading || !areCoursesLoaded || areStudentsLoading || !areStudentsLoaded}
            className={styles['loader-centered']}
          >
            <Formik
              initialValues={{
                name: group.name,
                startDate: formatDate(group.startDate),
                finishDate: formatDate(group.finishDate),
                courseId: group.courseId,
                mentor: '',
                student: '',
              }}
              onSubmit={handleSubmit}
              validationSchema={editGroupValidation}
              validateOnMount={false}
            >
              {({ values, errors, setFieldValue, isValid, dirty }) => (
                <Form className="px-2 py-4" name="start-group">
                  <h3>Group Editing</h3>
                  <hr />
                  <div className="row mb-3 align-items-start">
                    <div className="col d-flex align-items-center">
                      <label className="mt-2" htmlFor="name">Group name:</label>
                    </div>
                    <div className="col-md-8">
                      <Field
                        className={classNames('form-control', { 'border-danger': errors.name })}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="group name"
                      />
                      {errors.name && <p className="w-100 text-danger mb-0">{errors.name}</p>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col d-flex align-items-center">
                      <label className="mb-0" htmlFor="course">Course:</label>
                    </div>
                    <div className="col-md-8">
                      <Field
                        as="select"
                        className={classNames('custom-select')}
                        name="courseId"
                        id="course"
                      >
                        <option value={group.courseId} key={group.courseId}>
                          { courses.find((course) => course.id === group.courseId)?.name }
                        </option>
                        {
                          courses
                            .filter((course) => course.id !== group.courseId)
                            .map((course) => (
                              <option value={course.id} key={course.id}>{course.name}</option>
                            ))
                        }
                      </Field>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col d-flex align-items-center">
                      <label className="mb-0" htmlFor="start-date">Start date:</label>
                    </div>
                    <div className="col-md-8">
                      <Field
                        className={classNames('form-control', { 'border-danger': errors.startDate })}
                        type="date"
                        name="startDate"
                        id="start-date"
                      />
                      {errors.startDate && <p className="text-danger mb-0">{errors.startDate}</p>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col d-flex align-items-start">
                      <label className="mt-2" htmlFor="finish-date">Finish date:</label>
                    </div>
                    <div className="col-md-8">
                      <Field
                        className={classNames('form-control', { 'border-danger': errors.finishDate })}
                        type="date"
                        name="finishDate"
                        id="finish-date"
                      />
                      {errors.finishDate && <p className="text-danger mb-0">{errors.finishDate}</p>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col d-flex align-items-start">
                      <label className="mt-2" htmlFor="mentor">Mentors:</label>
                    </div>
                    <div className="col-md-8">
                      <div className="d-flex">
                        <Field
                          className="form-control f"
                          type="text"
                          name="mentor"
                          list="mentors-list"
                        />
                        <datalist id="mentors-list">
                          {
                            mentors
                              .filter(({ id }) => !groupMentors.find((mentor) => mentor.id === id))
                              .map(({
                                id, firstName, lastName, email,
                              }) => <option key={id} value={`${firstName} ${lastName} ${email}`} />)
                          }
                        </datalist>
                        <Button
                          variant="info"
                          onClick={() => addMentor(values.mentor, () => setFieldValue('mentor', ''))}
                          disabled={!dirty}
                        >
                          +
                        </Button>
                      </div>
                      {mentorInputError && <p className="text-danger mb-0">{mentorInputError}</p>}
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
                                  className={classNames('btn p-0 ml-auto mr-2 font-weight-bold', styles.cross)}
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
                    <div className="col d-flex align-items-start">
                      <label className="mt-2" htmlFor="finish-date">Students:</label>
                    </div>
                    <div className="col-md-8">
                      <div className="d-flex">
                        <Field
                          className="form-control f"
                          type="text"
                          name="student"
                          list="students-list"
                        />
                        <datalist id="students-list">
                          {
                            students
                              .filter(({ id }) => !groupStudents.find((mentor) => mentor.id === id))
                              .map(({
                                id, firstName, lastName, email,
                              }) => <option key={id} value={`${firstName} ${lastName} ${email}`} />)
                          }
                        </datalist>
                        <Button
                          variant="info"
                          onClick={() => addStudent(values.student, () => setFieldValue('student', ''))}
                          disabled={!dirty}
                        >
                          +
                        </Button>
                      </div>
                      {studentInputError && <p className="text-danger mb-0">{studentInputError}</p>}
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
                                  className={classNames('btn p-0 ml-auto mr-2 font-weight-bold', styles.cross)}
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
                    <Button type="reset" variant="secondary" className={classNames('w-25', styles['clear-button'])} disabled={ (!dirty &&  prevGroupMentors !== groupMentors && prevGroupStudents !== groupStudents) || isEditing} onClick={handleReset}>
                      Clear
                    </Button>
                    <Button type="submit" className="btn btn-secondary w-25" disabled={!isValid || (!dirty &&  prevGroupMentors !== groupMentors && prevGroupStudents !== groupStudents) || isEditing}>
                      Confirm
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};

EditGroup.propTypes = {
  id: number.isRequired,
  studentGroupData: shape(studentGroupByIdStateShape).isRequired,
  studentsData: shape(studentsStateShape).isRequired,
  mentorsData: shape(mentorsStateShape).isRequired,
  coursesData: shape(coursesStateShape).isRequired,
};
