import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import StatusContext from '../context/index.js';
import Header from './components/header.jsx';

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Пожалуйста, укажите имя пользователя')
    .min(3, 'От 3 до 20 символов'),
  password: yup
    .string()
    .required('Пожалуйста, укажите пароль')
    .min(6, 'Не менее 6 символов'),
  confirm_password: yup
    .string()
    .required('Пожалуйста, подтвердите пароль')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const ErrorBlock = () => {
  const { statusState } = useContext(StatusContext);
  const { authorization } = statusState;

  const classError = cn('mt-0', {
    'd-none': authorization,
    'd-block': !authorization,
  });
  return <div className={classError}>Такой пользователь уже существует</div>;
};

const Signuppage = () => {
  const { setActive, accessYes, accessNo } = useContext(StatusContext);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ username: '', password: '', confirm_password: '' }}
        onSubmit={(values, { resetForm }) => {
          const { confirm_password, ...updateValues } = values;
          axios
            .post('/api/v1/signup', updateValues)
            .then((response) => {
              console.log(response.data);
              accessYes();
              setActive();
              Object.assign(localStorage, response.data);
            })
            .then(() => navigate('/'))
            .catch((error) => {
              accessNo();
            });
          resetForm();
        }}>
        {({ errors, touched, isSubmitting }) => (
          <div className="container h-100 mt-3">
            <div className="row justify-content-center align-content-center h-100">
              <h1 className="col-12 text-center text-primary">Регистрация</h1>
              <Form className="col-12 col-md-6 mt-3">
                <div className="form-floating mb-3">
                  <Field
                    autoFocus
                    id="username"
                    name="username"
                    placeholder="От 3 до 20 символов"
                    autoComplete="username"
                    type="text"
                    required
                    className="form-control"
                  />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                  <label htmlFor="username">Имя пользователя</label>
                </div>

                <div className="form-floating mb-3">
                  <Field
                    id="password"
                    name="password"
                    placeholder="Не менее 6 символов"
                    autoComplete="new-password"
                    type="password"
                    required
                    className="form-control"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <label htmlFor="password">Пароль</label>
                </div>

                <div className="form-floating mb-3">
                  <Field
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Пароли должны совпадать"
                    autoComplete="new-password"
                    type="password"
                    required
                    className="form-control"
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <div>{errors.confirm_password}</div>
                  ) : null}
                  <label htmlFor="confirm_password">Подтвердите пароль</label>
                </div>
                <ErrorBlock />

                <button
                  type="submit"
                  className="w-100 mt-3 mb-3 btn btn-primary"
                  disabled={isSubmitting}>
                  Войти
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export { Signuppage };
