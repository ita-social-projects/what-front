import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './with-loading.scss';

export const WithLoading = ({
  isLoading,
  children,
  className,
  animation,
  variant,
}) => (isLoading
  ? (
    <Spinner
      animation={animation}
      variant={variant}
      className={classNames(className, { [styles.default]: !variant })}
    />
  ) : children
);

WithLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  animation: PropTypes.string,
  variant: PropTypes.string,
};

WithLoading.defaultProps = {
  className: '',
  animation: 'border',
  variant: '',
  children: '',
};
