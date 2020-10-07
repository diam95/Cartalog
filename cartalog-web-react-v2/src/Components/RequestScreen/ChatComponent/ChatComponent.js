import React, {useEffect, useState} from "react";
import ChatComponentView from "./ChatComponentView";
import {useLocation} from "react-router-dom"
import firebase from "firebase/app";
import "firebase/database"

const ChatComponent = (props) => {

    const partnerData = props.partnerData

    const location = useLocation()

    const [messagesData, setMessagesData] = useState([]);

    useEffect(() => {

        const locationArr = location.pathname.split("/")

        if (locationArr[1] === "request") {

            if (locationArr[2]) {

                if (partnerData.info) {

                    if (partnerData.info.partnerID) {

                        const requestKey = locationArr[2]
                        const partnerID = partnerData.info.partnerID
                        const type = partnerData.info.type
                        const city = partnerData.info.city

                        const messagesRef = firebase.database().ref('messages').child(city).child(type).child(requestKey).child(partnerID)
                        messagesRef.once('value', snap => {

                        }).then(r => {

                            if (r.exists()) {

                                const messagesArr = Object.values(r.val())
                                setMessagesData(messagesArr)

                            }

                        })

                    }

                }

            }

        }

    }, [location, partnerData])

    return (
        <ChatComponentView messagesData={messagesData}/>
    )

}

export default ChatComponent