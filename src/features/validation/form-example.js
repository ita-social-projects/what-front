import React from 'react';
import { Formik, Form, Field } from 'formik';
import { validateEmail, validatePassword, validateConfirmPassword } from './validation-helpers.js';

export const FormExample = () => {
  const onSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        remember: false,
      }}
      onSubmit={onSubmit}
    >
      {({values, errors }) => (
        <Form noValidate className='container'>
          <div className='row justify-content-center'>
            <div className='col-6 col-md-6 col-sm-6  py-4 px-4 card shadow'>
              <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <Field 
                  type='email' 
                  name='email'
                  validate={validateEmail} 
                  className='form-control'
                  id='email'
                  placeholder='Enter email' 
                /> 
                {errors.email && <p className='text-danger mb-0'>{errors.email}</p>}
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <Field 
                  type='password' 
                  name='password' 
                  validate={validatePassword}
                  className='form-control' 
                  id='password' 
                  placeholder='Password' 
                />
                {errors.password && <p className='text-danger mb-0'>{errors.password}</p>}
              </div>
              <div className='form-group'>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <Field 
                  type='password' 
                  name='confirmPassword'
                  validate={(value) => validateConfirmPassword(values.password, value)}
                  className='form-control' 
                  id='confirm-password' 
                  placeholder='Confirm password' 
                />
                {errors.confirmPassword && <p className='text-danger mb-0'>{errors.confirmPassword}</p>}
              </div>
              <div className='form-check'>
                <Field 
                  type='checkbox' 
                  className='form-check-input' 
                  name='remember' 
                  id='checkbox' 
                />
                <label className='form-check-label mb-2' htmlFor='checkbox'>Remember me</label>
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};