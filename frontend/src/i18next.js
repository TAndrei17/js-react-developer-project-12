import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import { statusState } from './context/index.js';

const { lng } = statusState;

i18next
  .use(initReactI18next)
  .init({
    lng: lng || 'en',
    debug: true,
    resources,
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
