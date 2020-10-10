import React from "react";
import RequestsSidebarView from "./RequestsSidebarView";

const RequestsSidebar = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    return (
        <RequestsSidebarView requestsDataset={requestsDataset}
                             partnerData={partnerData}
        />
    )

}

export default RequestsSidebar