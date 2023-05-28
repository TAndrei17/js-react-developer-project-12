import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import StatusContext from '../context/index.js';
import Header from './components/header.jsx';

const LoginSchema = yup.object().shape({
  username: yup.string().trim().required('Пожалуйста, укажите ник'),
  password: yup
    .string()
    .required('Пожалуйста, укажите пароль')
    .min(5, 'В пароле должно быть минимум 5 знаков'),
});

const ErrorBlock = () => {
  const { statusState } = useContext(StatusContext);
  const { authorization } = statusState;
  const classError = cn('mt-0', {
    'd-none': authorization,
    'd-block': !authorization,
  });
  return <div className={classError}>Неверное имя пользователя или пароль</div>;
};

const Loginpage = () => {
  const { setActive, accessYes, accessNo } = useContext(StatusContext);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          axios
            .post('/api/v1/login', values)
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
              <h1 className="col-12 text-center text-primary">Войти</h1>
              <Form className="col-12 col-md-6 mt-3">
                <div className="form-floating mb-3">
                  <Field
                    name="username"
                    type="text"
                    placeholder="Ваш ник"
                    id="username"
                    required
                    className="form-control"
                  />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                  <label htmlFor="username">Ваш ник</label>
                </div>

                <div className="form-floating">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    id="password"
                    required
                    className="form-control"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <label htmlFor="password">Пароль</label>
                </div>
                <ErrorBlock />

                <button
                  type="submit"
                  className="w-100 mt-3 mb-3 btn btn-primary"
                  disabled={isSubmitting}>
                  Войти
                </button>
              </Form>

              <div className="row justify-content-center mb-3">
                <span className="col-auto">Нет аккаунта?</span>
                <Link to="/signup" className="col-auto">
                  Зарегистрироваться
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
