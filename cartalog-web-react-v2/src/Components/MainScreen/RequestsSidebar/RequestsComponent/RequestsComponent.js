import React from "react";
import RequestsComponentView from "./RequestsComponentView";

const RequestsComponent = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    return (
        <RequestsComponentView requestsDataset={requestsDataset}
                               partnerData={partnerData}
        />
    )

}

export default RequestsComponent