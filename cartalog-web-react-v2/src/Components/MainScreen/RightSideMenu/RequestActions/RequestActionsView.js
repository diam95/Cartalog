import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        background: "white"
    },
    container:{
        padding:theme.spacing(2)
    }

}))

const RequestActionsView = () => {

    const classes = useStyles()

    return (

        <div className={classes.root}>

            <div className={classes.container}>
            </div>

        </div>

    )

}

export default RequestActionsView