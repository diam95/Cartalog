import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {IconButton, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import instagramLogo from "../../assets/instagram.png"
import android from "../../assets/android.png"
import apple from "../../assets/apple.png"
import tinkof from "../../assets/tinkofLogo.svg"
import sber from "../../assets/sberbank-image.png"
import chrome from "../../assets/chrome.png"

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    divider: {
        width: "100%"
    },
    copyrightContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: theme.spacing(3)
    },
    instagramIcon: {
        width: 42,
        height: 42
    },
    payContainer: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    payTinkof:{
        height:48
    },
    paySber:{
        height:48
    },
    logosContainer:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }


}))

const FooterComponentView = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <div className={classes.payContainer}>
                <img className={classes.payTinkof} src={tinkof} alt={"tinkoff"}/>
                <img className={classes.paySber}  src={sber} alt={"tinkoff"}/>
            </div>

            <Divider variant="middle" className={classes.divider}/>

            <div className={classes.copyrightContainer}>

                <Typography variant={"subtitle1"}>©2020 Платформа по поиску запчастей и автосервисов
                    Cartalog</Typography>

                <Typography variant={"subtitle1"}>ИП Крижановский Александр Игоревич</Typography>

                <div className={classes.logosContainer}>
                    <IconButton>
                        <img src={instagramLogo} alt={"instagram logo"} className={classes.instagramIcon}/>
                    </IconButton>
                    <IconButton>
                        <img src={android} alt={"android logo"} className={classes.instagramIcon}/>
                    </IconButton>
                    <IconButton>
                        <img src={apple} alt={"instagram logo"} className={classes.instagramIcon}/>
                    </IconButton>
                    <IconButton>
                        <img src={chrome} alt={"chrome logo"} className={classes.instagramIcon}/>
                    </IconButton>
                </div>

            </div>

        </div>
    )

}

export default FooterComponentView