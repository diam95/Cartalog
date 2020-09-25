import React, {useState} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {isMobile} from "react-device-detect";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import * as firebase from "firebase";
import * as moment from "moment";

const useStyles = makeStyles(theme => ({
    dialogTitle: {
        paddingBottom: 0,
    },
    description: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: 0,
        margin: 0
    },
    snackbarContent: {},
}));

export default function DialogNewMessage(props) {

    const request = props.clickedRowData;
    const open = props.open;
    const classes = useStyles();
    const vendorData = props.vendorData;

    const mobile = isMobile;

    const handleClose = () => {

        props.handleClose(false);

    };

    const [messageInput, setMessageInput] = useState(null);

    const handleInputChange = (event) => {

        setMessageInput(event.target.value);

    };

    const handleEnterClick = (event) => {

        if (event.key === 'Enter') {

            sendMessage();

        }

    };

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
        messagesRef.push().set(message).then(handleClose);

        const partners2Ref = firebase.database().ref(`partners2`).child(vendorID).child(`answeredRequests`).child(requestKey);
        partners2Ref.set(0).then(r => {

        });


    };

    const body = () => {

        if (request !== null) {
            return (
                <Dialog fullWidth={true} open={open} onClose={handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle className={classes.dialogTitle}
                                 id="simple-dialog-title">{request.make} {request.model}, {request.year}. {request.VIN}</DialogTitle>
                    <h2 className={classes.description}>{request.description}</h2>
                    <DialogContent>
                        <Input
                            onKeyDown={handleEnterClick}
                            onChange={handleInputChange}
                            autoComplete={`off`}
                            autoFocus={!mobile}
                            fullWidth={true}
                            placeholder="Цена"
                            inputProps={{
                                'aria-label': 'description',
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Закрыть
                        </Button>
                        <Button onClick={sendMessage} color="primary">
                            Отправить
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        } else {
            return (<div/>)
        }

    };

    return (
        <div>
            {body()}
        </div>
    );
}