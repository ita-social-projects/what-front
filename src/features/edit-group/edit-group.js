import React from 'react';
import { Formik, Field, Form } from 'formik';
import { validateGroupName, validateDate } from '../validation/validation-helpers.js';

import classNames from 'classnames';
import styles from './edit-groups.scss';

export const EditGroup = () => {

  const group = {
    name: 'Group 1',
    startDate: '2021-01-14',
    finishate: '2021-03-15',
    courses: [
      { id: 0, name: 'WebUI' },
      { id: 1, name: 'Java' },
      { id: 2, name: '.Net' },
      { id: 3, name: 'Kotlin' },
    ],
  };

  const editGroup = (values) => {
    const {name} = values;
    const groupName = name[0].toUpperCase() + name.slice(1);
    const editedGroup = {
      ...values,
      name: groupName,
    };
    // put method waiting for saga
  };

  const onSubmit = (values, actions) => {
    actions.resetForm();
    editGroup(values);
  };

  return (
    <div className='w-100'>
      <div className='row justify-content-center'>
        <div className='w-100 card shadow p-3'>
          <Formik
            initialValues={{
              name: group.name,
              startDate: group.startDate,
              finishDate: group.finishate,
              courseId: group.courses[0].id
            }}
            onSubmit={onSubmit}
          >
            {({ values, errors }) => (
            <Form className='px-2 py-4' name='start-group'>
              <h3>Group Editing</h3>
              <hr />
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='name'>Group name:</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.name})}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='group name'
                    validate={validateGroupName}
                  />
                </div>
                {errors.name && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.name}</p>}
              </div>
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='course'>Course:</label>
                </div>
                <div className='col-md-8'>
                  <Field as='select'
                    className={classNames('custom-select')}
                    name='courseId'
                    id='course'
                  >
                    { group.courses.map(({ id, name }) => <option value={id} key={id}>{name}</option>) }
                  </Field>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='start-date'>Start date:</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.finishDate})}
                    type='date'
                    name='startDate'
                    id='start-date'
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='finish-date'>Finish date:</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.finishDate})}
                    type='date'
                    name='finishDate'
                    id='finish-date'
                    validate={(value) => validateDate(values.startDate, value)}
                  />
                </div>
                {errors.finishDate && <p className={classNames('text-danger mb-0', styles.error)}>{errors.finishDate}</p>}
              </div>
              <div className='row justify-content-around mt-4'>
                <input type="reset"
                  name="reset-btn"
                  className={classNames("btn btn-secondary w-25", styles.button)}
                  value="Clear all"
                />
                <input type="submit"
                  name="submit-btn"
                  className={classNames('btn btn-success w-25', styles.button)}
                  value="Confirm"
                />
              </div>
            </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
