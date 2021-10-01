import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import styles from "./rows-option.scss";

export const RowsOption = ({ id, onChange, optionsValues }) => {
  return (
    <select
      className={classNames("form-control", styles["change-rows"])}
      id={id}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      {optionsValues.map((option) => {
        return <option key={option}>{option}</option>;
      })}
    </select>
  );
};

RowsOption.propTypes = {
  onChange: propTypes.func.isRequired,
  id: propTypes.string,
  optionsValues: propTypes.array.isRequired,
};
