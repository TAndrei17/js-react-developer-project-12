import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  username: yup.string().trim().required('Пожалуйста, укажите ник'),
  password: yup
    .string()
    .required()
    .min(6, 'В пароле должно быть минимум 6 знаков'),
});

const Loginpage = () => {
  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log('submit', values);
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
                  className="form-control"
                />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
                <label htmlFor="username">Ваш ник</label>
              </div>

              <div className="form-floating mb-3">
                <Field
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  id="password"
                  className="form-control"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <label htmlFor="password">Пароль</label>
              </div>

              <button type="submit" className="w-100 mb-3 btn btn-primary">
                Войти
              </button>
            </Form>

            <div className="row justify-content-center mb-3">
              <span className="col-auto">Нет аккаунта?</span>
              <Link to="/" className="col-auto">
                Зарегистрироваться
              </Link>
            </div>
            <div className="col-12 h4 text-center mb-3 mt-3">
              <Link to="/" className="btn btn-primary">
                На главную
              </Link>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export { Loginpage };
