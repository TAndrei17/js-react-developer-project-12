import { Link } from 'react-router-dom';

const Notfoundpage = () => {
  return (
    <div className="container vh-100">
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-12 mb-3 h2 text-center text-primary">
          Извините. Страница не существует
        </div>
        <div className="col-12 h2 mb-3 text-center text-primary">
          (ошибка 404)
        </div>
        <div className="col-auto mt-3">
          <Link to="/loginpage" className="btn btn-primary">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Notfoundpage };
