import React from "react";
import RequestInfoComponentView from "./RequestInfoComponentView";

const RequestInfoComponent = (props) => {

    const request = props.request

    return(
        <RequestInfoComponentView request={request}/>
    )

}

export default RequestInfoComponent