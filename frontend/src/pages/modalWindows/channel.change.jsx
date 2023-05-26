import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { socket } from '../../App.js';
import { Formik, Form, Field } from 'formik';

const ChangeChannel = (props) => {
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

  const { id } = props;

  return (
    <>
      <Button onClick={handleShow} className="dropdown-item">
        Переименовать
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ name: '' }}
          onSubmit={(values, { resetForm }) => {
            const newName = Object.assign({ id }, values);
            console.log(newName);
            socket.emit('renameChannel', newName, (response) => {
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
                  placeholder={props.name}
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

export default ChangeChannel;
