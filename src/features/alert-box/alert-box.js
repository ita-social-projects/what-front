import React from 'react';
import { Alert } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';

import { alertSelector, removeAlert } from '@/features';
import { useActions } from '@/shared';
import styles from './alert-box.scss';

export const AlertBox = () => {
  const { messages } = useSelector(alertSelector, shallowEqual);
  const dispatchRemoveAlert = useActions(removeAlert);

  return (
    messages.length ? (
      <div className={styles['alert-container']}>
        {
          messages.map(({ variant, message, id }) => (
            <Alert
              variant={variant}
              key={id}
              dismissible
              onClose={() => dispatchRemoveAlert(id)}
            >
              {message}
            </Alert>
          ))
        }
      </div>
    ) : null
  );
};
