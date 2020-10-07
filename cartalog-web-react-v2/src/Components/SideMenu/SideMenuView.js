import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme)=>({

    root:{
        margin:theme.spacing(2)
    },
    feature1Container:{
        minHeight:200
    },
    feature2Container:{
        marginTop:theme.spacing(2),
        minHeight:200
    },
    feature3Container:{
        marginTop:theme.spacing(2),
        minHeight:200
    }

}))

const SideMenuView = () => {

    const classes = useStyles()

    return(

        <div className={classes.root}>

            <Paper>
                <div className={classes.feature1Container}>
                    feature1
                </div>
            </Paper>

            <Paper>
                <div className={classes.feature2Container}>
                    feature2
                </div>
            </Paper>

            <Paper>
                <div className={classes.feature3Container}>
                    feature3
                </div>
            </Paper>

        </div>

    )

}

export default SideMenuView