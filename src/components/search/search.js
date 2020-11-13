import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import classNames from 'classnames';

import Icon from '../../icon.js';
import styles from './search.scss';

export const Search = ({
  onSearch,
  placeholder,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => onSearch(inputValue);
  const handleChange = (event) => setInputValue(event.target.value);

  return (
    <div className={classNames(styles.search, className)}>
      <input
        type="text"
        className={styles.searchInput}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div onClick={handleSearch} className={styles.searchButton}>
        <Icon icon="Search" size={32} viewBox="0 0 50 50" />
      </div>
    </div>
  );
};

Search.propTypes = {
  onSearch: func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};
