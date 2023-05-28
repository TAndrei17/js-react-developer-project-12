import { Link } from 'react-router-dom';

const Header = ({ children }) => {
  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white mb-3">
        <div className="container">
          <Link to="/" className="navbar-brand col-auto me-auto">
            Hexlet Chat
          </Link>
          {children}
        </div>
      </nav>
    </>
  );
};

export default Header;
