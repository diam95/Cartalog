import React, {useState} from "react";
import ChatInputComponentView from "./ChatInputComponentView";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/database";

const ChatInputComponent = (props) => {

    const partnerData = props.partnerData
    const request = props.request

    const [messageInput, setMessageInput] = useState("");

    const handleInputChange = (e) => {

        setMessageInput(e.target.value)

    }

    const handleSendMessage = () => {

        if (messageInput.length > 0) {

            setMessageInput("")

            const city = partnerData.info.city;
            const type = partnerData.info.type;
            const vendorID = partnerData.info.partnerID;
            const userID = request.userID;
            const requestKey = request.key;
            const time = new moment().locale(`ru`);

            const message = {
                key: requestKey,
                message: messageInput,
                messageSnackIsShown: 1,
                newAppMessage: 1,
                newWebMessage: 0,
                time: time.format("HH:mm"),
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                userID: userID,
                vendorID: vendorID,
                viewType: 0,
            };

            const messagesRef = firebase.database().ref(`messages`).child(city).child(type).child(requestKey).child(vendorID);
            messagesRef.push().set(message).then(() => {

            });

        }


    }

    const handleAttach = (event) => {

        const city = partnerData.info.city;
        const type = partnerData.info.type;
        const requestKey = request.key;
        const vendorID = partnerData.info.partnerID;
        const file = event.target.files[0];

        const storageRef = firebase.storage().ref(`chatImages`).child(city).child(type).child(requestKey).child(vendorID).child(file.name);

        const task = storageRef.put(event.target.files[0]);
        task.then((snap) => {

            const messagesRef = firebase.database().ref(`messages`).child(city).child(type).child(requestKey).child(vendorID).push();

            const time = new moment().locale(`ru`).format("HH:mm");
            const userID = request.userID;

            snap.task.snapshot.ref.getDownloadURL().then(result => {

                const message = {
                    key: requestKey,
                    vendorID: vendorID,
                    message: result,
                    viewType: 1,
                    time: time,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    newWebMessage: 0,
                    newAppMessage: 1,
                    messageSnackIsShown: 1,
                    userID: userID
                };

                messagesRef.set(message).then(r => {
                });

            });

        })

    };

    const handleEnterPress = (event) => {

        if (event.key === `Enter` && event.target.value.length !== 0) {

            handleSendMessage()
            event.target.value = ""
            setMessageInput("")

        }

    };

    return (
        <ChatInputComponentView messageInput={messageInput}
                                handleInputChange={handleInputChange}
                                handleAttach={handleAttach}
                                handleSendMessage={handleSendMessage}
                                handleEnterPress={handleEnterPress}
        />
    )

}

export default ChatInputComponent