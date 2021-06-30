import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { number } from 'prop-types';

import { paths, useActions } from '@/shared';
import {
  updatedSecretarySelector, deletedSecretarySelector,
  updateSecretary, deleteSecretary, secretariesSelector,
} from '@models/index.js';

import { Button, WithLoading } from '@/components/index.js';
import { addAlert, ModalWindow } from '@features';

import { Formik, Form, Field } from 'formik';
import { editSecretaryValidation } from '@features/validation/validation-helpers.js';

import classNames from 'classnames';

export const EditSecretarysDetails = ({ id }) => {
  const {
    data,
    isLoading: isSecretariesLoading,
    isLoaded: isSecretariesLoaded,
    error: secretaryError,
  } = useSelector(secretariesSelector, shallowEqual);

  const {
    isLoading: isUpdateLoading,
    isLoaded: isUpdateLoaded,
    error: secretaryUpdateError,
  } = useSelector(updatedSecretarySelector, shallowEqual);

  const {
    isLoading: isDeleteLoading,
    isLoaded: isDeleteLoaded,
    error: secretaryDeleteError,
  } = useSelector(deletedSecretarySelector, shallowEqual);

  const [editSecretary, dispatchAddAlert] = useActions([updateSecretary, addAlert]);
  const [fireSecretary] = useActions([deleteSecretary]);

  const secretary = data.find((user) => user.id === id);
  const history = useHistory();

  const [toShowModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (secretaryError) {
      history.push(paths.NOT_FOUND);
    }
  }, [secretaryError, history]);

  useEffect(() => {
    if (!secretaryUpdateError && isUpdateLoaded) {
      history.push(paths.SECRETARIES);
      dispatchAddAlert('The secretary has been successfully edited', 'success');
    }
    if (secretaryUpdateError && !isUpdateLoaded) {
      dispatchAddAlert(secretaryUpdateError);
    }
  }, [secretaryUpdateError, isUpdateLoaded, history, dispatchAddAlert]);

  useEffect(() => {
    if (!secretaryDeleteError && isDeleteLoaded) {
      history.push(paths.SECRETARIES);
      dispatchAddAlert('The secretary has been fired', 'success');
    }
    if (secretaryDeleteError && !isDeleteLoaded) {
      dispatchAddAlert(secretaryDeleteError);
    }
  }, [secretaryDeleteError, isDeleteLoaded, history, dispatchAddAlert]);

  const onSubmit = (values) => {
    editSecretary(id, values);
  };

  const handleDelete = () => {
    handleCloseModal();
    fireSecretary(id);
  };

  return (
    <div className="container" data-testid="editSecretarysDetails">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-8 card shadow">
          <div className="px-2 py-4">
            <h3>Edit Secretary&apos;s details</h3>
            <hr />
            <WithLoading isLoading={isSecretariesLoading || !isSecretariesLoaded} className="d-block mx-auto">
              <Formik
                initialValues={{
                  firstName: secretary?.firstName,
                  lastName: secretary?.lastName,
                  email: secretary?.email,
                }}
                validationSchema={editSecretaryValidation}
                onSubmit={onSubmit}
              >
                {({
                  values, errors, touched, isValid, dirty,
                }) => (
                  <Form>
                    <div className="container pb-3 px-0">
                      <div className="row m-0 pt-3">
                        <div className="col-md-4">
                          <label htmlFor="firstName" className="font-weight-bold">First Name:</label>
                        </div>
                        <div className="col-md-8">
                          <Field
                            type="text"
                            className={classNames('form-control', { 'border-danger': errors.firstName })}
                            name="firstName"
                            id="firstName"
                            placeholder="Name"
                            value={values?.firstName}
                          />
                          {touched.firstName && errors.firstName && <div className="text-danger mt-3">{errors?.firstName}</div>}
                        </div>
                      </div>
                      <div className="row m-0 pt-3">
                        <div className="col-md-4">
                          <label htmlFor="lastName" className="font-weight-bold">Last Name:</label>
                        </div>
                        <div className="col-md-8">
                          <Field
                            type="text"
                            className={classNames('form-control', { 'border-danger': errors.lastName })}
                            name="lastName"
                            id="lastName"
                            placeholder="Lastname"
                            value={values?.lastName}
                          />
                          {touched.lastName && errors.lastName && <div className="text-danger mt-3">{errors?.lastName}</div>}
                        </div>
                      </div>
                      <div className="row m-0 pt-3">
                        <div className="col-md-4">
                          <label htmlFor="email" className="font-weight-bold">Email:</label>
                        </div>
                        <div className="col-md-8">
                          <Field
                            type="email"
                            className={classNames('form-control', { 'border-danger': errors.email })}
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={values?.email}
                          />
                          {touched.email && errors.email && <div className="text-danger mt-3">{errors?.email}</div>}
                        </div>
                      </div>
                      <div className="row m-0 pt-3 px-2">
                        <div className="col-md-3 col-4 px-1">
                          <Button
                            type="button"
                            className="w-100"
                            variant="dark"
                            onClick={handleShowModal}
                            disabled={!isValid || dirty || isDeleteLoading || isUpdateLoading}
                          >
                            Lay off
                          </Button>
                        </div>
                        <div className="col-md-3 offset-md-3 col-4 px-1">
                          <Button
                            type="reset"
                            className="w-100"
                            disabled={!dirty}
                            variant="secondary"
                          >
                            Clear
                          </Button>
                        </div>
                        <div className="col-md-3 col-4 px-1">
                          <Button
                            type="submit"
                            className="w-100"
                            variant="info"
                            disabled={!isValid || !dirty || isUpdateLoading || isDeleteLoading
                              || errors.firstName || errors.lastName || errors.email}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <ModalWindow
                toShow={toShowModal}
                onSubmit={handleDelete}
                onClose={handleCloseModal}
                submitButtonText="Delete"
                useRedButton
                marginLeft
              >
                Are you sure you want to fire this secretary?
              </ModalWindow>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};

EditSecretarysDetails.propTypes = {
  id: number.isRequired,
};
