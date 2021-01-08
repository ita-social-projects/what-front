import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { currentUserSelector } from '@/models';
import { paths } from '@/shared';

import { Button } from '@/components';

import styles from './my-profile.scss';

export const MyProfile = () => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const history = useHistory();

  return (
    <div className={styles.wrapper}>
      <div className="container card shadow col-10">
        <div className="container pb-2">
          <h3 className="pt-3">My Profile</h3>
          <hr />
          <div className="row mt-3">
            <div className="col-sm-4 font-weight-bold pb-1">First Name:</div>
            <div className="col-sm-8">{currentUser?.first_name}</div>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-sm-4 font-weight-bold pb-1">Last Name:</div>
            <div className="col-sm-8">{currentUser?.last_name}</div>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-sm-4 font-weight-bold pb-1">Email address:</div>
            <div className="col-sm-8">{currentUser?.email}</div>
          </div>
          <hr />
          <div className="row mb-2">
            <div className="col-sm-6 offset-sm-6">
              <Button className="float-right" onClick={() => (history.push(paths.CHANGE_PASSWORD))}>
                <span>Change password</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};