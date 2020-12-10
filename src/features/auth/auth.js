import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import classNames from 'classnames';

import { Button, WithLoading } from '../../components/index.js';
import { useActions, homepages } from '../../shared/index.js';
import { login, currentUserSelector } from '../../models/index.js';
import { authValidationSchema } from '../validation/validation-helpers.js';
import styles from './auth.scss';

export const Auth = () => {
  const {
    isLoading,
    error: requestError,
    loaded,
    currentUser,
  } = useSelector(currentUserSelector, shallowEqual);
  const dispatchLogIn = useActions(login);
  const history = useHistory();

  const submitHandler = (values) => {
    dispatchLogIn(values);
  };

  if (loaded && !requestError) {
    history.push(homepages[currentUser.role]);
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className={styles.form}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={submitHandler}
                validateOnChange={false}
                validateOnMount={false}
                validationSchema={authValidationSchema}
              >
                {({
                  errors,
                  touched,
                }) => (
                  <Form className="p-3">
                    <div className="form-group">
                      <Field
                        type="email"
                        className={classNames('form-control', { 'border-danger': errors.email && touched.email })}
                        name="email"
                        placeholder="Email address"
                        required
                      />
                      <p className="text-danger">{touched.email && errors.email}</p>
                    </div>
                    <div className="form-group">
                      <Field
                        type="password"
                        className={classNames('form-control', { 'border-danger': errors.password && touched.password })}
                        name="password"
                        placeholder="Password"
                        required
                      />
                      <p className="text-danger">{touched.password && errors.password}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <WithLoading isLoading={isLoading}>
                        <Button type="submit" className="btn btn-block btn-warning">Sign in</Button>
                      </WithLoading>
                    </div>
                    <p className="text-danger text-center mt-2">{requestError}</p>
                    <div className="text-center mt-3">
                      <p>Don&apos;t have an account? <Link to="/registration" className={styles.link}>Registration</Link></p>
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
