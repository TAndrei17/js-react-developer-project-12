import { Link } from 'react-router-dom';

const Mainpage = () => {
  return (
    <div className="container">
      <header>
        <div className="row text-center mb-3">
          <div className="col-6 h4">
            <Link to="/">Mainpage</Link>
          </div>
          <div className="col-6 h4">
            <Link to="/loginpage">Login</Link>
          </div>
        </div>
      </header>

      <div className="row mb-3">
        <h1 className="col-12 h4 text-center">Welcome to Melegram!</h1>
      </div>
    </div>
  );
};

export { Mainpage };
