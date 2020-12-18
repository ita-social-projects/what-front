import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { currentUserSelector, fetchAssignedUsersSelector, fetchUsersList } from '@/models';
import { WithLoading } from '@/components';
import { useActions } from '@/shared';
import styles from './my-profile.scss';

export const MyProfile = () => {
  const { currentUser: data } = useSelector(currentUserSelector, shallowEqual);

  const [loadUsers] = useActions([fetchUsersList]);
  const { users, isLoading, loaded } = useSelector(fetchAssignedUsersSelector, shallowEqual);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const currentUser = users.find((user) => user.id === data.id);

  return (
    <div className={styles.wrapper}>
      <div className="container card shadow col-10">
        <div className="container pb-2">
          <h3 className="pt-3">My Profile</h3>
          <hr />
          <WithLoading isLoading={isLoading && !loaded} className="d-block mx-auto">
            <div className="row mt-3">
              <div className="col-sm-4 font-weight-bold pb-1">First Name:</div>
              <div className="col-sm-8">{currentUser?.firstName}</div>
            </div>
            <hr />
            <div className="row mt-3">
              <div className="col-sm-4 font-weight-bold pb-1">Last Name:</div>
              <div className="col-sm-8">{currentUser?.lastName}</div>
            </div>
            <hr />
            <div className="row mt-3">
              <div className="col-sm-4 font-weight-bold pb-1">Email address:</div>
              <div className="col-sm-8">{currentUser?.email}</div>
            </div>
            <hr />
          </WithLoading>
        </div>
      </div>
    </div>
  );
};