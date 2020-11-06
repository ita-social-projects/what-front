import React from 'react';
import styles from './card.module.scss';

export const Card = ({ data }) => {
  const { title, date, button } = data;
  const objectIncludes = {
    titleF: Object.keys(data).includes('title'),
    dateF: Object.keys(data).includes('date'),
    buttonF: Object.keys(data).includes('button'),
  };
  console.log(styles);
  return (
    <div className="container">
      <div className="card col-sm-6 col-md-4">
        <div className="card-body pb-0">
          <h5 className="card-title">{title}</h5>
          <div className={styles.cont}>
            <p className="card-text">{date}</p>
            {objectIncludes.buttonF ? <button className="btn btn-card">{button}</button> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
