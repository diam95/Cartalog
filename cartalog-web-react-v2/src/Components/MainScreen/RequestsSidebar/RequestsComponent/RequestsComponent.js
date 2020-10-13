import React, {useState} from "react";
import RequestsComponentView from "./RequestsComponentView";

const RequestsComponent = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    const [clickedRequestInd, setClickedRequestInd] = useState(-1);

    return (
        <RequestsComponentView requestsDataset={requestsDataset}
                               partnerData={partnerData}
                               clickedRequestInd={clickedRequestInd}
                               setClickedRequestInd={setClickedRequestInd}
        />
    )

}

export default RequestsComponent