import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './button.module.scss';

export const Button = ({
  children,
  type,
  onClick,
  additionalCssClasses,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={classNames('btn', 'btn-secondary', styles.button, { [additionalCssClasses.join(' ')]: additionalCssClasses.length })}
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
};

Button.defaultProps = {
  type: 'button',
  additionalCssClasses: [],
};
