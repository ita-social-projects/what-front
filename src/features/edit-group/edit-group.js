import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from '../../components';
import { validate } from '../validation/validation-helpers.js';

import classNames from 'classnames';
import styles from './edit-groups.scss';

export const EditGroup = () => {
  const courses = [
    { id: 0, name: 'WebUI' },
    { id: 1, name: 'Java' },
    { id: 2, name: '.Net' },
    { id: 3, name: 'Kotlin' },
  ];

  const onSubmit = (values, actions) => {
    console.log(values)
    actions.resetForm();
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-sm-8 card shadow'>
          <Formik
            initialValues={{
              name: '',
              startDate: '',
              finishDate: '',
              courseId: courses[0].id
            }}
            onSubmit={onSubmit}
          >
            {({ values, errors }) => (
            <Form className='px-2 py-4' name='start-group'>
              <h3>Group Editing</h3>
              <hr />
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='name'>Group name</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.name})}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='group name'
                    validate={validate}
                  />
                  {/*{errors.groupName && <p className='text-danger mb-0'>{errors.groupName}</p>}*/}
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='course'>Course</label>
                </div>
                <div className='col-md-8'>
                  <Field as='select' 
                    className={classNames('custom-select', {['border-danger']: errors.courseId})} 
                    name='courseId' 
                    id='course' 
                  >
                    { courses.map(({ id, name }) => <option value={name} key={id}>{name}</option>) }
                  </Field>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='start-date'>Start date</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.startDate})}
                    type='date'
                    name='startDate'
                    id='start-date'
                    validate={validate}
                  />
                  {/*{errors.startDate && <p className='text-danger mb-0'>{errors.startDate}</p>}*/}
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='finish-date'>Finish date</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.finishDate})}
                    type='date'
                    name='finishDate'
                    id='finish-date'
                    validate={validate}
                  />
                  {/*{errors.endDate && <p className='text-danger mb-0'>{errors.endDate}</p>}*/}
                </div>
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
  )
};
