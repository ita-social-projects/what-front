import React from 'react';
import styles from './auth.scss';

export const Auth = () => {  
  return (
    <div className={styles.wrapper}>    
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8">            
            <div className={styles.form}>
              <form className="p-3">
                <div className="form-group">
                  <input type="email" className="form-control" id="auth-form__email" placeholder="Email address" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="auth-form__password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-block btn-warning">Sign in</button>
                <div className="text-center mt-3">
                  <p>Don't have an account? <a href="#" className={styles.link}>Registration</a></p>                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}