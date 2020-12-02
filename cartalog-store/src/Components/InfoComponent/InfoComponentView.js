import React, {useEffect} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {useLocation} from 'react-router-dom';
import lottie from "lottie-web";
import officeTeam from "../../assets/37463-sign-contract-contract-approved.json";
import onlinePay from "../../assets/36521-online-payment-animation.json";
import shipping from "../../assets/33369-sailing-ship.json";
/*import guarantee from "../../assets/transfer.json";
import refund from "../../assets/39549-account-privacy.json";*/

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        minHeight: `calc(100vh - 64px)`
    },
    emptyCartContainer: {

    },

}))

const InfoComponentView = (props) => {

    const classes = useStyles()

    const locationArray = useLocation().pathname.split("/")

    useEffect(() => {

        switch (locationArray[1]) {

            case "services":

                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: officeTeam
                });
                break;

            case "payment":
                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: onlinePay
                });
                break;

            case "shipping":
                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: shipping
                });
                break;

            case "guarantees":
               /* lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: guarantee
                });*/
                break;


            case "refund":
               /* lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: refund
                });*/
                break;

            case "contacts":
                return ("contacts")


        }

        return (() => {
            lottie.destroy()
        })

    }, [locationArray[1]]);

    const renderContent = () => {

        return <div id="react-logo" className={classes.emptyCartContainer}/>

    }

    return (
        <div className={classes.root}>
            {renderContent()}
        </div>
    )

}

export default InfoComponentView