import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ChatMessage from "./ChatMessage";
import ChatInputComponent from "./ChatInputComponent/ChatInputComponent";
import RequestInfoComponent from "./RequestInfoComponent/RequestInfoComponent";

const useStyles = makeStyles((theme) => ({

    root: {
        width: "100%",
        height: `calc( 100vh - 36px)`,
        background: "#bfd4bf"
    },
    messagesContainer: {
        height:`calc( 100vh - 36px - 56px - 48px )`,
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    newChat: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

}))

const ChatComponentView = (props) => {

    const classes = useStyles()

    const messagesData = props.messagesData
    const newOffer = props.newOffer
    const partnerData = props.partnerData
    const request = props.request

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

            <RequestInfoComponent/>

            <div className={classes.messagesContainer}>
                {renderMessages()}
            </div>

            <ChatInputComponent partnerData={partnerData}
                                request={request}
            />

        </div>

    )

}

export default ChatComponentView