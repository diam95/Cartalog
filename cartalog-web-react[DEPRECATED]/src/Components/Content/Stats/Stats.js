import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import * as firebase from "firebase";
import moment from "moment";

const useStyles = makeStyles(theme => ({

    stats: {},
    statsPaper: {
        padding: theme.spacing(2)
    },
    statsTitle: {
        textAlign: `left`,
        color: `#676767`
    },
    statsTitle1: {
        marginTop: 6,
        color: `#454545`,
        fontWeight: `bold`,
        textAlign: `left`,
        paddingBottom: theme.spacing(3)
    }
}));


const Stats = (props) => {

    const classes = useStyles();

    const [totalRequests, setTotalRequests] = useState(0);
    const [todayRequests, setTodayRequests] = useState(0);
    const [myAnswersCount, setMyAnswersCount] = useState(0);

    const vendorData = props.vendorData;

    useEffect(() => {

        const city = vendorData.city;
        const type = vendorData.type;
        const vendorID = vendorData.vendorID;

        const infoRef = firebase.database().ref(`info`).child(city).child(type);
        const myAnswersCountRef = firebase.database().ref(`partners2`).child(vendorID).child(`myAnswersCount`);

        infoRef.child(`totalRequests`).on(`value`, snap => {

            setTotalRequests(snap.val())

        });

        const today = moment().format('L').replace(`.`, ``).replace(`.`, ``);

        console.log({today});

        infoRef.child(`today`).child(today).on(`value`, snap => {

            if (snap.exists()) {
                setTodayRequests(snap.val())
            }

        });

        myAnswersCountRef.on(`value`, snap => {

            setMyAnswersCount(snap.val())

        });

        return (() => {

            infoRef.child(`totalRequests`).off(`value`);
            infoRef.child(`today`).child(today).off(`value`);
            myAnswersCountRef.off(`value`);

        })


    }, [vendorData]);

    return (
        <div className={classes.stats}>
            <Typography className={classes.statsTitle1} variant={"h5"}> Статистика </Typography>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper elevation={2} className={classes.statsPaper}>
                        <Typography className={classes.statsTitle} variant={"h6"}>
                            Заявок в базе
                            <Typography variant={`h2`}>{totalRequests}</Typography>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper elevation={2} className={classes.statsPaper}>
                        <Typography className={classes.statsTitle} variant={"h6"}>
                            Заявок за сегодня
                            <Typography variant={`h2`}>{todayRequests}</Typography>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper elevation={2} className={classes.statsPaper}>
                        <Typography className={classes.statsTitle} variant={"h6"}>
                            Мои ответы
                            <Typography variant={`h2`}>{myAnswersCount}</Typography>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default Stats