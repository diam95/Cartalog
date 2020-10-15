import React from "react";
import RequestsComponentView from "./RequestsComponentView";

const RequestsComponent = (props) => {

    const sortedDataset = props.sortedDataset
    const answeredRequests = props.answeredRequests
    const newMessages = props.newMessages

    return (
        <RequestsComponentView sortedDataset={sortedDataset}
                               answeredRequests={answeredRequests}
                               newMessages={newMessages}
        />
    )

}

export default RequestsComponent