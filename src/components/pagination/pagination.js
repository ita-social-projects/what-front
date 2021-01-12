import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './pagination.scss';

export const Pagination = ({ itemsPerPage, totalItems, paginate, prevPage, nextPage }) => {
  const pagination = [];
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let ellipsisLeft = false;
  let ellipsisRight = false;

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      pagination.push({id: i, current: true, ellipsis: false});
    } else {
      if (i < 2 || i > totalPages - 1 || i === currentPage - 1 || i === currentPage + 1) {
        pagination.push({id: i, current: false, ellipsis: false});
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        pagination.push({id: i, current: false, ellipsis: true});
        ellipsisLeft = true;
      } else if(i < totalPages && i > currentPage && !ellipsisRight) {
        pagination.push({id: i, current: false, ellipsis: true});
        ellipsisRight = true;
      }
    }
  }

  const changePage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1 === 0 ? prev : prev - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev === totalPages ? prev : prev + 1);
  };

  return ( 
    <div className={styles.wrapper}>
      <nav className="col-12 d-flex flex-row flex-wrap justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button className={classNames("page-link", styles.link)} 
              onClick={() => {
                goToPrevPage()
                prevPage(currentPage - 1)
              }}
            >&lt;</button>
          </li>
        </ul>
        <ul className="pagination">
          {pagination.map((page) => {
            if (!page.ellipsis) {
              return (
                <li key={page.id} className="page-item">
                  <button className={classNames("page-link", styles.link, {[styles["active"]]: page.current})} 
                    onClick={() => {
                      paginate(page.id)
                      changePage(page.id)
                    }}
                  >
                    {page.id}
                  </button>
                </li>
              )
            } else {
                return (
                  <li key={page.id}>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                );
            }
          })}
        </ul>
        <ul className="pagination">
          <li className="page-item">
            <button className={classNames("page-link", styles.link)} 
              onClick={() => {
                goToNextPage()
                nextPage(currentPage + 1)
              }}
            >&gt;</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};