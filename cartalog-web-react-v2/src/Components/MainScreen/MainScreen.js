import React, {useEffect, useState} from "react";
import MainScreenView from "./MainScreenView";
import {useHistory, useLocation} from "react-router-dom"
import firebase from "firebase";

const MainScreen = (props) => {

    const partnerData = props.partnerData
    const requestsDataset = props.requestsDataset
    const answeredRequests = props.answeredRequests

    const [request, setRequest] = useState(undefined);

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {

        const locationArr = location.pathname.split("/")

        if (locationArr[1]==="request"){

            const requestKey = locationArr[2]

            const dbRef = firebase.database().ref(`requests/magadan/autoparts/${requestKey}`)
            dbRef.once('value', snap => {

            }).then(r =>{

                if (r.exists()){
                    setRequest(r.val())
                }

            })

        }


    }, [location])

    //CHECK AUTH STATE
    useEffect(() => {

        if(partnerData){

            if (Object.values(partnerData).length === 0) {
                history.push("/login")
            }

        }

    }, [partnerData, history])

    return (
        <MainScreenView requestsDataset={requestsDataset}
                        partnerData={partnerData}
                        request={request}
                        answeredRequests={answeredRequests}
        />
    )

}

export default MainScreen