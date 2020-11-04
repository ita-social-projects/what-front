import React, {useState} from 'react';
import {useForm} from './useForm.js';
import {validate} from './validate-login.js';

export const Form = () => {
  const {handleChangeInput, handleRememberMe, handleSubmit, values, errors} = useForm(submit, validate);
  function submit() {
    console.log('submitted succesfully', values)
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form className="col-6 col-md-6 col-sm-6  py-4 px-4 card shadow" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              name="email" 
              className={!errors.email && 'form-control' || errors.email && 'form-control is-invalid'} 
              value={values.email} 
              id="email" 
              placeholder="Enter email" 
              onChange={handleChangeInput} 
            />
            {errors.email && <p className="text-danger mb-0">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              className={!errors.password && 'form-control' || errors.password && 'form-control is-invalid'} 
              value={values.password} 
              id="password" placeholder="Password" 
              onChange={handleChangeInput} 
            />
            {errors.password && <p className="text-danger mb-0">{errors.password}</p>}
          </div>
          <div className="form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              name="remember" 
              id="checkbox" 
              onChange={handleRememberMe}
            />
            <label className="form-check-label mb-2" htmlFor="checkbox">Remember me</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );  
}

