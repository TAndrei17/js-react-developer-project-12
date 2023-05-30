const rusInterface = {
  translation: {
    loginPage: {
      header: 'Войти',
      nic: 'Ваш ник',
      nicRequire: 'Пожалуйста, укажите ник',
      password: 'Пароль',
      passwordRequire: 'Пожалуйста, укажите пароль',
      passwordMin: 'В пароле должно быть минимум {{signs}} знаков',
      formLoginError: 'Неверное имя пользователя или пароль',
      loginButton: 'Войти',
      noAccount: 'Нет аккаунта?',
      signUpLink: 'Зарегистрироваться',
    },
    signUpPage: {
      header: 'Регистрация',
      userName: 'Имя пользователя',
      userNameRequire: 'Пожалуйста, укажите имя пользователя',
      userNameMin: 'От 3 до 20 символов',
      password: 'Пароль',
      passwordRequire: 'Пожалуйста, укажите пароль',
      passwordMin: 'Не менее {{signs}} символов',
      confirmPassword: 'Подтвердите пароль',
      equalRequire: 'Пароли должны совпадать',
      signupButton: 'Зарегистрироваться',
      formSignUpError: 'Такой пользователь уже существует',
    },
    notFoundPage: {
      errorMessage: 'Извините. Страница не существует',
      errorNumber: '(Ошибка 404)',
      advice: `Но вы можете войти${" "}`,
      adviceLink: 'на главную страницу',
    },
    mainPage: {
      logoutButton: 'Выйти',
      channels: 'Каналы',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
      messageField: 'Введите сообщение',
      ariaLabel: 'Новое сообщение',
      fieldTitle: 'Привет, мир!',
      messageSend: 'Отправить',
    },
    modalWindows: {
      switchList: 'Переключатель выпадающего списка',
      buttonChange: 'Переименовать',
      buttonDelete: 'Удалить',
      headerAddChannel: 'Добавить канал',
      headerChangeChannel: 'Переименовать канал',
      headerRemoveChannel: 'Удалить канал',
      formLabel: 'Имя канала',
      errorMessage: 'Должно быть уникальным!',
      questionDelete: 'Уверены?',
      buttonCancel: 'Отменить',
      buttonSend: 'Отправить',      
    },
  }
};

export default rusInterface;