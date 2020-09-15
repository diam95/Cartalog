import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles({
    main: {
        marginTop: '20vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        maxWidth: 300,
        justifyContent: 'center'
    },
    button: {
        fontWeight: 'bold',
    }

});

const LoginComponent = () => {

    console.log('<LoginComponent/>');

    const classes = useStyles();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginChange = (event) => {

        const login = event.target.value;
        setLogin(login);
        console.log({login});

    };

    const handlePasswordChange = (event) => {

        const password = event.target.value;
        setPassword(password);
        console.log({password});

    };

    const handleButtonLoginClick = () => {

        setLoading(true);

            firebase.auth().signInWithEmailAndPassword(login, password).then(r => {

                setLoading(false)

            });

    };

    return (
        <div className={classes.main}>

            <form noValidate autoComplete="off" className={classes.container}>
                <TextField id="filled-basic" label="Логин" variant="filled" type='email' onChange={handleLoginChange}/>
                <TextField id="filled-basic" label="Пароль" variant="filled" type='password'
                           onChange={handlePasswordChange}/>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleButtonLoginClick}
                    disabled={loading}>
                    Войти
                </Button>
            </form>

        </div>
    )
};

export default LoginComponent;
