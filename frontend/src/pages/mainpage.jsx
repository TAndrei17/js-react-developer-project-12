import { Link } from 'react-router-dom';

const Mainpage = () => {
  return (
    <>
      <div className="container vh-100">
        <div className="row text-center mb-3 mt-3">
          <h1 className="col-8 h3 text-primary">
            Добро пожаловать в Мелеграм-Чат!
          </h1>
          <div className="col-4 h3">
            <Link to="/loginpage" className="btn btn-primary">
              Выйти
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { Mainpage };
