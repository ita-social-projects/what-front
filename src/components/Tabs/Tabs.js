import React, {useState} from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Tabs.scss';

const arrow = (
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>
);


export const Tabs = ({initialTabs, back}) => {
  
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
            active: !tab.active
          } 
        } else {
          return tab
        }
      })
    })
  };

  return (
    <>
      <a className={classNames('nav-item nav-link', styles.back)} 
        href={`#${back}`} 
        onClick={toggleActive}
      >{arrow}</a>
      {tabs.map(tab => {
        return (
        <a className={classNames('nav-item nav-link', styles.tab, {[`${styles.active}`]:  tab.active})}
        href={`#${tab.link}`}
        key={tab.id}
        data-id={tab.id} 
        onClick={toggleActive}
        >{tab.title}</a>)
      })}
    </>
  );
}

Tabs.propTypes = {
  tabs: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    active: propTypes.bool,
    link: propTypes.string.isRequired
  })),
  back: propTypes.string.isRequired
}