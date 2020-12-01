import React from 'react'
import HeaderComponentView from "./HeaderComponentView";
import HeaderComponentViewMobile from "./HeaderComponentViewMobile";
import {useHistory} from "react-router-dom";

const HeaderComponent = (props) => {

    const matches = props.matches
    const darkMode = props.darkMode
    const setDarkMode = props.setDarkMode
    const cartState = props.cartState

    const history = useHistory()

    const handleGoToMainPage = () => {

        history.push("/")

    }

    const handleGoToCart = () => {

        history.push("/cart")

    }

    return (
        <>
            {matches
                ? <HeaderComponentViewMobile setDarkMode={setDarkMode}
                                             darkMode={darkMode}
                                             cartState={cartState}
                                             handleGoToMainPage={handleGoToMainPage}
                                             handleGoToCart={handleGoToCart}
                />
                : <HeaderComponentView setDarkMode={setDarkMode}
                                       darkMode={darkMode}
                                       cartState={cartState}
                                       handleGoToMainPage={handleGoToMainPage}
                                       handleGoToCart={handleGoToCart}
                />
            }
        </>
    )

}

export default HeaderComponent