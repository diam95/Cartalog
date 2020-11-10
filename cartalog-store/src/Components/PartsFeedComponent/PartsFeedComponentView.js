import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => createStyles({

    root: {},

}))

const PartsFeedComponentView = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

        </div>
    )

}

export default PartsFeedComponentView