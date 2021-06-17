import React, { useState, useEffect, useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  currentUserSelector,
  fetchActiveSecretaries,
  fetchSecretaries,
  activeSecretariesSelector,
  secretariesSelector,
} from '@/models/index.js';
import { paths, useActions } from '@/shared/index.js';

import { Button, Search, WithLoading, Pagination } from '@/components/index.js';
import { addAlert } from '@/features/layout';

import Icon from '@/icon.js';

import classNames from 'classnames';
import styles from './list-of-secretaries.scss';

export const ListOfSecretaries = () => {
  const history = useHistory();

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [secretariesPerPage, setSecretariesPerPage] = useState(9);

  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ]);

  const [visibleSecretaries, setVisibleSecretaries] = useState([]);
  const [isShowDisabled, setIsShowDisabled] = useState(false);
  const {
    data: activeSecretaries,
    isLoading: areActiveSecretariesLoading,
    error: activeSecretariesError,
  } = useSelector(activeSecretariesSelector, shallowEqual);

  const {
    data: allSecretaries,
    isLoading: areAllSecretariesLoading,
    error: allSecretariesError,
  } = useSelector(secretariesSelector, shallowEqual);

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [loadActiveSecretaries, loadAllSecretaries, dispatchAddAlert] =
    useActions([fetchActiveSecretaries, fetchSecretaries, addAlert]);

  const [secretaries, setSecretaries] = useState([]);

  const INITIAL_CATEGORIES = [
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ];

  const [searchValue, setSearchValue] = useState('');
  const indexOfLastSecretary = currentPage * secretariesPerPage;
  const indexOfFirstSecretary = indexOfLastSecretary - secretariesPerPage;

  const getDisabledSecretaries = () => {
    const activeSecretariesIds = activeSecretaries.map(({ id }) => id);

    return allSecretaries.filter(
      ({ id }) => !activeSecretariesIds.includes(id)
    );
  };

  const searchSecretaries = (serchedSecretaries, value) =>
    serchedSecretaries.filter(({ firstName, lastName }) =>
      `${firstName} ${lastName}`.toLowerCase().includes(value.toLowerCase())
    );

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

  const changeActiveCategory = (categories, activeCategoryName) =>
    categories.map((category) => {
      if (category.name === activeCategoryName) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    });

  useEffect(() => {
    loadActiveSecretaries();
  }, [loadActiveSecretaries]);

  useEffect(() => {
    if (isShowDisabled && allSecretaries.length && !areAllSecretariesLoading) {
      const disabledSecretaries = getDisabledSecretaries();

      setSecretaries(
        disabledSecretaries.map((secretary, index) => ({ index, ...secretary }))
      );
    }
    if (
      !isShowDisabled &&
      activeSecretaries.length &&
      !areActiveSecretariesLoading
    ) {
      setSecretaries(
        activeSecretaries.map((secretary, index) => ({ index, ...secretary }))
      );
    }
    setSortingCategories(INITIAL_CATEGORIES);
    setVisibleSecretaries(
      secretaries.slice(indexOfFirstSecretary, indexOfLastSecretary)
    );
  }, [
    activeSecretaries,
    areActiveSecretariesLoading,
    allSecretaries,
    areAllSecretariesLoading,
    isShowDisabled,
  ]);

  useEffect(() => {
    setVisibleSecretaries(
      secretaries.slice(indexOfFirstSecretary, indexOfLastSecretary)
    );
  }, [currentPage, secretaries]);

  useEffect(() => {
    if (activeSecretariesError || allSecretariesError) {
      dispatchAddAlert(allSecretariesError || activeSecretariesError);
    }
  }, [activeSecretariesError, allSecretariesError, dispatchAddAlert]);

  useEffect(() => {
    if (isShowDisabled) {
      const disabledSecretaries = getDisabledSecretaries();
      const searchedSecretaries = searchSecretaries(
        disabledSecretaries,
        searchValue
      );

      setSecretaries(
        searchedSecretaries.map((secretary, index) => ({ index, ...secretary }))
      );
    } else {
      const searchedSecretaries = searchSecretaries(
        activeSecretaries,
        searchValue
      );

      setSecretaries(
        searchedSecretaries.map((secretary, index) => ({ index, ...secretary }))
      );
    }
    setCurrentPage(1);
  }, [searchValue, isShowDisabled]);

  const handleSortByParam = useCallback(
    (event) => {
      const categoryParams = event.target.dataset;
      const sortedSecretaries = getSortedByParam(secretaries, categoryParams);

      setSortingCategories(
        changeActiveCategory(sortingCategories, categoryParams.sortingParam)
      );
      setSecretaries(sortedSecretaries);
      setVisibleSecretaries(
        secretaries.slice(indexOfFirstSecretary, indexOfLastSecretary)
      );
    },
    [sortingCategories, secretaries]
  );

  const resetSortingCategory = useCallback(() => {
    setSortingCategories(
      sortingCategories.map((category) => {
        if (category.name === 'index') {
          return { ...category, sortedByAscending: true };
        }
        return { ...category, sortedByAscending: false };
      })
    );
  }, [sortingCategories]);

  const handleSearch = (value) => {
    setSearchValue(value);
    resetSortingCategory();
  };

  const handleShowDisabled = (event) => {
    setIsShowDisabled(!isShowDisabled);
    if (event.target.checked) {
      loadAllSecretaries();
    } else {
      loadActiveSecretaries();
    }
  };

  const handleAddSecretary = useCallback(() => {
    history.push(paths.UNASSIGNED_USERS);
  }, [history]);

  const handleSecretariesDetails = useCallback(
    (id) => {
      history.push(`${paths.SECRETARIES_DETAILS}/${id}`);
    },
    [history]
  );

  const handleEditSecretary = useCallback(
    (event, id) => {
      event.stopPropagation();
      history.push(`${paths.SECRETARY_EDIT}/${id}`);
    },
    [history]
  );

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(secretaries?.length / secretariesPerPage);
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
    }
  };

  const prevPage = (pageNumber) => {
    if (currentPage - 1 !== 0) {
      setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
    }
  };

  const getSecretaries = () => {
    const secretariesRows = visibleSecretaries.map(
      ({ id, firstName, lastName, email, index }) => (
        <tr
          key={id}
          onClick={() => handleSecretariesDetails(id)}
          className={styles['table-row']}
          data-secretary-id={id}
        >
          <td className="text-center">{index + 1}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          {currentUser.role === 4 && (
            <td
              className="text-center"
              onClick={(event) => handleEditSecretary(event, id)}
              data-secretary-id={id}
            >
              <Icon
                icon="Edit"
                className={styles.scale}
                color="#2E3440"
                size={30}
              />
            </td>
          )}
        </tr>
      )
    );

    if (allSecretariesError || activeSecretariesError) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            Loading has been failed
          </td>
        </tr>
      );
    }

    if (!visibleSecretaries.length && searchValue) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            Secretary is not found
          </td>
        </tr>
      );
    }
    return secretariesRows;
  };

  const changeCountVisibleItems = (newNumber) => {
    const finish = currentPage * newNumber;
    const start = finish - newNumber;
    setVisibleSecretaries(secretaries.slice(start, finish));
    setSecretariesPerPage(newNumber);
  };

  const paginationComponent = () => {
    if (secretaries.length < secretariesPerPage) {
      return (
        <Pagination
          itemsPerPage={secretariesPerPage}
          totalItems={1}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      );
    }
    return (
      <Pagination
        itemsPerPage={secretariesPerPage}
        totalItems={secretaries.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        page={currentPage}
      />
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Secretaries</h2>
        {!areAllSecretariesLoading && !areActiveSecretariesLoading ? (
          <span className="col-2 text-right">
            {visibleSecretaries.length} of {secretaries.length} secretaries
          </span>
        ) : null}
        <div className="col-4 d-flex align-items-center justify-content-end">
          {paginationComponent()}
          {/* <div className="col-2 text-right">{visibleSecretaries.length} of {secretaries.length} secretaries</div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          {!areActiveSecretariesLoading
          && !areAllSecretariesLoading
          && (paginationComponent())} */}
        </div>
      </div>
      <div className="row">
        <div className="col-12 card shadow p-3 mb-5 bg-white">
          <div className="row align-items-center mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" disabled>
                  <Icon icon="List" color="#2E3440" size={25} />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled
                >
                  <Icon icon="Card" color="#2E3440" size={25} />
                </button>
              </div>
            </div>
            <div className="col-2">
              <Search onSearch={handleSearch} placeholder="Secretary's name" />
            </div>
            <div className="col-3 offset-1 custom-control custom-switch text-right">
              <input
                type="checkbox"
                onClick={handleShowDisabled}
                className={classNames(
                  'custom-control-input',
                  styles['custom-control-input']
                )}
                id="switchDisabled"
              />
              <label
                className={classNames(
                  'custom-control-label',
                  styles['custom-control-label']
                )}
                htmlFor="switchDisabled"
              >
                Disabled Secretaries
              </label>
            </div>
            <div className="col-2 d-flex">
              <label
                className={classNames(styles['label-for-select'])}
                htmlFor="change-visible-people"
              >
                Rows
              </label>
              <select
                className={classNames('form-control', styles['change-rows'])}
                id="change-visible-people"
                onChange={(event) => {
                  changeCountVisibleItems(event.target.value);
                }}
              >
                <option>9</option>
                <option>27</option>
                <option>45</option>
                <option>72</option>
                <option>99</option>
              </select>
            </div>
            {currentUser.role === 4 && (
              <div className="col-2 text-right">
                <Button onClick={handleAddSecretary}>
                  <span>Add a secretary</span>
                </Button>
              </div>
            )}
          </div>
          <WithLoading
            isLoading={areActiveSecretariesLoading || areAllSecretariesLoading}
            className="d-block mx-auto my-3"
            variant="info"
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  {sortingCategories.map(
                    ({ id, name, tableHead, sortedByAscending }) => (
                      <th key={id} className={styles['table-head']}>
                        <span
                          data-sorting-param={name}
                          data-sorted-by-ascending={Number(sortedByAscending)}
                          onClick={handleSortByParam}
                          className={classNames({
                            [styles.rotate]: sortedByAscending,
                          })}
                        >
                          {tableHead}
                        </span>
                      </th>
                    )
                  )}
                  {currentUser.role === 4 && (
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>{getSecretaries()}</tbody>
            </table>
          </WithLoading>
        </div>
        <div
          className={classNames(
            'row justify-content-between align-items-center mb-3',
            styles.paginate
          )}
        >
          {paginationComponent()}
        </div>
      </div>
    </div>
  );
};
