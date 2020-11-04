import React from 'react';

import styles from './modal-container.module.scss';

export const withModalContainer = (WrappedComponent) => {


  return (props) => {
    return (
      <div>
        <WrappedComponent closeModalHandler={() => {}} {...props} />
      </div>
    );
  };
};
