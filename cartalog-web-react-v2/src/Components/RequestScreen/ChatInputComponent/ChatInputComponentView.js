import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles((theme) => ({

    root: {

        marginTop: theme.spacing(1),

    },
    paperContent: {
        minHeight: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
    }

}))

const ChatInputComponentView = (props) => {

    const classes = useStyles()

    const messageInput = props.messageInput
    const handleInputChange = props.handleInputChange
    const handleAttach = props.handleAttach
    const handleSendMessage = props.handleSendMessage

    return (

        <div className={classes.root}>

            <Paper elevation={1}>

                <div className={classes.paperContent}>

                    <TextField autoComplete={"off"}
                               value={messageInput}
                               autoFocus={false}
                               id="standard-basic"
                               placeholder={"Введите сообщение..."}
                               fullWidth
                               multiline={true}
                               margin={"none"}
                               onChange={e => {
                                   handleInputChange(e)
                               }}
                               InputProps={{
                                   style: {
                                       paddingBottom: 15
                                   },
                                   startAdornment:
                                       <InputAdornment position="start">
                                           <div style={{width: 5}}/>
                                       </InputAdornment>,
                                   endAdornment:
                                       <InputAdornment position="end">
                                           <IconButton
                                               onClick={handleAttach}
                                           >
                                               <AttachFileIcon/>
                                           </IconButton>
                                           <IconButton
                                               onClick={handleSendMessage}
                                           >
                                               <SendIcon/>
                                           </IconButton>
                                       </InputAdornment>
                               }}/>

                </div>

            </Paper>

        </div>

    )

}

export default ChatInputComponentView