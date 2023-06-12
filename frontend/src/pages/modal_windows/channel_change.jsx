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
      (id) => state.channelsReducer.entities[id],
    );
    return getChannels;
  });

  // the term of validation: 'Must be unique'
  function validateChannel(value) {
    const checkChannels = channels.filter((channel) => channel.name === value);
    if (checkChannels.length > 0) {
      const error = t('errorMessage');
      return error;
    }
    return null;
  }

  const { id, name } = props;

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
          initialValues={{ newName: '' }}
          onSubmit={(values, { resetForm }) => {
            const { newName } = values;
            textFilter.loadDictionary(getLanguage(newName));
            const cleanValues = { name: textFilter.clean(newName) };
            const updateChannel = { ...{ id }, ...cleanValues };
            socket.emit('renameChannel', updateChannel, (response) => {
              const { status } = response;
              return status === 'ok'
                ? notifyRenameSuccess()
                : notifyNoConnection();
            });
            handleClose();
            resetForm();
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form>
              <Modal.Body>
                <Field
                  autoFocus
                  id="newName"
                  name="newName"
                  type="text"
                  placeholder={name}
                  className="mb-2 form-control border-primary"
                  validate={validateChannel}
                />
                {errors.newName && (
                  <div className="text-danger">{errors.newName}</div>
                )}
                <label className="visually-hidden" htmlFor="newName">
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
