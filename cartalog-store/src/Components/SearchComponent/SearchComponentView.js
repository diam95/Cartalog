import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url("https://picsum.photos/2000/400")`,
        width: "100%",
        height: "40vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative"
    },
    titleText: {
        position: "absolute",
        top: 0,
        left: 0,
        alignSelf: "flex-start",
        color: "white",
        fontSize: 28,
        fontWeight: 600,
        margin: theme.spacing(3)
    }

}))

const SearchComponentView = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <div className={classes.titleText}>Cartalog</div>

        </div>
    )

}

export default SearchComponentView