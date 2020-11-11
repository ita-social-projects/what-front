import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../../icon.js';
import styles from './search.module.scss';

export const Search = ({
  onSearch,
  onChange,
  inputRef,
  placeholder,
  additionalCssClasses,
}) => (
  <div className={classNames(
    styles.search,
    { [additionalCssClasses.join()]: additionalCssClasses.length },
  )}
  >
    <input
      type="text"
      className={styles.search__input}
      onChange={onChange}
      placeholder={placeholder}
      ref={inputRef}
    />
    <div onClick={onSearch} className={styles.search__button}>
      <Icon icon="Search" size={32} viewBox="0 0 50 50" />
    </div>
  </div>
);

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({
    current: PropTypes.oneOf([undefined]),
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  additionalCssClasses: PropTypes.arrayOf(PropTypes.string),
};

Search.defaultProps = {
  onChange: () => false,
  additionalCssClasses: [],
};
