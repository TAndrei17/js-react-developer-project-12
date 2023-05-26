import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { socket } from '../../App.js';

const DeleteChannel = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteChannel = (id) => {
    socket.emit('removeChannel', id, (response) => {
      console.log(response.status);
      handleClose();
    });
  };

  const id = props.id;
  // console.log(id);

  return (
    <>
      <Button id={props.id} onClick={handleShow} className="dropdown-item">
        Удалить
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>

        <Modal.Body className="h5">Уверены?</Modal.Body>
        <Modal.Footer>
          <Button id={props.id} variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button
            id={props.id}
            type="button"
            variant="primary"
            onClick={(event) => {
              event.preventDefault();
              deleteChannel({ id });
            }}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteChannel;
