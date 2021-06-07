import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { resetPassword, resetPasswordSelector, clearLoaded } from '@/models';

import { Button, WithLoading } from '@/components';
import { ModalWindow } from '@/features';

import { Formik, Form, Field } from 'formik';
import { resetPasswordValidation } from '@features/validation/validation-helpers.js';

import classNames from 'classnames';
import styles from './reset-password.scss';

export const ResetPassword = () => {
  const { isLoading, isLoaded, error } = useSelector(resetPasswordSelector, shallowEqual);

  const [setResetPassword] = useActions([resetPassword]);
  const setClearLoaded = useActions(clearLoaded);

  const history = useHistory();

  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const id = 1;

  const submitHandler = (value) => {
    setShowModal(true);
    setResetPassword(id, value);
  };

  const handleSubmitModal = () => {
    handleCloseModal();
    setClearLoaded();
    history.push(paths.AUTH);
  };

  useEffect(() => {
    if (isLoaded && !error) {
      handleShowModal();
    }
  }, [isLoaded, error]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-8 col-sm-10 col-12">
            <div className={classNames(styles.form, 'card, shadow')}>
              <Formik
                initialValues={{
                  email: '',
                  newPassword: '',
                  confirmNewPassword: '',
                }}
                onSubmit={submitHandler}
                validationSchema={resetPasswordValidation}
              >
                {({
                  errors, touched, isValid, dirty,
                }) => (
                  <Form className="p-3" noValidate>
                    <h3 className="text-center">Reset password</h3>
                    <p className="text-center mt-3">Fill the form to create a new password for your account</p>
                    <hr />
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <Field
                        type="email"
                        className={classNames('form-control', { 'border-danger': errors.email && touched.email })}
                        name="email"
                        placeholder="Email address"
                        id="email"
                      />
                      {touched.email && errors.email && <div className="text-danger mt-2">{errors?.email}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword">New password</label>
                      <Field
                        type="password"
                        className={classNames('form-control', { 'border-danger': errors.newPassword && touched.newPassword })}
                        name="newPassword"
                        placeholder="New password"
                        id="newPassword"
                      />
                      {touched.newPassword && errors.newPassword && <div className="text-danger mt-2">{errors?.newPassword}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword">Confirm password</label>
                      <Field
                        type="password"
                        className={classNames('form-control', { 'border-danger': errors.newPassword && touched.newPassword })}
                        name="confirmNewPassword"
                        placeholder="Confirm password"
                        id="confirmNewPassword"
                      />
                      {touched.confirmNewPassword && errors.confirmNewPassword && <div className="text-danger mt-2">{errors?.confirmNewPassword}</div>}
                    </div>
                    <div className="d-flex justify-content-center">
                      <WithLoading isLoading={isLoading} variant="info" className="d-block mx-auto">
                        <Button
                          type="submit"
                          className={styles['form-button']}
                          disabled={!dirty || !isValid}
                        >Confirm
                        </Button>
                      </WithLoading>
                    </div>
                    {error && <p className="text-center text-danger mt-2">{error}</p>}
                  </Form>
                )}
              </Formik>
              <ModalWindow
                toShow={toShowModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmitModal}
                title="Congratulations"
                submitButtonText="Back"
                hideCancelButton
              >You have successfully confirmed your new password. Welcome back!
              </ModalWindow>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
