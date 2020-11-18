import React from 'react'
import HeaderComponentView from "./HeaderComponentView";
import {useHistory} from "react-router-dom";
import HeaderComponentViewMobile from "./HeaderComponentViewMobile";

const HeaderComponent = (props) => {

    const matches = props.matches

    console.log({matches})
    const history = useHistory()

    const handleGoToMainPage = () => {

        history.push("/")

    }

    const renderContent = () => {

        if (matches) {
            return <HeaderComponentViewMobile handleGoToMainPage={handleGoToMainPage}
                                        darkMode={props.darkMode}
                                        setDarkMode={props.setDarkMode}/>
        } else {
            return <HeaderComponentView handleGoToMainPage={handleGoToMainPage}
                                        darkMode={props.darkMode}
                                        setDarkMode={props.setDarkMode}/>
        }

    }

    return (
        <div style={{width:"100%"}}>
            {renderContent()}
        </div>

    )

}

export default HeaderComponent