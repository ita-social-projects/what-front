import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { paths } from '@/shared';
import { currentUserSelector } from '@/models';
import { shallowEqual, useSelector } from 'react-redux';
import Icon from '@/icon.js';

import styles from './sidebar.scss';

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

  return (
    <nav className={styles.sidebar}>

      <div className={classNames(styles['sidebar__toggler'])} onClick={toggleSidebar}>
        <Icon icon={'SidebarToggler'} className="icon" size={26} viewBox="0 0 32 38" />
      </div>

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