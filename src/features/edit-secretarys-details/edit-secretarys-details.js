import React from 'react';
import styles from './edit-secretarys-details.scss';
import { Button } from '../../components/button/index.js';

export const EditSecretarysDetails = () => {
  const secretary = {
    id: 145,
    email: 'secretaryemail@example.com',
    firstName: 'Isabella',
    lastName: 'Smith',
  };

  return (
    <div className={styles.wrapper}>
      <div className="container shadow pb-3">
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="first-name">First Name:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className="form-control" id="first-name" placeholder={secretary.firstName} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="second-name">Last Name:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className="form-control" id="second-name" placeholder={secretary.lastName} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-4">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="col-md-8">
            <input type="text" className="form-control" id="email" placeholder={secretary.email} />
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div className="col-md-3 col-4">
            <Button className="w-100" variant="danger">Fire</Button>
          </div>
          <div className="col-md-3 offset-md-3 col-4">
            <Button className="w-100">Cancel</Button>
          </div>
          <div className="col-md-3 col-4">
            <Button className="w-100" variant="success">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};