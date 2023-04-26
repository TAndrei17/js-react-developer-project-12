import { Link } from 'react-router-dom';

const Mainpage = () => {
  return (
    <>
      <div className="container vh-100">
        <div className="row justify-content-center mb-5 mt-5">
          <div className="col-auto h4">
            <Link to="/" className="btn btn-primary">
              Главная
            </Link>
          </div>
          <div className="col-auto h4">
            <Link to="/loginpage" className="btn btn-primary">
              Войти
            </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <h1 className="col-auto h3 text-primary">
            Добро пожаловать в МЕЛЕГРАМ-ЧАТ!
          </h1>
        </div>
      </div>
    </>
  );
};

export { Mainpage };
