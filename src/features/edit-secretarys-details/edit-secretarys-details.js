import React from 'react';
import className from 'classnames';
import { Formik, Form, Field } from 'formik';
import { Button } from '@components/button/index.js';
import * as Yup from 'yup';

import styles from './edit-secretarys-details.scss';

export const EditSecretarysDetails = () => {
  const secretary = {
    id: 145,
    email: 'secretaryemail@example.com',
    firstName: 'Isabella',
    lastName: 'Smith',
  };

  const formValidate = Yup.object().shape({
    firstName: Yup.string()
      .matches('[^А-Яа-я]+', 'Only Latin letters allowed')
      .matches('^[A-Z]', 'Capital letter needed')
      .min(2, 'Too Short!')
      .matches('^[A-Z]+[a-z]+$', 'Invalid Name')
      .max(50, 'Too Long!')
      .required('Name required'),
    lastName: Yup.string()
      .matches('[^А-Яа-я]+', 'Only Latin letters allowed')
      .matches('^[A-Z]', 'Capital letter needed')
      .min(2, 'Too Short!')
      .matches('^[A-Z]+[a-z]+$', 'Invalid Last Name')
      .max(50, 'Too Long!')
      .required('Last Name required'),
    email: Yup.string()
      .email('Invalid Email')
      .required('Email required'),
  });

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          firstName: secretary.firstName,
          lastName: secretary.lastName,
          email: secretary.email,
        }}
        validationSchema={formValidate}
        onSubmit={(values) => console.log(values)}
      >
        {({
          values, errors, touched, handleReset, isValid, dirty,
        }) => (
            <Form>
              <div className="container rounded shadow pb-3">
                <div className="row m-0 pt-3">
                  <div className="col-md-4">
                    <label htmlFor="firstName">First Name:</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      type="text"
                      className={className('form-control', { 'border-danger': errors.firstName })}
                      name="firstName"
                      id="firstName"
                      placeholder="Name"
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && <div className="text-danger mt-3">{errors.firstName}</div>}
                  </div>
                </div>
                <div className="row m-0 pt-3">
                  <div className="col-md-4">
                    <label htmlFor="lastName">Last Name:</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      type="text"
                      className={className('form-control', { 'border-danger': errors.lastName })}
                      name="lastName"
                      id="lastName"
                      placeholder="Lastname"
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && <div className="text-danger mt-3">{errors.lastName}</div>}
                  </div>
                </div>
                <div className="row m-0 pt-3">
                  <div className="col-md-4">
                    <label htmlFor="email">Email:</label>
                  </div>
                  <div className="col-md-8">
                    <Field
                      type="email"
                      className={className('form-control', { 'border-danger': errors.email })}
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                    />
                    {touched.email && errors.email && <div className="text-danger mt-3">{errors.email}</div>}
                  </div>
                </div>
                <div className="row m-0 pt-3">
                  <div className="col-md-3 col-4">
                    <Button disabled={!isValid} className="w-100" variant="danger" onClick={() => { console.log('You are Fired!'); }}>Fire</Button>
                  </div>
                  <div className="col-md-3 offset-md-3 col-4">
                    <button
                      disabled={!dirty}
                      type="button"
                      className={className(styles.button, 'btn btn-secondary w-100')}
                      onClick={handleReset}
                    >
                      Cancel
                  </button>
                  </div>
                  <div className="col-md-3 col-4">
                    <button
                      disabled={!isValid || !dirty}
                      className={className(styles.button, 'btn btn-success w-100')}
                      type="submit"
                    >
                      Save
                  </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
      </Formik>
    </div>
  );
};