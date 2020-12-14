import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { arrayOf, number } from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import { paths } from '@/shared/index.js';
import { currentUserSelector } from '../../models/index.js';

export const ProtectedRoute = ({ roles, ...otherProps }) => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  if (!currentUser) {
    return <Redirect to={paths.AUTH} />;
  }

  if (!roles.includes(currentUser.role)) {
    return <Redirect to={paths.NOT_FOUND} />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...otherProps} />;
};

ProtectedRoute.propTypes = {
  roles: arrayOf(number).isRequired,
};
