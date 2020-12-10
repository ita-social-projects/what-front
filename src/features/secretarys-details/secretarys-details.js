import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { secretariesSelector } from '@models/index.js';
import { WithLoading } from '@components/index.js';
import { number } from 'prop-types';

import styles from './secretarys-details.scss';

export const SecretarysDetails = ({ id }) => {
  const { data, isLoading } = useSelector(secretariesSelector, shallowEqual);

  const secretary = data.find((user) => user.id === id);

  return (
    <div className={styles.wrapper}>
      <div className="container shadow">
        <h3 className="text-center py-3">Secretary&apos;s details</h3>
        <div className="container pb-3">
          <WithLoading isLoading={isLoading} className="d-block mx-auto">
            <div className="row border-bottom mt-3">
              <div className="col-12 col-md-6">First Name:</div>
              <div className="col-12 col-md-6">{secretary?.firstName}</div>
            </div>
            <div className="row border-bottom mt-3">
              <div className="col-12 col-md-6">Last Name:</div>
              <div className="col-12 col-md-6">{secretary?.lastName}</div>
            </div>
            <div className="row border-bottom mt-3">
              <div className="col-12 col-md-6">Email address:</div>
              <div className="col-12 col-md-6">{secretary?.email}</div>
            </div>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};

SecretarysDetails.propTypes = {
  id: number.isRequired,
};