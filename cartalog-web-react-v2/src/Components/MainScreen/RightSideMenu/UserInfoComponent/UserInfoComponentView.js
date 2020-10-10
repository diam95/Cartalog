import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {PhoneIphone} from "@material-ui/icons";

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    }

}))

const UserInfoComponentView = (props) => {

    const phoneNumber = props.phoneNumber

    const classes = useStyles()

    return (

        <div className={classes.root}>

            <div>Юзер: {phoneNumber}</div>

        </div>

    )

}

export default UserInfoComponentView