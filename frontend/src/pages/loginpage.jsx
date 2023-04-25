import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  username: yup.string().trim().required('Please, write username'),
  password: yup
    .string()
    .required()
    .min(6, 'Password must be at least 6 characters'),
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
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <Form className="col-12 col-md-6 mt-3 mt-mb-0">
              <div className="form-floating mb-3">
                <Field
                  name="username"
                  type="username"
                  required=""
                  placeholder="Your username"
                  id="username"
                  className="form-control"
                />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
                <label htmlFor="username"></label>
              </div>

              <div className="form-floating mb-3">
                <Field
                  name="password"
                  type="password"
                  required=""
                  placeholder="Your password"
                  id="password"
                  className="form-control"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <label htmlFor="password"></label>
              </div>

              <button type="submit" className="w-100 mb-3 btn btn-primary">
                Log in
              </button>
            </Form>

            <div className="text-center">
              <span>Not have an account yet?</span>
              <Link to="/">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export { Loginpage };
