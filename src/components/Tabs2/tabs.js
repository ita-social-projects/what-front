import React, { useState } from 'react';
import classNames from 'classnames';

const arrow = (
  <svg width='1em' height='1em' viewBox='0 0 16 16' className='bi bi-arrow-left' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path fillRule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'/>
  </svg>
);

export const Tabs2 = ({children, defaultIndex}) => {

  const [tabs, setTabs] = useState({
    activeTabIndex: defaultIndex,
    isActive: defaultIndex
  });

  const toggleActive = (event, tabIndex) => {
    
    setTabs((prevState) => {
      return {
        ...prevState,
        activeTabIndex: event.target.dataset.id,
        isActive: tabIndex == tabs.activeTabIndex ? defaultIndex : tabIndex
      };
    });
  };

  return (
    <div className='w-75 m-5'>
      <div className='nav nav-tabs' onClick={toggleActive}>
        <a className={classNames('nav-item nav-link d-flex align-items-center')}
          href='#arrow'
        >{arrow}</a>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            tabIndex: index,
            isActive: index == tabs.isActive,
          })
        })}
      </div>
      <div>{children.map((child, index) => {
        if (tabs.activeTabIndex == index) {
          return children[index].props.children
        };
      })}
      </div>
    </div>
  );
};