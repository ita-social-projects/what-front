import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { currentUserSelector, fetchActiveSecretaries, fetchSecretaries, activeSecretariesSelector, secretariesSelector } from '@/models/index.js';
import { paths, useActions } from '@/shared/index.js';

import { Button, Search, WithLoading, Pagination } from '@/components/index.js';

import Icon from '@/icon.js';

export const ListOfSecretaries = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [secretariesPerPage] = useState(1);

  const [isShowDisabled, setIsShowDisabled] = useState(false);

  const {
    data: activeSecretaries,
    isLoading: areActiveSecretariesLoading,
  } = useSelector(activeSecretariesSelector, shallowEqual);

  const {
    data: allSecretaries,
    isLoading: areAllSecretariesLoading,
  } = useSelector(secretariesSelector, shallowEqual);

  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [loadActiveSecretaries, loadAllSecretaries] = useActions([fetchActiveSecretaries, fetchSecretaries]);

  const history = useHistory();

  useEffect(() => {
    loadActiveSecretaries();
  }, [loadActiveSecretaries]);

  useEffect(() => {
    setSearchResults(activeSecretaries);
  }, [activeSecretaries]);

  const handleSearch = (value) => {
    setSearch(value);
    setSearchResults(activeSecretaries.filter(({ firstName, lastName }) => {
      const fullName = `${firstName} ${lastName}`;
      return fullName.toUpperCase().includes(value.toUpperCase());
    }));
  };

  const handleAddSecretary = () => {
    history.push(paths.UNASSIGNED_USERS);
  };

  const handleSecretariesDetails = (id) => {
    history.push(`${paths.SECRETARIES_DETAILS}/${id}`);
  };

  const handleEditSecretary = (event, id) => {
    event.stopPropagation();
    history.push(`${paths.SECRETARY_EDIT}/${id}`);
  };

  const handleShowDisabled = (event) => {
    setIsShowDisabled(!isShowDisabled);
    if (event.target.checked) {
      loadAllSecretaries();
    } else {
      loadActiveSecretaries();
    }
  };

  const paginate = (pageNumber) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(searchResults.length / secretariesPerPage);
    setCurrentPage((prev) => {
      if (prev === totalPages) {
        return prev;
      }
      return pageNumber;
    });
  };

  const prevPage = (pageNumber) => {
    setCurrentPage((prev) => {
      if (prev - 1 === 0) {
        return prev;
      }
      return pageNumber;
    });
  };

  const getSecretaries = () => {
    const indexOfLastSecretary = currentPage * secretariesPerPage;
    const indexOfFirstSecretary = indexOfLastSecretary - secretariesPerPage;

    const secretaries = searchResults.slice(indexOfFirstSecretary, indexOfLastSecretary)
      .sort((a, b) => ((a.lastName).toUpperCase() < (b.lastName).toUpperCase() ? -1 : (a.lastName).toUpperCase() > (b.lastName).toUpperCase() ? 1 : 0))
      .map((secretary, index) => (
        <tr key={secretary.id} onClick={() => handleSecretariesDetails(secretary.id)}>
          <td className="text-center">{index + 1}</td>
          <td>{secretary.firstName}</td>
          <td>{secretary.lastName}</td>
          <td>{secretary.email}</td>
          {currentUser.role === 4
          && (
          <td className="text-center" onClick={(event) => handleEditSecretary(event, secretary.id)}>
            <Icon viewBox="0 0 45 45" size={25} icon="Edit" />
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
          <h2 className="mb-0 px-3">Secretaries</h2>
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
              <button type="button" className="btn btn-secondary">List</button>
              <button type="button" className="btn btn-secondary">Card</button>
            </div>
          </div>
          <div className="col-md-4">
            <Search onSearch={handleSearch} placeholder="Secretary's name" />
          </div>
          <div className="col-md-3 pt-2 text-right">
            <div className="custom-control custom-switch">
              <input type="checkbox" className="custom-control-input" id="switchDisabled" onClick={handleShowDisabled} />
              <label className="custom-control-label" htmlFor="switchDisabled">Disabled Secretaries</label>
            </div>
          </div>
          {currentUser.role === 4
          && (
          <div className="col-md-3 text-right">
            <Button onClick={handleAddSecretary}>
              <span>Add a secretary</span>
            </Button>
          </div>
          )}
        </div>
        <WithLoading isLoading={areActiveSecretariesLoading || areAllSecretariesLoading} className="d-block mx-auto">
          <table className="table table-hover mt-2">
            <thead>
              <tr>
                <th scope="col" className="text-center">#</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Email <Icon icon="DropDown" className="pl-1 pt-1" /></th>
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