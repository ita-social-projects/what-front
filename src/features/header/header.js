// import React, { useState } from 'react';
// import classNames from 'classnames';
// import styles from './header.scss';
// import { Link } from 'react-router-dom';
// import Icon from '@/icon'
//
//
// export const Header = () => {
//
//   const roles = {
//     4: [
//       {id: 0, title: 'Students', link: 'students', active: false},
//       {id: 1, title: 'Mentors', link: 'mentors', active: false},
//       {id: 2, title: 'Secretaries', link: 'secretaries', active: false},
//       {id: 3, title: 'Lessons', link: 'lessons', active: false},
//       {id: 4, title: 'Groups', link: 'groups', active: false},
//       {id: 5, title: 'Courses', link: 'courses', active: false},
//       {id: 6, title: 'Schedule', link: 'schedule', active: false},
//       {id: 7, title: 'Add Role', link: 'add-role', active: true},
//     ],
//     3: [
//       {id: 0, title: 'Students', link: 'students', active: false},
//       {id: 1, title: 'Mentors', link: 'mentors', active: false},
//       {id: 4, title: 'Groups', link: 'groups', active: false},
//       {id: 5, title: 'Courses', link: 'courses', active: false},
//       {id: 6, title: 'Schedule', link: 'schedule', active: true},
//       {id: 7, title: 'Add Role', link: 'add-role', active: false},
//     ],
//     2: [
//       {id: 3, title: 'Lessons', link: 'lessons', active: true},
//       {id: 4, title: 'Groups', link: 'groups', active: false},
//       {id: 5, title: 'Courses', link: 'courses', active: false},
//       {id: 6, title: 'Schedule', link: 'schedule', active: false},
//     ],
//     1: [
//       {id: 6, title: 'Schedule', link: 'schedule', active: true},
//       {id: 8, title: 'Support', link: 'support', active: false},
//     ]
//   }
//
//   const [tabs, setTabs] = useState({roles.userId});
//
//   const [sidebar, setSidebar] = useState({
//     active: false,
//   });
//
//   const toggleActiveTab = (event) => {
//     setTabs((prevstate) => {
//       prevstate.find((tab) => {
//         if(tab.active) {
//           tab.active = false;
//         }
//       });
//
//       return prevstate.filter((tab, index) => {
//         for (let el of tab) {
//           if(el)
//           if(index == event.target.dataset.id) {
//             return {
//               ...tab,
//               active: !tab.active,
//             };
//           } else {
//             return tab;
//           }
//         }
//       });
//     });
//   };
//
//   function toggleSidebar() {
//     setSidebar((prevState) => {
//       return {
//         ...prevState,
//         active: !prevState.active,
//       };
//     });
//   }
//
//   return (
//     <nav className={classNames('navbar navbar-expand-md', styles.header)}>
//       <div className='collapse navbar-collapse d-flex justify-content-between h-100'>
//
//         <div className={styles['header__sidebar-toggler']} onClick={toggleSidebar}>{sidebarToggler}</div>
//
//         <div className={classNames(styles['header__sidebar'], {[styles['sidebar--active']]: sidebar.active})}>
//           <div className={styles['header__sidebar-links']}>
//             {tabs.map(({ id, title, link }) => (
//               <a className='nav-item nav-link'
//                 href={`#${link}`}
//                 key={id}
//                 onClick={toggleSidebar}
//               >{title}</a>
//             ))}
//           </div>
//         </div>
//
//         <div className={classNames('navbar-nav nav-tabs', styles['header__navbar-links'])}>
//           {tabs.map(({id, title, link, active}) => (
//             <Link className={classNames('nav-item nav-link', {[`${styles.active}`]: active})}
//               to={`/${link}`}
//               key={id}
//               data-id={id}
//               onClick={toggleActiveTab}
//             >{title}</Link>
//           ))}
//         </div>
//
//         <div className={styles['header__account']}>
//           <div className={styles['header__account-user']}>
//             <a className={styles['header__account-user--icon']}
//               onClick={toggleActiveTab}
//               href='/my-profile'
//             >
//               <Icon icon="Profile"></Icon>
//             </a>
//             <span className={styles['header__account-user--fullname']}>First Name<br />Last Name </span>
//           </div>
//           <div className={styles['header__account-logout']}>
//             <Icon icon="LogOut"></Icon>
//           </div>
//         </div>
//
//       </div>
//     </nav>
//   );
// };
//
