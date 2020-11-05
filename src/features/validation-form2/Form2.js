import React from 'react';
import {Formik} from 'formik';

export const Form = () => {
  return (
    <div>
      <Formik 
        initialValues={{email: '', password: '', remember: false}} 
        onSubmit={(data, {setSubmitting}) => {
          setSubmitting(true)
          console.log(data)
          setSubmitting(false)
        }}
      >
        {({values, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
          <div className="container">
            <div className="row justify-content-center">
              <form className="col-6 col-md-6 col-sm-6  py-4 px-4 card shadow" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input 
                    type="email" 
                    name="email" 
                    className='form-control' 
                    id="email" 
                    placeholder="Enter email"
                    value={values.email} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    className='form-control'
                    id="password" 
                    placeholder="Password"
                    value={values.password} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    name="remember" 
                    id="checkbox"
                    checked={values.remember} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label className="form-check-label mb-2" htmlFor="checkbox">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}