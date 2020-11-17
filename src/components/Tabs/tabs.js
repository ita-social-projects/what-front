import React, { useState } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import styles from './tabs.scss';

const arrow = (
  <svg width='1em' height='1em' viewBox='0 0 16 16' className='bi bi-arrow-left' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path fillRule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'/>
  </svg>
);

export const Tabs = ({initialTabs, linkBack}) => {
  
  const [tabs, setTabs] = useState(initialTabs);

  const toggleActive = (event) => {

    setTabs((prevstate) => {
      prevstate.find((tab) => {
        if(tab.active) {
          tab.active = false
        } 
      })
      
      return prevstate.map((tab, index) => {
        if(index == event.target.dataset.id) {
          return {
            ...tab,
            active: !tab.active,
          }
        } else {
          return tab
        }
      })
    })
  };

  return (
    <>
      <a className={classNames('nav-item nav-link d-flex align-items-center')}
        href={`#${linkBack}`} 
        onClick={toggleActive}
      >{arrow}</a>
      {tabs.map(tab => {
        return (
          <a className={classNames('nav-item nav-link', styles.tab, {[`${styles.active}`]:  tab.active})}
            key={tab.id}
            data-id={tab.id} 
            onClick={toggleActive}
          >{tab.title}</a>
        )
      })}
      {tabs.map(({id, active, content}) => {
        return active ? <div className='w-100' key={id}>{content}</div> : null
      })}
    </>
  );
}

Tabs.propTypes = {
  tabs: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    active: propTypes.bool
  })),
  linkBack: propTypes.string.isRequired
}

