import React from 'react';
import styles from './card.scss';
import Icon from '../../icon.js';
import { Button } from '../Button/index.js';

export const Card = ({ data, children, onDetails }) => {
  const {
    title,
    date,
    button,
    icon,
  } = data;
  return (
    <div className="container">
      <div className={`card col-sm-12 col-md-4 col-lg-3 ${styles['card-component']}`}>
        <div className="card-header">
          {title ? <h5 className={styles['card-title']}>{title}</h5> : null}
          {icon ? <Icon icon="Edit" /> : null}
        </div>
        <div className="card-body">
          {children ? <p className={styles['card-text']}>{children}</p> : null}
            {date ? <p className={styles['card-date']}>{date}</p> : null}
            <div className="btn-card float-right">
                {button ? <Button type="button" variant="warning" onClick={onDetails}>{button}</Button> : null}
            </div>
        </div>
      </div>
    </div>
  );
};