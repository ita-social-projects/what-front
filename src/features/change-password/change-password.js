import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { currentUserSelector, fetchAssignedUsersSelector, fetchUsersList, newPassword } from '@/models';
import { Button, WithLoading } from '@/components';
import { paths, useActions } from '@/shared';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import className from 'classnames';
import { changePasswordValidation } from '@features/validation/validation-helpers.js';
import styles from './change-password.scss';

export const ChangePassword = () => {
  const [loadUsers] = useActions([fetchUsersList]);
  const [setNewPassword] = useActions([newPassword]);

  const { currentUser: data } = useSelector(currentUserSelector, shallowEqual);
  const { users, isLoading, loaded } = useSelector(fetchAssignedUsersSelector, shallowEqual);

  const currentUser = users.find((user) => user.id === data.id);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const history = useHistory();

  const onSubmit = (value) => {
    console.log(value);
    setNewPassword(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className="container card shadow col-10">
        <div className="container pb-2">
          <h3 className="pt-3">Change Password</h3>
          <hr />
          <WithLoading isLoading={isLoading || !loaded} className="d-block mx-auto">
            <Formik
              initialValues={{
                // email: currentUser?.email,
                email: 'vitocorleone@vito.cor',
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
                          className="w-100"
                          variant="secondary"
                          onClick={() => { history.push(paths.MY_PROFILE); }}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="col-md-3 offset-md-6 col-sm-4 offset-sm-4 col-6 pl-1 pr-0">
                        <Button
                          variant="success"
                          className=" w-100"
                          type="submit"
                          disabled={!isValid || !dirty}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};