import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { paths, useActions } from '@/shared';
import { coursesSelector, editCourse, deleteCourse, editedCourseSelector, deletedCourseSelector } from '@/models';

import { Formik, Form, Field } from 'formik';
import { Button, WithLoading } from '@/components';
import { editCourseValidation } from '@features/validation/validation-helpers.js';
import { ModalWindow } from '@/features/modal-window';

import classNames from 'classnames';
import styles from './edit-course.scss';

export const EditCourse = ({ id }) => {
  const history = useHistory();
  const [toShowModal, setShowModal] = useState(false);

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

  const {
    isLoading: isDeletedLoading,
    isLoaded: isDeletedLoaded,
    error: isDeletedError
  } = useSelector(deletedCourseSelector, shallowEqual);

  const updateCourse = useActions(editCourse);
  const removeCourse = useActions(deleteCourse);

  const course = data.find((course) => course.id == id);

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

  useEffect(() => {
    if (!isDeletedError && isDeletedLoaded) {
      history.push(paths.COURSES);
    }
  }, [isDeletedError, isDeletedLoaded, history]);

  const onSubmit = (values) => {
    updateCourse(values, id);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = () => {
    handleCloseModal();
    removeCourse(id);
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
                {({ errors, isValid, dirty, handleReset }) => (
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
                    <div className="row m-0 pt-3">
                      <div className="col-md-3 col-4 px-1">
                      <Button
                        disabled={!isValid || dirty || isDeletedLoading}
                        className="w-100"
                        variant="danger"
                        onClick={handleShowModal}
                      >Delete</Button>
                    </div>
                    <div className="col-md-3 offset-md-3 col-4 px-1">
                      <Button
                        type="submit"
                        disabled={!isValid || !dirty || isEditedLoading || errors.name}
                        className="btn btn-secondary w-100"
                        onClick={handleReset}
                      >Clear</Button>
                      </div>
                      <div className="col-md-3 col-4 px-1">
                        <Button
                          type="submit"
                          disabled={!isValid || !dirty || isEditedLoading || errors.name}
                          className="btn btn-success w-100"
                        >Save</Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <ModalWindow
                toShow={toShowModal}
                onSubmit={handleDelete}
                onClose={handleCloseModal}
              >
                Are you sure you want to delete this course? 
              </ModalWindow>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};
