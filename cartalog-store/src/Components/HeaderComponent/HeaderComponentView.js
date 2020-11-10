import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import logo from "../../assets/logo.png";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%"
    },
    titleContainer:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding:theme.spacing(3),
    },
    logo:{
        width:60,
        height:60,
        cursor:"pointer"
    },
    titleText: {
        marginLeft:theme.spacing(3),
        color: "#31313d",
        fontSize: 36,
        fontWeight: 500,
        textAlign:"center",
        cursor:"pointer"
    },
    desrContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontSize: 20,
        fontWeight: 500
    },
    contactsContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontSize: 16,
        fontWeight: 500
    }

}))

const HeaderComponentView = (props) => {

    const classes = useStyles()

    const handleGoToMainPage =props.handleGoToMainPage

    return (
        <div className={classes.root}>

            <div className={classes.titleContainer}>

                <img src={logo} alt="Карталог логотип" className={classes.logo} onClick={handleGoToMainPage}/>

                <div className={classes.titleText} onClick={handleGoToMainPage}>Cartalog</div>

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

        </div>
    )

}

export default HeaderComponentView