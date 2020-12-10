import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { arrayOf, number } from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import { currentUserSelector } from '../../models/index.js';

export const ProtectedRoute = ({ roles, ...otherProps }) => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  if (!currentUser) {
    return <Redirect to="/auth" />;
  }

  if (!roles.includes(currentUser.role)) {
    return <Redirect to="/404" />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...otherProps} />;
};

ProtectedRoute.propTypes = {
  roles: arrayOf(number).isRequired,
};
