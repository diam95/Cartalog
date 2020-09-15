import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme)=>({

    root:{
        padding:theme.spacing(2),
        margin:theme.spacing(1),
        width:100
    }

}));

const TotalUsersCount = (props) => {

    const classes = useStyles();

    const usersCount = props.usersCount;

    return (
        <Paper className={classes.root}>
            <Typography variant="subtitle2" component="p">Всего юзеров:</Typography>
            <Typography variant="h2" component="h2">{usersCount}</Typography>
        </Paper>
    )

};

export default TotalUsersCount;
