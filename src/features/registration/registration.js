import React, { useState } from 'react';
import { useActions } from '@/shared/index.js';
import { clearRegistration, registration, registrationSelector } from '../../models/index.js';
import { Link, useHistory } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import {  validatePassword, validateConfirmPassword, formValidate } from '../validation/validation-helpers.js';
import { Button, WithLoading } from '../../components/index.js';

import classNames from 'classnames';
import styles from './registration.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ModalWindow } from '../modal-window/index.js';

export const Registration = () => {
  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmitModal = () => {
    handleCloseModal();
    clear()
    history.push('/auth');
  };

  const history = useHistory();
  const {data: user, isLoading, isLoaded, error} = useSelector(registrationSelector);
  const signUp = useActions(registration);
  const clear = useActions(clearRegistration);
  const onSubmit = (values, actions) => {
    // actions.resetForm();
    signUp(values);
    console.log(values)
    
  };

  useEffect(() => {
    if (isLoaded && !error) {
      handleShowModal()
    }
  }, [isLoaded, error]);

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
              validationSchema={formValidate}
            >
              {({ values, errors, touched }) => (
                <Form className="p-3">
                  <h3>Registration</h3>
                  <hr />
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      name="firstName"
                      className={classNames('form-control', {'border-danger': errors.firstName && touched.firstName})}
                      id="firstName"
                      placeholder="Enter first name"
                    />
                    <p className="text-danger mb-0">{touched.firstName && errors.firstName}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      name="lastName"
                      className={classNames('form-control', {'border-danger': errors.lastName && touched.lastName})}
                      id="lastName"
                      placeholder="Enter last name"
                    />
                    <p className="text-danger mb-0">{touched.lastName && errors.lastName}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <Field
                      type="email"
                      name="email"
                      className={classNames('form-control', {'border-danger': errors.email && touched.email})}
                      id="email"
                      placeholder="Enter email"
                    />
                    <p className="text-danger">{touched.email && errors.email}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      validate={validatePassword}
                      className={classNames('form-control', {'border-danger': errors.password && touched.password})}
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
                      validate={(value) => validateConfirmPassword(values.password, value)}
                      className={classNames('form-control', {'border-danger': errors.confirmPassword && touched.confirmPassword})}
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
                  <div className="text-center mt-3">
                    <p>Already have an account? <Link to="/auth">Log in</Link></p>
                    <ModalWindow
                      toShow={toShowModal}
                      onSubmit={handleSubmitModal}
                      onClose={handleCloseModal}
                    >
                    Поздравлю, вы успешной зарегестрировались
                    </ModalWindow>
                  </div>
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