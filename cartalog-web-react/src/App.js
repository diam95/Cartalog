import React, {useState, useEffect} from 'react';
import firebase from "firebase";
import './App.css';
import 'typeface-roboto';
import LogIn from "./Components/LogIn/LogIn";
import Content from "./Components/Content/Content";
import {SnackbarProvider} from 'notistack';
import MessageSnack from "./Components/Content/MessageSnack/MessageSnack";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

//firebase database:profile --project cartalog-mgdn

function App() {

    console.log(`<App/>`);

    const [loginState, setLoginState] = useState({isLoggedIn: false, vendorData: {}});
    const [open, setOpen] = useState(false);



    useEffect(() => {

        const checkAuth = () => {

            firebase.auth().onAuthStateChanged((user) => {

                if (user != null) {

                    firebase.database().ref(`partners2`).child(user.uid).orderByKey().equalTo(`info`).once(`child_added`, (snap) => {

                        const vendorData = {...snap.val(), vendorID: user.uid};
                        setLoginState({isLoggedIn: true, vendorData: vendorData});
                        setOpen(true);

                        console.table(loginState)
                    }).then(r => {
                    })

                }

            });

        };

        checkAuth();

    }, [loginState]);

    const body = () => {

        if (loginState.isLoggedIn && loginState.vendorData !== null) {
            return (<Content vendorData={loginState.vendorData}/>)
        } else {
            return (<LogIn/>)
        }

    };

    return (
        <SnackbarProvider maxSnack={4}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                          }}
                          content={(key, message) => (
                              <MessageSnack id={key} message={`Входящее сообщение`} request={message}/>
                          )}
        >
            <div className="App">
                {body()}
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={()=>{setOpen(false)}}
                message="Добро пожаловать!"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{setOpen(false)}}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </SnackbarProvider>
    );
}

export default App;
