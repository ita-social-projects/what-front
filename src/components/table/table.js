import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import styles from './table.scss';

export const Table = ({ sortingCategories, currentUser, onClick, data, access, children: list}) => {
  const handleSortByParam = (event) => onClick(getSortedByParam(data, event.target.dataset), event.target.dataset)

  const getSortedByParam = (data, activeCategory) => {

    const { sortingParam, sortedByAscending } = activeCategory;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    return [...data].sort((prevItem, currentItem) => {
      if (prevItem[sortingParam] > currentItem[sortingParam]) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });
  };

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          {sortingCategories.map(({ id, name, tableHead, sortedByAscending }) => (
            <th
              key={id}
              className={styles['table-head']}
            >
              <span
                data-sorting-param={name}
                data-sorted-by-ascending={Number(sortedByAscending)}
                onClick={handleSortByParam}
                className={classNames({ [styles.rotate]: !sortedByAscending })}
              >
                {tableHead}
              </span>
            </th>
          ))}
          { currentUser && currentUser.role != 4 ?
              !access.unruledUser.some(el => currentUser.role == el ) ?
                  <th scope="col" className="text-center">Edit</th>
                      : null
                        : access.unassigned != 'unassigned' ?
                          <th scope="col" className="text-center">Edit</th>
                          : <th className="text-center">Choose role</th>
          }
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  sortingCategories: propTypes.array.isRequired,
  currentUser: propTypes.object.isRequired,
  access: propTypes.object.isRequired,
  children: propTypes.node.isRequired,
  onClick: propTypes.func.isRequired,
  data: propTypes.array.isRequired,
};