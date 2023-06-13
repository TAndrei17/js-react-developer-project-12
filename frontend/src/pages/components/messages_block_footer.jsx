import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { textFilter, getLanguage } from '../filter_text/index.js';
import socket from '../../socket.js';
import { notifyNoConnection } from '../popup_messages/messages.js';

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
    />
  </svg>
);

const MessagesBlockFooter = (props) => {
  const { id } = props;
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, { resetForm }) => {
        const { body } = values;
        textFilter.loadDictionary(getLanguage(body));
        const cleanValues = textFilter.clean(body);
        const newMessage = {
          ...{
            channelId: id,
            username: localStorage.username,
          },
          ...{ body: cleanValues },
        };
        socket.emit('newMessage', newMessage, (response) => {
          if (response.status !== 'ok') {
            notifyNoConnection();
          }
        });
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <div className="col-12 m-0">
          <Form noValidate>
            <div className="input-group has-validation">
              <Field
                autoFocus
                name="body"
                type="text"
                className="form-control border-primary"
                placeholder={t('messageField')}
                aria-label={t('ariaLabel')}
              />
              <label htmlFor="body" className="visually-hidden">
                {t('ariaLabel')}
              </label>

              <button
                className="btn btn-primary"
                type="submit"
                id="buttonSendMessage"
                disabled={isSubmitting}
              >
                {icon}
                <span className="visually-hidden">
                  {t('messageSend')}
                </span>
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default MessagesBlockFooter;
