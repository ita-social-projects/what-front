import React from 'react';
import styles from './card.scss';

export const Card = ({ data, children }) => {
  const { title, date, button, icon } = data;
  return (
    <div className="container">
      <div className={`card col-sm-12 col-md-4 col-lg-3 ${styles['card-component']}`}>
          <div className="card-header">
              {title ? <h5 className={styles['card-title']}>{title}</h5> : null}
              {icon ? }
          </div>
        <div className="card-body">
          {children ? <p className={styles['card-text']}>{children}</p> : null}
          <div className={styles.content}>
            {date ? <p className={styles['card-date']}>{date}</p> : null}
            {button ? <button className={styles['btn-card']}>{button}</button> : null}
          </div>
        </div>
      </div>
    </div>
  );
};