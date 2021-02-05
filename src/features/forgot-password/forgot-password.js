import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { forgotPassword, forgotPasswordSelector, clearLoaded } from '@/models';

import { Button, WithLoading } from '@/components';
import { ModalWindow } from '@/features';

import { Formik, Form, Field } from 'formik';
import { forgotPasswordValidation } from '@features/validation/validation-helpers.js';

import classNames from 'classnames';
import styles from './forgot-password.scss';

export const ForgotPassword = () => {
  const { isLoading, isLoaded, error } = useSelector(forgotPasswordSelector, shallowEqual);

  const [setforgotPassword] = useActions([forgotPassword]);
  const setClearLoaded = useActions(clearLoaded);

  const history = useHistory();

  const { href } = window.location;
  console.log(window.location);

  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const submitHandler = (value) => {
    const sendingValue = value;
    sendingValue.formUrl = href;
    console.log(sendingValue);
    setforgotPassword(sendingValue);
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
                }}
                onSubmit={submitHandler}
                validationSchema={forgotPasswordValidation}
              >
                {({
                  errors, touched, isValid, dirty,
                }) => (
                  <Form className="p-3" noValidate>
                    <h3 className="text-center">Forgot your password?</h3>
                    <hr />
                    <p className="text-center">Don&apos;t worry! Just fill in your email and we&apos;ll send you a link to reset your password</p>
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
                      <p className="text-danger">{touched.email && errors.email}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <WithLoading isLoading={isLoading} variant="info" className="d-block mx-auto">
                        <Button
                          type="submit"
                          className={styles['form-button']}
                          disabled={!dirty || !isValid}
                        >Send
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
                title="Forgot password information"
                submitButtonText="Back"
                hideCancelButton
              >Please check your email and follow the link to reset your password.
              </ModalWindow>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
