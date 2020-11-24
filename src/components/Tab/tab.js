import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import styles from './tab.scss';

export const Tab = ({title, tabIndex, isActive, onClick}) => {
  return (
    <a className={classNames('nav-item nav-link', styles.tab, {[`${styles.active}`]: isActive})} 
      onClick={(event) => {
        onClick(tabIndex);
      }}
    >{title}</a>
  );
};

Tab.prototype = {
  title: propTypes.string.isRequired,
  onClick: propTypes.func,
  tabIndex: propTypes.number,
  isActive: propTypes.bool,
};