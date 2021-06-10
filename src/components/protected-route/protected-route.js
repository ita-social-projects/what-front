import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { arrayOf, number } from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import { paths } from '@/shared/index.js';
import { currentUserSelector } from '@/models/index.js';
import { Cookie } from '@/utils';

export const ProtectedRoute = ({ roles, ...otherProps }) => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const jwt = Cookie.get('jwt');

  if (!jwt) {
    return <Redirect to={paths.AUTH} />;
  }

  if (!roles.includes(currentUser.role)) {
    return <Redirect to={paths.NOT_FOUND} />;
  }
  const context = {
    role: currentUser.role
  };
  // console.log('context', context);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route context={context} {...otherProps} />;
};

ProtectedRoute.propTypes = {
  roles: arrayOf(number).isRequired,
};
