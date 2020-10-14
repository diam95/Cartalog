import React from "react";
import RequestsComponentView from "./RequestsComponentView";

const RequestsComponent = (props) => {

    const requestsDataset = props.requestsDataset
    const answeredRequests = props.answeredRequests

    return (
        <RequestsComponentView requestsDataset={requestsDataset}
                               answeredRequests={answeredRequests}
        />
    )

}

export default RequestsComponent