import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ children }) => {
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-3 shadow">
      <div className="container">
        <Link to="/" className="navbar-brand col-auto me-auto">
          {t('headerPage')}
        </Link>
        {children}
      </div>
    </nav>
  );
};

export default Header;
