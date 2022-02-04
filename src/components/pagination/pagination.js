import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import styles from './pagination.scss';

export const Pagination = ({ items = [], setVisibleItems = () => {} }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const totalItems = items.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  useEffect(() => {
    setVisibleItems(items.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, items, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let ellipsisLeft = false;
  let ellipsisRight = false;

  const pagination = [...new Array(totalPages).keys()]
    .map((number) => number + 1)
    .reduce((accum, i) => {
      if (i === currentPage) {
        accum.push({ id: i, current: true, ellipsis: false });
      } else if (
        i < 2 ||
        i > totalPages - 1 ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        accum.push({ id: i, current: false, ellipsis: false });
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        ellipsisLeft = true;
        accum.push({ id: i, current: false, ellipsis: true });
      } else if (i < totalPages && i > currentPage && !ellipsisRight) {
        ellipsisRight = true;
        accum.push({ id: i, current: false, ellipsis: true });
      }
      return accum;
    }, []);

  const changePage = (item) => {
    if (item !== currentPage) {
      setCurrentPage(item);
    }
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 === 0 ? prev : prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1));
  };
  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <>
      {totalItems > itemsPerPage ? (
        <nav className="d-flex flex-row flex-wrap">
          <ul className="pagination mb-0">
            <li className="page-item">
              <button
                className={classNames('page-link', styles.link)}
                onClick={() => {
                  goToPrevPage();
                }}
              >
                &lt;
              </button>
            </li>
          </ul>
          <ul className="pagination mb-0">
            {pagination.map((page) => {
              if (!page.ellipsis) {
                if (totalItems === 1) {
                  return (
                    <li key={page.id} className="page-item">
                      <button
                        className={classNames('page-link', styles.link)}
                        disabled
                        onClick={() => {
                          changePage(page.id);
                        }}
                      >
                        {page.id}
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={page.id} className="page-item">
                    <button
                      className={classNames('page-link', styles.link, {
                        [styles.active]: page.current,
                      })}
                      onClick={() => {
                        changePage(page.id);
                      }}
                    >
                      {page.id}
                    </button>
                  </li>
                );
              } else {
                return (
                  <li key={page.id} className="d-flex align-items-end">
                    <span
                      className={classNames(
                        'pagination-ellipsis px-1',
                        styles.ellipsis
                      )}
                    >
                      &hellip;
                    </span>
                  </li>
                );
              }
            })}
          </ul>
          <ul className="pagination mb-0">
            <li className="page-item">
              <button
                className={classNames('page-link', styles.link)}
                onClick={() => {
                  goToNextPage();
                }}
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
      <label className="m-0 mr-3 d-flex align-items-center">
        <span className="mr-3">Rows</span>
        <select className="form-control" onChange={handleChangeItemsPerPage}>
          <option>9</option>
          <option>27</option>
          <option>45</option>
          <option>72</option>
          <option>99</option>
        </select>
      </label>
    </>
  );
};
