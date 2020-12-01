import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDvV_Hra6fREnF8FURStqbfTQf6mpuhajA",
    authDomain: "cartalog-store.firebaseapp.com",
    databaseURL: "https://cartalog-store.firebaseio.com/",
    projectId: "cartalog-store",
    storageBucket: "cartalog-store.appspot.com",
    messagingSenderId: "704411845488",
    appId: "1:704411845488:web:807789b33f733f974305b5",
    measurementId: "G-1QRY8DNQ68"
};

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
