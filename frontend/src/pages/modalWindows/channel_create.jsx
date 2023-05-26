import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { socket } from '../../App.js';
import { Formik, Form, Field } from 'formik';

const CreateNewChannel = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // it's for a validation, get all channels from state
  const channels = useSelector((state) => {
    const getChannels = state.channelsReducer.ids.map(
      (id) => state.channelsReducer.entities[id]
    );
    return getChannels;
  });

  // the term of validation: 'Must be unique'
  function validateChannel(value) {
    let error;
    const checkChannels = channels.filter((channel) => channel.name === value);
    if (checkChannels.length > 0) {
      // console.log(checkChannels.length);
      error = 'Должно быть уникальным!';
    }
    return error;
  }

  return (
    <>
      <Button onClick={handleShow} className="col m-1 p-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fill="currentColor">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
        </svg>
        <span className="visually-hidden">+</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ name: '' }}
          onSubmit={(values, { resetForm }) => {
            socket.emit('newChannel', values, (response) => {
              console.log(response.status);
            });
            handleClose();
            resetForm();
          }}>
          {({ errors, isSubmitting }) => (
            <Form>
              <Modal.Body>
                <Field
                  autoFocus
                  id="name"
                  name="name"
                  type="text"
                  className="mb-2 form-control border-primary"
                  validate={validateChannel}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
                <label className="visually-hidden" htmlFor="name">
                  Имя канала
                </label>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Отправить
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateNewChannel;