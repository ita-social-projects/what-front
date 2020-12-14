import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from '@/shared';
import { activeStudentsSelector, studentGroupsSelector, editStudent, removeStudent } from '@/models';

import { Formik, Form, Field } from 'formik';
import { formValidate } from '../validation/validation-helpers.js';
import { WithLoading } from '@/components';
import { Button } from '../../components/index.js';
import Icon from '../../icon.js';

import styles from './edit-students-details.scss';
import classNames from 'classnames';

export const EditStudentsDetails = ({id}) => {
  const { 
    data,
    isLoading: isStudentLoading, 
    isLoaded: isStudentLoaded, 
  } = useSelector(activeStudentsSelector, shallowEqual);

  const { 
    studentGroups,
    isLoading: areGroupsLoading,
    isLoaded: areGroupsLoaded,
  } = useSelector(studentGroupsSelector, shallowEqual);
   
  const [updateStudent, deleteStudent] = useActions([editStudent, removeStudent]);
  const student = data.find((student) => student.id ==id);
  student.groups = [
    { id: 5, name: 'Griffindor', startDate: "2018-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 5, studentIds: [20,19,18,17,29,16], mentorIds: [11,4,6,5] },
    { id: 6, name: '122_17_1', startDate: "2019-09-01T00:00:00", finishDate: "2022-09-01T00:00:00", courseId: 6, studentIds: [21,22,25,23,24], mentorIds: [] },
  ];
  console.log(student);
  const history = useHistory();

  const [groups, setGroups] = useState(student.groups || 0);
  const [groupInput, setInputValue] = useState('Type name of group');
  const [error, setError] = useState(null);

  const handleGroupDelete = (event) => {
    setError('');
    const element = event.target.closest('li');
    const groupsList = groups.filter((group) => group.name !== element.dataset.groupname);
    setGroups(groupsList);
  };

  const handleGroupAdd = () => {
    const checkName = groups.find((group) => group.name === groupInput);
    if (checkName) {
      setError('This group was already added to the list');
    } else {
      const groupObject = studentGroups.find((group) => group.name === groupInput);
      console.log(groupObject);
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
    // updateStudent(id, editedStudent)
    console.log(editedStudent);
  };

  const handleExclude = () => {
    deleteStudent(id)
  };

  const onSubmit = (values) => {
    setGroups(student.groups);
    validateStudentData(values);
  };

  const resetInput = () => {
    setGroups(student.groups);
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-12 col-sm-8 card shadow'>
          <div className='px-2 py-4'>
            <h3>Student Editing</h3>
            <hr />
            <WithLoading isLoading={isStudentLoading || !isStudentLoaded || areGroupsLoading || !areGroupsLoaded} 
              className={classNames(styles['loader-centered'])}
            >
              <Formik
                initialValues={{
                  firstName: student.firstName,
                  lastName: student.lastName,
                  email: student.email,
                  groups: '',
                }}
                validationSchema={formValidate}
                onSubmit={onSubmit}
              >
                {({ values, errors }) => (
                  <Form>
                    <div className="row m-0 pt-3">
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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
                            {studentGroups.map(({ id, name }) => (
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
                              className={classNames(styles['list-element'],
                                'd-flex bg-light border border-outline-secondary rounded')}
                              key={id}
                              data-groupid={id}
                              data-groupname={name}
                            >{name}
                            <button className="btn p-0 ml-auto mr-2 font-weight-bold text-danger" 
                              type='button'
                              onClick={handleGroupDelete}>X</button>
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
                          className={classNames('w-100 btn btn-secondary', styles.button)}
                          type="reset"
                          onClick={resetInput}
                        >Clear
                        </button>
                      </div>
                      <div className="col-md-3 col-4">
                        <button className={classNames('w-100 btn btn-success', styles.button)} type="submit">Save</button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};