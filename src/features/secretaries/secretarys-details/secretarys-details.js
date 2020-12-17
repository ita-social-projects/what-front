import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { secretariesSelector } from '../../../models/index.js';
import { WithLoading } from '../../../components/index.js';
import { number } from 'prop-types';

import styles from './secretarys-details.scss';

export const SecretarysDetails = ({ id }) => {
  const { data, isLoading } = useSelector(secretariesSelector, shallowEqual);

  const secretary = data.find((user) => user.id === id);

  return (
    <div className={styles.wrapper}>
      <div className="container-fluid shadow">
        <div className="container pb-2">
          <h3 className="pt-3">Secretary&apos;s details</h3>
          <hr />
          <WithLoading isLoading={isLoading} className="d-block mx-auto">
            <div className="row mt-3">
              <div className="col-4 font-weight-bold">First Name:</div>
              <div className="col-8">{secretary?.firstName}</div>
            </div>
            <hr />
            <div className="row mt-3">
              <div className="col-4 font-weight-bold">Last Name:</div>
              <div className="col-8">{secretary?.lastName}</div>
            </div>
            <hr />
            <div className="row mt-3">
              <div className="col-4 font-weight-bold">Email address:</div>
              <div className="col-8">{secretary?.email}</div>
            </div>
            <hr />
          </WithLoading>
        </div>
      </div>
    </div>
  );
};

SecretarysDetails.propTypes = {
  id: number.isRequired,
};