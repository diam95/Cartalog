import React, {useState} from "react";
import ChatInputComponentView from "./ChatInputComponentView";

const ChatInputComponent = () => {

    const [messageInput, setMessageInput] = useState("");

    const handleInputChange = (e) => {

        setMessageInput(e.target.value)

    }

    const handleSendMessage = () => {

    }

    const handleAttach = () => {

    }

    return(
        <ChatInputComponentView messageInput={messageInput}
                                handleInputChange={handleInputChange}
                                handleAttach={handleAttach}
                                handleSendMessage={handleSendMessage}
        />
    )

}

export default ChatInputComponent