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
  const handleDetailsClick = (ev) => {
    ev.stopPropagation();
    const cardId = ev.target.closest('div').dataset.id;
    onDetails(cardId);
  };

  const handleEditClick = (ev) => {
    ev.stopPropagation();
    const cardId = ev.target.closest('div').dataset.id;
    onEdit(cardId);
  };

  return (
    <div
      onClick={onDetails ? handleDetailsClick : null}
      className={classNames(
        'card col-sm-12 col-md-4 col-lg-3 ',
        styles['card-component'],
        className,
      )}
      data-id={id}
    >
      <div className={classNames(
        styles.content,
        styles['card-head'],
      )}
      >
        {title ? <h5 className={styles['card-title']}>{title}</h5> : null}

        {iconName
          ? (
            <div onClick={handleEditClick} className={styles['card-icon']} data-id={id}>
              <Icon viewBox="0 0 45 45" size={25} icon={iconName} />
            </div>
          )
          : null}

      </div>
      {children ? <div className={styles['card-content']}>{children}</div> : null}
      <div className={classNames(styles.content, 'h-100')}>
        {date ? <p className={styles['card-date']}>{date}</p> : <p />}
        <div className={styles['card-btn']} data-id={id}>
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
  buttonName: '',
  iconName: '',
  onDetails: undefined,
  onEdit: undefined,
  className: '',
};
