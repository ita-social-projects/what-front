import React, { useState, useEffect, useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { currentUserSelector, fetchActiveSecretaries, fetchSecretaries,
  activeSecretariesSelector, secretariesSelector } from '@/models/index.js';
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
  const [secretariesPerPage] = useState(10);

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

  const [loadActiveSecretaries, loadAllSecretaries, dispatchAddAlert] = useActions(
    [fetchActiveSecretaries, fetchSecretaries, addAlert],
  );

  const indexOfLastSecretary = currentPage * secretariesPerPage;
  const indexOfFirstSecretary = indexOfLastSecretary - secretariesPerPage;

  const getDisabledSecretaries = () => {
    const activeSecretariesIds = activeSecretaries.map(({ id }) => id);

    return allSecretaries.filter(({ id }) => !activeSecretariesIds.includes(id));
  };

  const searchSecretaries = (secretaries) => secretaries.filter(({ firstName, lastName }) => `${firstName} ${lastName}`
    .toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    loadActiveSecretaries();
  }, [loadActiveSecretaries]);

  useEffect(() => {
    if (activeSecretariesError || allSecretariesError) {
      dispatchAddAlert('Secretaries loading is failed');
    }
  }, [activeSecretariesError, allSecretariesError, dispatchAddAlert]);

  useEffect(() => {
    if (isShowDisabled) {
      const disabledSecretaries = getDisabledSecretaries();

      setSearchResults(disabledSecretaries.map((secretary, index) => ({ index, ...secretary })));
    }
    if (!isShowDisabled && activeSecretaries.length && !areActiveSecretariesLoading) {
      setSearchResults(activeSecretaries.map((secretary, index) => ({ index, ...secretary })));
    }

    setVisibleSecretaries(searchResults.slice(indexOfFirstSecretary, indexOfLastSecretary));
  }, [activeSecretaries, areActiveSecretariesLoading, allSecretaries, areAllSecretariesLoading,
    isShowDisabled, indexOfFirstSecretary, indexOfLastSecretary]);

  useEffect(() => {
    setVisibleSecretaries(searchResults.slice(indexOfFirstSecretary, indexOfLastSecretary));
  }, [currentPage, searchResults, indexOfFirstSecretary, indexOfLastSecretary]);

  useEffect(() => {
    setCurrentPage(1);
    if (isShowDisabled) {
      const disabledSecretaries = getDisabledSecretaries();
      const searchedSecretaries = searchSecretaries(disabledSecretaries);

      setSearchResults(searchedSecretaries.map((secretary, index) => ({ index, ...secretary })));
    } else {
      const searchedSecretaries = searchSecretaries(activeSecretaries);

      setSearchResults(searchedSecretaries.map((secretary, index) => ({ index, ...secretary })));
    }
  }, [search, isShowDisabled]);

  const handleSortByParam = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    const sortedSecretary = [...visibleSecretaries].sort((prevSecretary, currentSecretary) => {
      if (prevSecretary[sortingParam] > currentSecretary[sortingParam]) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });

    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === sortingParam) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    }));

    setVisibleSecretaries(sortedSecretary);
  };

  const resetSortingCategory = useCallback(() => {
    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === 'index') {
        return { ...category, sortedByAscending: true };
      }
      return { ...category, sortedByAscending: false };
    }));
  }, [sortingCategories]);

  const handleShowDisabled = (event) => {
    setIsShowDisabled(!isShowDisabled);
    resetSortingCategory();
    if (event.target.checked) {
      loadAllSecretaries();
    } else {
      loadActiveSecretaries();
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    resetSortingCategory();
  };

  const handleAddSecretary = useCallback(() => {
    history.push(paths.UNASSIGNED_USERS);
  }, [history]);

  const handleSecretariesDetails = useCallback((id) => {
    history.push(`${paths.SECRETARIES_DETAILS}/${id}`);
  }, [history]);

  const handleEditSecretary = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.SECRETARY_EDIT}/${id}`);
  }, [history]);

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
    resetSortingCategory();
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(searchResults?.length / secretariesPerPage);
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
      resetSortingCategory();
    }
  };

  const prevPage = (pageNumber) => {
    if (currentPage - 1 !== 0) {
      setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
      resetSortingCategory();
    }
  };

  const getSecretaries = () => {
    const secretaries = visibleSecretaries.map(({ id, firstName, lastName, email, index }) => (
      <tr key={id} onClick={() => handleSecretariesDetails(id)} className={styles['table-row']} data-secretary-id={id}>
        <td className="text-center">{index + 1}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        {currentUser.role === 4
            && (
            <td
              className="text-center"
              onClick={(event) => handleEditSecretary(event, id)}
              data-secretary-id={id}
            >
              <Icon icon="Edit" className={styles.scale} color="#2E3440" size={30} />
            </td>
            )}
      </tr>
    ));
    if (!secretaries.length && search) {
      return (
        <tr>
          <td colSpan="5" className="text-center">Secretary is not found</td>
        </tr>
      );
    }
    return secretaries;
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Secretaries</h2>
        {searchResults.length > secretariesPerPage ? <div className="col-2 text-right">{searchResults.length} secretaries</div> : null}
        <div className="col-4 d-flex align-items-center justify-content-end">
          {searchResults.length > secretariesPerPage && !areActiveSecretariesLoading
          && !areAllSecretariesLoading
          && (
          <Pagination
            itemsPerPage={secretariesPerPage}
            totalItems={searchResults.length}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
            page={currentPage}
          />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12 card shadow p-3 mb-5 bg-white">
          <div className="row align-items-center mt-2 mb-3">
            <div className="col-2">
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" disabled><Icon icon="List" color="#2E3440" size={25} /></button>
                <button type="button" className="btn btn-outline-secondary" disabled><Icon icon="Card" color="#2E3440" size={25} /></button>
              </div>
            </div>
            <div className="col-3">
              <Search onSearch={handleSearch} placeholder="Secretary's name" />
            </div>
            <div className="col-3 offset-2 custom-control custom-switch text-right">
              <input
                type="checkbox"
                onClick={handleShowDisabled}
                className={classNames('custom-control-input', styles['custom-control-input'])}
                id="switchDisabled"
              />
              <label
                className={classNames('custom-control-label', styles['custom-control-label'])}
                htmlFor="switchDisabled"
              >Disabled Secretaries
              </label>
            </div>
            {currentUser.role === 4
          && (
          <div className="col-2 text-right">
            <Button onClick={handleAddSecretary}>
              <span>Add a secretary</span>
            </Button>
          </div>
          )}
          </div>
          <WithLoading isLoading={areActiveSecretariesLoading || areAllSecretariesLoading} className="d-block mx-auto my-3" variant="info">
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
                        className={classNames({ [styles.rotate]: sortedByAscending })}
                      >
                        {tableHead}
                      </span>
                    </th>
                  ))}
                  {currentUser.role === 4 && (<th scope="col" className="text-center">Edit</th>)}
                </tr>
              </thead>
              <tbody>
                { getSecretaries() }
              </tbody>
            </table>
          </WithLoading>
        </div>
      </div>
    </div>
  );
};