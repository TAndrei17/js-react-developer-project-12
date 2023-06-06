const en = {
  translation: {
    headerPage: 'Hexlet Chat',
    language: 'EN',
    loginPage: {
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
    },
    signUpPage: {
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
    },
    notFoundPage: {
      errorMessage: 'Sorry. Page not found',
      errorNumber: '(Error 404)',
      advice: `But you can visit${" "}`,
      adviceLink: 'main page',
    },
    mainPage: {
      logoutButton: 'Log out',
      channels: 'Channels',
      message_one: '{{count}} message',
      message_other: '{{count}} messages',
      messageField: 'Write your message',
      ariaLabel: 'New message',
      fieldTitle: 'Hello, world!',
      messageSend: 'Post',
    },
    modalWindows: {
      switchList: 'Switch of dropdown list',
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
    },
    popupNotifications: {
      channelCreated: 'Channel is created',
      channelNoCreated: 'Failed to create a channel',
      channelRenamed: 'Channel is renamed',
      channelNoRenamed: 'Failed to rename a channel',
      channelRemoved: 'Channel is removed',
      channelNoRemoved: 'Failed to remove a channel',
      notConnected: 'Connection error',
    },
  },
};
  
export default en;