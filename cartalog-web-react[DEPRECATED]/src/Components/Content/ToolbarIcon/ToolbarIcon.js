import React, {useEffect, useState} from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import * as firebase from "firebase";

export default function ToolbarIcon (props) {

    const vendorData = props.vendorData;

    //NEW MESSAGES COUNT BADGE
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    useEffect(()=>{

        const vendorID = vendorData.vendorID;

        const messagesCountRef = firebase.database().ref(`partners2`).child(vendorID).child(`newMessagesCount`);
        messagesCountRef.on(`value`, snap => {

            setNewMessagesCount(snap.val())

        });

        return( ()=>{

            messagesCountRef.off(`value`);

        })

    },[vendorData]);

    return(
        <Badge badgeContent={newMessagesCount} max={99} color="secondary">
            <MenuIcon/>
        </Badge>
    )

}