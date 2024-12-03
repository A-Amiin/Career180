#                                          ( Dispatch --- action (type, payload) --- to reducer )
---------------------------------------------------------------------------------------------------------------------------------
# Intro to Redux :
- Redux is a predictable state container for javascript apps.
- library for JavaScript applications not related to React only can be user for any frameworks like vue or angular or React or any js application.

- Redux is a predictable state container for JavaScript apps, providing a central store for managing the application state. It requires you to manually set up actions, reducers, and middleware.

- we can use react-redux to achieve that
- redux 1.0 was a August 2015 before react Hooks.

# Redux Toolkit:
- Redux Toolkit (RTK) is the official, recommended way to use Redux, aimed at simplifying Redux development by providing a standard way to write Redux logic.
- now we will use redux toolkit to achieve that.

# How to Install: 
- npm install @reduxjs/toolkit react-redux

----------------------------------------------------------------------
# compare between fetch & axios: 
Fetch:
 - Native to the browser and built into JavaScript.
 - Uses Promises for handling asynchronous requests.
 - Requires more code for handling JSON data and other tasks like error handling.
 - Native and requires no installation.

Example: 
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));


Axios:
 - A third-party library that needs to be installed (via npm or CDN).
 - Provides a more concise and readable syntax.
 - Automatically transforms JSON data and has built-in features like request cancellation, interceptors, and timeout settings.
 - required installation
 - Supports older browsers like IE11 without polyfills, unlike fetch.

Example : 

axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error('Axios error:', error));

# check this link: https://axios-http.com/docs/intro
----------------------------------------------------------------------

# react Router:  https://reactrouter.com/  (self study)


# https://react-bootstrap.netlify.app/

----------------------------------------------------------------------

- npx create-react-app final-react-app
- cd final-react-app
- npm install @reduxjs/toolkit react-redux axios
- npm install react-router-dom
- npm install bootstrap
- npm install react-toastify
- npm install react-bootstrap
- npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
- npm cache clean --force
- npm start