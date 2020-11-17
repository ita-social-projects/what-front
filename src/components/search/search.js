import React from 'react';
import PropTypes, { func } from 'prop-types';
import classNames from 'classnames';

import Icon from '../../icon.js';
import styles from './search.scss';

export const Search = ({
  onChange,
  placeholder,
  className,
}) => {
  const handleChange = (event) => onChange(event.target.value);

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={classNames(styles.searchInput, className)}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <Icon className={styles.searchIcon} icon="Search" size={32} viewBox="0 0 50 50" />
    </div>
  );
};

Search.propTypes = {
  onChange: func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};
