import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDialog = ({ show, onHide, onConfirm, employee }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to proceed with <strong>{employee?.firstName} {employee?.lastName}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={() => onConfirm(employee)}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;