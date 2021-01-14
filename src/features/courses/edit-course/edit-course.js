import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames';
import { shape, number } from 'prop-types';

import { paths, useActions } from '@/shared';
import { addAlert } from '@/features';
import { deleteCourse, deletedCourseSelector, editCourse, editedCourseSelector } from '@/models';
import { Button, WithLoading } from '@/components';
import { ModalWindow } from '@/features/modal-window';
import { coursesStateShape } from '@/features/shared';
import { editCourseValidation } from '@features/validation/validation-helpers.js';
import styles from './edit-course.scss';

export const EditCourse = ({ id, coursesData }) => {
  const history = useHistory();
  const [toShowModal, setShowModal] = useState(false);

  const {
    data,
    isLoading: isCourseLoading,
    loaded: isCourseLoaded,
  } = coursesData;

  const {
    isLoading: isEditedLoading,
    loaded: isEditedLoaded,
    error: editingError,
  } = useSelector(editedCourseSelector, shallowEqual);

  const {
    isLoading: isDeletedLoading,
    isLoaded: isDeletedLoaded,
    error: isDeletedError
  } = useSelector(deletedCourseSelector, shallowEqual);

  const [updateCourse, dispatchAddAlert, removeCourse] = useActions([editCourse, addAlert, deleteCourse]);

  const course = data.find((course) => course.id == id);

  useEffect(() => {
    if (!course && isCourseLoaded) {
      history.push(paths.NOT_FOUND);
    }
  }, [course, history, isCourseLoaded]);

  useEffect(() => {
    if (!editingError && isEditedLoaded && !isEditedLoading) {
      history.push(paths.COURSES);
      dispatchAddAlert('The course has been successfully edited', 'success');
    }
    if (editingError && !isEditedLoaded && !isEditedLoading) {
      dispatchAddAlert(editingError);
    }
  }, [dispatchAddAlert, history, editingError, isEditedLoaded, isEditedLoading]);

  useEffect(() => {
    if (!isDeletedError && isDeletedLoaded && !isDeletedLoading) {
      history.push(paths.COURSES);
      dispatchAddAlert('The course has been successfully deleted', 'success');
    }
    if (isDeletedError && !isDeletedLoaded && !isDeletedLoading) {
      dispatchAddAlert(isDeletedError);
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
              isLoading={isCourseLoading}
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

EditCourse.propTypes = {
  id: number.isRequired,
  coursesData: shape(coursesStateShape).isRequired,
};
