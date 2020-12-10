import React from "react";
import QuickMessagesComponentView from "./QuickMessagesComponentView";

const QuickMessagesComponent = (props) => {

    const partnerData = props.partnerData
    const request = props.request

    return(
        <QuickMessagesComponentView partnerData={partnerData}
                                    request={request}
        />
    )

}

export default QuickMessagesComponent