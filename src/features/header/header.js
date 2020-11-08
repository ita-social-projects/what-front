import React from 'react';
import styles from './header.module.scss';

const logout = (
  <svg width="1.5em" height="2em" viewBox="0 0 16 16" className={`bi bi-door-closed-fill`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
  </svg>
);

export const Header = () => {
  return (
    <nav className={`navbar navbar-expand-sm ${styles.header}`}>
      <div className="collapse navbar-collapse d-flex justify-content-between h-100">
        <div className={`navbar-nav nav-tabs ${styles['header__container-links']}`}>
          <a className='btn btn-warning nav-item nav-link' href="#profile">Profile</a>
          <a className='btn btn-warning nav-item nav-link' href="#progress">Progress</a>
          <a className='btn btn-warning nav-item nav-link' href="#schedule">Schedule</a>
          <a className='btn btn-warning nav-item nav-link' href="#support">Support</a>
        </div>
        <div className={`${styles['header__account']}`}>
          <div className={`pr-5 ${styles['header__account-fullname']}`}> 
            <span>Name Surname</span>
          </div>
          <div className={`${styles['header__account-logout']}`}>
            <span>{logout}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}