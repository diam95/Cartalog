import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAAtqPZbPNKzEQZKkYyTyrSoSbKb4ZsnvQ",
    authDomain: "cartalog-mgdn.firebaseapp.com",
    databaseURL: "https://cartalog-mgdn.firebaseio.com",
    projectId: "cartalog-mgdn",
    storageBucket: "cartalog-mgdn.appspot.com",
    messagingSenderId: "97117921513",
    appId: "1:97117921513:web:bdca98f3b4f86da9ee1078",
    measurementId: "G-H5PHKWGEDH"
};

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
