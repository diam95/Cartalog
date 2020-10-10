import React, {useEffect, useState} from "react";
import UserInfoComponentView from "./UserInfoComponentView";
import firebase from "firebase/app";
import "firebase/functions"

const UserInfoComponent = (props) => {

    const request = props.request
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(()=>{

        console.log(request)

        if(request.userID){

            const userID = request.userID
            console.log(userID)

            const getPhoneNumber = firebase.functions().httpsCallable('getPhoneNumber');
            getPhoneNumber({userID: userID}).then(function(result) {
                console.log(result.data.phoneNumber);
                setPhoneNumber(result.data.phoneNumber)
            });

        }


    },[request])

    return(
        <UserInfoComponentView phoneNumber={phoneNumber}/>
    )

}

export default UserInfoComponent