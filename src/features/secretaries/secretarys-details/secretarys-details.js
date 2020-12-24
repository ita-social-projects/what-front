import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { number } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { WithLoading } from '@components/index.js';
import { secretariesSelector } from '@models/index.js';

import styles from './secretarys-details.scss';

export const SecretarysDetails = ({ id }) => {
  const { data, isLoading, loaded } = useSelector(secretariesSelector, shallowEqual);
  const history = useHistory();
  const secretary = data.find((user) => user.id === id);

  useEffect(() => {
    if (!secretary && loaded) {
      history.push('/404');
    }
  }, [secretary, loaded, history]);

  return (
    <div className={styles.wrapper}>
      <div className="container-fluid card shadow">
        <div className="container pb-2">
          <h3 className="pt-3">Secretary&apos;s details</h3>
          <hr />
          <WithLoading isLoading={isLoading && !loaded} className="d-block mx-auto">
            <div className="row mt-3">
              <div className="col-6">First Name:</div>
              <div className="col-6">{secretary?.firstName}</div>
            </div>
            <hr />
            <div className="row mt-3">
              <div className="col-6 pb-1">Last Name:</div>
              <div className="col-6">{secretary?.lastName}</div>
            </div>
            <hr />
            <div className="row mt-3">
              <div className="col-6 pb-1">Email address:</div>
              <div className="col-6">{secretary?.email}</div>
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