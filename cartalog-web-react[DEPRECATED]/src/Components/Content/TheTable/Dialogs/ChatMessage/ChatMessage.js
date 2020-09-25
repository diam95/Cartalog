import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({

    chatBubble: {
        display:`inline-block`,
        marginBottom: 5,
        marginRight: 5,
        padding: 10,
        wordWrap: `break-word`,
        backgroundColor: `#e4e5fc`,
        borderRadius: 5,
    },

    chatParagraph: {
        fontSize: 15,
        fontWeight: `bold`,
        margin: `0 0 2`,
        lineHeight:0,
        paddingTop: 0,
    },

    chatText: {
        fontSize: 16,
        margin: `0 0 2`,
        lineHeight:0,
        paddingTop: 0,
    },

    chatImage: {
        display: `block`,
        borderRadius: 5,
        width: `100%`,
        height: `100%`,
        objectFit: `scale-down`,
    },

    clientMessage: {
        width:`35%`,
        marginLeft:`63%`,
        textAlign: `right`,
    },

}));

const ChatMessage = (props) => {

    const classes = useStyles();

    const message = () => {

        const viewType = props.messageObject.viewType;

        switch (viewType) {

            case 0:
                return (
                    <div className={classes.chatBubble}>
                        <p className={classes.chatParagraph}>{props.vendorName}:</p>
                        <span className={classes.chatText}>{props.messageObject.message}</span>
                    </div>
                );

            case 1:
                return (
                    <div className={classes.chatBubble}>
                        <img className={classes.chatImage} src={props.messageObject.message} alt="Изображение"/>
                    </div>
                );

            case 2:
                return (
                        <div className={classes.chatBubble + ` ` + classes.clientMessage}>
                            <p className={classes.chatParagraph}>Покупатель:</p>
                            <span className={classes.chatText}>{props.messageObject.message}</span>
                        </div>
                );

            case 3:
                return (
                    <div className={classes.chatBubble}>
                        <img className={classes.chatImage} src={props.messageObject.message} alt="Изображение"/>
                    </div>
                );
            default:
                break;
        }
    };

    return (

        <div>
            {message()}
        </div>
    )
};

export default ChatMessage