import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { secretariesSelector } from '../../../models/index.js';
import { WithLoading } from '../../../components/index.js';
import { number } from 'prop-types';
import { useHistory } from 'react-router-dom';

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
      <div className="container-fluid shadow">
        <div className="container pb-2">
          <h3 className="pt-3">Secretary&apos;s details</h3>
          <hr />
          <WithLoading isLoading={isLoading && !loaded} className="d-block mx-auto">
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