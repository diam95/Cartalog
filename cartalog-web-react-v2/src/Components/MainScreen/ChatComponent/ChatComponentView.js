import React, {useEffect, useRef} from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import ChatMessage from "./ChatMessage";
import ChatInputComponent from "./ChatInputComponent/ChatInputComponent";
import RequestInfoComponent from "./RequestInfoComponent/RequestInfoComponent";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        height: `calc( 100vh - 36px)`
    },
    messagesContainerRoot: {
        height: `calc( 100vh - 36px - 56px - 48px )`,
        width: "100%",
        overflowY:"auto"
    },
    newChat: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 500
    }

}))

const ChatComponentView = (props) => {

    const classes = useStyles()

    const messagesData = props.messagesData
    const newOffer = props.newOffer
    const partnerData = props.partnerData
    const request = props.request

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {

        scrollToBottom();

    });

    const renderMessages = () => {

        if (newOffer) {
            return <div className={classes.newChat}>Новый чат</div>
        } else {

            const result = messagesData.map(message => {

                return <ChatMessage message={message}/>

            })

            return (
                result
            )

        }


    }

    return (

        <div className={classes.root}>

            <RequestInfoComponent request={request}/>

            <div className={classes.messagesContainerRoot}>

                    {renderMessages()}
                    <div ref={messagesEndRef}/>

            </div>

            <ChatInputComponent partnerData={partnerData}
                                request={request}/>

        </div>

    )

}

export default ChatComponentView