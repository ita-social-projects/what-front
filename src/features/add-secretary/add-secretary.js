import React from 'react';
import classNames from 'classNames';
import styles from './add-secretary.scss';
import { Formik, Field, Form } from 'formik';
import { validateEmail, validateName } from '../validation/validation-helpers.js';
import { useHistory } from 'react-router-dom';


export const AddSecretary = () => {

  const history = useHistory();

  const addNewSecretary = (values) => {
    const { firstName, lastName, email } = values;
    const name = firstName[0].toUpperCase() + firstName.slice(1);
    const surName = lastName[0].toUpperCase() + lastName.slice(1);
    const secretary = {
      id: 0,
      firstName: name,
      lastName: surName,
      email,
    };
    history.push('/#back');
    console.log(secretary)
    // post method
  }

  const onSubmit = (values, actions) => {
    actions.resetForm();
    addNewSecretary(values);
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-sm-8 card shadow'>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
            }}
            onSubmit={onSubmit}
          >
            {({ values, errors }) => (
            <Form className='px-2 py-4' name='start-group'>
              <h3>Secretary`s details</h3>
              <hr />
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='firstName'>First Name:</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.firstName})}
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Type a name'
                    validate={validateName}
                  />
                </div>
                {errors.firstName && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.firstName}</p>}
              </div>
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='lastName'>Last Name:</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.lastName})}
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Type a name'
                    validate={validateName}
                  />
                </div>
                {errors.lastName && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.lastName}</p>}
              </div>
              <div className='row mb-3'>
                <div className='col d-flex align-items-center'>
                  <label className='mb-0' htmlFor='email'>Email:</label>
                </div>
                <div className='col-md-8'>
                  <Field
                    className={classNames('form-control', {['border-danger']: errors.email})}
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Type an email'
                    validate={validateEmail}
                  />
                </div>
                {errors.email && <p className={classNames('w-100 text-danger mb-0', styles.error)}>{errors.email}</p>}
              </div>
              <div className='row justify-content-around mt-4'>
                <input type="reset" 
                  name="reset-btn" 
                  className={classNames("btn btn-secondary w-25", styles.button)} 
                  value="Clear"
                />
                <input type="submit" 
                  name="submit-btn" 
                  className={classNames('btn btn-success w-25', styles.button)} 
                  value="Save" 
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