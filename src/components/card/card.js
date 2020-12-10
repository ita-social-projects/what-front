import React from 'react';
import PropTypes, {
  string, func, number,
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
}) => (
  <div
    onClick={() => onDetails(id)}
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

      {iconName
        ? (
          <div onClick={() => onEdit(id)} className={styles['card-icon']} data-group={id}>
            <Icon viewBox="0 0 45 45" size={25} icon={iconName} />
          </div>
        )
        : null}

    </div>
    {children ? <div className={styles['card-content']}>{children}</div> : null}
    <div className={styles.content}>
      {date ? <p className={styles['card-date']}>{date}</p> : <p />}
      <div className={styles['card-btn']}>
        {buttonName ? <Button type="button" variant="warning" onClick={() => onDetails(id)}>{buttonName}</Button> : null}
      </div>
    </div>
  </div>
);

Card.propTypes = {
  id: number.isRequired,
  title: string,
  date: string,
  buttonName: string,
  iconName: string,
  onDetails: func,
  onEdit: func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: string,
};

Card.defaultProps = {
  title: '',
  date: '',
  children: null,
  buttonName: '',
  iconName: '',
  onDetails: undefined,
  onEdit: undefined,
  className: '',
};
