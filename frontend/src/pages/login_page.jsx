import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';

import StatusContext, { statusState } from '../context/index.js';
import Header from './components/header.jsx';
import ButtonsLng from './components/buttons_languages.jsx';
import i18next from '../i18next.js';
import { notifyNoConnection } from './popup_messages/messages.js';

const LoginSchema = yup.object().shape({
  username: yup.string().trim().required(i18next.t('loginPage.nicRequire')),
  password: yup
    .string()
    .required(i18next.t('loginPage.passwordRequire'))
    .min(5, i18next.t('loginPage.passwordMin', { signs: 6 })), // по заданию 6?
});

const ErrorBlock = () => {
  const { statusState } = useContext(StatusContext);
  const { t } = useTranslation('translation', { keyPrefix: 'loginPage' });
  const { authorization } = statusState;

  const classError = cn('mt-0', 'text-danger', {
    'd-none': authorization,
    'd-block': !authorization,
  });

  return <div className={classError}>{t('formLoginError')}</div>;
};

const Loginpage = () => {
  const { setActive, accessYes, accessNo, setNewUser } =
    useContext(StatusContext);
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'loginPage' });

  return (
    <>
      <ToastContainer />
      <Header>
        <ButtonsLng />
      </Header>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          axios
            .post('/api/v1/login', values)
            .then((response) => {
              // console.log(response.data);
              accessYes();
              setActive();
              Object.assign(localStorage, response.data);
              setNewUser();
              // console.log(statusState);
            })
            .then(() => navigate('/'))
            .catch((error) => {
              notifyNoConnection();
              accessNo();
            });
          resetForm();
        }}>
        {({ errors, touched, isSubmitting }) => (
          <div className="container mt-5">
            <div className="row justify-content-center align-content-center h-100">
              <h1 className="col-12 text-center text-primary">{t('header')}</h1>
              <Form className="col-12 col-md-6 mt-3">
                <div className="form-floating mb-3">
                  <Field
                    name="username"
                    type="text"
                    placeholder={t('nic')}
                    id="username"
                    required
                    className="form-control"
                  />
                  {errors.username && touched.username ? (
                    <div className="text-danger">{errors.username}</div>
                  ) : null}
                  <label htmlFor="username">{t('nic')}</label>
                </div>

                <div className="form-floating">
                  <Field
                    name="password"
                    type="password"
                    placeholder={t('password')}
                    id="password"
                    required
                    className="form-control"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-danger">{errors.password}</div>
                  ) : null}
                  <label htmlFor="password">{t('password')}</label>
                </div>
                <ErrorBlock />

                <button
                  type="submit"
                  className="w-100 mt-3 mb-3 btn btn-primary"
                  disabled={isSubmitting}>
                  {t('loginButton')}
                </button>
              </Form>

              <div className="row justify-content-center mb-3">
                <span className="col-auto">{t('noAccount')}</span>
                <Link to="/signup" className="col-auto">
                  <span>{t('signUpLink')}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export { Loginpage };
