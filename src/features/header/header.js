import React, { useEffect, useState } from 'react';
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
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill="#fff"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/></svg>
);

const sidebarToggler = (
  <svg width="2em" height="2.5em" viewBox="0 0 16 16" className="bi bi-justify" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
  </svg>
);

export const Header = () => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);


  const history = useHistory();

  const currentURL = history.location.pathname;

  const rolesObject = {
    4: [
      { id: 0, title: 'Students', link: paths.STUDENTS, active: true },
      { id: 1, title: 'Mentors', link: paths.MENTORS, active: false },
      { id: 2, title: 'Secretaries', link: paths.SECRETARIES, active: false },
      { id: 3, title: 'Lessons', link: paths.LESSONS, active: false },
      { id: 4, title: 'Groups', link: paths.GROUPS, active: false },
      { id: 5, title: 'Courses', link: paths.COURSES, active: false },
      { id: 6, title: 'Schedule', link: paths.SCHEDULE, active: false },
      { id: 7, title: 'Role', link: paths.UNASSIGNED_USERS, active: false },
    ],
    3: [
      { id: 0, title: 'Students', link: paths.STUDENTS, active: false },
      { id: 1, title: 'Mentors', link: paths.MENTORS, active: true },
      { id: 2, title: 'Secretaries', link: paths.SECRETARIES, active: false },
      { id: 3, title: 'Lessons', link: paths.LESSONS, active: false },
      { id: 4, title: 'Groups', link: paths.GROUPS, active: false },
      { id: 5, title: 'Courses', link: paths.COURSES, active: false },
      { id: 6, title: 'Schedule', link: paths.SCHEDULE, active: false },
      { id: 7, title: 'Role', link: paths.UNASSIGNED_USERS, active: false },

    ],
    2: [
      { id: 0, title: 'Students', link: paths.STUDENTS, active: false },
      { id: 1, title: 'Mentors', link: paths.MENTORS, active: true },
      { id: 2, title: 'Lessons', link: paths.LESSONS, active: true },
      { id: 3, title: 'Groups', link: paths.GROUPS, active: false },
      { id: 4, title: 'Courses', link: paths.COURSES, active: false },
      { id: 5, title: 'Schedule', link: paths.SCHEDULE, active: false },
    ],
    1: [
      { id: 0, title: 'Courses', link: paths.COURSES, active: false },
      { id: 1, title: 'Schedule', link: paths.SCHEDULE, active: true },
      { id: 2, title: 'Support', link: paths.SUPPORT, active: false },
    ],
  };

  const [tabs, setTabs] = useState([]);
  const [sidebar, setSidebar] = useState({
    active: false,
  });

  // exper
  const [dropdown, setDropdown] = useState({
    show: false,
  });

  useEffect(() => {
    const headerArray = rolesObject[currentUser.role];
    const resultArr = headerArray.map((tab) => ({
      ...tab,
      active: currentURL.includes(tab.title.toLowerCase()),
    }));
    setTabs(resultArr);
  }, [currentUser, currentURL]);

  const toggleActiveTab = (event) => {
    setTabs((prevstate) => {
      prevstate.find((tab) => {
        if (tab.active) {
          tab.active = false;
        }
      });

      return prevstate.map((tab, index) => {
        if (index == event.target.dataset.id) {
          return {
            ...tab,
            active: !tab.active,
          };
        }
        return tab;
      });
    });
  };
  function toggleSidebar() {
    setSidebar((prevState) => ({
      ...prevState,
      active: !prevState.active,
    }));
  }
  const [logoutDefined] = useActions([logOut]);

  const loggingOut = () => {
    logoutDefined();
  };

  function toggleDropdown() {
    setDropdown((prevState) => ({
      show: !prevState.show,
    }));
  }


  return (
    <nav className={classNames('navbar navbar-expand-md', styles.header)}>
      <div className="collapse navbar-collapse d-flex justify-content-between h-100">

        <div className={styles['header__sidebar-toggler']} onClick={toggleSidebar}>{sidebarToggler}</div>

        <div className={classNames(styles.header__sidebar, { [styles['sidebar--active']]: sidebar.active })}>
          <div className={styles['header__sidebar-links']}>
            {tabs.map(({ id, title, link }) => (
              <Link
                className="nav-item nav-link"
                to={`${link}`}
                key={id}
                onClick={toggleSidebar}
              >{title}
              </Link>
            ))}
          </div>
        </div>

        <div className={classNames('navbar-nav nav-tabs', styles['header__navbar-links'])}>
          {tabs.map(({ id, title, link, active }) => (
            <Link
              className={classNames('nav-item nav-link', { [`${styles.active}`]: active })}
              to={`${link}`}
              key={id}
              data-id={id}
              onClick={toggleActiveTab}
            >{title}
            </Link>
          ))}
        </div>

        <div className={styles.header__account}>
          <div className={styles['header__account-user']}>
            <Link
              className={styles['header__account-user--icon']}
              onClick={toggleActiveTab}
              to={paths.MY_PROFILE}
            >{user}
            </Link>
            <span
              className={styles['header__account-user--fullname']}
              onClick={toggleDropdown}
            >{`${currentUser?.first_name}`} {`${currentUser?.last_name}`} </span>
          </div>


          <div className={styles[`header__dropdown-toggler`]}
               onClick={toggleDropdown}>
            <span className="header__dropdown-icon">&#9660;</span>
          </div>
          <ul className={dropdown.show ? styles[`header__dropdown-list-show`] : styles[`header__dropdown-list`]}>
            <li className={styles['header__dropdown-list--item']}>
                <Link
                className={styles['header__account-user--icon']}
                onClick={toggleActiveTab}
                to={paths.MY_PROFILE}
              >My profile
              </Link>
            </li>
            <li className={styles['header__dropdown-list--item']}>
                <Link
                className={styles['header__account-user--icon']}
                onClick={toggleActiveTab}
                to={paths.CHANGE_PASSWORD}
              >Change password
              </Link>
            </li>
            <li className={styles['header__dropdown-list--item']}>
              <a onClick={() => { loggingOut(); }}>Log Out</a>
            </li>
          </ul>
        </div>

      </div>

    </nav>
  );
};
