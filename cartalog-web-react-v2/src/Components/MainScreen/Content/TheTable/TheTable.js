import React from "react";
import TheTableView from "./TheTableView";
import {useHistory, useLocation} from "react-router-dom";

const TheTable = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData
    const location = useLocation();
    const history = useHistory();


    return (
        <TheTableView requestsDataset={requestsDataset}
                      partnerData={partnerData}
                      location={location}
                      history={history}
        />
    )

}

export default TheTable