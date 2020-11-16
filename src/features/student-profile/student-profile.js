import React from 'react';
import classNames from 'classnames';

import styles from './student-profile.scss';

const dot = (
  <svg width='1em' height='1em' viewBox="0 0 16 16" className='bi bi-dot' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path fillRule='evenodd' d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/>
  </svg>
);

export const StudentProfile = () => {
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-auto col-md-8 col-sm-8 col-lg-7 col-xl-7 py-4 px-4 card shadow'>
          <h1 className={classNames(styles['profile__header'])}>Student Details</h1>
          <hr />
          <div className={classNames('row', styles['profile__details-wrapper'])}>
            <div className='col-12 col-md-6 font-weight-bold'><span>{dot} First name: </span></div>
            <div className={classNames('col-12 col-md-6', styles['profile__details'])}><span>Name</span></div>
          </div>
          <hr />
          <div className={classNames('row', styles['profile__details-wrapper'])}>
            <div className='col-12 col-md-6 font-weight-bold'><span>{dot} Last name: </span></div>
            <div className={classNames('col-12 col-md-6', styles['profile__details'])}><span>Surname</span></div>
          </div>
          <hr />
          <div className={classNames('row', styles['profile__details-wrapper'])}>
            <div className='col-12 col-md-6 font-weight-bold'><span>{dot} E-mail: </span></div>
            <div className={classNames('col-12 col-md-6', styles['profile__details'])}><span>My E-mail</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}