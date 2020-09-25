import React, {useState} from "react";
import TopAppBarView from "./TopAppBarView";
import MainScreen from "../../MainScreen";

const TopAppBar = (props) => {

    const citiesArray = props.citiesArray
    const selectedCity = props.selectedCity
    const setSelectedCity = props.setSelectedCity
    const partnerData = props.partnerData

    const handleChange = (event) => {

        setSelectedCity(event.target.value)

    }

    return (
        <TopAppBarView citiesArray={citiesArray}
                       handleChange={handleChange}
                       selectedCity={selectedCity}
                       partnerData={partnerData}
        />
    )

}

export default TopAppBar