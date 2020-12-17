import React from 'react';
import { Formik, Field, Form } from 'formik';
import classNames from 'classnames';
import { Button } from '@/components';
import { validateName, validateEmail } from '../validation/validation-helpers.js';
import styles from './edit-mentor.scss';

export const EditMentor = () => {
  const mentor = {
    firstName: '',
    lastName: '',
    email: '',
  };
  const editMentor = (values) => {
    const { firstName, lastName } = values;
    const mentorFirstname = firstName[0].toUpperCase() + firstName.slice(1);
    const mentorLastname = lastName[0].toUpperCase() + lastName.slice(1);
    const editedMentor = {
      ...values,
      firstName: mentorFirstname,
      lastName: mentorLastname,
    };
  };
  const onSubmit = (values, actions) => {
    actions.resetForm();
    editMentor(values);
  };
  return (
    <div className="w-100 card shadow">
      <div className="container">
        <Formik
          initialValues={{
            firstName: mentor.firstName,
            lastName: mentor.lastName,
            email: mentor.email,
          }}
          onSubmit={onSubmit}
        >
          {({ values, errors }) => (
            <Form className="px-2 py-4" name="firstName">
              <h3>Mentor Editing</h3>
              <hr />
              <div className="row mb-3">
                <div className="col d-flex align-items-center">
                  <label className="mb-0" htmlFor="firs_name">First name</label>
                </div>
                <div className="col-md-8">
                  <Field
                    className={classNames('form-control', { 'border-danger': errors.firstName })}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First name"
                    validate={validateName}
                  />
                </div>
                {errors.firstName && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.firstName}</p>}
              </div>
              <div className="row mb-3">
                <div className="col d-flex align-items-center">
                  <label className="mb-0" htmlFor="lastName">Last Name</label>
                </div>
                <div className="col-md-8">
                  <Field
                    className={classNames('form-control', { 'border-danger': errors.lastName })}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last name"
                    validate={validateName}
                  />
                </div>
                {errors.lastName && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.lastName}</p>}
              </div>
              <div className="row mb-3">
                <div className="col d-flex align-items-center">
                  <label className="mb-0" htmlFor="email">Email</label>
                </div>
                <div className="col-md-8">
                  <Field
                    className={classNames('form-control', { 'border-danger': errors.email })}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    validate={validateEmail}
                  />
                </div>
                {errors.email && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.email}</p>}
              </div>
              <div className="row justify-content-around mt-5">
                <Button variant="danger w-25">Fire</Button>
                <input
                  type="reset"
                  name="reset-btn"
                  className="btn btn-secondary w-25"
                  value="Clear all"
                />
                <input
                  type="submit"
                  name="submit-btn"
                  className="btn btn-success w-25"
                  value="Confirm"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
