import React, {useEffect, useState} from "react";
import LoginScreenView from "./LoginScreenView";
import * as firebase from "firebase";
import {useHistory} from "react-router-dom"

const LoginScreen = (props) => {

    const partnerData = props.partnerData

    const [loginInput, setLoginInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const history = useHistory()

    useEffect(() => {

       if (partnerData){
           history.push('/')
       }

    }, [partnerData,history])

    const handleLoginInputChange = (event) => {

        setLoginInput(event.target.value)
    }
    const handlePasswordInputChange = (event) => {

        setPasswordInput(event.target.value)

    }

    const handleLogin = () => {

        firebase.auth().signInWithEmailAndPassword(loginInput, passwordInput).catch(er => {
            alert(er)
        })

    }

    return (
        <LoginScreenView loginInput={loginInput}
                         passwordInput={passwordInput}
                         handleLoginInputChange={handleLoginInputChange}
                         handlePasswordInputChange={handlePasswordInputChange}
                         handleLogin={handleLogin}
        />
    )

}

export default LoginScreen