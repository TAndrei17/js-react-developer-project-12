let textFilter = require('leo-profanity');

const getLanguage = (str) => {
  const isCyrillic = /[а-я]/i.test(str);
  return isCyrillic === true ? 'ru' : 'en';
};

export { textFilter, getLanguage };