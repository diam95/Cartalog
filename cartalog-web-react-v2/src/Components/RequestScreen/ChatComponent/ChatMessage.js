import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({

    messageContainer1: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"flex-start"
    },
    messageContainer2: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"flex-end"
    },
    chatBubble1: {
        maxWidth: "70%",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        wordWrap: `break-word`,
        backgroundColor: `#787893`,
        borderRadius: 5,
        color:"white"
    },
    chatBubble2: {
        maxWidth: "70%",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        wordWrap: `break-word`,
        backgroundColor: `#e4e5fc`,
        borderRadius: 5,
    },

    chatParagraph: {
        fontSize: 15,
        fontWeight: `bold`,
        margin: `0 0 2`,
        lineHeight: 0,
        paddingTop: 0,
    },

    chatText: {
        fontSize: 18,
        fontWeight:400,
        margin: `0 0 2`,
        lineHeight: 0,
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
        maxWidth: "70%",
        textAlign: `right`
    },

}));

const ChatMessage = (props) => {

    const classes = useStyles();

    const message = props.message

    const renderMessage = () => {

        switch (message.viewType) {

            case 0:
                return (
                    <div className={classes.messageContainer1}>
                        <div className={classes.chatBubble1}>
                            <span className={classes.chatText}>{message.message}</span>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className={classes.messageContainer1}>
                        <div className={classes.chatBubble1}>
                            <img className={classes.chatImage} src={message.message} alt="Изображение"/>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className={classes.messageContainer2}>
                        <div className={classes.chatBubble2}>
                            <span className={classes.chatText}>{message.message}</span>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className={classes.messageContainer2}>
                        <div className={classes.chatBubble2}>
                            <img className={classes.chatImage} src={message.message} alt="Изображение"/>
                        </div>
                    </div>
                );
            default:
                break;
        }

    };

    return (

        <div>
            {renderMessage()}
        </div>
    )
};

export default ChatMessage