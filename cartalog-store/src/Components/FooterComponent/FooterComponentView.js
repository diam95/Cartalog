import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        marginTop:"auto",
        width:"100%"
    },
    titleContainer: {
        marginTop: theme.spacing(3),
        minHeight: 160,
        background: "grey"
    }

}))

const FooterComponentView = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <div className={classes.titleContainer}>

            </div>

        </div>
    )

}

export default FooterComponentView