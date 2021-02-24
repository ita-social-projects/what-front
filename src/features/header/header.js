import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useActions, paths } from '@/shared';
import { currentUserSelector, logOut } from '@/models';
import { shallowEqual, useSelector } from 'react-redux';

import styles from './header.scss';

const logout = (
  <svg width="1.5em" height="2em" viewBox="0 0 16 16" className="bi bi-door-closed-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M4 1a1 1 0 0 0-1 1v13H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2a1 1 0 0 0-1-1H4zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
  </svg>
);

const user = (
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" fill="#fff"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" /></svg>
);

export const Header = () => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const history = useHistory();

  const [dropdown, setDropdown] = useState(false);

  const [sidebar, setSidebar] = useState(false);

  const [logoutDefined] = useActions([logOut]);

  const loggingOut = () => {
    toggleDropdown();
    logoutDefined();
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (dropdown === true) {
            toggleDropdown();
          }
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, dropdown]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function toggleDropdown() {
    setDropdown(!dropdown);
  }

  function toggleSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <nav className={classNames('navbar navbar-expand-md px-3', styles.header)}>
      <div className="collapse navbar-collapse d-flex justify-content-between h-100 w-100">
        <div></div>
        <div className={styles.header__account} ref={wrapperRef}>
          <div className={styles['header__account-user']}>
            <Link
              className={styles['header__account-user--icon']}
              to={paths.MY_PROFILE}
            >{user}
            </Link>
            <span
              className={styles['header__account-user--fullname']}
              onClick={toggleDropdown}
            >{`${currentUser?.first_name}`} {`${currentUser?.last_name}`}
            </span>
          </div>

          <div
            className={styles['header__dropdown-toggler']}
            onClick={toggleDropdown}
          >
            <span className={dropdown ? styles['header__dropdown-icon-active'] : styles['header__dropdown-icon']}>&#9660;</span>
          </div>
          <ul className={dropdown ? styles['header__dropdown-list-show'] : styles['header__dropdown-list']}>
            <li className={styles['header__dropdown-list--item']} onClick={toggleDropdown}>
              <Link
                className={classNames('d-block w-100', styles['header__account-user--icon'])}
                to={paths.MY_PROFILE}
              >My profile
              </Link>
            </li>
            <li className={styles['header__dropdown-list--item']} onClick={toggleDropdown}>
              <Link
                className={classNames('d-block w-100', styles['header__account-user--icon'])}
                to={paths.CHANGE_PASSWORD}
              >Change password
              </Link>
            </li>
            <li className={styles['header__dropdown-list--item']}>
              <a className={classNames('d-block w-100', styles['header__account-user--icon'])} onClick={() => { loggingOut(); }}>Log Out</a>
            </li>
          </ul>
        </div>

      </div>

    </nav>
  );
};
