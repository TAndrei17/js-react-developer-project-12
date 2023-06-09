import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';

import StatusContext from '../context/index.js';
import Header from './components/header_mainpage.jsx';
import ButtonsLng from './components/buttons_languages.jsx';
import i18n from '../i18next.js';
import { notifyNoConnection } from './popup_messages/messages.js';

const ErrorBlock = () => {
  const { statusState } = useContext(StatusContext);
  const { t } = useTranslation('translation', { keyPrefix: 'signUpPage' });
  const { authorization } = statusState;

  const classError = cn('mt-0', 'text-danger', {
    'd-none': authorization,
    'd-block': !authorization,
  });
  return <div className={classError}>{t('formSignUpError')}</div>;
};

const SignUpPage = () => {
  const { setActive, accessYes, accessNo } = useContext(StatusContext);
  const { t } = useTranslation('translation', { keyPrefix: 'signUpPage' });
  const navigate = useNavigate();

  const LoginSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(i18n.t('signUpPage.userNameRequire'))
      .min(3, i18n.t('signUpPage.userNameMin')),
    password: yup
      .string()
      .required(i18n.t('signUpPage.passwordRequire'))
      .min(6, i18n.t('signUpPage.passwordMin', { signs: 6 })),
    confirmPassword: yup
      .string()
      .required(i18n.t('signUpPage.confirmPasswordError'))
      .oneOf([yup.ref('password'), null], i18n.t('signUpPage.equalRequire')),
  });

  return (
    <>
      <ToastContainer />
      <Header>
        <ButtonsLng />
      </Header>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        onSubmit={(values, { resetForm }) => {
          const { confirmPassword, ...updateValues } = values;
          axios
            .post('/api/v1/signup', updateValues)
            .then((response) => {
              accessYes();
              setActive();
              Object.assign(localStorage, response.data);
            })
            .then(() => navigate('/'))
            .catch(() => {
              accessNo();
              notifyNoConnection();
            });
          resetForm();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <div className="container mt-5">
            <div className="row justify-content-center align-content-center h-100">
              <h1 className="col-12 text-center text-primary">{t('header')}</h1>
              <Form className="col-12 col-md-6 mt-3">
                <div className="form-floating mb-3">
                  <Field
                    id="username"
                    name="username"
                    placeholder={t('userNameMin')}
                    autoComplete="username"
                    type="text"
                    required
                    className="form-control"
                  />
                  {errors.username && touched.username ? (
                    <div className="text-danger">{errors.username}</div>
                  ) : null}
                  <label htmlFor="username">{t('userName')}</label>
                </div>

                <div className="form-floating mb-3">
                  <Field
                    id="password"
                    name="password"
                    placeholder={t('passwordMin', { signs: 6 })}
                    autoComplete="new-password"
                    type="password"
                    required
                    className="form-control"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-danger">{errors.password}</div>
                  ) : null}
                  <label htmlFor="password">{t('password')}</label>
                </div>

                <div className="form-floating mb-3">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder={t('equalRequire')}
                    autoComplete="new-password"
                    type="password"
                    required
                    className="form-control"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-danger">{errors.confirmPassword}</div>
                  ) : null}
                  <label htmlFor="confirmPassword">
                    {t('confirmPassword')}
                  </label>
                </div>
                <ErrorBlock />

                <button
                  type="submit"
                  className="w-100 mt-3 mb-3 btn btn-primary"
                  disabled={isSubmitting}
                >
                  {t('signupButton')}
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUpPage;
