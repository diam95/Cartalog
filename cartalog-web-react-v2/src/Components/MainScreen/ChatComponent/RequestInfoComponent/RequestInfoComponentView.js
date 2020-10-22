import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider, IconButton} from "@material-ui/core";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        height: 56,
        background: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    infoTitle: {
        textAlign: "center",
        fontWeight: 500,
        fontSize: "18",
        color: "black"
    },
    infoSubTitle: {
        textAlign: "center",
        fontWeight: 400,
        fontSize: "18",
        color: "#6d6d6d"
    }

}))

const RequestInfoComponentView = (props) => {

    const classes = useStyles()

    const request = props.request
    const handleUnseen = props.handleUnseen

    return (

        <div className={classes.root}>

            <Divider orientation={"vertical"}/>

            <div className={classes.infoContainer}>

                <div className={classes.infoTitle}>
                    {request.make} {request.model} {request.year}, {request.VIN}
                </div>

                <div className={classes.infoSubTitle}>
                    {request.description}
                </div>

            </div>

            <Tooltip title={"В непрочитанное"}>
                <IconButton onClick={handleUnseen}>
                    <VisibilityOffIcon/>
                </IconButton>
            </Tooltip>



            <Divider orientation={"vertical"}/>


        </div>

    )

}

export default RequestInfoComponentView