import React from 'react'
import InfoComponentView from "./InfoComponentView";
import {useLocation} from "react-router-dom";

const InfoComponent = (props) => {

    const locationArray = useLocation().pathname.split("/")

    return (
        <>
            {locationArray[1] !== "cart" &&
            locationArray[1] !== "services" &&
            locationArray[1] !== "payment" &&
            locationArray[1] !== "shipping" &&
            locationArray[1] !== "guarantees" &&
            locationArray[1] !== "refund" &&
            locationArray[1] !== "about" &&
            locationArray[1] !== "contacts"
                ? <></>
                : <InfoComponentView/>}
        </>

    )

}

export default InfoComponent