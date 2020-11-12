import React, {useState} from 'react';
import propTypes from 'prop-types';
import styles from './Tabs.scss';

export const Tabs = ({tabs}) => {
  const [tabss, setTabs] = useState(tabs)

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
      tabss.map(tab => {
        return <a className={`${styles['tab']} nav-item nav-link ${tab.active ? styles['active'] : ''}`}
          href={`#${tab.link}`}
          key={tab.id}
          data-id={tab.id} 
          onClick={toggleActive}
          >{tab.title}</a>
      })
  );
}

Tabs.propTypes = {
  tabs: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    active: propTypes.bool,
    link: propTypes.string.isRequired
  }))
}