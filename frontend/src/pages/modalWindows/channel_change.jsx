import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Formik, Form, Field } from 'formik';

import { socket } from '../../App.js';
import {
  notifyRenameSuccess,
  notifyRenameError,
} from '../../popup_messages/messages.js';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ChangeChannel = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation('translation', { keyPrefix: 'modalWindows' });

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
      error = t('errorMessage');
    }
    return error;
  }

  const { id } = props;

  return (
    <>
      <Button onClick={handleShow} className="dropdown-item">
        {t('buttonChange')}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('headerChangeChannel')}</Modal.Title>
        </Modal.Header>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ name: '' }}
          onSubmit={(values, { resetForm }) => {
            const newName = Object.assign({ id }, values);
            console.log(newName);
            socket.emit('renameChannel', newName, (response) => {
              response.status === 'ok'
                ? notifyRenameSuccess()
                : notifyRenameError();
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
                  {t('formLabel')}
                </label>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t('buttonCancel')}
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {t('buttonSend')}
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
