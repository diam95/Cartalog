import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom'
import {ListItem, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        height: 48,
        background:theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex:100
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

    const history = useHistory()

    return (
        <div className={classes.root}>

            <div className={classes.container} onClick={() => {
                history.push("/")
            }}>
                <Typography variant={"body2"}>Автозапчасти</Typography>
            </div>

            <div className={classes.container} onClick={() => {
                history.push("/services")
            }}>
                <Typography variant={"body2"}>Услуги</Typography>
            </div>

            <div className={classes.container} onClick={() => {
                history.push("/payment")
            }}>
                <Typography variant={"body2"}>Оплата</Typography>
            </div>

            <div className={classes.container} onClick={() => {
                history.push("/shipping")
            }}>
                <Typography variant={"body2"}>Доставка</Typography>
            </div>

            <div className={classes.container} onClick={() => {
                history.push("/guarantees")
            }}>
                <Typography variant={"body2"}>Гарантии</Typography>
            </div>

            <div className={classes.container} onClick={() => {
                history.push("/refund")
            }}>
                <Typography variant={"body2"}>Возврат</Typography>
            </div>

            <div className={classes.container} onClick={() => {
                history.push("/about")
            }}>
                <Typography variant={"body2"}>О нас</Typography>
            </div>

            <div className={classes.container} onClick={() => {
                history.push("/contacts")
            }}>
                <Typography variant={"body2"}>Контакты</Typography>
            </div>

        </div>
    )

}

export default NavBarComponentView