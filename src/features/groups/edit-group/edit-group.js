import React, { useCallback, useEffect, useState } from 'react';
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
import { useActions } from '@/shared';
import { WithLoading, Button } from '@/components/index.js';
import { editStudentGroup, editStudentGroupSelector } from '@/models';
import Icon from '@/icon.js';
import { validateGroupName, validateDate } from '../../validation/validation-helpers.js';
import styles from './edit-groups.scss';

export const EditGroup = ({
  id: groupId, studentGroupData, studentsData, mentorsData, coursesData,
}) => {
  const {
    isLoading: isEditing,
    isLoaded: isEdited,
    error: editingError,
  } = useSelector(editStudentGroupSelector, shallowEqual);

  const dispatchEditGroup = useActions(editStudentGroup);

  const history = useHistory();

  const { data: group, isLoading: isGroupLoading } = studentGroupData;
  const { data: students, isLoading: areStudentsLoading } = studentsData;
  const { data: mentors, isLoading: areMentorsLoading } = mentorsData;
  const { data: courses, isLoading: areCoursesLoading } = coursesData;

  const [groupMentors, setGroupMentors] = useState([]);
  const [mentorInputError, setMentorInputError] = useState('');
  const [groupStudents, setGroupStudents] = useState([]);
  const [studentInputError, setStudentInputError] = useState('');

  useEffect(() => {
    if (!isEditing && isEdited && !editingError) {
      history.push('/groups');
    }
  }, [isEdited, editingError, isEditing, history]);

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

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString().split('.').reverse()
    .join('-');

  return (
    <div className="w-100">
      <div className="row justify-content-center">
        <div className="w-100 card shadow p-4">
          <WithLoading isLoading={isGroupLoading} className={styles['loader-centered']}>
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
              validateOnMount={false}
            >
              {({ values, errors, setFieldValue }) => (
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
                        validate={validateGroupName}
                      />
                      {errors.name && <p className="w-100 text-danger mb-0">{errors.name}</p>}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col d-flex align-items-center">
                      <label className="mb-0" htmlFor="course">Course:</label>
                    </div>
                    <div className="col-md-8">
                      <WithLoading isLoading={areCoursesLoading}>
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
                      </WithLoading>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col d-flex align-items-center">
                      <label className="mb-0" htmlFor="start-date">Start date:</label>
                    </div>
                    <div className="col-md-8">
                      <Field
                        className={classNames('form-control', { 'border-danger': errors.finishDate })}
                        type="date"
                        name="startDate"
                        id="start-date"
                      />
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
                      <label className="mt-2" htmlFor="finish-date">Mentors:</label>
                    </div>
                    <div className="col-md-8">
                      <WithLoading isLoading={areMentorsLoading}>
                        <div className="d-flex">
                          <Field
                            className="form-control f"
                            type="text"
                            name="mentor"
                            list="mentors-list"
                            validate={(value) => validateDate(values.startDate, value)}
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
                            variant="warning"
                            onClick={() => addMentor(values.mentor, () => setFieldValue('mentor', ''))}
                          >
                            <Icon icon="Plus" />
                          </Button>
                        </div>
                      </WithLoading>
                      {mentorInputError && <p className="text-danger mb-0">{mentorInputError}</p>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <ul className="col-12 d-flex flex-wrap justify-content-between p-0">
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
                  <div className="row mb-3">
                    <div className="col d-flex align-items-start">
                      <label className="mt-2" htmlFor="finish-date">Students:</label>
                    </div>
                    <div className="col-md-8">
                      <WithLoading isLoading={areStudentsLoading}>
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
                            variant="warning"
                            onClick={() => addStudent(values.student, () => setFieldValue('student', ''))}
                          >
                            <Icon icon="Plus" />
                          </Button>
                        </div>
                      </WithLoading>
                      {studentInputError && <p className="text-danger mb-0">{studentInputError}</p>}
                    </div>
                  </div>
                  <div className="mb-3">
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
                  <div className="row justify-content-around mt-4">
                    <Button type="reset" className="btn btn-secondary w-25" disabled={isEditing}>
                      Clear
                    </Button>
                    <Button type="submit" variant="success" className="btn btn-secondary w-25" disabled={isEditing}>
                      Confirm
                    </Button>
                  </div>
                  {editingError && <p className="text-danger mt-3 mb-0 text-center">{editingError}</p>}
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
