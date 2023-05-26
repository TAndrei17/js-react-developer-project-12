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
      error = 'Должно быть уникальным';
    }
    return error;
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="col m-2 p-0 text-center">
        +
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
          {({ errors }) => (
            <Form>
              <Modal.Body>
                <Field
                  name="name"
                  type="text"
                  className="mb-2 form-control border-primary"
                  validate={validateChannel}
                />
                {errors.name && <div>{errors.name}</div>}
                <label className="visually-hidden" htmlFor="name">
                  Имя канала
                </label>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>
                <Button type="submit" variant="primary">
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
