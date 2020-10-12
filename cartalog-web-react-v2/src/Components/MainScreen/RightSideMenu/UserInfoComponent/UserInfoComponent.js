import React, {useEffect, useState} from "react";
import UserInfoComponentView from "./UserInfoComponentView";
import firebase from "firebase/app";
import "firebase/functions"
import {useLocation,useHistory} from "react-router-dom"

const UserInfoComponent = (props) => {

    const request = props.request
    const partnerData = props.partnerData

    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [userData, setUserData] = useState({});
    const [userRequests, setUserRequests] = useState([]);

    const location = useLocation()
    const history = useHistory()

    const handleRequestClick = (key) => {

        history.push("/request/"+key)

    }

    useEffect(()=>{

        setUserRequests([])
        setUserData({})

    },[location])

    useEffect(()=>{

        if(request.userID){

            const userID = request.userID

            const getPhoneNumber = firebase.functions().httpsCallable('getPhoneNumber');
            getPhoneNumber({userID: userID}).then(function(result) {
                setPhoneNumber(result.data.phoneNumber)
            });

            const usersRef = firebase.database().ref(`users`).child(userID)
            usersRef.once(`value`, snap=>{
                setUserData(snap.val())
            })

        }


    },[request])

    useEffect(()=>{

        if(request){

            if(userRequests.length===0){

                const userID = request.userID
                const city = partnerData.info.city
                const type = partnerData.info.type

                const dbRef = firebase.database().ref('requests').child(city).child(type)
                dbRef.orderByChild("userID").equalTo(userID).once('value',snap=>{

                }).then(r=>{

                    if(r.exists()){

                        const requestsArray = Object.values(r.val())
                        setUserRequests(requestsArray)
                    }

                })

            }

        }

    },[request,partnerData,userRequests])

    return(
        <UserInfoComponentView phoneNumber={phoneNumber}
                               userData={userData}
                               userRequests={userRequests}
                               request={request}
                               handleRequestClick={handleRequestClick}
        />
    )

}

export default UserInfoComponent