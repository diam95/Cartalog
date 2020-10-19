import React, {useEffect, useState} from "react";
import ChatComponentView from "./ChatComponentView";
import {useLocation} from "react-router-dom"
import firebase from "firebase/app";
import "firebase/database"

const ChatComponent = (props) => {

    const partnerData = props.partnerData
    const request = props.request
    const answeredRequests = props.answeredRequests

    const [messagesData, setMessagesData] = useState([]);
    const [newOffer, setNewOffer] = useState(true);

    const location = useLocation()

    useEffect(() => {

        setMessagesData([])

        const locationArr = location.pathname.split("/")

        if (locationArr[1] === "request") {

            if (locationArr[2]) {

                if(partnerData){

                            const requestKey = locationArr[2]
                            const partnerID = partnerData.partnerID
                            const type = partnerData.type
                            const city = partnerData.city

                            const tempDataset = []

                            const messagesRef = firebase.database().ref('messages').child(city).child(type).child(requestKey).child(partnerID)
                            messagesRef.on('child_added', snap => {

                                if (snap.exists()) {

                                    const newMessage = snap.val()
                                    tempDataset.push(newMessage)

                                    setMessagesData([...tempDataset])

                                }

                            })

                            const newMessagesRef = firebase.database().ref("partners2").child(partnerID).child("newMessages").child(requestKey)
                            newMessagesRef.remove()

                            return ()=>{
                                messagesRef.off('child_added')
                            }

                        }

                }

        }

    }, [location, partnerData])

    useEffect(() => {

        if(answeredRequests){

                const keys = Object.keys(answeredRequests)

                if (keys.includes(request.key)) {

                    setNewOffer(false)

                }

            return(()=>{setNewOffer(true)})

        }

    }, [answeredRequests, request])

    return (

        <ChatComponentView messagesData={messagesData}
                           newOffer={newOffer}
                           partnerData={partnerData}
                           request={request}
        />

    )

}

export default ChatComponent