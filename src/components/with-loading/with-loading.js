import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const WithLoading = ({
  isLoading,
  children,
  className,
  animation,
  variant,
}) => (isLoading
  ? <Spinner animation={animation} variant={variant} className={className} />
  : children
);

WithLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  animation: PropTypes.string,
  variant: PropTypes.string,
};

WithLoading.defaultProps = {
  className: '',
  animation: 'border',
  variant: 'warning',
};
