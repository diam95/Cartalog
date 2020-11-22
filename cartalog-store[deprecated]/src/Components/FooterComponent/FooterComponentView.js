import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import appStore from "../../assets/appstore.png";
import playMarket from "../../assets/google.png";
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        marginTop: theme.spacing(10),
        width: "100%"
    },
    titleContainer: {
        marginTop: theme.spacing(3)
    },
    logo: {
        width: 60,
        height: 60
    },
    paperContent: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    },
    container0: {
        marginTop: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    container1: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    actionButton: {
        width: `calc(50% - ${theme.spacing(2)}px)`
    },
    title:{
        marginLeft:theme.spacing(1)
    }


}))

const FooterComponentView = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <Paper square>

                <div className={classes.paperContent}>

                    <div className={classes.container0}>
                        <img className={classes.logo} src={logo} alt={"logo"}/>
                        <Typography className={classes.title} variant={"h3"}>CARTALOG</Typography>
                    </div>

                    <Typography variant={"subtitle1"}>ПОИСК ЗАПЧАСТЕЙ И АВТОСЕРВИСОВ</Typography>

                    <div className={classes.container1}>
                        <img className={classes.actionButton} src={playMarket} alt={"playMarket"}/>
                        <img className={classes.actionButton} src={appStore} alt={"appStore"}/>
                    </div>

                </div>

            </Paper>

        </div>
    )

}

export default FooterComponentView