import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop:theme.spacing(1)
    },
    message0: {
        padding: theme.spacing(1),
        background: '#e1e1e1',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 400,
        maxWidth: '70%',
        marginRight: 'auto',
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    message2: {
        padding: theme.spacing(1),
        background: '#e1e1e1',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 400,
        maxWidth: '70%',
        marginLeft: 'auto',
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

const ChatDialog = (props) => {

    const classes = useStyles();

    const request = props.clickedRequest;
    const store = props.store;

    const [messagesDataset, setMessagesDataset] = useState([]);

    useEffect(() => {

        if (request.key) {

            const requestKey = request.key;
            const type = request.type;
            const vendorID = props.vendorID;

            const messages = store.messages.magadan;
            const messagesType = messages[type];
            const message = messagesType[requestKey];
            const messages2 = message[vendorID];

            console.log(messages2);

            const messagesDatasetTemp = [];
            const messagesKeys = Object.keys(messages2);
            messagesKeys.forEach(key => {

                messagesDatasetTemp.push(messages2[key]);

                if (messagesDatasetTemp.length === messagesKeys.length) {

                    setMessagesDataset(messagesDatasetTemp)

                }

            })

        }

    }, [props.vendorID, request, store]);

    const messages = () => {

        const messageContainer = (message) => {

            switch (message.viewType) {

                case 0:

                    return (
                        <div className={classes.message0}>
                            {message.message}
                        </div>
                    );
                case 1:
                    return (
                        <div className={classes.message0}>
                            {message.message}
                        </div>
                    );
                    break;
                case 2:
                    return (
                        <div className={classes.message2}>
                            {message.message}
                        </div>
                    );
                    break;
                case 3:
                    return (
                        <div className={classes.message2}>
                            {message.message}
                        </div>
                    );
                    break;

            }

        };

        const messagesList = messagesDataset.map(message => {

            return (messageContainer(message));

        });

        return (messagesList)

    };

    const handleClose = () => {

        props.setClickedRequest({})

    };

    const open = () => {

        return !!props.clickedRequest.key;

    };

    return (
        <Dialog
            open={open()}
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

            <DialogTitle id="alert-dialog-title">
                <div className={classes.titleContainer}>

                    <div>
                        {request.make} {request.model}, {request.year}
                        <Typography color="textSecondary">
                            {request.description}
                        </Typography>
                    </div>

                    <div>
                        <IconButton color="primary" aria-label="close" component="span" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>

                </div>

            </DialogTitle>
            <Divider/>
            <DialogContent>

                <div className={classes.messagesContainer}>
                    {messages()}
                </div>


            </DialogContent>

        </Dialog>
    )

};

export default ChatDialog;
