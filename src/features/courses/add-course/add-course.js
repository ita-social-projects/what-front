import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from '@/shared';
import { createCourse, createdCourseSelector } from '@/models';
import { Formik, Form, Field } from 'formik';
import { validateGroupName } from '../../validation/validation-helpers.js';
import classNames from 'classnames';
import styles from './add-course.scss';

export const AddCourse = () => {
  const { isLoading, loaded, error } = useSelector(createdCourseSelector, shallowEqual);

  const addCourse = useActions(createCourse);

  const history = useHistory(); 

  useEffect(() => {
    if (!error && loaded) {
      history.push('/courses');
    }
  }, [error, loaded]);

  const onSubmit = (values) => {
    addCourse(values);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8 card shadow">
          <Formik
            initialValues={{
              name: '',
            }}
            onSubmit={onSubmit}
          >
            {({ values, errors }) => (
              <Form className="px-2 py-4" name="start-group">
                <h3>Add a course</h3>
                <hr />
                <div className="row mb-3">
                  <div className="col d-flex align-items-center">
                    <label className="mb-0 font-weight-bolder" htmlFor="name">Course name:</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      className={classNames('form-control', { 'border-danger': errors.name })}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Course name"
                      validate={validateGroupName}
                    />
                  </div>
                  {errors.name && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.name}</p>}
                </div>
                <div className="row justify-content-around mt-4">
                  <Link
                    to="/courses"
                    className={classNames('btn btn-secondary w-25', styles.button)}
                  >Back
                  </Link>
                  <input
                    type="submit"
                    name="submit-btn"
                    disabled={isLoading || errors.name}
                    className={classNames('btn btn-success w-25', styles.button)}
                    value="Save"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};