import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    root: {
        height: 48,
        background: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    const handleEnterPress = props.handleEnterPress

    return (

        <div className={classes.root}>

            <Divider orientation={"vertical"}/>

            <TextField autoComplete={"off"}
                       value={messageInput}
                       autoFocus={false}
                       id="standard-basic"
                       placeholder={"Введите сообщение..."}
                       fullWidth
                       multiline={false}
                       margin={"none"}
                       onKeyDown={handleEnterPress}
                       onChange={e => {
                           handleInputChange(e)
                       }}
                       InputProps={{
                           disableUnderline: true,
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
                                       <IconButton onClick={handleAttach}>
                                           <AttachFileIcon/>
                                       </IconButton>
                                   </label>
                                   <IconButton onClick={handleSendMessage}>
                                       <SendIcon/>
                                   </IconButton>
                               </InputAdornment>
                       }}/>

            <Divider orientation={"vertical"}/>

        </div>

    )

}

export default ChatInputComponentView