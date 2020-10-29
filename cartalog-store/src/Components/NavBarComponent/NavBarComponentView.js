import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        background: "#373b50",
        height: 48,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    title: {
        paddingLeft:theme.spacing(3),
        paddingRight:theme.spacing(3),
        textAlign: "center"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "white",
        "&:hover":{
            background: "grey"
        },
        cursor:"pointer"
    }

}))

const NavBarComponentView = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <div className={classes.titleContainer}>
                <div className={classes.title}>Автозапчасти</div>
            </div>
            <div className={classes.titleContainer}>
                <div className={classes.title}>Оплата</div>
            </div>
            <div className={classes.titleContainer}>
                <div className={classes.title}>Доставка</div>
            </div>
            <div className={classes.titleContainer}>
                <div className={classes.title}>Гарантии</div>
            </div>
            <div className={classes.titleContainer}>
                <div className={classes.title}>Возврат</div>
            </div>
            <div className={classes.titleContainer}>
                <div className={classes.title}>Получение товара</div>
            </div>

        </div>
    )

}

export default NavBarComponentView