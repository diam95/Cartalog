import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ChatMessage from "./ChatMessage";

const useStyles = makeStyles((theme) => ({

    root: {
        width: "100%",
        height: ` calc(100% - 64px) `,
        maxHeight: ` calc(100% - 64px) `,
        minHeight: ` calc(100% - 64px) `,
        display: "flex",
        flexDirection: "column"
    },
    messagesContainer: {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden"
    }

}))

const ChatComponentView = (props) => {

    const classes = useStyles()

    const messagesData = props.messagesData

    const renderMessages = () => {

        return messagesData.map(message => {

            return <ChatMessage message={message}/>

        })

    }

    return (

        <div className={classes.root}>
            <div className={classes.messagesContainer}>
                {renderMessages()}
            </div>
        </div>

    )

}

export default ChatComponentView