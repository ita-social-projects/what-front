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
  <svg width="1.5em" height="2em" viewBox="0 0 16 16" className="bi bi-people" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
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
      { id: 0, title: 'Students', link: paths.STUDENTS, active: false },
      { id: 1, title: 'Mentors', link: paths.MENTORS, active: false },
      { id: 2, title: 'Secretaries', link: paths.SECRETARIES, active: false },
      { id: 3, title: 'Lessons', link: paths.LESSONS, active: false },
      { id: 4, title: 'Groups', link: paths.GROUPS, active: false },
      { id: 5, title: 'Courses', link: paths.COURSES, active: false },
      { id: 6, title: 'Schedule', link: paths.SCHEDULE, active: false },
      { id: 7, title: 'Role', link: paths.UNASSIGNED_USERS, active: false },
      { id: 8, title: 'Role', link: paths.GROUP_DOWNLOAD, active: true },
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

  useEffect(() => {
    const headerArray = rolesObject[currentUser.role];
    const resultArr = headerArray.map((tab) => ({
      ...tab,
      active: currentURL.includes(tab.title.toLowerCase()),
    }));
    setTabs(resultArr);
  }, [currentUser]);

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
            <span className={styles['header__account-user--fullname']}>{`${currentUser?.first_name}`}<br />{`${currentUser?.last_name}`} </span>
          </div>
          <div className={styles['header__account-logout']}>
            <a onClick={() => { loggingOut(); }}>{logout}</a>
          </div>
        </div>

      </div>
    </nav>
  );
};
