import { Link } from 'react-router-dom';
import Header from './components/header.jsx';

const Notfoundpage = () => {
  return (
    <>
      <Header />
      <div className="container vh-100">
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-12 mb-3 h2 text-center text-primary">
            Извините. Страница не существует
          </div>
          <div className="col-12 h2 mb-3 text-center text-primary">
            (ошибка 404)
          </div>
          <div className="col-auto mt-3">
            <span>
              Но вы можете войти
              <Link to="/"> на главную страницу</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export { Notfoundpage };
