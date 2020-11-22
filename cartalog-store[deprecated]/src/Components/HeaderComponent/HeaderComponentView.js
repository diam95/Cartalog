import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import logo from "../../assets/logo.png";
import {Button, Typography} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        overflow:"auto"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(3),
    },
    logo: {
        width: 60,
        height: 60,
        cursor: "pointer"
    },
    titleText: {
        marginLeft: theme.spacing(3),
        cursor: "pointer"
    },
    desrContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontSize: 20,
        fontWeight: 500
    },
    contactsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontSize: 16,
        fontWeight: 500
    }

}))

const HeaderComponentView = (props) => {

    console.log("HeaderComponentView")

    const classes = useStyles()

    const handleGoToMainPage = props.handleGoToMainPage

    return (
        <div className={classes.root}>

            <div className={classes.titleContainer}>

                <img src={logo} alt="Карталог логотип" className={classes.logo} onClick={handleGoToMainPage}/>

                <Typography variant={"h4"} className={classes.titleText}
                            onClick={handleGoToMainPage}>Cartalog</Typography>

            </div>

            <div className={classes.desrContainer}>
                <div>Автозапчасти для японских авто</div>
                <div>в наличии и под заказ</div>
            </div>

            <div className={classes.contactsContainer}>
                <div>+7-914-030-6366</div>
                <div>+7-914-039-0623</div>
            </div>

            <Button variant={"outlined"} color={"primary"}>
                Корзина пуста
            </Button>

            <Switch
                icon={<Brightness7Icon style={{color: "#eccb28", marginTop: -2}}/>}
                checkedIcon={<Brightness3Icon style={{marginLeft: 0, color: "#afaea6", marginTop: -2}}/>}
                color={"primary"}
                checked={props.darkMode}
                onChange={() => {
                    props.setDarkMode(!props.darkMode)
                }}/>

        </div>
    )

}

export default HeaderComponentView