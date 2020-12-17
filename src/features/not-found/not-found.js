import React from 'react';
import className from 'classnames';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { homepages } from '@/shared';
import { currentUserSelector } from '@/models';
import styles from './not-found.scss';

import { Button } from '../../components/index.js';

export const NotFound = () => {
  const history = useHistory();
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  return (
    <div className={styles.wrapper}>
      <div className="row justify-content-center">
        <div className={className(styles['error-container'], 'col-lg-4 col-md-6 col-sm-8 col-10 text-center p-3')}>
          <h1 className="mt-3">Oops!</h1>
          <h2 className="mt-3">404 - Page Not Found</h2>
          <div className="mt-4">Sorry, an error has occured,<br /> Requested page not found!</div>
          <Button type="button" onClick={() => (history.push(homepages[currentUser.role]))} variant="warning" className="mt-4">HOME</Button>
        </div>
      </div>
    </div>
  );
};
