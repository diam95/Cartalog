import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(()=>({

    root:{

    }

}))

const MainScreenView = () => {

    const classes = useStyles()

    return(

        <div className={classes.root}>
            123
        </div>

    )

}

export default MainScreenView