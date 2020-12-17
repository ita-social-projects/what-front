import React from 'react';
import { Modal } from 'react-bootstrap';

import classNames from 'classnames';
import styles from './registration.scss';

export const SuccessfulRegistrationAlert = ({toShow, onClose, onSubmit}) => {
  return (
    <Modal
      show={toShow}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <h2>Congratulations</h2>
      </Modal.Header>
      <Modal.Body className={styles["modal-body"]}>
        You have successfully registered.<br/>
        Please, wait until Admin assigns you a role and approve your account.
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <button 
          className={classNames("btn btn-success w-75", styles["modal-btn"])} 
          type="submit" onClick={onSubmit}
        >Ok</button>
      </Modal.Footer>
    </Modal>
  );
};