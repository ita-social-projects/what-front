import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './button.scss';

export const Button = ({
  children,
  type,
  onClick,
  variant,
  className,
  disabled,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={classNames(
      styles.button,
      'btn',
      { [`btn-${variant}`]: variant },
      className,
    )}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  className: '',
  disabled: false,
  variant: 'secondary',
  onClick: undefined,
};
