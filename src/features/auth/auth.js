import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { useActions, paths, homepages } from '@/shared/index.js';

import { Cookie } from '@/utils';
import { login, currentUserSelector } from '@/models/index.js';
import { Button, WithLoading } from '@/components/index.js';

import { Formik, Field, Form } from 'formik';
import { authValidation } from '@features/validation/validation-helpers.js';

import classNames from 'classnames';
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
  const jwt = Cookie.get('jwt');

  useEffect(() => {
    if (jwt) {
      history.push(paths.NOT_FOUND);
    }
  }, [history, jwt]);

  const submitHandler = (values) => {
    dispatchLogIn(values);
  };

  useEffect(() => {
    if (loaded && !requestError && currentUser) {
      history.push(homepages[currentUser.role]);
    }
  }, [currentUser, history, loaded, requestError]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-8 col-sm-10 col-12">
            <div className={classNames(styles.form, 'card, shadow')}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={submitHandler}
                validationSchema={authValidation}
              >
                {({
                  errors,
                  touched,
                }) => (
                  <Form className="p-3">
                    <h3 className="text-center">Sign in to WHAT</h3>
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
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        className={classNames('form-control', { 'border-danger': errors.password && touched.password })}
                        name="password"
                        placeholder="Password"
                        id="password"
                        autoComplete="on"
                      />
                      <p className="text-danger">{touched.password && errors.password}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <WithLoading isLoading={isLoading} variant="info" className="d-block mx-auto">
                        <Button type="submit" className={styles['form-button']}>Sign in</Button>
                      </WithLoading>
                    </div>
                    {requestError && <p className="text-center text-danger mt-2">{requestError}</p>}
                    <div className="d-flex justify-content-between mt-3">
                      <div className="text-center">
                        <p><Link to={paths.FORGOT_PASSWORD} className={styles['form-link']}>Fogot Password?</Link></p>
                      </div>
                      <div className="text-right">
                        <p>Don&apos;t have an account? <Link to={paths.REGISTRATION} className={styles['form-link']}>Registration</Link></p>
                      </div>
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
