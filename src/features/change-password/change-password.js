import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { changePasswordSelector, currentUserSelector, newPassword } from '@/models';

import { Button, WithLoading } from '@/components';
import { addAlert, ModalWindow } from '@/features';

import { Formik, Form, Field } from 'formik';
import { changePasswordValidation } from '@features/validation/validation-helpers.js';

import className from 'classnames';
import styles from './change-password.scss';

export const ChangePassword = () => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const [password, setPassword] = useState({});

  const {
    isLoading: isChangePasswordLoading,
    isLoaded: isChangePasswordLoaded,
    error: changePasswordError,
  } = useSelector(changePasswordSelector, shallowEqual);

  const [setNewPassword, dispatchAddAlert] = useActions([newPassword, addAlert]);

  const history = useHistory();

  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (!changePasswordError && isChangePasswordLoaded) {
      history.push(paths.MY_PROFILE);
      dispatchAddAlert('The password has been successfully changed', 'success');
    }
    if (changePasswordError && !isChangePasswordLoaded) {
      dispatchAddAlert(changePasswordError);
    }
  }, [changePasswordError, isChangePasswordLoaded, history, dispatchAddAlert]);

  const onSubmit = (value) => {
    handleShowModal();
    setPassword(value);
  };

  const handleConfirm = () => {
    handleCloseModal();
    setNewPassword(password);
  };

  return (
    <div className={styles.wrapper}>
      <div className="container card shadow col-10">
        <div className="container pb-2">
          <h3 className="pt-3">Change Password</h3>
          <hr />
          <WithLoading isLoading={isChangePasswordLoading && !isChangePasswordLoaded} className="d-block mx-auto">
            <Formik
              initialValues={{
                email: currentUser?.email,
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              }}
              validationSchema={changePasswordValidation}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, isValid, dirty }) => (
                <Form>
                  <div className="container px-0">
                    <div className="row m-0">
                      <div className="col-md-4 pt-1 px-0">
                        <label htmlFor="email" className="font-weight-bold">Email address:</label>
                      </div>
                      <div className="col-md-8 px-0">
                        <Field
                          type="email"
                          className="form-control bg-white"
                          name="email"
                          id="email"
                          value={values?.email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row m-0 pt-3">
                      <div className="col-md-4 pt-1 px-0">
                        <label htmlFor="currentPassword" className="font-weight-bold">Current password:</label>
                      </div>
                      <div className="col-md-8 px-0">
                        <Field
                          type="password"
                          className={className('form-control', { 'border-danger': errors.currentPassword })}
                          name="currentPassword"
                          id="currentPassword"
                          placeholder="Current password"
                        />
                        {touched.currentPassword && errors.currentPassword && <div className="text-danger mt-3">{errors?.currentPassword}</div>}
                      </div>
                    </div>
                    <div className="row m-0 pt-3">
                      <div className="col-md-4 pt-1 px-0">
                        <label htmlFor="newPassword" className="font-weight-bold">New password:</label>
                      </div>
                      <div className="col-md-8 px-0">
                        <Field
                          type="password"
                          className={className('form-control', { 'border-danger': errors.newPassword })}
                          name="newPassword"
                          id="newPassword"
                          placeholder="New password"
                        />
                        {touched.newPassword && errors.newPassword && <div className="text-danger mt-3">{errors?.newPassword}</div>}
                      </div>
                    </div>
                    <div className="row m-0 pt-3">
                      <div className="col-md-4 pt-1 px-0">
                        <label htmlFor="confirmNewPassword" className="font-weight-bold">Confirm password:</label>
                      </div>
                      <div className="col-md-8 px-0">
                        <Field
                          type="password"
                          className={className('form-control', { 'border-danger': errors.confirmNewPassword })}
                          name="confirmNewPassword"
                          id="confirmNewPassword"
                          placeholder="Confirm password"
                        />
                        {touched.confirmNewPassword && errors.confirmNewPassword && <div className="text-danger mt-3">{errors?.confirmNewPassword}</div>}
                      </div>
                    </div>
                    <div className="row m-0 py-3">
                      <div className="col-md-3 col-sm-4 col-6 pl-0 pr-1">
                        <Button
                          type="button"
                          className="w-100"
                          variant="secondary"
                          onClick={() => { history.push(paths.MY_PROFILE); }}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="col-md-3 offset-md-6 col-sm-4 offset-sm-4 col-6 pl-1 pr-0">
                        <Button
                          type="submit"
                          className=" w-100"
                          variant="success"
                          disabled={!isValid || !dirty || isChangePasswordLoading
                          || errors.currentPassword || errors.newPassword
                          || errors.confirmNewPassword}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <ModalWindow
              toShow={toShowModal}
              onSubmit={handleConfirm}
              onClose={handleCloseModal}
            >Are you sure you want to change password?
            </ModalWindow>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};