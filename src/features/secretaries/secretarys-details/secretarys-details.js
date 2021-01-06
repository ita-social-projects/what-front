import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { number } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { WithLoading } from '@components/index.js';
import { currentUserSelector, secretariesSelector } from '@models/index.js';
import classNames from 'classnames';

export const SecretarysDetails = ({ id }) => {
  const { data, isLoading, loaded } = useSelector(secretariesSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const history = useHistory();
  const secretary = data.find((user) => user.id === id);

  useEffect(() => {
    if (!secretary && loaded) {
      history.push('/404');
    }
  }, [secretary, loaded, history]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classNames("col-sm-12 card shadow", 
          { "col-md-12": currentUser.role === 4, "col-md-6": currentUser.role === 3})}
        >
          <div className="px-2 py-4">
          <h3>Secretary&apos;s details</h3>
          <hr />
          <WithLoading isLoading={isLoading && !loaded} className="d-block mx-auto">
            <div className="row">
              <div className="col-12 col-md-6 font-weight-bolder">First Name:</div>
              <div className="col-12 col-md-6">{secretary?.firstName}</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 col-md-6 font-weight-bolder">Last Name:</div>
              <div className="col-12 col-md-6">{secretary?.lastName}</div>
            </div>
            <hr />
            <div className="row mb-3">
              <div className="col-12 col-md-6 font-weight-bolder">Email address:</div>
              <div className="col-12 col-md-6">{secretary?.email}</div>
            </div>
          </WithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};

SecretarysDetails.propTypes = {
  id: number.isRequired,
};