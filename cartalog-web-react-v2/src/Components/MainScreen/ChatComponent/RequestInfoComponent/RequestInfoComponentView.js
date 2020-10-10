import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles(()=>({

    root:{
        width:"100%",
        height:56,
        background:"white",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }

}))

const RequestInfoComponentView = () => {

    const classes = useStyles()

    return(

        <div className={classes.root}>

            <Divider orientation={"vertical"}/>

            <Divider orientation={"vertical"}/>


        </div>

    )

}

export default RequestInfoComponentView