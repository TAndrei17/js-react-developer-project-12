const loginPage = {
  header: 'Войти',
  nic: 'Ваш ник',
  nicRequire: 'Пожалуйста, укажите ник',
  password: 'Пароль',
  passwordRequire: 'Пожалуйста, укажите пароль',
  passwordMin: 'Не менее {{signs}} символов',
  formLoginError: 'Неверные имя пользователя или пароль',
  loginButton: 'Войти',
  noAccount: 'Нет аккаунта?',
  signUpLink: 'Регистрация',
};

const signUpPage = {
  header: 'Регистрация',
  userName: 'Имя пользователя',
  userNameRequire: 'Пожалуйста, укажите имя пользователя',
  userNameMin: 'От 3 до 20 символов',
  password: 'Пароль',
  passwordRequire: 'Пожалуйста, укажите пароль',
  passwordMin: 'Не менее {{signs}} символов',
  confirmPassword: 'Подтвердите пароль',
  confirmPasswordError: 'Пожалуйста, подтвердите пароль',
  equalRequire: 'Пароли должны совпадать',
  signupButton: 'Зарегистрироваться',
  formSignUpError: 'Такой пользователь уже существует',
};

const notFoundPage = {
  errorMessage: 'Страница не найдена',
  errorNumber: '(ошибка 404)',
  advice: `Но вы можете перейти${' '}`,
  adviceLink: 'на главную страницу',
};

const mainPage = {
  logoutButton: 'Выйти',
  channels: 'Каналы',
  message_one: '{{count}} сообщение',
  message_few: '{{count}} сообщения',
  message_many: '{{count}} сообщений',
  messageField: 'Введите сообщение...',
  ariaLabel: 'Новое сообщение',
  messageSend: 'Отправить',
};

const modalWindows = {
  switchList: 'Управление каналом',
  buttonChange: 'Переименовать',
  buttonRemove: 'Удалить',
  headerAddChannel: 'Добавить канал',
  headerChangeChannel: 'Переименовать канал',
  headerRemoveChannel: 'Удалить канал',
  formLabel: 'Имя канала',
  errorMessage: 'Должно быть уникальным!',
  questionDelete: 'Уверены?',
  buttonCancel: 'Отменить',
  buttonSend: 'Отправить',
};

const popupNotifications = {
  channelCreated: 'Канал создан',
  channelRenamed: 'Канал переименован',
  channelRemoved: 'Канал удалён',
  notConnected: 'Ошибка соединения',
};

const ru = {
  translation: {
    headerPage: 'Hexlet Chat',
    language: 'RU',
    loginPage,
    signUpPage,
    notFoundPage,
    mainPage,
    modalWindows,
    popupNotifications,
  },
};

export default ru;
