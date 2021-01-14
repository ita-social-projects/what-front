import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { paths, useActions } from '@/shared';
import { coursesSelector, editCourse, editedCourseSelector } from '@/models';
import { WithLoading } from '@/components';
import classNames from 'classnames';
import { editCourseValidation } from '@features/validation/validation-helpers.js';

import styles from './edit-course.scss';

export const EditCourse = ({ id }) => {
  const {
    data,
    isLoading: isCourseLoading,
    loaded: isCourseLoaded,
  } = useSelector(coursesSelector, shallowEqual);

  const {
    isLoading: isEditedLoading,
    loaded: isEditedLoaded,
    error: isEditedError,
  } = useSelector(editedCourseSelector, shallowEqual);

  const updateCourse = useActions(editCourse);

  const course = data.find((course) => course.id == id);

  const history = useHistory();

  useEffect(() => {
    if (!course && isCourseLoaded) {
      history.push(paths.NOT_FOUND);
    }
  }, [course, isCourseLoaded]);

  useEffect(() => {
    if (!isEditedError && isEditedLoaded) {
      history.push(paths.COURSES);
    }
  }, [isEditedError, isEditedLoaded]);

  const onSubmit = (values) => {
    updateCourse(values, id);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-8 card shadow">
          <div className="px-2 py-4">
            <h3>Course Editing</h3>
            <hr />
            <WithLoading
              isLoading={isCourseLoading || !isCourseLoaded}
              className={classNames(styles['loader-centered'])}
            >
              <Formik
                initialValues={{
                  name: course?.name,
                }}
                onSubmit={onSubmit}
                validationSchema={editCourseValidation}
              >
                {({ values, errors, isValid, dirty }) => (
                  <Form name="start-group">
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
                        />
                      </div>
                      {errors.name && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.name}</p>}
                    </div>
                    <div className="row justify-content-around mt-4">
                      <input
                        type="reset"
                        name="reset-btn"
                        className={classNames('btn btn-secondary w-25', styles.button)}
                        value="Clear"
                      />
                      <input
                        type="submit"
                        name="submit-btn"
                        disabled={!isValid || !dirty || isEditedLoading || errors.name}
                        className={classNames('btn btn-success w-25', styles.button)}
                        value="Save"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};
