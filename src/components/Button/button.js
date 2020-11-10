import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './button.module.scss';

export const Button = ({
  children,
  type,
  onClick,
  variant,
  additionalCssClasses,
  disabled,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={classNames(
      styles.button,
      'btn',
      { [`btn-${variant}`]: variant },
      { [additionalCssClasses.join(' ')]: additionalCssClasses.length },
    )}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  additionalCssClasses: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  variant: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  additionalCssClasses: [],
  disabled: false,
  variant: 'secondary',
};
