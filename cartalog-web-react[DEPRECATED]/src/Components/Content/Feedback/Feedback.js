import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import * as firebase from "firebase";
import * as moment from "moment";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({

    stats: {},
    statsTitle: {
        color: `#676767`,
        marginBottom: 10
    },
    statsTitle1: {
        marginTop: 6,
        color: `#454545`,
        fontWeight: `bold`,
        textAlign: `left`,
        paddingBottom: theme.spacing(3)
    },
    input: {},
    feedbackButton: {
        marginTop: theme.spacing(1),
        float: `right`,
        minHeight: 40
    }
}));

const Feedback = (props) => {

    const vendorData = props.vendorData;

    const [text,setText] = useState(``);
    const [loading,setLoading] = useState(false);
    const [snackIsOpen,setSnackIsOpen] = useState(false);
    const [snackText,setSnackText] = useState(`Сообщение отправлено`);

    const classes = useStyles();

    const handleTextChange = (event) => {

        const text = event.target.value;
        setText(text)

    };

    const sendFeedback = () => {

        setLoading(true);

        const city = vendorData.city;
        const vendorID = vendorData.vendorID;

        const timestamp = moment.now();

        const feedbackRef = firebase.database().ref(`feedback`).child(city).child(vendorID).push();

        const message = {
            message: text,
            userID: vendorID,
            timestamp: timestamp
        };


        if (text.length>0){
            feedbackRef.set(message).then(r=>{
                setLoading(false);
                setText(``);
                setSnackText(`Сообщение отправлено`);
                setSnackIsOpen(true);
            })
        } else {
            setSnackText(`Напишите что-нибудь`);
            setSnackIsOpen(true);
            setLoading(false);
        }


    };

    const handleSnackClose = () =>{

        setSnackIsOpen(false)

    };


    return (
        <div>
            <Typography className={classes.statsTitle1} variant={"h5"}> Обратная связь </Typography>
                <TextField id="outlined-basic" label="Напишите нам сообщение" variant="outlined" multiline={true}
                           fullWidth={true} className={classes.input} value={text}
                           autoFocus={true} onChange={handleTextChange}>
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.feedbackButton}
                    endIcon={<Icon>send</Icon>}
                    onClick={sendFeedback}
                >
                    ОТПРАВИТЬ
                </Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackIsOpen}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{snackText}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleSnackClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    )
};

export default Feedback;