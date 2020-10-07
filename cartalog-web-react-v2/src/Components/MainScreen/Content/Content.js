import React from "react";
import ContentView from "./ContentView";
import {useHistory, useLocation} from "react-router-dom";

const Content = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData
    const location = useLocation()
    const history = useHistory()

    return(
        <ContentView requestsDataset={requestsDataset}
                     partnerData={partnerData}
                     history={history}
                     location={location}
        />
    )

}

export default Content