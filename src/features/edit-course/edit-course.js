import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from '@/shared';
import { coursesSelector, editCourse } from '@/models';

import { Formik, Form, Field } from 'formik';
import { validateGroupName } from '../validation/validation-helpers';

import styles from './edit-course.scss';
import classNames from 'classnames';

export const EditCourse = ({id}) => {

  const history = useHistory();

  const updateCourse = useActions(editCourse);
  const {data, isLoading} = useSelector(coursesSelector, shallowEqual);

  const course = data.find((course) => course.id == id);

  const onSubmit = (values) => {
    updateCourse(values, id);
    history.push('/courses');
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-12 col-sm-8 card shadow'>
          <Formik
            initialValues={{
              name: course.name,
            }}
            onSubmit={onSubmit}
          >
            {({ values, errors }) => (
            <Form className='px-2 py-4' name='start-group'>
              <h3>Course Editing</h3>
              <hr />
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='name'>Course name:</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.name})}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Course name'
                    validate={validateGroupName}
                  />
                </div>
                {errors.name && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.name}</p>}
              </div>
              <div className='row justify-content-around mt-4'>
                <Link
                  to='/courses' 
                  className={classNames('btn btn-secondary w-25', styles.button)} 
                >Back</Link>
                <input type='submit' 
                  name='submit-btn'
                  disabled={isLoading || errors.name}
                  className={classNames('btn btn-success w-25', styles.button)} 
                  value='Save' 
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