# Hexlet-Chat

### Hexlet tests, linter status and maintainability

[![Actions Status](https://github.com/TAndrei17/js-react-developer-project-12/workflows/hexlet-check/badge.svg)](https://github.com/TAndrei17/js-react-developer-project-12/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/5905b9d1320b5fcba8ea/maintainability)](https://codeclimate.com/github/TAndrei17/js-react-developer-project-12/maintainability)

### Deploy on Railway.app

[HEXLET-CHAT](http://js-react-developer-project-12-production-1e82.up.railway.app/)

### About the project

Hexlet-Chat is Andrei Trunkin's training project. It is a simple chat for communication that allows you to create channels and exchange messages. Hexlet-Chat is built on the React and Bootstrap5 frameworks. The backend is provided by [the Hexlet online education platform](https://hexlet.io/).

![Hexlet-Chat](/images/mainTexting_eng.JPG)

**The main goal of the project** is to apply the theoretical knowledge of creating React applications: learn how to create functional components, use hooks, work with state using the React Redux Toolkit, pass authorization data through the context, load data from the server using the axios library and real-time messaging using the Socket.IO library and other.

**Design.** Although design was not the main goal of the project, Hexlet-Chat is adapted for mobile devices through Bootstrap 5. The chat gives pop-up informational messages about creating, changing or deleting channels, as well as warning about errors when communicating with the server.

![Main page. Create channel](/images/mainCrearPopUp_esp.JPG)

**Multilingual.** The chat interface is available in three languages: Russian, English, Spanish. Messages in Russian and English are filtered from obscene words. It is possible to add filtering in other languages.

**Code improvement**. The project has been tested by the Hexlet school: the application works correctly, the main linter errors have been fixed. Whenever possible, I continue to work on improving the code to increase the extensibility of the application and make it easier to understand the project architecture.

### How to try it.

The chat is available for 20 days of each month on [Railway.app](http://js-react-developer-project-12-production-1e82.up.railway.app/). To try Hexlet-Chat, please register on [the Sign-Up page](https://js-react-developer-project-12-production-1e82.up.railway.app/signup) or use the *nickname 'admin'* and *password 'admin'* on [the login page](https://js-react-developer-project-12-production-1e82.up.railway.app/login) of the application.

![Sign-Up page](/images/signUp_esp.JPG) ![Login Page](/images/logIn_eng.JPG)

  *Accounts and messages are stored for one hour, after which they are automatically deleted from the server. If the chat is not available on Railway.app, you can download it from GitHub and run it locally on your machine.*

## Instalation
```sh
git clone git@github.com:TAndrei17/js-react-developer-project-12.git
make install
npm run build
make start
```

  *If you are working on Windows, change the linebreak-style rule in the ‘frontend/.eslintrc.yml’ file to the following: `linebreak-style: ["error", "windows"]`. To run the server and application on windows, you should have a Linux emulator for Windows and the `make` program.*