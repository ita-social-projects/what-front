import React from 'react';
import PropTypes, {
  element, string, func, number,
} from 'prop-types';
import classNames from 'classnames';
import styles from './card.scss';
import Icon from '../../icon.js';
import { Button } from '../button/index.js';

export const Card = ({
  id,
  title,
  date,
  buttonName,
  iconName,
  children,
  onDetails,
  onEdit,
  className,
}) => {
  const handleEditClick = () => {
    onEdit(id);
  };

  const handleDetailsClick = () => {
    onDetails(id);
  };

  return (
    <div
      onClick={handleDetailsClick}
      className={classNames(
        'card col-sm-12 col-md-4 col-lg-3 ',
        styles['card-component'],
        className,
      )}
      id={id}
    >
      <div className={classNames(
        styles.content,
        styles['card-head'],
      )}
      >
        {title ? <h5 className={styles['card-title']}>{title}</h5> : null}
        <div onClick={handleEditClick} className={styles['card-icon']} data-group={id}>
          {iconName ? <Icon viewBox="0 0 45 45" size={25} icon={iconName} /> : null}
        </div>
      </div>
      {children ? <p className={styles['card-content']}>{children}</p> : null}
      <div className={styles.content}>
        {date ? <p className={styles['card-date']}>{date}</p> : null}
        <div className={styles['card-btn']}>
          {buttonName ? <Button type="button" variant="warning" onClick={handleDetailsClick}>{buttonName}</Button> : null}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: number.isRequired,
  title: string,
  date: string,
  buttonName: string,
  iconName: string,
  onDetails: func,
  onEdit: func,
  children: PropTypes.oneOfType([
    element,
    string,
    PropTypes.arrayOf(element),
  ]),
  className: string,
};

Card.defaultProps = {
  id: null,
  title: '',
  date: '',
  children: null,
  buttonName: 'Details',
  iconName: 'Edit',
  onDetails: undefined,
  onEdit: undefined,
  className: '',
};
