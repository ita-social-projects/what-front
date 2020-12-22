import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export const Pagination = ({ studentsPerPage, totalStudents, paginate }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(totalStudents / studentsPerPage);
    const initialState = [...new Array(totalPages).keys()].map((number) => number + 1)
      .map((index) => index === 1 ? ({ index, active: true }) : ({ index, active: false }));

    setPageNumbers(initialState);
  }, [studentsPerPage, totalStudents])

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
    <nav className="col-12 d-flex flex-row flex-wrap justify-content-center">
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
  );
};