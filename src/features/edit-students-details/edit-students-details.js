import React, { useState } from 'react';
import className from 'classnames';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './edit-students-details.scss';
import Icon from '../../icon.js';
import { Button } from '../../components/index.js';

export const EditStudentsDetails = () => {
  // temporary
  const student = {
    firstName: 'Taras',
    secondName: 'Tarasov',
    email: 'tarastarasov@gmail.com',
    groups: [
      { id: 1, name: 'Group 1' },
      { id: 2, name: 'Group 2' },
      { id: 3, name: 'Group 3' },
      { id: 4, name: 'Group 4' },
      { id: 5, name: 'Group 5' },
      { id: 6, name: 'Group 6' },
    ],
  };

  // temporary
  const groupList = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
    { id: 4, name: 'Group 4' },
    { id: 5, name: 'Group 5' },
    { id: 6, name: 'Group 6' },
    { id: 7, name: 'Group 7' },
    { id: 8, name: 'Group 8' },
    { id: 9, name: 'Group 9' },
  ];

  const [groups, setGroups] = useState(student.groups || 0);
  const [groupInput, setInputValue] = useState('Type name of group');
  const [error, setError] = useState(null);

  const handleGroupDelete = (evt) => {
    setError('');
    const element = evt.target.closest('li');
    const groupsList = groups.filter((group) => group.name !== element.dataset.groupname);
    setGroups(groupsList);
  };

  const handleGroupAdd = () => {
    const checkName = groups.find((group) => group.name === groupInput);
    if (checkName) {
      setError('This group was already added to the list');
    } else {
      const groupObject = groupList.find((group) => group.name === groupInput);
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

  const handleInputChange = (evt) => {
    setError('');
    const { value } = evt.target;
    setInputValue(value);
  };

  const validate = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(
        '^[A-Za-zа-яА-ЯёЁ]+$',
        'Invalid first name',
      ),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(
        '^[A-Za-zа-яА-ЯёЁ]+$',
        'Invalid second name',
      ),
    email: Yup.string().email('Invalid email'),
  });

  const validateStudentData = (values) => {
    const { firstName, lastName, email } = values;
    const name = firstName[0].toUpperCase() + firstName.slice(1);
    const surname = lastName[0].toUpperCase() + lastName.slice(1);
    const studentGroupIds = groups.map((el) => el.id);
    const editedStudent = {
      firstName: name,
      lastName: surname,
      email,
      studentGroupIds,
    };
    // put method waiting for saga
  };

  const handleExclude = () => {
    // waiting for saga
  };

  const onSubmit = (values, actions) => {
    actions.resetForm();
    setGroups(student.groups);
    validateStudentData(values);
  };

  const resetInput = () => {
    setGroups(student.groups);
  };

  return (
    <Formik
      initialValues={{
        firstName: student.firstName,
        lastName: student.secondName,
        email: student.email,
        groups: '',
      }}
      validationSchema={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors }) => (
        <Form>
          <div className={styles.wrapper}>
            <div className="container shadow pb-3">
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
                    value={values.firstName}
                  />
                  { errors.firstName ? <div className={styles.error}>{errors.firstName}</div> : null }
                </div>
              </div>

              <div className="row m-0 pt-3">
                <div className="col-md-4">
                  <label htmlFor="lastName">Second Name:</label>
                </div>
                <div className="col-md-8">
                  <Field
                    type="text"
                    className={className('form-control', { 'border-danger': errors.lastName })}
                    name="lastName"
                    id="lastName"
                    value={values.lastName}
                  />
                  { errors.lastName ? <div className={styles.error}>{errors.lastName}</div> : null }
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
                    value={values.email}
                  />
                  { errors.email ? <div className={styles.error}>{errors.email}</div> : null }
                </div>
              </div>

              <div className="row m-0 pt-3">
                <div className="col-md-4">
                  <label htmlFor="groupsInput">Group(`s):</label>
                </div>
                <div className="d-flex flex-column col-md-8">
                  <div className="d-flex flex-row flex-nowrap input-group">
                    <Field
                      name="groupsInput"
                      id="groupsInput"
                      className={className(
                        'form-control col-md-11',
                        styles['group-input'],
                        { 'border-danger': error },
                      )}
                      list="group-list"
                      placeholder={groupInput}
                      onChange={handleInputChange}
                    />
                    <datalist id="group-list">
                      {groupList.map(({ id, name }) => (
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

              <div className="row m-0 pt-3">
                <div className="col-md-8 offset-md-4">
                  <ul className="d-flex flex-wrap justify-content-between p-0">
                    {groups.map(({ id, name }) => (
                      <li
                        className={className(styles['list-element'],
                          'd-flex bg-light border border-outline-secondary rounded')}
                        key={id}
                        data-groupId={id}
                        data-groupName={name}
                      >
                        {name}
                        <button className="btn p-0 ml-auto mr-2 font-weight-bold text-danger" onClick={handleGroupDelete}>X</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="row m-0 pt-3">
                <div className="col-md-3 col-4">
                  <Button className="w-100" variant="danger" onClick={handleExclude}>Exclude</Button>
                </div>
                <div className="col-md-3 offset-md-3 col-4">
                  <button
                    className={className('w-100 btn btn-secondary', styles.button)}
                    type="reset"
                    onClick={resetInput}
                  >
                    Clear
                  </button>
                </div>
                <div className="col-md-3 col-4">
                  <button className={className('w-100 btn btn-success', styles.button)} type="submit">Save</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};