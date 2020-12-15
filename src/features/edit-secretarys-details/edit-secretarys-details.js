import React, { useEffect } from 'react';
import className from 'classnames';
import { Formik, Form, Field } from 'formik';
import { Button, WithLoading } from '@/components/index.js';
import { number } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import {
  secretariesSelector, updatedSecretarySelector, deletedSecretarySelector,
  updateSecretary, deleteSecretary,
} from '@models/index.js';
import { formValidate } from '@features/validation/validation-helpers.js';
import { useHistory } from 'react-router-dom';
import { useActions } from '@/shared';

import styles from './edit-secretarys-details.scss';

export const EditSecretarysDetails = ({ id }) => {
  const {
    data,
    isLoading: isSecretariesLoading,
    loaded: isSecretariesLoaded,
  } = useSelector(secretariesSelector, shallowEqual);

  const {
    isLoading: isUpdateLoading,
    loaded: isUpdateLoaded,
    error: secretaryUpdateError,
  } = useSelector(updatedSecretarySelector, shallowEqual);

  const {
    isLoading: isDeleteLoading,
    loaded: isDeleteLoaded,
    error: secretaryDeleteError,
  } = useSelector(deletedSecretarySelector, shallowEqual);

  const [editeSecretary] = useActions([updateSecretary]);
  const [fireSecretary] = useActions([deleteSecretary]);

  const secretary = data.find((user) => user.id === id);
  const history = useHistory();

  useEffect(() => {
    if (!secretary && isSecretariesLoaded) {
      history.push('/404');
    }
  }, [secretary, isSecretariesLoaded, history]);

  useEffect(() => {
    if (!secretaryUpdateError && isUpdateLoaded) {
      history.push('/secretaries');
    }
  }, [secretaryUpdateError, isUpdateLoaded, history]);

  useEffect(() => {
    if (!secretaryDeleteError && isDeleteLoaded) {
      history.push('/secretaries');
    }
  }, [secretaryDeleteError, isDeleteLoaded, history]);

  const onSubmit = (value) => {
    editeSecretary(id, value);
  };

  const handleDelete = () => {
    fireSecretary(id);
  };

  return (
    <div className={styles.wrapper}>
      <div className="container-fluid shadow">
        <div className="container pb-2">
          <h3 className="pt-3">Edit Secretary&apos;s details</h3>
          <hr />
          <WithLoading isLoading={isSecretariesLoading && !isSecretariesLoaded} className="d-block mx-auto">
            <Formik
              initialValues={{
                firstName: secretary?.firstName,
                lastName: secretary?.lastName,
                email: secretary?.email,
              }}
              validationSchema={formValidate}
              onSubmit={onSubmit}
            >
              {({
                values, errors, touched, handleReset, isValid, dirty,
              }) => (
                <Form>
                  <div className="container pb-3 px-0">
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
                          value={values?.firstName}
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
                          value={values?.lastName}
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
                          value={values?.email}
                        />
                        {touched.email && errors.email && <div className="text-danger mt-3">{errors.email}</div>}
                      </div>
                    </div>
                    <div className="row m-0 pt-3">
                      <div className="col-md-3 col-4">
                        <Button
                          disabled={!isValid || isDeleteLoading}
                          className="w-100"
                          variant="danger"
                          onClick={handleDelete}
                        >
                          Fire
                        </Button>
                      </div>
                      <div className="col-md-3 offset-md-3 col-4">
                        <Button
                          disabled={!dirty}
                          type="button"
                          className={className(styles.button, 'btn btn-secondary w-100')}
                          onClick={handleReset}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="col-md-3 col-4">
                        <Button
                          disabled={!isValid || !dirty || isUpdateLoading}
                          className={className(styles.button, 'btn btn-success w-100')}
                          type="submit"
                          onClick={onSubmit}
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

EditSecretarysDetails.propTypes = {
  id: number.isRequired,
};