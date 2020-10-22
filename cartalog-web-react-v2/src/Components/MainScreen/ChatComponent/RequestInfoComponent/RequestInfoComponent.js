import React from "react";
import RequestInfoComponentView from "./RequestInfoComponentView";
import * as firebase from "firebase";

const RequestInfoComponent = (props) => {

    const request = props.request
    const partnerData = props.partnerData

    const handleUnseen = () => {

        const partnerID=partnerData.partnerID

        const newMessagesRef = firebase.database().ref('partners2').child(partnerID).child("newMessages").child(request.key)
        newMessagesRef.set(1).then(r=>{

        })

    }

    return(
        <RequestInfoComponentView request={request}
                                  handleUnseen={handleUnseen}
        />
    )

}

export default RequestInfoComponent