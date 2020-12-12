import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types';
import { Formik, Field, Form } from 'formik';
import classNames from 'classnames';

import { validateGroupName, validateDate } from '../validation/validation-helpers.js';
import {
  coursesStateShape,
  mentorsStateShape,
  studentGroupsStateShape,
  studentsStateShape,
} from '../../shared/index.js';
import { WithLoading, Button } from '../../components/index.js';
import Icon from '../../icon.js';
import styles from './edit-groups.scss';

export const EditGroup = ({
  studentGroupData, studentsData, mentorsData, coursesData,
}) => {
  const {
    studentGroupById: group,
    isLoading: isGroupLoading,
  } = studentGroupData;
  const { data: students, isLoading: areStudentsLoading } = studentsData;
  const { mentors, isLoading: areMentorsLoading } = mentorsData;
  const { data: courses, isLoading: areCoursesLoading } = coursesData;

  const [groupMentors, setGroupMentors] = useState([]);
  const [mentorInputError, setMentorInputError] = useState('');
  const [groupStudents, setGroupStudents] = useState([]);
  const [studentInputError, setStudentInputError] = useState('');

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

  const addMentor = (mentorFullInfo) => {
    const [selectedMentorEmail] = mentorFullInfo.split(' ').reverse();
    const mentor = mentors.find(({ email }) => email === selectedMentorEmail);

    if (mentor) {
      setGroupMentors((prevState) => [...prevState, mentor]);
    } else {
      setMentorInputError('Mentor not found');
    }
  };

  const addStudent = (studentFullInfo) => {
    const [selectedStudentEmail] = studentFullInfo.split(' ').reverse();
    const student = students.find(({ email }) => email === selectedStudentEmail);

    if (student) {
      setGroupStudents((prevState) => [...prevState, student]);
    } else {
      setStudentInputError('Student not found');
    }
  };

  const removeMentor = (mentorId) => {
    setGroupMentors(groupMentors.filter(({ id }) => id !== mentorId));
  };

  const removeStudent = (studentId) => {
    setGroupStudents(groupStudents.filter(({ id }) => id !== studentId));
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString().split('.').reverse()
    .join('-');

  return (
    <div className="w-100">
      <div className="row justify-content-center">
        <div className="w-100 card shadow p-4">
          <WithLoading isLoading={isGroupLoading && areStudentsLoading && areCoursesLoading && areMentorsLoading}>
            <Formik
              initialValues={{
                name: group.name,
                startDate: formatDate(group.startDate),
                finishDate: formatDate(group.finishDate),
                course: group.courseId,
                mentor: '',
              }}
              onSubmit={handleSubmit}
              validateOnChange={false}
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
                          onClick={() => {
                            addMentor(values.mentor);
                            setFieldValue('mentor', '');
                          }}
                        >
                          <Icon icon="Plus" />
                        </Button>
                      </div>
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
                          onClick={() => {
                            addStudent(values.student);
                            setFieldValue('student', '');
                          }}
                        >
                          <Icon icon="Plus" />
                        </Button>
                      </div>
                      {studentInputError && <p className="text-danger mb-0">{mentorInputError}</p>}
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
                    <Button type="reset" className="btn btn-secondary w-25">
                      Clear all
                    </Button>
                    <Button type="submit" variant="success" className="btn btn-secondary w-25">
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
  studentGroupData: shape(studentGroupsStateShape).isRequired,
  studentsData: shape(studentsStateShape).isRequired,
  mentorsData: shape(mentorsStateShape).isRequired,
  coursesData: shape(coursesStateShape).isRequired,
};
