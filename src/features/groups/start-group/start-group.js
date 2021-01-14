import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from '@/shared/index.js';
import { Formik, Field, Form } from 'formik';

import classNames from 'classnames';

import {
  mentorsActiveSelector,
  activeStudentsSelector,
  fetchActiveMentors,
  loadActiveStudents,
  fetchCourses,
  coursesSelector,
  addStudentGroup,
} from '@/models/index.js';

import { WithLoading } from '../../../components/index.js';

export const StartGroup = () => {
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
    createGroup,
  ] = useActions([fetchActiveMentors, loadActiveStudents, addStudentGroup]);

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

  const matchEmails = (textEmails, fetchedArray) => {
    const idArray = [];
    fetchedArray.forEach((person) => {
      if (textEmails.match(person.email) !== null) {
        idArray.push(person.id);
      }
    });
    return idArray;
  };

  const handleSubmit = (values) => {
    const { name, startDate, finishDate, courseId, mentors, students } = values;
    const mentorsIdArray = matchEmails(mentors, mentorsData);
    const studentsIdArray = matchEmails(students, studentsData);
    const groupObject = {
      name,
      courseId,
      startDate,
      finishDate,
      studentIds: studentsIdArray,
      mentorIds: mentorsIdArray,
    };
    if (mentorsIdArray.length !== 0 || studentsIdArray.length !== 0) {
      createGroup(groupObject);
    } else{
      alert('In one of emails list no matches with Data Base');
    }
  };

  const clearAll = (values) => {
    formik.resetForm();
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
          >
            {({ errors }) => (
              <Form className="px-2 py-4" name="start-group">
                <h3>Group starting</h3>
                <hr />
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <label className="mb-0" htmlFor="name">Group name</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      className={classNames('form-control')}
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="group name"
                    />
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
                        className="form-control"
                        type="date"
                        name="startDate"
                        id="startDate"
                        required
                      />
                    </div>
                </div>
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <label className="mb-0" htmlFor="finish-date">Finish date</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      className="form-control"
                      type="date"
                      name="finishDate"
                      id="finishDate"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="mb-0" htmlFor="students">Mentors' data</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      className="form-control"
                      component="textarea"
                      name="mentors"
                      id="mentors"
                      rows="3"
                      required
                      placeholder="paste mentors' emails here"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="mb-0" htmlFor="students">Students' data</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      className="form-control"
                      component="textarea"
                      name="students"
                      id="students"
                      rows="3"
                      required
                      placeholder="paste mentors' emails here"
                    />
                  </div>
                </div>
                <div className="row justify-content-around mt-4">
                  <input
                    type="reset"
                    className="btn btn-success w-25"
                    name="reset-btn"
                    value="Clear all"
                  />
                  <input type="submit" name="submit-btn" className="btn btn-success w-25" value="Create" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};