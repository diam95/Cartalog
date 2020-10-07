import React from "react";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        height: 48,
        background: "#5152c1",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    titleText: {
        marginLeft: 15,
        color: "white",
        fontSize: 20,
        fontWeight: 600
    },
    selectContainer: {
        marginRight: 25
    }

}))

const TopAppBarView = (props) => {

    const classes = useStyles()

    return (

        <div className={classes.root}>

            <div className={classes.titleText}>Cartalog</div>

        </div>

    )

}

export default TopAppBarView