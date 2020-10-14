import React from "react";
import RequestsSidebarView from "./RequestsSidebarView";

const RequestsSidebar = (props) => {

    const requestsDataset = props.requestsDataset
    const answeredRequests = props.answeredRequests

    return (
        <RequestsSidebarView requestsDataset={requestsDataset}
                             answeredRequests={answeredRequests}
        />
    )

}

export default RequestsSidebar