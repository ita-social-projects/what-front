import React from 'react';
import styles from './tabs.scss';

export const Tabs2 = ({children, selectedIndex}) => {
  return (
    <div className='nav nav-tabs w-75'>{children}</div>
  );
}