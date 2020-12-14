import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import className from 'classnames';
import { fetchSecretaries, secretariesSelector } from '@models/index.js';
import { useActions, paths } from '@/shared/index.js';
import {
  Button, Search, Card, WithLoading,
} from '@components/index.js';
import Icon from '../../icon.js';
import styles from './list-of-secretaries.scss';

export const ListOfSecretaries = () => {
  const [loadSecretaries] = useActions([fetchSecretaries]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { data, isLoading } = useSelector(secretariesSelector, shallowEqual);

  const history = useHistory();

  useEffect(() => {
    loadSecretaries();
  }, [loadSecretaries]);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  const handleSearch = (val) => {
    setSearch(val);
    setSearchResults(data.filter(({ firstName, lastName }) => {
      const fullName = `${firstName} ${lastName}`;
      return fullName.toUpperCase().includes(val.toUpperCase());
    }));
  };

  const handleAddSecretary = () => {
    history.push(paths.UNASSIGNED_USERS);
  };

  const handleEditSecretary = (id) => {
    history.push(`${paths.SECRETARY_EDIT}/${id}`);
  };

  const hadndleSecretarysDetails = (id) => {
    history.push(`${paths.SECRETARIES_DETAILS}/${id}`);
  };

  const getSecretaries = () => {
    const secretarise = searchResults.map(({
      id, firstName, lastName, email,
    }) => (
      <Card
        key={id}
        id={id}
        iconName="Edit"
        buttonName="Details"
        onEdit={() => handleEditSecretary(id)}
        onDetails={() => hadndleSecretarysDetails(id)}
      >
        <span className={className(styles['card-name'], 'd-flex')}>{firstName}</span>
        <span className={className(styles['card-name'], 'd-flex')}>{lastName}</span>
        <span className={className(styles['card-email'], 'd-flex mt-2 mb-2 text-truncate')}>{email}</span>
      </Card>
    ));

    if (!secretarise.length && search) {
      return <h4>Secretaries not found</h4>;
    }
    return secretarise;
  };

  return (
    <div className="container mb-2">
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6 offset-lg-4 col-12 text-center mt-2">
          <Search onSearch={handleSearch} placeholder="Secretary's name" />
        </div>
        <div className="col-lg-4 col-md-6 col-12 text-center mt-2">
          <Button onClick={handleAddSecretary} variant="warning">
            <Icon icon="Plus" className="icon" size={20} />
            <span>Add a secretary</span>
          </Button>
        </div>
      </div>
      <hr className="col-8" />
      <div className="col-12 d-flex flex-wrap justify-content-center">
        <WithLoading isLoading={isLoading}>
          {getSecretaries()}
        </WithLoading>
      </div>
    </div>
  );
};
