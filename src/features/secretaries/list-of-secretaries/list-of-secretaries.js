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

  const handleShowDisabled = (event) => {
    setIsShowDisabled(!isShowDisabled);
    if (event.target.checked) {
      loadAllSecretaries();
    } else {
      loadActiveSecretaries();
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
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
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(activeSecretaries?.length / secretariesPerPage);
    setCurrentPage(currentPage === totalPages ? currentPage : pageNumber);
  };

  const prevPage = (pageNumber) => {
    setCurrentPage(currentPage - 1 === 0 ? currentPage : pageNumber);
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
              className={classNames(styles.scale, 'text-center')}
              onClick={(event) => handleEditSecretary(event, id)}
              data-secretary-id={id}
            >
              <Icon viewBox="0 0 45 45" size={20} icon="Edit" />
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
        <div className="col-md-6">
          <h2 className="">Secretaries</h2>
        </div>
        {searchResults.length > secretariesPerPage ? <div className="col-2 text-right">{searchResults.length} secretaries</div> : null}
        <div className="col-md-4 d-flex align-items-center justify-content-end">
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
      <div className="container card shadow">
        <div className="row my-2">
          <div className="col-md-2">
            <div className="btn-group">
              <button type="button" className="btn btn-info">List</button>
              <button type="button" className="btn btn-info">Card</button>
            </div>
          </div>
          <div className="col-md-4">
            <Search onSearch={handleSearch} placeholder="Secretary's name" />
          </div>
          <div className="col-md-3 pt-2 text-right">
            <div className="custom-control custom-switch">
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
          </div>
          {currentUser.role === 4
          && (
          <div className="col-md-3 text-right">
            <Button variant="info" onClick={handleAddSecretary}>
              <span>Add a secretary</span>
            </Button>
          </div>
          )}
        </div>
        <WithLoading isLoading={areActiveSecretariesLoading || areAllSecretariesLoading} className="d-block mx-auto">
          <table className="table table-hover mt-2">
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
  );
};