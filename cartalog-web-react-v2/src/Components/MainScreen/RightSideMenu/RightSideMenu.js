import React from "react";
import RightSideMenuView from "./RightSideMenuView";

const RightSideMenu = (props) => {

    const request = props.request
    const partnerData = props.partnerData

    return(
        <RightSideMenuView request={request}
                           partnerData={partnerData}
        />
    )

}

export default RightSideMenu