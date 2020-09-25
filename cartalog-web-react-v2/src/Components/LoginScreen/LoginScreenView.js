import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(()=>({
    root:{
        width:"100%",
        minHeight:"100vh",
        backgroundColor:"#a0ceef",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    loginContainer:{
        backgroundColor:"white",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        paddingLeft:50,
        paddingRight:50,
        paddingTop:25,
        paddingBottom:25,
        borderRadius:10
    },
    titleText:{
        fontWeight:700,
        fontSize:24,
        color:"#354b5c"
    },
    loginButton:{
        marginTop:20
    }

}))

const LoginScreenView = (props) => {

    const loginInput=props.loginInput
    const passwordInput=props.passwordInput
    const handleLoginInputChange=props.handleLoginInputChange
    const handlePasswordInputChange=props.handlePasswordInputChange
    const handleLogin=props.handleLogin

    const classes = useStyles()

    return(

        <div className={classes.root}>

            <div className={classes.loginContainer}>

                <div className={classes.titleText}>Cartalog</div>

                <TextField fullWidth
                           id="standard-basic"
                           label="Логин"
                           value={loginInput}
                           onChange={handleLoginInputChange}
                />

                <TextField fullWidth
                           id="standard-basic"
                           label="Пароль"
                           value={passwordInput}
                           onChange={handlePasswordInputChange}
                />

                <Button fullWidth
                        className={classes.loginButton}
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                >
                    Войти
                </Button>

            </div>

        </div>

    )

}

export default LoginScreenView