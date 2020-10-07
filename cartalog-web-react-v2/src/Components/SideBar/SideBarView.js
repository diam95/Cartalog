import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme)=>({

    root:{
        width:"50%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start",
        marginRight:theme.spacing(2)
    },
    navContainer:{
        width:"100%",
        marginTop:theme.spacing(1)
    }

}))

const SideBarView = () => {

    const classes = useStyles()

    return(

        <div className={classes.root}>

            <div className={classes.navContainer}>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Все заявки" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Мои ответы" />
                    </ListItem>
                </List>
            </div>

        </div>

    )

}

export default SideBarView