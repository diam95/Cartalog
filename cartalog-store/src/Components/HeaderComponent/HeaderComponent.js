import React from 'react'
import HeaderComponentView from "./HeaderComponentView";
import {useHistory} from "react-router-dom";

const HeaderComponent = () => {

    const history = useHistory()

    const handleGoToMainPage = () => {

        history.push("/")

    }

    return (
        <HeaderComponentView handleGoToMainPage={handleGoToMainPage}/>
    )

}

export default HeaderComponent