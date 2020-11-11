import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../icon.js';
import styles from './search.module.scss';

export const Search = ({
  onSearch,
  onChange,
  ...otherProps
}) => (
  <div className={styles.search}>
    <input
      type="text"
      className={styles.search__input}
      onChange={onChange}
      {...otherProps}
    />
    <div onClick={onSearch} className={styles.search__button}>
      <Icon icon="Search" size={32} viewBox="0 0 50 50" />
    </div>
  </div>
);

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
