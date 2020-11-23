import React from 'react';
import classNames from 'classnames';
import styles from './tab.scss';

export const Tab2 = ({title, tabIndex, isActive}) => {
  return (
    <a className={classNames('nav-item nav-link', styles.tab, {[`${styles.active}`]: isActive})} 
      data-id={tabIndex}
    >{title}</a>
  );
};