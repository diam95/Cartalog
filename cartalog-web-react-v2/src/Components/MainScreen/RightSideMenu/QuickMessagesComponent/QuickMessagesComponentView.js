import React, {useState} from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {
    Accordion,
    AccordionSummary, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField, Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import firebase from "firebase";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => createStyles({

    root: {},
    accordionTitleContainer: {
        fontWeight: 500
    },
    accordionSummary: {
        minHeight: 56,
        fontWeight: "500"
    },
    quickMessageButton: {
        marginRight: theme.spacing(1),
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1)
    },
    dialogTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    quickMessageButtonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexFlow:"row wrap"
    }

}))

const QuickMessagesComponentView = (props) => {

    const partnerData = props.partnerData
    const request = props.request

    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [newQuickButtonDialog, setNewQuickButtonDialog] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [message, setMessage] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [quickMessage, setQuickMessage] = useState({});
    const [newQuickTitle, setNewQuickTitle] = useState("");
    const [newQuickMessage, setNewQuickMessage] = useState("");

    const handleOpenMessageDialog = (quickMessage) => {

        setOpen(true)
        setMessage(quickMessage.message)
        setQuickMessage(quickMessage)

    }

    const handleSendQuickMessage = () => {

        if (message.length > 0) {

            setIsSending(true)

            const quickMessageKey = quickMessage.key

            const city = partnerData.city;
            const type = partnerData.type;
            const vendorID = partnerData.partnerID;
            const userID = request.userID;
            const requestKey = request.key;
            const time = new moment().locale(`ru`);

            const msg = {
                key: requestKey,
                message: message,
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
            messagesRef.push().set(msg).then(() => {

                const quickMessagesRef = firebase.database().ref('partners2').child(vendorID).child('info')
                    .child("quick_messages").child(quickMessageKey).child("message")
                quickMessagesRef.set(message).then(r => {

                    setEditMode(false)
                    setOpen(false)
                    setIsSending(false)

                })

            });

        }

    }

    const handleToggleEditMode = () => {

        setEditMode(!editMode)

    }

    const handleDialogClose = () => {

        setOpen(false)
        setEditMode(false)
    }

    const renderQuickMessagesButton = () => {

        if (partnerData.quick_messages) {

            const quickMessages = Object.values(partnerData.quick_messages)

            const result = quickMessages.map(quickMessage => {

                return (
                    <Button variant={"outlined"}
                            color={"primary"}
                            className={classes.quickMessageButton}
                            onClick={() => {
                                handleOpenMessageDialog(quickMessage)
                            }}
                    >
                        {quickMessage.title}
                    </Button>
                )

            })

            return result

        }

    }

    const renderDialogContent = () => {

        if (editMode) {

            return (
                <TextField label={"Редактировать сообщение"}
                           value={message}
                           multiline
                           fullWidth
                           autoFocus
                           onChange={(e) => {
                               setMessage(e.target.value)
                           }}
                />
            )

        } else {
            return message
        }

    }

    const handleCreateNewQuickButton = () => {

        setIsSending(true)

        const vendorID = partnerData.partnerID;

        const quickMessagesRef = firebase.database().ref('partners2').child(vendorID).child('info')
            .child("quick_messages").push()

        const res = {
            key: quickMessagesRef.key,
            message: newQuickMessage,
            title: newQuickTitle
        }
        quickMessagesRef.set(res).then(r => {
            setIsSending(false)
            setNewQuickButtonDialog(false)
        })

    }

    const handleDeleteQuickButton = () => {

        const vendorID = partnerData.partnerID;

        const quickMessagesRef = firebase.database().ref('partners2').child(vendorID).child('info')
            .child("quick_messages").child(quickMessage.key)

        quickMessagesRef.remove().then(r => {

            setOpen(false)

        })

    }

    return (

        <>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  className={classes.accordionSummary}
                >
                    <div className={classes.accordionTitleContainer}>Быстрые сообщения</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.quickMessageButtonContainer}>
                        {renderQuickMessagesButton()}
                        <IconButton onClick={() => {
                            setNewQuickButtonDialog(!newQuickButtonDialog)
                        }}>
                            <AddCircleIcon/>
                        </IconButton>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Dialog open={open}
                    onClose={handleDialogClose}
            >

                <DialogTitle>
                    <div className={classes.dialogTitleContainer}>
                        <Typography variant={"h6"}>Отправить сообщение</Typography>
                        <IconButton onClick={handleToggleEditMode}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={handleDeleteQuickButton}>
                            <DeleteOutlineIcon/>
                        </IconButton>
                    </div>
                </DialogTitle>

                <DialogContent>
                    <Typography variant={"body1"}>
                        {renderDialogContent()}
                    </Typography>

                </DialogContent>

                <DialogActions>
                    <Button variant={"text"}
                            color={"primary"}
                            onClick={handleDialogClose}
                    >
                        Отмена
                    </Button>
                    <Button variant={"text"}
                            color={"primary"}
                            onClick={handleSendQuickMessage}
                    >
                        {isSending ? <CircularProgress/> : "Отправить"}
                    </Button>
                </DialogActions>

            </Dialog>

            <Dialog open={newQuickButtonDialog}
            >
                <DialogTitle>
                    <Typography variant={"h6"}>
                        Добавить новое быстрое сообщение
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div>
                        <TextField label={"Заголовок"}
                                   value={newQuickTitle}
                                   onChange={(e) => {
                                       setNewQuickTitle(e.target.value)
                                   }}
                                   fullWidth

                        />
                        <TextField label={"Сообщение"}
                                   value={newQuickMessage}
                                   onChange={(e) => {
                                       setNewQuickMessage(e.target.value)
                                   }}
                                   multiline
                                   fullWidth
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant={"text"}
                            color={"primary"}
                            onClick={() => {
                                setNewQuickButtonDialog(false)
                            }}>
                        Отмена
                    </Button>
                    <Button variant={"text"}
                            color={"primary"}
                            onClick={() => {
                                handleCreateNewQuickButton()
                            }}>
                        {isSending ? <CircularProgress/> : "Ок"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )

}

export default QuickMessagesComponentView