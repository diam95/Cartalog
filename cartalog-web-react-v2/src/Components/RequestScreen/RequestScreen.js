import React, {useEffect, useState} from "react";
import RequestScreenView from "./RequestScreenView";
import firebase from "firebase/app";
import 'firebase/database'
import {useLocation} from "react-router-dom"

const RequestScreen = (props) => {

    const partnerData = props.partnerData

    const location = useLocation()

    const [request, setRequest] = useState({});

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

    return (
         <RequestScreenView request={request}
                            partnerData={partnerData}
         />
    )

}

export default RequestScreen