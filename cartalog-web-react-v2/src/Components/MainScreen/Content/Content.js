import React from "react";
import ContentView from "./ContentView";
import MainScreen from "../MainScreen";

const Content = (props) => {

    const citiesArray = props.citiesArray
    const selectedCity = props.selectedCity
    const setSelectedCity = props.setSelectedCity
    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    return(
        <ContentView citiesArray={citiesArray}
                     selectedCity={selectedCity}
                     setSelectedCity={setSelectedCity}
                     requestsDataset={requestsDataset}
                     partnerData={partnerData}
        />
    )

}

export default Content