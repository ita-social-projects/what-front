import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './pagination.scss';

export const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const initialState = [...new Array(totalPages).keys()].map((number) => number + 1)
      .map((index) => index === 1 ? ({ index, active: true }) : ({ index, active: false }));

    setPageNumbers(initialState);
  }, [itemsPerPage, totalItems])

  const toggleActivePage = (id) => {
    setPageNumbers((prevState) => {
      prevState.find((page) => {
        if(page.active) {
          page.active = false;
        }
      });

      return prevState.map((page, index) => {
        if (index + 1 === id) {
          return {
            ...page,
            active: !page.active,
          };
        } else {
          return page;
        }
      });
    })
  };

  return ( 
    <div className={styles.wrapper}>
      <nav className={classNames("d-flex flex-row flex-wrap justify-content-center")}>
        <ul className="pagination">
          {pageNumbers.map(({index, active}) => (
            <li key={index} 
              className={classNames("page-item", {"active": active})}
              onClick={() => toggleActivePage(index)}
              data-id={index}
            >
              <button className="page-link" onClick={() => paginate(index)}>
                {index}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};