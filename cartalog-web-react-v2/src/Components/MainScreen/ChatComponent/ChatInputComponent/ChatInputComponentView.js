import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles((theme) => ({

    root: {
        height: 48,
        background:"white"
    },
    paperContent: {
        height: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    inputNone: {
        display: `none`,
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
                                           <input
                                               accept="image/*"
                                               className={classes.inputNone}
                                               id="contained-button-file"
                                               multiple
                                               type="file"
                                               onChange={handleAttach}
                                           />
                                           <label htmlFor="contained-button-file">
                                               <IconButton>
                                                   <AttachFileIcon/>
                                               </IconButton>
                                           </label>
                                           <IconButton onClick={handleSendMessage}>
                                               <SendIcon/>
                                           </IconButton>
                                       </InputAdornment>
                               }}/>

                </div>

        </div>

    )

}

export default ChatInputComponentView