import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { socket } from '../../App.js';
import {
  notifyRemoveSuccess,
  notifyNoConnection,
} from '../popup_messages/messages.js';

const DeleteChannel = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation('translation', { keyPrefix: 'modalWindows' });

  const deleteChannel = (id) => {
    socket.emit('removeChannel', id, (response) => response.status === 'ok' ? notifyRemoveSuccess() : notifyNoConnection());
    handleClose();
  };

  const { id } = props;

  return (
    <Button onClick={handleShow} className="dropdown-item">
      {t('buttonRemove')}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('headerRemoveChannel')}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="h5">{t('questionDelete')}</Modal.Body>
        <Modal.Footer>
          <Button id={id} variant="secondary" onClick={handleClose}>
            {t('buttonCancel')}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={(event) => {
              event.preventDefault();
              deleteChannel({ id });
            }}>
            {t('buttonRemove')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Button>
  );
};

export default DeleteChannel;
