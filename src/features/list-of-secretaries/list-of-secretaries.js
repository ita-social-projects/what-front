import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Button, Search, Card } from '../../components/index.js';
import { useActions } from '../../shared/hooks/index.js';
import { listOfSecretariesActions, searchSecretarySelector } from './redux/index.js';
import Icon from '../../icon.js';
import className from 'classnames';
import styles from './list-of-secretaries.scss';

import { data } from './secretariesData.js';

export const ListOfSecretaries = () => {
  const { setSerchSecretaryValue } = useActions(listOfSecretariesActions);

  const searchSecretaryByName = useSelector(searchSecretarySelector, shallowEqual);

  const handleSearch = (val) => {
    setSerchSecretaryValue(val);
  };

  const handleAddSecretary = () => {
    alert('router to Add Secretary page');
  };

  const handleEditSecretary = (id) => {
    alert(`router to Edit Secretary ${id}`);
  };

  const handleSecretarysDetails = (id) => {
    alert(`router to Secretary's ${id} Details`);
  };

  const secretaries = () => {
    console.log(data);
    const sortSecretariesByName = data.filter((secretary) => (
      (secretary.firstName.concat(secretary.lastName)).toUpperCase())
      .includes(searchSecretaryByName.toUpperCase()));
    return sortSecretariesByName.map((secretary) => (
      <Card
        key={secretary.id}
        id={secretary.id}
        button="Details"
        date=" "
        onEdit={handleEditSecretary}
        onDetails={handleSecretarysDetails}
      >
        <span className={className(styles['card-name'], 'd-flex mt-2')}>{secretary.firstName} {secretary.lastName}</span>
        <span className={className(styles['card-email'], 'd-flex mt-2 mb-2')}>{secretary.email}</span>
      </Card>
    ));
  };

  return (
    <div className="container">
      <div className="row">
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
      <div className="row d-flex flex-wrap justify-content-center">
        {secretaries()}
      </div>
    </div>
  );
};