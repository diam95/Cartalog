import ChatMessage from "../ChatMessage/ChatMessage";
import React, {useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

    chatBody: {
        padding: 0,
        listStyleType: `none`,
        overflowY: `auto`,
        maxHeight: `70vh`,
        marginLeft: 10,
        marginRight: 5,
        minHeight: `65vh`,
        marginBottom: 46,
    },

}));

export default function MessagesList(props) {

    const classes = useStyles();

    const messagesDataset = props.messages;
    const vendorData = props.vendorData;

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {

        scrollToBottom();

    });

    return (

        <ul className={classes.chatBody}>
            {messagesDataset.map((message) => (

                <li>
                    <ChatMessage messageObject={message}
                                 vendorName={vendorData.name}/>
                </li>
            ))}
            <div ref={messagesEndRef}/>
        </ul>

    );

};

