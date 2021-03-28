import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width:'100%',
        height:'100%',
        margin: theme.spacing(0),
        background:"#135111"
    }
}))

const HomeScreenView = (props) => {

    const classes = useStyles()

    return(
        <div className={classes.root}>HomeScreenView</div>
    )

}

export default HomeScreenView
