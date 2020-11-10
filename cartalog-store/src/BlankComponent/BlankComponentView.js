import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({

    root: {

    },
    titleContainer:{

    }

}))

const BlankComponentView = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <div className={classes.titleContainer}>

            </div>

        </div>
    )

}

export default BlankComponentView