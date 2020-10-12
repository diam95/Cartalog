import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({

    messageContainer1: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    messageContainer2: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    chatBubble1: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        maxWidth: "70%",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        wordWrap: `break-word`,
        background: `white`,
        borderRadius: 15,
    },
    chatBubble2: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        maxWidth: "70%",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        wordWrap: `break-word`,
        background: "#a0e8a5",
        borderRadius: 15
    },
    chatText: {
        fontSize: 18,
        fontWeight: 400,
        margin: `0 0 2`,
        paddingTop: 0,
        color: "black"
    },
    chatImage: {
        display: `block`,
        borderRadius: 15,
        maxHeight: 400,
        objectFit: `contain`,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        boxShadow: "0px 0px 0px 3px #fff"
    },
    clientMessage: {
        maxWidth: "70%",
        textAlign: `right`
    },
    timeText: {
        color: "#dedede",
        fontWeight: 500,
        fontSize: 14,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: 2,
        marginBottom: theme.spacing(1)
    }

}));

const ChatMessage = (props) => {

    const classes = useStyles();

    const message = props.message

    const renderMessage = () => {

        const renderTime = (timestamp) => {

            if (timestamp < 0) {

                const date = new Date(-timestamp).toLocaleDateString("ru").slice(0, -2)
                const time = new Date(-timestamp).toLocaleTimeString("ru").slice(0, -3)

                return time + " " + date

            } else {

                const date = new Date(timestamp).toLocaleDateString("ru").slice(0, -2)
                const time = new Date(timestamp).toLocaleTimeString("ru").slice(0, -3)

                return time + " " + date

            }

        }

        switch (message.viewType) {

            case 0:
                return (
                    <div className={classes.messageContainer1}>
                        <div className={classes.chatBubble1}>
                            <div className={classes.chatText}>{message.message}</div>
                        </div>
                        <div className={classes.timeText}>{renderTime(message.timestamp)}</div>
                    </div>
                );

            case 1:
                return (
                    <div className={classes.messageContainer1}>
                        <img className={classes.chatImage} src={message.message} alt="Изображение"/>
                        <div className={classes.timeText}>{renderTime(message.timestamp)}</div>
                    </div>
                );

            case 2:
                return (
                    <div className={classes.messageContainer2}>
                        <div className={classes.chatBubble2}>
                            <div className={classes.chatText}>{message.message}</div>
                        </div>
                        <div className={classes.timeText}>{renderTime(message.timestamp)}</div>
                    </div>
                );

            case 3:
                return (
                    <div className={classes.messageContainer2}>
                        <img className={classes.chatImage} src={message.message} alt="Изображение"/>
                        <div className={classes.timeText}>{renderTime(message.timestamp)}</div>
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