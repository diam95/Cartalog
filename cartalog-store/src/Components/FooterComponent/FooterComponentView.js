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
import Button from "@material-ui/core/Button";
import {useSnackbar} from "notistack";
import * as clipboard from "clipboard-polyfill/text";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    divider: {
        width: "100%"
    },
    copyrightContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginTop: theme.spacing(1)
    },
    footerTextContainer: {
        display: "flex",
        flexDirection: "column"
    },
    instagramIcon: {
        width: 42,
        height: 42
    },
    payContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    payTinkof: {
        height: 48
    },
    paySber: {
        height: 48
    },
    logosContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    propsContainer: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column"
    },
    number: {
        cursor: "pointer",
        userSelect: "none"
    }


}))

const FooterComponentView = (props) => {

    const classes = useStyles()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const handleNumberClick = async (number) => {

        await clipboard.writeText(number).then(r => {
            enqueueSnackbar(`Номер скопирован`, {
                variant: "info",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                preventDuplicate: true,
                autoHideDuration:2000,
                action: <Button style={{color: "White"}} onClick={() => {
                    handleCall()
                }}>
                    Позвонить
                </Button>
            })
        });

        const handleCall = () => {

            window.open(`tel:${number}`)

        }

    }


    return (
        <div className={classes.root}>

            {/*<div className={classes.payContainer}>
                <img className={classes.payTinkof} src={tinkof} alt={"tinkoff"}/>
                <img className={classes.paySber}  src={sber} alt={"tinkoff"}/>
            </div>*/}

            <Divider className={classes.divider}/>

            <div className={classes.copyrightContainer}>

                <div className={classes.footerTextContainer}>

                    <Typography variant={"h6"}>© Cartalog</Typography>
                    <Typography variant={"button"}>ПОИСК ЗАПЧАСТЕЙ И АВТОСЕРВИСОВ</Typography>

                    <Typography variant={"overline"} className={classes.number} onClick={() => {
                        handleNumberClick(`+79140306366`).then()
                    }}>ОТДЕЛ ПРОДАЖ: +7(914)-030-6366</Typography>
                    <Typography variant={"overline"} className={classes.number} onClick={() => {
                        handleNumberClick(`+79140390623`).then()
                    }}>ТЕХ. ПОДДЕРЖКА: +7(914)-039-0623</Typography>

                </div>

                <div className={classes.logosContainer}>
                    <IconButton onClick={() => {
                        openInNewTab("https://www.instagram.com/cartalog_magadan/")
                    }}>
                        <img src={instagramLogo} alt={"instagram logo"} className={classes.instagramIcon}/>
                    </IconButton>
                    <IconButton onClick={() => {
                        openInNewTab("https://play.google.com/store/apps/details?id=com.oldmgdn.boost")
                    }}>
                        <img src={android} alt={"android logo"} className={classes.instagramIcon}/>
                    </IconButton>
                    <IconButton onClick={() => {
                        openInNewTab("https://apps.apple.com/ru/app/cartalog/id1509680414")
                    }}>
                        <img src={apple} alt={"instagram logo"} className={classes.instagramIcon}/>
                    </IconButton>
                    <IconButton onClick={() => {
                        openInNewTab("https://cartalog-promo.web.app/")
                    }}>
                        <img src={chrome} alt={"chrome logo"} className={classes.instagramIcon}/>
                    </IconButton>
                </div>

            </div>

        </div>
    )

}

export default FooterComponentView