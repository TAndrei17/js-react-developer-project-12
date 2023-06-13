const loginPage = {
  header: 'Log in',
  nic: 'Your nickname',
  nicRequire: 'Specify your nickname, please',
  password: 'Password',
  passwordRequire: 'Specify your password, please',
  passwordMin: 'Password must consist of at least {{signs}} characters',
  formLoginError: 'Incorrect username or password',
  loginButton: 'Log in',
  noAccount: "Don't have an account yet?",
  signUpLink: 'Sign up',
};

const signUpPage = {
  header: 'Sign up',
  userName: 'Username',
  userNameRequire: 'Specify username, please',
  userNameMin: 'From 3 to 20 characters',
  password: 'Password',
  passwordRequire: 'Specify your password, please',
  passwordMin: 'Password must consist of at least {{signs}} characters',
  confirmPassword: 'Confirm password',
  confirmPasswordError: 'Confirm your password, please',
  equalRequire: 'Passwords must match',
  signupButton: 'Sign up',
  formSignUpError: 'Such user already exists',
};

const notFoundPage = {
  errorMessage: 'Sorry. Page not found',
  errorNumber: '(Error 404)',
  advice: `But you can visit${' '}`,
  adviceLink: 'main page',
};

const mainPage = {
  logoutButton: 'Log out',
  channels: 'Channels',
  message_one: '{{count}} message',
  message_other: '{{count}} messages',
  messageField: 'Write your message',
  ariaLabel: 'New message',
  messageSend: 'Post',
};

const modalWindows = {
  switchList: 'Channel management',
  buttonChange: 'Rename',
  buttonRemove: 'Remove',
  headerAddChannel: 'Add channel',
  headerChangeChannel: 'Rename channel',
  headerRemoveChannel: 'Remove channel',
  formLabel: 'Channel name',
  errorMessage: 'The name should be unique!',
  questionDelete: 'Are your sure?',
  buttonCancel: 'Cancel',
  buttonSend: 'Submit',
};

const popupNotifications = {
  channelCreated: 'Channel is created',
  channelRenamed: 'Channel is renamed',
  channelRemoved: 'Channel is removed',
  notConnected: 'Connection error',
};

const en = {
  translation: {
    headerPage: 'Hexlet Chat',
    language: 'EN',
    loginPage,
    signUpPage,
    notFoundPage,
    mainPage,
    modalWindows,
    popupNotifications,
  },
};

export default en;
