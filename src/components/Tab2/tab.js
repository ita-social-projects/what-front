import React from 'react';
import classNames from 'classnames';
import styles from './tab.scss';

export const Tab2 = ({title, children}) => {
  const toggleActive = () => {
    console.log('hello')
  }

  return (
    <a className={classNames('nav-item nav-link', styles.tab)}
      onClick={toggleActive}
    >{title}</a>
  );
}