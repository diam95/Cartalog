import React, {useEffect, useState} from "react";
import MainScreenView from "./MainScreenView";
import {useHistory} from "react-router-dom"

const MainScreen = (props) => {

    const partnerData = props.partnerData
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
                        requestsDataset={requestsDataset}
                        partnerData={partnerData}
        />
    )

}

export default MainScreen