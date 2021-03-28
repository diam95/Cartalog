import React, { useEffect, useState } from "react";
import MainScreenView from "./MainScreenView";
import { useHistory, useLocation } from "react-router-dom"
import firebase from "firebase";

const MainScreen = (props) => {

    const partnerData = props.partnerData
    const sortedDataset = props.sortedDataset
    const requestsDataset = props.requestsDataset
    const answeredRequests = props.answeredRequests
    const newMessages = props.newMessages

    const [request, setRequest] = useState(undefined);

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {

        const locationArr = location.pathname.split("/")
        setRequest(undefined)

        if (locationArr[1] === "request" && partnerData && partnerData.type) {

            const requestKey = locationArr[2]
            const dbRef = firebase.database().ref(`requests/magadan/${partnerData.type}/${requestKey}`)
            dbRef.once('value', snap => {
            }).then(r => {

                if (r.exists()) {
                    setRequest(r.val())
                }

            })

        }

    }, [partnerData, location])

    //CHECK AUTH STATE
    useEffect(() => {

        if (!partnerData) {

            history.push("/login")

        }

    }, [partnerData, history])

    return (
        <MainScreenView requestsDataset={requestsDataset}
                        partnerData={partnerData}
                        sortedDataset={sortedDataset}
                        request={request}
                        answeredRequests={answeredRequests}
                        newMessages={newMessages}
        />
    )

}

export default MainScreen
