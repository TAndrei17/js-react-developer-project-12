import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Header from './components/header.jsx';
import ButtonsLng from './components/buttons_languages.jsx';

const Notfoundpage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'notFoundPage' });

  return (
    <>
      <Header>
        <ButtonsLng />
      </Header>
      <div className="container vh-100">
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-12 mb-3 h2 text-center text-primary">
            {t('errorMessage')}
          </div>
          <div className="col-12 h2 mb-3 text-center text-primary">
            {t('errorNumber')}
          </div>
          <div className="col-auto mt-3">
            <span>{t('advice')}</span>
            <span>
              <Link to="/">{t('adviceLink')}</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export { Notfoundpage };
