import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: `100%`,
        background: '#85b4e3',
    },

    div2: {
        height: `100vh`,

    },
    title: {
        color: `white`,
        fontWeight: 800,
        fontFamily: `Nunito sans`
    },
    inputDiv: {
        marginTop: `20vh`,
    },
    textField: {
        margin: 5
    },
    button: {
        marginTop: 10,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    }

}));

export default function LogIn() {

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const classes = useStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const valueListener = (event) => {

        switch (event.target.id) {

            case `login`:
                setEmail(event.target.value);
                break;

            case `password`:
                setPassword(event.target.value);
                break;
            default:
        }
    };

    const signIn = () => {

        if (!loading) {
            setSuccess(false);
            setLoading(true);
            firebase.auth().signInWithEmailAndPassword(email, password).then(r => {

                setSuccess(true);
                setLoading(false);



            }).catch(function (error) {

                setLoading(false);

            });
        }


    };


    return (

        <div className={classes.root}>
            <Grid container>
                <Grid item lg={4} xl={4} md={4} xs={false} sm={false}>
                </Grid>
                <Grid item lg={4} xl={4} md={4} xs={12} sm={12} className={classes.div2}>
                    <div className={classes.inputDiv}>
                        <h1 className={classes.title}>Cartalog</h1>
                        <div className={classes.inputGroup}>
                            <div>
                                <TextField id="login" label="Логин" variant="outlined" type="email"
                                           className={classes.textField} onChange={valueListener}/>
                            </div>
                            <div>
                                <TextField id="password" label="Пароль" variant="outlined" type="password"
                                           className={classes.textField} onChange={valueListener}/>
                            </div>
                            <div>
                                <div className={classes.wrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={buttonClassname}
                                        disabled={loading}
                                        onClick={signIn}
                                    >
                                        Войти
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={4} xl={4} md={4} xs={false} sm={false}>
                </Grid>
            </Grid>
        </div>

    );

}