import React from 'react';
import propTypes from 'prop-types';
import classNames from "classnames";
import styles from "./rows-option.scss";

export const RowsOption = ({ id, onChange }) => {
  return (
    <select
      className={classNames("form-control", styles["change-rows"])}
      id={id}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      <option>10</option>
      <option>30</option>
      <option>50</option>
      <option>75</option>
      <option>100</option>
    </select>
  );
};

RowsOption.propTypes = {
  onChange: propTypes.func.isRequired
};

