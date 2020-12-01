import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom'
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        height: 48,
        background:theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    container:{
        height: "100%",
        userSelect:"none",
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor:"pointer",
        "&:hover":{
            borderTopStyle:"solid",
            borderTopWidth:3,
            borderTopColor:`#ffffff00`,
            borderBottomStyle:"solid",
            borderBottomWidth:3,
            borderBottomColor:theme.palette.primary.dark,
        }
    }

}))

const NavBarComponentView = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <div className={classes.container}>
                <Typography variant={"subtitle2"}>Автозапчасти</Typography>
            </div>

            <div className={classes.container}>
                <Typography variant={"subtitle2"}>Оплата</Typography>
            </div>

            <div className={classes.container}>
                <Typography variant={"subtitle2"}>Доставка</Typography>
            </div>

            <div className={classes.container}>
                <Typography variant={"subtitle2"}>Гарантии</Typography>
            </div>

            <div className={classes.container}>
                <Typography variant={"subtitle2"}>Возврат</Typography>
            </div>

            <div className={classes.container}>
                <Typography variant={"subtitle2"}>Контакты</Typography>
            </div>

        </div>
    )

}

export default NavBarComponentView