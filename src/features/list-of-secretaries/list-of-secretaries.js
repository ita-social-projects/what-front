import React, { useState, useEffect } from 'react';
import className from 'classnames';
import { Button, Search, Card } from '../../components/index.js';
import Icon from '../../icon.js';
import styles from './list-of-secretaries.scss';

import { data } from './secretariesData.js';

export const ListOfSecretaries = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (val) => {
    setSearch(val);
  };

  useEffect(() => {
    const results = data.filter((secretary) => (
      (secretary.firstName.concat(secretary.lastName)).toUpperCase())
      .includes(search.toUpperCase()));
    setSearchResults(results);
  }, [search]);

  const handleAddSecretary = () => {
    alert('router to Add Secretary page');
  };

  const handleEditSecretary = (id) => {
    alert(`router to Edit Secretary ${id}`);
  };

  const secretaries = () => searchResults.map((secretary) => (
    <Card
      key={secretary.id}
      id={secretary.id}
      iconName="Edit"
      onEdit={handleEditSecretary}
    >
      <span className={className(styles['card-name'], 'd-flex')}>{secretary.firstName}</span>
      <span className={className(styles['card-name'], 'd-flex')}>{secretary.lastName}</span>
      <span className={className(styles['card-email'], 'd-flex mt-2 mb-2 text-truncate')}>{secretary.email}</span>
    </Card>
  ));

  return (
    <div className="container mb-2">
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6 offset-lg-4 col-12 text-center mt-2">
          <Search onSearch={handleSearch} placeholder="Secretary's name" />
        </div>
        <div className="col-lg-4 col-md-6 col-12 text-center mt-2">
          <Button onClick={handleAddSecretary} variant="warning" className="pb-0">
            <Icon icon="Plus" className="icon" size={30} />
            <span>Add a secretary</span>
          </Button>
        </div>
      </div>
      <hr className="col-8" />
      <div className="col-12 d-flex flex-wrap justify-content-center">
        {secretaries()}
      </div>
    </div>
  );
};