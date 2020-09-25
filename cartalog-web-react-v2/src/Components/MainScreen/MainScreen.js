import React, {useEffect, useState} from "react";
import MainScreenView from "./MainScreenView";
import * as firebase from "firebase";
import {useHistory} from "react-router-dom"
import data from "../../data";

const MainScreen = (props) => {

    const partnerData = props.partnerData
    const citiesArray = props.citiesArray
    const selectedCity = props.selectedCity
    const setSelectedCity = props.setSelectedCity
    const requestsDataset = props.requestsDataset

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const history = useHistory()

    //CHECK AUTH STATE
    useEffect(() => {

        if (Object.values(partnerData).length === 0) {
            history.push("/login")
        } else (
            setIsLoggedIn(true)
        )

    }, [partnerData, history])

    return (
        <MainScreenView isLoggedIn={isLoggedIn}
                        citiesArray={citiesArray}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        requestsDataset={requestsDataset}
                        partnerData={partnerData}
        />
    )

}

export default MainScreen