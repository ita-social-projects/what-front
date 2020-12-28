import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchSecretaries, secretariesSelector } from '@/models/index.js';
import { paths, useActions } from '@/shared/index.js';
import { Button, Search, Card, WithLoading, Pagination } from '@/components/index.js';
import Icon from '@/icon.js';

export const ListOfSecretaries = () => {
  const [loadSecretaries] = useActions([fetchSecretaries]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [secretariesPerPage] = useState(12);

  const { data, isLoading } = useSelector(secretariesSelector, shallowEqual);

  const history = useHistory();

  useEffect(() => {
    loadSecretaries();
  }, [loadSecretaries]);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  const handleSearch = (value) => {
    setSearch(value);
    setSearchResults(data.filter(({ firstName, lastName }) => {
      const fullName = `${firstName} ${lastName}`;
      return fullName.toUpperCase().includes(value.toUpperCase());
    }));
  };

  const handleAddSecretary = () => {
    history.push(paths.UNASSIGNED_USERS);
  };

  const handleEditSecretary = (id) => {
    history.push(`${paths.SECRETARY_EDIT}/${id}`);
  };

  const handleSecretariesDetails = (id) => {
    history.push(`${paths.SECRETARIES_DETAILS}/${id}`);
  };

  const getSecretaries = () => {
    const indexOfLastSecretary = currentPage * secretariesPerPage;
    const indexOfFirstSecretary = indexOfLastSecretary - secretariesPerPage;

    const secretaries = searchResults.slice(indexOfFirstSecretary, indexOfLastSecretary)
      .map(({
        id, firstName, lastName, email,
      }) => (
        <Card
          key={id}
          id={id}
          iconName="Edit"
          buttonName="Details"
          onEdit={() => handleEditSecretary(id)}
          onDetails={() => handleSecretariesDetails(id)}
        >
          <div className=" w-75">
            <p className="mb-2 font-weight-bolder pr-2">{firstName}</p>
            <p className="font-weight-bolder">{lastName}</p>
          </div>
        </Card>
      ));

    if (!secretaries.length && search) {
      return <h4>Secretary is not found</h4>;
    }
    return secretaries;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container" style={{minHeight: 775}}>
      <div className="row">
        <div className="col-md-4 offset-md-4 col-12 text-center">
          <Search onSearch={handleSearch} placeholder="Secretary's name" />
        </div>
        <div className="col-md-4 col-12 text-right">
          <Button onClick={handleAddSecretary} variant="warning">
            <Icon icon="Plus" className="icon" />
            <span>Add a secretary</span>
          </Button>
        </div>
      </div>
      <div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
              getSecretaries()
            }
          </WithLoading>
        </div>
      </div>
      <Pagination itemsPerPage={secretariesPerPage} totalItems={searchResults.length} paginate={paginate}/>
    </div>
  );
};
