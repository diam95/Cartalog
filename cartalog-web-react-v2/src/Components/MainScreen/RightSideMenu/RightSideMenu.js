import React from "react";
import RightSideMenuView from "./RightSideMenuView";

const RightSideMenu = (props) => {

    const request = props.request

    return(
        <RightSideMenuView request={request}/>
    )

}

export default RightSideMenu