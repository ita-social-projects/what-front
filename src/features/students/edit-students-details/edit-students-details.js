import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';

import { WithLoading } from '@/components';
import { currentStudentSelector, loadStudentGroupsSelector, editStudentSelector,
  removeStudentSelector, currentStudentGroupsSelector, editStudent, removeStudent } from '@/models';
import { Button } from '@components/index.js';
import Icon from '@/icon.js';
import { paths, useActions } from '@/shared';
import { addAlert, ModalWindow } from '@/features';
import { editStudentValidation } from '@features/validation/validation-helpers';
import styles from './edit-students-details.scss';

export const EditStudentsDetails = ({ id }) => {
  const history = useHistory();
  const {
    data: student,
    isLoading: isStudentLoading,
    isLoaded: isStudentLoaded,
    error: studentError,
  } = useSelector(currentStudentSelector, shallowEqual);

  const {
    data: allGroups,
    isLoading: areGroupsLoading,
    isLoaded: areGroupsLoaded,
  } = useSelector(loadStudentGroupsSelector, shallowEqual);

  const {
    data: studentGroups,
    isLoading: areStudentGroupsLoading,
    isLoaded: areStudentGroupsLoaded,
    error: studentGroupsError,
  } = useSelector(currentStudentGroupsSelector, shallowEqual);

  const {
    isLoading: isEditedLoading,
    isLoaded: isEditedLoaded,
    error: isEditedError,
  } = useSelector(editStudentSelector, shallowEqual);

  const {
    isLoading: isRemovedLoading,
    isLoaded: isRemovedLoaded,
    error: isRemovedError,
  } = useSelector(removeStudentSelector, shallowEqual);

  const [
    updateStudent,
    deleteStudent,
    dispatchAddAlert,
  ] = useActions([editStudent, removeStudent, addAlert]);

  const [groups, setGroups] = useState(studentGroups || 0);
  const [groupInput, setInputValue] = useState('Type name of group');
  const [error, setError] = useState(null);
  const [toShowModal, setShowModal] = useState(false);

  useEffect(() => {
    if (studentError && studentGroupsError) {
      history.push(paths.NOT_FOUND);
    }
  }, [history, studentError, studentGroupsError]);

  useEffect(() => {
    if (!isEditedError && isEditedLoaded) {
      history.push(paths.STUDENTS);
      dispatchAddAlert('Student information has been edited successfully', 'success');
    }
    if (isEditedError && !isEditedLoaded) {
      dispatchAddAlert(isEditedError);
    }
  }, [dispatchAddAlert, history, isEditedError, isEditedLoaded]);

  useEffect(() => {
    if (!isRemovedError && isRemovedLoaded) {
      history.push(paths.STUDENTS);
      dispatchAddAlert('Student has been excluded', 'success');
    }
  }, [dispatchAddAlert, history, isRemovedError, isRemovedLoaded]);

  useEffect(() => {
    setGroups(studentGroups);
  }, [studentGroups]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleExclude = () => {
    handleCloseModal();
    deleteStudent(id);
  };

  const handleInputChange = (event) => {
    setError('');
    const { value } = event.target;
    setInputValue(value);
  };

  const handleGroupAdd = () => {
    const checkName = groups.find((group) => group.name === groupInput);
    if (checkName) {
      setError('This group was already added to the list');
    } else {
      const groupObject = allGroups.find((group) => group.name === groupInput);
      if (groupObject) {
        const res = [
          ...groups,
          groupObject,
        ];
        setGroups(res);
      } else {
        setError('Invalid group name');
      }
    }
  };

  const handleGroupDelete = (event) => {
    setError('');
    const element = event.target.closest('li');
    const groupsList = groups.filter((group) => group.name !== element.dataset.groupname);
    setGroups(groupsList);
  };

  const validateStudentData = (values) => {
    const { firstName, lastName, email } = values;
    const name = firstName[0].toUpperCase() + firstName.slice(1);
    const surname = lastName[0].toUpperCase() + lastName.slice(1);
    const studentGroupIds = groups.map((group) => group.id);
    const editedStudent = {
      firstName: name,
      lastName: surname,
      email,
      studentGroupIds,
    };
    updateStudent(id, editedStudent);
  };

  const onSubmit = (values) => {
    validateStudentData(values);
  };

  const resetInput = () => {
    setGroups(studentGroups);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 col-sm-8 card shadow">
          <div className="px-2 py-4">
            <h3>Student Editing</h3>
            <hr />
            <WithLoading
              isLoading={isStudentLoading || !isStudentLoaded && areGroupsLoading || !areGroupsLoaded}
              className={styles['loader-centered']}
            >
              <Formik
                initialValues={{
                  firstName: student?.firstName,
                  lastName: student?.lastName,
                  email: student?.email,
                  groups: '',
                }}
                validationSchema={editStudentValidation}
                onSubmit={onSubmit}
              >
                {({ values, errors, isValid, dirty }) => (
                  <Form>
                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="firstName">First Name:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="text"
                          className={classNames('form-control', { 'border-danger': errors.firstName })}
                          name="firstName"
                          id="firstName"
                          value={values.firstName}
                        />
                        { errors.firstName ? <div className={styles.error}>{errors.firstName}</div> : null }
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="lastName">Last Name:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="text"
                          className={classNames('form-control', { 'border-danger': errors.lastName })}
                          name="lastName"
                          id="lastName"
                          value={values.lastName}
                        />
                        { errors.lastName ? <div className={styles.error}>{errors.lastName}</div> : null }
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="email">Email:</label>
                      </div>
                      <div className="col-md-8">
                        <Field
                          type="email"
                          className={classNames('form-control', { 'border-danger': errors.email })}
                          name="email"
                          id="email"
                          value={values.email}
                        />
                        { errors.email ? <div className={styles.error}>{errors.email}</div> : null }
                      </div>
                    </div>

                    <div className="row m-0 pt-3">
                      <div className="col-md-4 font-weight-bolder">
                        <label htmlFor="groupsInput">Group(`s):</label>
                      </div>
                      <div className="d-flex flex-column col-md-8">
                        <div className="d-flex flex-row flex-nowrap input-group">
                          <Field
                            name="groupsInput"
                            id="groupsInput"
                            className={classNames(
                              'form-control col-md-11',
                              styles['group-input'],
                              { 'border-danger': error },
                            )}
                            list="group-list"
                            placeholder={groupInput}
                            onChange={handleInputChange}
                          />
                          <datalist id="group-list">
                            {allGroups.map(({ id, name }) => (
                              <option key={id}>{name}</option>
                            ))}
                          </datalist>
                          <div className="input-group-append">
                            <Button variant="warning" onClick={handleGroupAdd}><Icon icon="Plus" /></Button>
                          </div>
                        </div>
                        { error ? <div className={styles.error}>{error}</div> : null}
                      </div>
                    </div>
                    <WithLoading
                      isLoading={areStudentGroupsLoading}
                      className={styles['loader-centered']}
                    >
                      <div className="row m-0 pt-3">
                        <div className="col-md-8 offset-md-4">
                          <ul className="d-flex flex-wrap justify-content-between p-0">
                            {groups.map(({ id, name }) => (
                              <li
                                className={classNames(styles['list-element'],
                                  'd-flex bg-light border border-outline-secondary rounded')}
                                key={id}
                                data-groupid={id}
                                data-groupname={name}
                              >{name}
                                <button
                                  className="btn p-0 ml-auto mr-2 font-weight-bold text-danger"
                                  type="button"
                                  onClick={handleGroupDelete}
                                >X
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </WithLoading>
                    <div className="row m-0 pt-3">
                      <div className="col-md-3 col-4">
                        <Button
                          className="w-100"
                          variant="danger"
                          onClick={handleShowModal}
                          disabled={!isValid || dirty || isEditedLoading || isRemovedLoading}
                        >Exclude
                        </Button>
                      </div>
                      <div className="col-md-3 offset-md-3 col-4">
                        <button
                          disabled={!dirty}
                          className={classNames('w-100 btn btn-secondary', styles.button)}
                          type="reset"
                          onClick={resetInput}
                        >Clear
                        </button>
                      </div>
                      <div className="col-md-3 col-4">
                        <button
                          className={classNames('w-100 btn btn-success', styles.button)}
                          type="submit"
                          disabled={!isValid || !dirty || isEditedLoading || isRemovedLoading
                            || errors.firstName || errors.lastName || errors.email}
                        >Save
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <ModalWindow
                toShow={toShowModal}
                onSubmit={handleExclude}
                onClose={handleCloseModal}
              >Are you sure you want to exclude this student?
              </ModalWindow>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};
