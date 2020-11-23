import React from 'react';
import classNames from 'classnames';
import styles from './tab.scss';

export const Tab2 = ({title, id}) => {
  return (
    <a className={classNames('nav-item nav-link', styles.tab)} data-id={id}>{title}</a>
  );
}