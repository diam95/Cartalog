import React from "react";
import RequestsSidebarView from "./RequestsSidebarView";

const RequestsSidebar = (props) => {

    const sortedDataset = props.sortedDataset
    const answeredRequests = props.answeredRequests
    const newMessages = props.newMessages
    return (
        <RequestsSidebarView sortedDataset={sortedDataset}
                             answeredRequests={answeredRequests}
                             newMessages={newMessages}
        />
    )

}

export default RequestsSidebar
