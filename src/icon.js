import React from "react";
import PropTypes from "prop-types";

//const defaultStyles = { display: "inline-block", verticalAlign: "middle" };

const Icon = ({ size, color, icon, className, style, viewBox }) => {
  //const styles = { ...defaultStyles, ...style };
  return (
    <svg
      className={className}
      //style={styles}
      viewBox={viewBox}
      width={`${size}px`}
      height={`${size}px`}
    >
      <use xlinkHref={`src/svg/${icon}.svg#${icon}`} />
    </svg>
  );
};

Icon.defaultProps = {
  size: 16,
  color: "#000000",
  viewBox: "0 0 24 24",
  style: {},
  className: "",
};

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
  //style: PropTypes.shape(PropTypes.object),
  className: PropTypes.string,
};

export default Icon;
