import React from "react";
import {makeStyles} from "@material-ui/core";
import moment from "moment";

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
        background: `linear-gradient(135deg, rgba(70,111,207,1) 0%, rgba(59,99,194,1) 100%)`,
        borderRadius: 25,
        boxShadow: "1px 1px 7px #9c9c9c"
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
        background: `linear-gradient(135deg, rgba(35,159,109,1) 0%, rgba(30,145,98,1) 100%)`,
        borderRadius: 25,
        boxShadow: "1px 1px 7px #9c9c9c"
    },
    chatText: {
        fontSize: 17,
        fontWeight: 400,
        margin: `0 0 2`,
        paddingTop: 0,
        color: "white"
    },
    chatImage: {
        display: `block`,
        borderRadius: 25,
        maxHeight:400,
        objectFit: `contain`,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        boxShadow: "0px 0px 0px 3px #b9b9b9"
    },
    clientMessage: {
        maxWidth: "70%",
        textAlign: `right`
    },
    timeText: {
        color: "grey",
        fontWeight: 500,
        fontSize: 14,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: 5,
        marginBottom: theme.spacing(1)
    }

}));

const ChatMessage = (props) => {

    const classes = useStyles();

    const message = props.message

    const renderMessage = () => {

        const renderTime = (timestamp) => {

            if (timestamp<0){

                const today = new Date().toLocaleDateString("ru")
                const date = new Date(-timestamp).toLocaleDateString("ru")
                const time = new Date(-timestamp).toLocaleTimeString("ru").slice(0, -3)

                if (today === date) {

                    return time

                } else {

                    const relativeTime = moment(-timestamp).startOf('days').fromNow();
                    return relativeTime + " " + time

                }

            } else {

                const today = new Date().toLocaleDateString("ru")
                const date = new Date(timestamp).toLocaleDateString("ru")
                const time = new Date(timestamp).toLocaleTimeString("ru").slice(0, -3)

                if (today === date) {

                    return time

                } else {

                    const relativeTime = moment(timestamp).startOf('days').fromNow();
                    return relativeTime + " " + time

                }

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