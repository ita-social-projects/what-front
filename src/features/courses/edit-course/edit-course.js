import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames';
import { shape, number } from 'prop-types';

import { paths, useActions } from '@/shared';
import { addAlert } from '@/features';
import { 
  deleteCourse, 
  deletedCourseSelector, 
  editCourse, 
  editedCourseSelector, 
  reactivateCourse,
  reactivatedCourseSelector,
  fetchActiveCourses, 
  coursesActiveSelector
} from '@/models';
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
    data: activeCourses,
  } = useSelector(coursesActiveSelector, shallowEqual);

  const {
    isLoading: isEditedLoading,
    loaded: isEditedLoaded,
    error: editingError,
  } = useSelector(editedCourseSelector, shallowEqual);

  const {
    isLoading: isDeletedLoading,
    isLoaded: isDeletedLoaded,
    error: isDeletedError,
  } = useSelector(deletedCourseSelector, shallowEqual);

  const {
    isLoading: isReactivatedLoading,
    isLoaded: isReactivatedLoaded,
    error: isReactivatedError,
  } = useSelector(reactivatedCourseSelector, shallowEqual);

  const [
    updateCourse, 
    dispatchAddAlert, 
    removeCourse, 
    restoreCourse,
    loadAllActiveCourses
  ] = useActions([editCourse, addAlert, deleteCourse, reactivateCourse, fetchActiveCourses]);

  const course = data.find((course) => course.id == id);
  const isCourseEnable = activeCourses.map(({ id }) => id).includes(id);

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
    if(isCourseEnable){
      if (!isDeletedError && isDeletedLoaded && !isDeletedLoading) {
        history.push(paths.COURSES);
        dispatchAddAlert('The course has been successfully deleted', 'success');
      }
      if (isDeletedError && !isDeletedLoaded && !isDeletedLoading) {
        dispatchAddAlert(isDeletedError);
      }
    }
    else{
      if (!isReactivatedError && isReactivatedLoaded && !isReactivatedLoading) {
        history.push(paths.COURSES);
        dispatchAddAlert('The course has been successfully reactivated', 'success');
      }
      if (isReactivatedError && !isReactivatedLoaded && !isReactivatedLoading) {
        dispatchAddAlert(isReactivatedError);
      }
    }
  }, [isDeletedError, isDeletedLoaded, history, isReactivatedError, isReactivatedLoaded]);

  const onSubmit = (values) => {
    updateCourse(values, id);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = () => {
    handleCloseModal();
    removeCourse(id);
  };

  const handleReactivate = () => {
    handleCloseModal();
    restoreCourse(id);
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
                  <Form name="start-group" data-testid="editCourseForm">
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
                      <div className="col-md-3 col-4 pl-0">
                        <Button
                          disabled={!isValid || dirty || isDeletedLoading || isReactivatedLoading}
                          className={classNames('w-100', styles['remove-button'])}
                          onClick={handleShowModal}
                        >
                          {
                            isCourseEnable ?
                              <span>Disable</span>
                              :
                              <span>Reactivate</span>
                          } 
                        </Button>
                      </div>
                      <div className="col-md-3 offset-md-3 col-4">
                        <Button
                          type="reset"
                          disabled={!isValid || !dirty || isEditedLoading || errors.name}
                          className={classNames('w-100', styles['clear-button'])}
                          onClick={handleReset}
                        >Reset
                        </Button>
                      </div>
                      <div className="col-md-3 col-4 pr-0">
                        <Button
                          type="submit"
                          disabled={!isValid || !dirty || isEditedLoading || errors.name}
                          className="btn w-100"
                        >Save
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              {
                isCourseEnable?
                  <ModalWindow
                    toShow={toShowModal}
                    onSubmit={handleDelete}
                    onClose={handleCloseModal}
                    submitButtonText="Disable"
                    useRedButton
                    marginLeft
                  >
                    Are you sure you want to disable this course?
                  </ModalWindow>
                :
                  <ModalWindow
                    toShow={toShowModal}
                    onSubmit={handleReactivate}
                    onClose={handleCloseModal}
                    submitButtonText="Reactivate"
                    useRedButton
                    marginLeft
                  >
                    Are you sure you want to reactivate this course?
                   </ModalWindow>
                }
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
