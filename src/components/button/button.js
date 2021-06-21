import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './button.scss';

export const Button = ({
  children,
  type='button',
  id,
  onClick,
  variant,
  className,
  disabled,
}) => (
  <button
    id={id}
    type={type}
    onClick={onClick}
    className={classNames(
      'btn',
      { [`btn-${variant}`]: variant },
      { [styles.default]: !variant },
      styles.button,
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
  variant: '',
  onClick: () => false,
};
