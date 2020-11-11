import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tabs.scss';

export const Tabs = ({props}) => {
  return (
      props.map(tab => {
        return <a className={`${styles['tab']} nav-item nav-link ${tab.active ? styles['active'] : ''}`}
          href={`#${tab.link}`}
          key={tab.id} 
          >{tab.title}</a>
      })
  );
}