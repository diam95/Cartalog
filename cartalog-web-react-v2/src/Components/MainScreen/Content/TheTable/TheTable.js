import React from "react";
import TheTableView from "./TheTableView";

const TheTable = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    return (
        <TheTableView requestsDataset={requestsDataset}
                      partnerData={partnerData}
        />
    )

}

export default TheTable