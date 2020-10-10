import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import UserInfoComponent from "./UserInfoComponent/UserInfoComponent";

const useStyles = makeStyles(()=>({

    root:{
        background:"white",
        width:"100%",
        height:`calc(100vh - 36px)`
    }

}))

const RightSideMenuView = (props) => {

    const classes = useStyles()

    const request = props.request

    return(

        <div className={classes.root}>

            <UserInfoComponent request={request}/>

        </div>

    )

}

export default RightSideMenuView