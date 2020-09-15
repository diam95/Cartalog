import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import * as firebase from "firebase";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const PartnerInfoCard = ({store, partner}) => {

    console.log('<PartnerInfoCard/>');

    const classes = useStyles();

    const [answersCount, setAnswersCount] = useState('-');
    useEffect(() => {


        const partners2 = store.partners2;
        const vendorID = partner.uid;
        const partnerObject = partners2[vendorID];

        if (partnerObject) {

            const myAnswersCount = partnerObject.myAnswersCount;

            setAnswersCount(myAnswersCount)

        } else {

            setAnswersCount('-')

        }

    }, [store, partner]);


    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Ответы:
                </Typography>
                <Typography variant="h5" component="h2">
                    {answersCount}
                </Typography>
            </CardContent>
        </Card>
    )

};

export default PartnerInfoCard;
