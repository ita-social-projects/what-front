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
    <div className="container">
      <div className={className(styles['error'],'text-center')}>
        <div className="col-7">
          <h1 className={className(styles['title'])}>404</h1>
          <p className={className(styles['text'])}> This page is missing</p>
          <Button type="button" onClick={() => (history.push(homepages[currentUser.role]))}
                   className={className(styles['home-button'], 'mt-4')}>HOME</Button>
        </div>
      </div>
    </div>);
};
