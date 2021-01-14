import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { currentUserSelector, fetchSecretaries, secretariesSelector } from '@/models/index.js';
import { paths, useActions } from '@/shared/index.js';
import { Button, Search, Card, WithLoading, Pagination } from '@/components/index.js';
import Icon from '@/icon.js';

export const ListOfSecretaries = () => {
  const history = useHistory();

  const [loadSecretaries] = useActions([fetchSecretaries]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [secretariesPerPage] = useState(9);

  const { data, isLoading } = useSelector(secretariesSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

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
        id, firstName, lastName
      }) => {
        return (
          <Card
            key={id}
            id={id}
            iconName={currentUser.role === 4 ? "Edit" : null}
            buttonName="Details"
            onEdit={currentUser.role === 4 ? () => handleEditSecretary(id) : null}
            onDetails={() => handleSecretariesDetails(id)}
          >
            <div className=" w-75">
              <p className="mb-2 pr-2">{firstName}</p>
              <p>{lastName}</p>
            </div>
          </Card>
        );
      }); 

    if (!secretaries.length && search) {
      return <h4>Secretary is not found</h4>;
    }
    return secretaries;
  };

  const paginate = (pageNumber) => {
    if(currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(searchResults.length / 9);
    setCurrentPage((prev) => {
      if (prev === totalPages) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  const prevPage =(pageNumber) => {
    setCurrentPage((prev) => {
      if (prev - 1 === 0) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };
  
  return (
    <div className="container" style={{minHeight: 750}}>
      <div className="row">
        <div className="col-md-4 offset-md-4 text-center">
          <Search onSearch={handleSearch} placeholder="Secretary's name" />
        </div>
        {currentUser.role === 4 && 
          <div className="col-md-4 text-right">
            <Button onClick={handleAddSecretary} variant="warning">
              <Icon icon="Plus" className="icon" />
              <span>Add a secretary</span>
            </Button>
          </div>
        }
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
      {searchResults.length > 9 && !isLoading &&
        <Pagination 
          itemsPerPage={secretariesPerPage} 
          totalItems={searchResults.length} 
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      }
    </div>
  );
};
