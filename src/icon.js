/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({
  size, icon, color, className, viewBox,
}) => (
  <svg
    className={className}
    viewBox={viewBox}
    width={`${size}px`}
    height={`${size}px`}
  >
    <use xlinkHref={`src/svg/${icon}.svg#${icon}`} fill={color} />
  </svg>
);

Icon.defaultProps = {
  size: 16,
  color: 'black',
  viewBox: '0 0 24 24',
  style: {},
  className: '',
};

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;