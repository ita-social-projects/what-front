import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ModalWindow = ({
  children,
  toShow,
  closeHandler,
  cancelHandler,
  submitHandler,
  headline,
  cancelButtonText,
  submitButtonText,
  isActionDangerous,
}) => (
  <Modal show={toShow} onHide={closeHandler}>
    <Modal.Header closeButton>
      <h4>{headline}</h4>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
    <Modal.Footer className="justify-content-around">
      <button className="btn btn-secondary" type="button" onClick={cancelHandler}>{cancelButtonText}</button>
      <button className={`btn ${isActionDangerous ? 'btn-danger' : 'btn-success'}`} type="submit" onClick={submitHandler}>{submitButtonText}</button>
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
  closeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  headline: PropTypes.string,
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  isActionDangerous: PropTypes.bool,
};

ModalWindow.defaultProps = {
  headline: 'Confirm action',
  cancelButtonText: 'Cancel',
  submitButtonText: 'Confirm',
  isActionDangerous: false,
};
