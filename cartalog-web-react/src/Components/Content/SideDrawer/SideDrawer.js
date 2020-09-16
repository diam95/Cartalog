import React, {useEffect, useState} from "react"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {isMobile} from "react-device-detect";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import {makeStyles} from "@material-ui/core/styles";
import * as firebase from "firebase";

const useStyles = makeStyles(theme => ({
    icon: {
        width: 36,
        minWidth: 36
    },
    bold:{
        fontWeight:`bold`
    }
}));

export default function SideDrawer (props) {

    const classes = useStyles();

    const clickedMenuItemIndex = props.clickedMenuItemIndex;
    const setClickedMenuItemIndex = props.setClickedMenuItemIndex;
    const handleDrawerToggle = props.handleDrawerToggle;
    const setTableTitle = props.setTableTitle;
    const vendorData = props.vendorData;

    const [newMessagesCount, setNewMessagesCount] = useState(0);

    useEffect(()=>{

        const vendorID = vendorData.vendorID;

        const messagesCountRef = firebase.database().ref(`partners2`).child(vendorID).child(`newMessagesCount`);
        messagesCountRef.on(`value`, snap => {

            console.log(`value`);

            setNewMessagesCount(snap.val())

        });

        return( ()=>{

            messagesCountRef.off(`value`);

        })

    },[vendorData]);

    return(
        <div>
            <List>
                <ListItem selected={clickedMenuItemIndex === 0} button onClick={
                    () => {
                        setClickedMenuItemIndex(0);
                        setTableTitle(`Все заявки`);
                        if (isMobile) {
                            handleDrawerToggle();
                        }
                    }
                }>
                    <ListItemIcon className={classes.icon}><InboxIcon/></ListItemIcon>
                    <ListItemText primary={`Все заявки`}/>
                </ListItem>
                <ListItem selected={clickedMenuItemIndex === 1} button onClick={
                    () => {
                        setClickedMenuItemIndex(1);
                        setTableTitle(`Мои ответы`);
                        if (isMobile) {
                            handleDrawerToggle();
                        }
                    }
                }>
                    <ListItemIcon className={classes.icon}>
                        <Badge badgeContent={newMessagesCount} max={99} color="secondary">
                            <InboxIcon/>
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary={`Мои ответы`}/>
                </ListItem>
                <ListItem selected={clickedMenuItemIndex === 2} button onClick={
                    () => {
                        setClickedMenuItemIndex(2);
                        setTableTitle(`Все заявки`);
                        if (isMobile) {
                            handleDrawerToggle();
                        }
                    }
                }>
                    <ListItemIcon className={classes.icon}><InboxIcon/></ListItemIcon>
                    <ListItemText primary={`Статистика`}/>
                </ListItem>
                <ListItem selected={clickedMenuItemIndex === 3} button onClick={
                    () => {
                        setClickedMenuItemIndex(3);
                        setTableTitle(`Все заявки`);
                        if (isMobile) {
                            handleDrawerToggle();
                        }
                    }
                }>
                    <ListItemIcon className={classes.icon}><InboxIcon/></ListItemIcon>
                    <ListItemText primary={`Обратная связь`}/>
                </ListItem>
                <ListItem selected={clickedMenuItemIndex === 3} button onClick={
                    () => {
                        firebase.auth().signOut();
                    }
                }>
                    <ListItemIcon className={classes.icon}><InboxIcon/></ListItemIcon>
                    <ListItemText primary={`Обратная связь`}/>
                </ListItem>
            </List>
        </div>
    )
}