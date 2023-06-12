import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { socket } from '../../App.js';
import {
  notifyRenameSuccess,
  notifyNoConnection,
} from '../popup_messages/messages.js';
import { textFilter, getLanguage } from '../filter_text/index.js';

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
            const { name } = values;
            textFilter.loadDictionary(getLanguage(name));
            const cleanValues = { name: textFilter.clean(name) };
            const newName = { ...{ id }, ...cleanValues };
            socket.emit('renameChannel', newName, (response) => {
              return response.status === 'ok'
                ? notifyRenameSuccess()
                : notifyNoConnection();
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
