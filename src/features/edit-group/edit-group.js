import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { validateGroupName, validateDate } from '../validation/validation-helpers.js';
import { useActions } from '../../shared/index.js';
import { WithLoading, Button } from '../../components/index.js';
import {
  studentGroupsSelector, loadStudentGroupsById, studentsSelector,
  loadStudents, fetchMentors, mentorsSelector,
  coursesSelector, fetchCourses,
} from '../../models/index.js';
import styles from './edit-groups.scss';

export const EditGroup = () => {
  const {
    studentGroupById: group,
    isLoading: isGroupLoading,
    isLoaded: isGroupLoaded,
    error: groupLoadingError,
  } = useSelector(studentGroupsSelector, shallowEqual);
  const { data: students, isLoading: areStudentsLoading } = useSelector(studentsSelector);
  const { mentors, isLoading: areMentorsLoading } = useSelector(mentorsSelector, shallowEqual);
  const {
    data: courses,
    isLoading: areCoursesLoading,
  } = useSelector(coursesSelector, shallowEqual);

  const [
    dispatchLoadGroup,
    dispatchLoadStudents,
    dispatchLoadMentors,
    dispatchLoadCourses,
  ] = useActions([loadStudentGroupsById, loadStudents, fetchMentors, fetchCourses]);

  const [initialFormValues, setInitialValues] = useState({
    name: '',
    startDate: '',
    finishDate: '',
    course: '',
  });

  const history = useHistory();
  // const { id } = useParams();

  useEffect(() => {
    dispatchLoadGroup(5);
    dispatchLoadStudents();
    dispatchLoadMentors();
    dispatchLoadCourses();
  }, [dispatchLoadGroup, dispatchLoadStudents, dispatchLoadMentors, dispatchLoadCourses]);

  useEffect(() => {
    if (group && mentors && students && courses) {
      setInitialValues({
        name: group.name,
        startDate: new Date(group.startDate).toLocaleDateString(),
        finishDate: new Date(group.finishDate).toLocaleDateString(),
        course: courses.find((course) => course.id === group.courseId)?.name,
      });
      console.log(initialFormValues);
    }
  }, [setInitialValues, group, mentors, students, courses]);

  const editGroup = (values) => {
    const { name } = values;
    const groupName = name[0].toUpperCase() + name.slice(1);
    const editedGroup = {
      ...values,
      name: groupName,
    };
    // put method waiting for saga
  };

  const onSubmit = (values, actions) => {
    actions.resetForm();
    editGroup(values);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8 card shadow">
          <WithLoading isLoading={isGroupLoading && areStudentsLoading && areCoursesLoading && areMentorsLoading}>
            <Formik
              initialValues={initialFormValues}
              onSubmit={onSubmit}
            >
              {({ values, errors }) => (
                <Form className="px-2 py-4" name="start-group">
                  <h3>Group Editing</h3>
                  <hr />
                  <div className="row mb-3">
                    <div className="col d-flex align-items-center">
                      <label className="mb-0" htmlFor="name">Group name:</label>
                    </div>
                    <div className="col-md-8">
                      <Field
                        className={classNames('form-control', { 'border-danger': errors.name })}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="group name"
                        value={group.name}
                        validate={validateGroupName}
                      />
                    </div>
                    {errors.name && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.name}</p>}
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
                            .map((course) => <option value={course.id} key={course.id}>{course.name}</option>)
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
                    <div className="col d-flex align-items-center">
                      <label className="mb-0" htmlFor="finish-date">Finish date:</label>
                    </div>
                    <div className="col-md-8">
                      <Field
                        className={classNames('form-control', { 'border-danger': errors.finishDate })}
                        type="date"
                        name="finishDate"
                        id="finish-date"
                        validate={(value) => validateDate(values.startDate, value)}
                      />
                    </div>
                    {errors.finishDate && <p className={classNames('text-danger mb-0', styles.error)}>{errors.finishDate}</p>}
                  </div>
                  <div className="row justify-content-around mt-4">
                    <input
                      type="reset"
                      name="reset-btn"
                      className={classNames('btn btn-secondary w-25', styles.button)}
                      value="Clear all"
                    />
                    <input
                      type="submit"
                      name="submit-btn"
                      className={classNames('btn btn-success w-25', styles.button)}
                      value="Confirm"
                    />
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
