import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({

    root: {}

}))

const BlankComponentView = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

        </div>
    )

}

export default BlankComponentView