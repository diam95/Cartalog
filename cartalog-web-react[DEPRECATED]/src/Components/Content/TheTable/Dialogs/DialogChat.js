import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import {isMobile} from "react-device-detect";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import * as firebase from "firebase";
import * as moment from "moment";
import MessagesList from "./MessagesList/MessagesList";


const useStyles = makeStyles(theme => ({

    dialogChat: {
        position: `absolute`,
        margin: `auto auto`,
    },
    dialogTitle: {
        minHeight: `80px`,
        textAlign: `center`,
        verticalAlign: `middle`,
    },
    container: {
        marginTop: `9px`,
        marginBottom: `9px`,
    },
    title: {
        fontSize: 22,
        fontWeight: `bold`,
        padding: 0,
        margin: 0,
    },
    description: {
        fontSize: 22,
        padding: 0,
    },
    iconButtonClose: {
        position: `absolute`,
        padding: 0,
        right: 0,
        top: 0,
        margin: 10,
    },
    chatBody: {
        overflowY: `auto`,
        maxHeight: `70vh`,
        marginLeft: 10,
        marginRight: 5,
        paddingTop: 5,
        minHeight: `65vh`,
        marginBottom: 46,
    },
    inputContainer: {
        width: `100%`,
        backgroundColor: `white`,
        position: `absolute`,
        bottom: 0,
        height: 46,
        maxHeight: 46,
    },
    input: {
        position: `relative`,
        left: 0,
        bottom: 0,
        paddingLeft: 44,
        paddingTop: 7,
    },
    inputNone: {
        display: `none`,
    },
    attachFileIcon: {
        position: `absolute`,
        left: 0,
        bottom: 0,
        margin: 11,
    },

}));


export default function DialogChat(props) {

    const classes = useStyles();
    const request = props.clickedRowData;
    const vendorData = props.vendorData;
    const [messageInput, setMessageInput] = useState(``);
    const [messagesDataset, setMessagesDataset] = useState([]);


    useEffect(() => {

        if (props.open) {

            const messagesRef = firebase.database().ref(`messages`).child(vendorData.city).child(vendorData.type).child(request.key).child(vendorData.vendorID);

            const loadInitMessages = () => {

                const messagesDatasetTemp = [];
                let init = false;

                messagesRef.on("child_added", snap => {

                    console.log(`child_added`);

                    messagesDatasetTemp.push(snap.val());

                    if (init) {
                        setMessagesDataset([...messagesDatasetTemp])
                    }

                });

                messagesRef.once(`value`, (snap) => {

                    init = true;
                    setMessagesDataset(messagesDatasetTemp);

                }).then(r => {


                });

            };

            loadInitMessages();

            return (() => {
                messagesRef.off(`value`);
                messagesRef.off(`child_added`);
            })
        }

    }, [props, request, vendorData]);

    useEffect(() => {

        if (request != null && props.open) {

            const vendorID = vendorData.vendorID;
            const key = request.key;

            const answeredRequestsRef = firebase.database().ref(`partners2`).child(vendorID).child(`answeredRequests`);
            const newMessagesCountRef = firebase.database().ref(`partners2`).child(vendorID).child(`newMessagesCount`);

            answeredRequestsRef.child(key).once(`value`, snap => {


            }).then(r => {

                const count = r.val();

                answeredRequestsRef.child(key).set(0).then(rr => {

                    newMessagesCountRef.once(`value`, snap2 => {

                    }).then(r => {

                        const newMessagesCount = r.val();
                        const newCount = newMessagesCount - count;

                        newMessagesCountRef.set(newCount).then(r => {

                        })

                    });

                });

            });

        }

    }, [props.open, request, vendorData.vendorID]);

    const sendMessage = () => {

        const city = vendorData.city;
        const type = vendorData.type;
        const vendorID = vendorData.vendorID;
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

    };

    const handleClose = () => {

        props.handleClose(false);
        setMessagesDataset([]);

    };

    const handleEnterClick = (event) => {

        if (event.key === `Enter` && event.target.value.length !== 0) {

            sendMessage();
            event.target.value = ``;
            setMessageInput(``);

        }

    };

    const handleInputChange = (event) => {

        setMessageInput(event.target.value);

    };

    const handleAttach = () => {

    };

    const handleSelectedFile = (event) => {

        const city = vendorData.city;
        const type = vendorData.type;
        const requestKey = request.key;
        const vendorID = vendorData.vendorID;
        const file = event.target.files[0];

        const storageRef = firebase.storage().ref(`chatImages`).child(city).child(type).child(requestKey).child(vendorID).child(file.name);


        const task = storageRef.put(event.target.files[0]);

        task.then((snap) => {

            const messagesRef = firebase.database().ref(`messages`).child(city).child(type).child(requestKey).child(vendorID).push();

            const time = new moment().locale(`ru`);
            const userID = request.userID;

            snap.task.snapshot.ref.getDownloadURL().then(result => {

                const message = {
                    key: requestKey,
                    vendorID: vendorID,
                    message: result,
                    viewType: 1,
                    time: time.format("HH:mm"),
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

    const body = () => {

        if (request !== null) {

            return (

                <Dialog className={classes.dialogChat} fullScreen={isMobile} open={props.open} onClose={handleClose}
                        fullWidth={true}>
                    <div className={classes.dialogTitle}>
                        <div className={classes.container}>
                            <p className={classes.title}>{request.make} {request.model}, {request.year} {request.VIN}</p>
                            <span className={classes.description}>{request.description}</span>
                            <IconButton onClick={handleClose} aria-label="close" className={classes.iconButtonClose}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <Divider/>
                    <div>
                        <MessagesList messages={messagesDataset} vendorData={vendorData}/>
                        <div className={classes.inputContainer}>
                            <Divider/>
                            <Input
                                onKeyDown={handleEnterClick}
                                onChange={handleInputChange}
                                autoComplete={`off`}
                                autoFocus={!isMobile}
                                placeholder="Сообщение"
                                fullWidth={true}
                                disableUnderline={true}
                                className={classes.input}
                                inputProps={{
                                    'aria-label': 'description',
                                }}
                            />
                            <input
                                accept="image/*"
                                className={classes.inputNone}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handleSelectedFile}
                            />
                            <label htmlFor="contained-button-file">
                                <AttachFileIcon className={classes.attachFileIcon} onClick={handleAttach}/>
                            </label>
                        </div>
                    </div>
                </Dialog>
            )

        } else {

            return (

                <div></div>

            )

        }
    };


    return (
        <div>
            {body()}
        </div>
    )
}