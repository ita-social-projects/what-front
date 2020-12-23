import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import className from 'classnames';
import { fetchSecretaries, secretariesSelector } from '@/models/index.js';
import { paths, useActions } from '@/shared/index.js';
import {
  Button, Search, Card, WithLoading,
} from '@/components/index.js';
import Icon from '@/icon.js';
import classNames from 'classnames';
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
        <span className="mb-2 font-weight-bolder">{firstName}</span>
        <span className="pl-2 font-weight-bolder">{lastName}</span>
        <p className="font-weight-lighter font-italic small mt-2"><u>{email}</u></p>
      </Card>
    ));

    if (!secretarise.length && search) {
      return <h4>Secretaries not found</h4>;
    }
    return secretarise;
  };

  return (
    <div className="container mb-2">
      <div className="row">
        <div className={classNames(styles.heading, 'col-12 mb-2')}>
          <div className={styles['search-container']}>
            <Search onSearch={handleSearch} placeholder="Enter a secretary's name" />
          </div>
          <div className={styles['button-container']}>
            <Button onClick={handleAddSecretary} variant="warning">
              <Icon icon="Plus" className="icon" />
              Add a Secretary
            </Button>
          </div>
        </div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
              getSecretaries()
            }
          </WithLoading>
        </div>
      </div>
    </div>
  );
};
