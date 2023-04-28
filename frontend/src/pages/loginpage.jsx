import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import StatusContext from '../context/index.js';

const LoginSchema = yup.object().shape({
  username: yup.string().trim().required('Пожалуйста, укажите ник'),
  password: yup
    .string()
    .required('Пожалуйста, укажите пароль')
    .min(5, 'В пароле должно быть минимум 5 знаков'),
});

const loginState = {
  authorization: true,
};

const ErrorBlock = () => {
  const { authorization } = loginState;
  const classError = cn('mt-0', {
    'd-none': authorization,
    'd-block': !authorization,
  });
  return <div className={classError}>Неверное имя пользователя или пароль</div>;
};
// надо подумать - блок пояляется с запозданием

const Loginpage = () => {
  const { statusState, setValid } = useContext(StatusContext);
  console.log(statusState);
  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, { resetForm }) => {
        axios
          .post('/api/v1/login', values)
          .then((response) => {
            const { username, token } = response.data;
            localStorage.setItem('username', username);
            localStorage.setItem('token', token);
          })
          .then(() => setValid())
          .then(() => console.log(statusState))
          .catch((error) => {
            loginState.authorization = false;
          });
        resetForm();
      }}>
      {({ errors, touched }) => (
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

              <button type="submit" className="w-100 mt-3 mb-3 btn btn-primary">
                Войти
              </button>
            </Form>

            <div className="row justify-content-center mb-3">
              <span className="col-auto">Нет аккаунта?</span>
              <Link to="/" className="col-auto">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export { Loginpage };
