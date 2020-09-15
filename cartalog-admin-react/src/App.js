import React, {useEffect, useState} from 'react';
import './App.css';
import firebase from "firebase";
import HorizontalAppbar from "./Components/HorizontalAppbar/HorizontalAppbar";
import LoginComponent from "./Components/LoginComponent/LoginComponent";
import Content from "./Components/Content/Content";

function App() {

    console.log('<App/>');

    const [authState, setAuthState] = useState({isLoggedIn: false});
    const [appbarTitle, setAppbarTitle] = useState('Cartalog admin');
    const [store, setStore] = useState({});

    useEffect(() => {

        if (!authState.isLoggedIn) {

            firebase.auth().onAuthStateChanged((user) => {

                if (user) {



                    firebase.database().ref().once('value', snap => {

                        setStore(snap.val())

                    }).then(r => {
                        setAuthState({isLoggedIn: true});
                        setAppbarTitle('Cartalog admin');
                        console.log('is logged in');
                    })

                } else {

                    setAppbarTitle('Вход');
                    console.log('not logged in')

                }

            });

        }

    }, [authState]);

    const body = () => {

        if (authState.isLoggedIn) {

            return (<Content store={store}/>)

        } else {

            return (<LoginComponent/>)

        }

    };

    return (
        <div className="App">
            <HorizontalAppbar title={appbarTitle}/>
            <div>
                {body()}
            </div>
        </div>
    );
}

export default App;
