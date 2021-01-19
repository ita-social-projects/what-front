import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useActions, paths } from '@/shared';
import { currentUserSelector, logOut } from '@/models';
import { shallowEqual, useSelector } from 'react-redux';
import Icon from '@/icon.js';

import styles from './sidebar.scss';

const sidebarToggler = (
  <svg width="2em" height="2.5em" viewBox="0 0 16 16" className="bi bi-justify" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
  </svg>
);

export const Sidebar = () => {
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
      { id: 7, title: 'Assigment', link: paths.UNASSIGNED_USERS, active: false },
    ],
    3: [
      { id: 0, title: 'Students', link: paths.STUDENTS, active: false },
      { id: 1, title: 'Mentors', link: paths.MENTORS, active: true },
      { id: 2, title: 'Secretaries', link: paths.SECRETARIES, active: false },
      { id: 3, title: 'Lessons', link: paths.LESSONS, active: false },
      { id: 4, title: 'Groups', link: paths.GROUPS, active: false },
      { id: 5, title: 'Courses', link: paths.COURSES, active: false },
      { id: 6, title: 'Schedule', link: paths.SCHEDULE, active: false },
      { id: 7, title: 'Assigment', link: paths.UNASSIGNED_USERS, active: false },

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

  function toggleSidebar(event) {
    const screenWidth = document.documentElement.clientWidth;
    if ( (event.type === 'mouseout' && screenWidth < 769) || (event.type === 'mouseover' && screenWidth < 769) ) {
      return false;
    }

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
      <nav className={styles.sidebar}>

        <div className={classNames(styles['sidebar__toggler'])} onClick={toggleSidebar}>{sidebarToggler}</div>

        <div className={styles.sidebar__icons}></div>

        <div onMouseOver={toggleSidebar} onMouseOut={toggleSidebar} className={classNames(styles.sidebar__content, { [styles['sidebar--active']]: sidebar.active })}>
          <div className={styles['sidebar__links']}>
            {tabs.map(({ id, title, link }) => (
              <Link
                className="nav-item nav-link d-flex justify-content-between"
                to={`${link}`}
                key={id}
              >
                {title}
                <Icon icon={title} className="icon" size={32} viewBox="0 0 32 32" />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    )
}