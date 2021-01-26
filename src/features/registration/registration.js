import React, { useState, useEffect } from 'react';
import { useActions, paths } from '@/shared/index.js';
import { useSelector, shallowEqual } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Cookie } from '@/utils';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames';
import { clearRegistration, registration, registrationSelector } from '../../models/index.js';

import { registrationValidation } from '../validation/validation-helpers.js';
import { Button, WithLoading } from '../../components/index.js';
import { SuccessfulRegistrationAlert } from './successful-registration-alert.js';

import styles from './registration.scss';

export const Registration = () => {
  const history = useHistory();
  const jwt = Cookie.get('jwt');

  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const { isLoading, isLoaded, error } = useSelector(registrationSelector, shallowEqual);

  const signUp = useActions(registration);
  const clearLoaded = useActions(clearRegistration);

  const handleSubmitModal = () => {
    handleCloseModal();
    clearLoaded();
    history.push(paths.AUTH);
  };

  const onSubmit = (values) => {
    signUp(values);
  };

  useEffect(() => {
    if (isLoaded && !error) {
      handleShowModal();
    }
  }, [isLoaded, error]);

  useEffect(() => {
    if (jwt) {
      history.push(paths.NOT_FOUND);
    }
  }, [history, jwt]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 col-md-6 col-sm-12">
            <div className={styles.form}>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                onSubmit={onSubmit}
                validationSchema={registrationValidation}
              >
                {({ values, errors, touched }) => (
                  <Form className="p-3">
                    <h3 className="text-center">Sign up to WHAT</h3>
                    <hr />
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        name="firstName"
                        className={classNames('form-control', { 'border-danger': errors.firstName && touched.firstName })}
                        id="firstName"
                        placeholder="First name"
                      />
                      <p className="text-danger mb-0">{touched.firstName && errors.firstName}</p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <Field
                        name="lastName"
                        className={classNames('form-control', { 'border-danger': errors.lastName && touched.lastName })}
                        id="lastName"
                        placeholder="Last name"
                      />
                      <p className="text-danger mb-0">{touched.lastName && errors.lastName}</p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <Field
                        type="email"
                        name="email"
                        className={classNames('form-control', { 'border-danger': errors.email && touched.email })}
                        id="email"
                        placeholder="Email"
                      />
                      <p className="text-danger">{touched.email && errors.email}</p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        className={classNames('form-control', { 'border-danger': errors.password && touched.password })}
                        id="password"
                        placeholder="Password"
                        autoComplete="on"
                      />
                      <p className="text-danger mb-0">{touched.password && errors.password}</p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className={classNames('form-control', { 'border-danger': errors.confirmPassword && touched.confirmPassword })}
                        id="confirm-password"
                        placeholder="Confirm password"
                        autoComplete="on"
                      />
                      <p className="text-danger mb-0">{touched.confirmPassword && errors.confirmPassword}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <WithLoading isLoading={isLoading}>
                        <Button type="submit" className="btn btn-block btn-warning">Sign up</Button>
                      </WithLoading>
                    </div>
                    <p className="text-danger text-center mt-2">{error}</p>
                    <div className="text-center mt-3">
                      <p>Already have an account? <Link to={paths.AUTH}>Log in</Link></p>
                    </div>
                    <SuccessfulRegistrationAlert
                      toShow={toShowModal}
                      onClose={handleCloseModal}
                      onSubmit={handleSubmitModal}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};