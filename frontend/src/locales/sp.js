const spInterface = {
    translation: {
      loginPage: {
        header: 'Entrar',
        nic: 'Su nick',
        nicRequire: 'Especifique su nick, por favor',
        password: 'Сontraseña',
        passwordRequire: 'Especifique la сontraseña, por favor',
        passwordMin: 'La contraseña debe contener al menos {{signs}} caracteres',
        formLoginError: 'Nombre de usuario o contraseña incorrectos',
        loginButton: 'Entrar',
        noAccount: "No tiene una cuenta todavia?",
        signUpLink: 'Registrarse',
      },
      signUpPage: {
        header: 'Registrarse',
        userName: 'Su nombre',
        userNameRequire: 'Especifique su nombre, por favor',
        userNameMin: 'De 3 a 20 caracteres',
        password: 'Сontraseña',
        passwordRequire: 'Especifique la сontraseña, por favor',
        passwordMin: 'La contraseña debe contener al menos {{signs}} caracteres',
        confirmPassword: 'Confirme la contraseña, por favor',
        equalRequire: 'Las contraseñas deben coincidir',
        signupButton: 'Registrarse',
        formSignUpError: 'Tal usuario ya existe',
      },
      notFoundPage: {
        errorMessage: 'Lo sentimos, la página no encontrada',
        errorNumber: '(Error 404)',
        advice: `Pero puede visitar${" "}`,
        adviceLink: 'la página de inicio',
      },
      mainPage: {
        logoutButton: 'Salir',
        channels: 'Canales',
        message_one: '{{count}} mensaje',
        message_other: '{{count}} mensajes',
        messageField: 'Escriba su mensaje',
        ariaLabel: 'Mensaje nuevo',
        fieldTitle: '¡Hola Mundo!',
        messageSend: 'Emitir',
      },
      modalWindows: {
        switchList: 'Cambiar de lista desplegable',
        buttonChange: 'Renombrar',
        buttonRemove: 'Eliminar',
        headerAddChannel: 'Añadir un canal',
        headerChangeChannel: 'Renombrar canal',
        headerRemoveChannel: 'Eliminar canal',
        formLabel: 'El mombre del canal',
        errorMessage: 'El nombre debe ser único!',
        questionDelete: '¿Está seguro?',
        buttonCancel: 'Cancelar',
        buttonSend: 'Enviar',      
      },
    }
  };
  
  export default spInterface;