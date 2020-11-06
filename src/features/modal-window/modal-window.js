import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import styles from './modal-window.module.scss';

export const ModalWindow = ({
  children,
  toShow,
  onClose,
  onSubmit,
  onAfterClose,
  title,
  cancelButtonText,
  submitButtonText,
  isActionDangerous,
}) => (
  <Modal show={toShow} onHide={onClose} onExited={onAfterClose} onEscapeKeyDown={onClose}>
    <Modal.Header closeButton>
      <h4>{title}</h4>
    </Modal.Header>
    <Modal.Body className={styles['modal-body']}>
      {children}
    </Modal.Body>
    <Modal.Footer className="justify-content-around">
      <button className={`btn btn-secondary ${styles['modal-btn']}`} type="button" onClick={onClose}>{cancelButtonText}</button>
      <button className={`btn ${isActionDangerous ? 'btn-danger' : 'btn-success'} ${styles['modal-btn']}`} type="submit" onClick={onSubmit}>{submitButtonText}</button>
    </Modal.Footer>
  </Modal>
);

ModalWindow.propTypes = {
  toShow: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func,
  title: PropTypes.string,
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  isActionDangerous: PropTypes.bool,
};

ModalWindow.defaultProps = {
  title: 'Confirm action',
  cancelButtonText: 'Cancel',
  submitButtonText: 'Confirm',
  isActionDangerous: false,
  onAfterClose: () => false,
};
