import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import WorkingHours from "./WorkingHours/WorkingHours";

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

const PartnerCard = (props) => {

    console.log('<PartnerCard/>');

    const classes = useStyles();

    const partner = props.partner;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {partner.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {partner.address}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {partner.tel}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {partner.uid}
                </Typography>
                <WorkingHours partner={partner}/>
            </CardContent>
        </Card>
    )

};

export default PartnerCard;
