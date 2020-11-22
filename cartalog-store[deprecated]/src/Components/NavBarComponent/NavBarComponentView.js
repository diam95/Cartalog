import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        background: "#373b50",
        height: 48,
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            height:"100%",
            justifyContent: "flex-start"
        },
        alignItems: "center",
        justifyContent: "space-evenly",
        overflowX: "auto "
    },
    root2: {
        width: "100%",
        background: "#373b50",
        height: 48,
        flexDirection: "row",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            height:"100%",
            justifyContent: "flex-start"
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowX: "auto "
    },
    title: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        textAlign: "center",
        cursor: "pointer"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "white",
        "&:hover": {
            background: "grey"
        },
        cursor: "pointer",
        userSelect: "none"
    }

}))

const NavBarComponentView = (props) => {

    console.log("NavBarComponentView")

    const matches = props.matches

    const getStyle = () => {

        if (matches) {
            return classes.root2
        } else {
            return classes.root
        }
    }

    const classes = useStyles()

    const history = useHistory()

    return (
        <div className={getStyle()}>

            <div className={classes.titleContainer} onClick={() => {
                history.push("/")
            }}>
                <div className={classes.title} onClick={() => {
                    history.push("/")
                }}>Автозапчасти
                </div>
            </div>

            <div className={classes.titleContainer} onClick={() => {
                history.push("/")
            }}>
                <div className={classes.title} onClick={() => {
                    history.push("/")
                }}>Оплата
                </div>
            </div>

            <div className={classes.titleContainer} onClick={() => {
                history.push("/")
            }}>
                <div className={classes.title}>Доставка</div>
            </div>
            <div className={classes.titleContainer} onClick={() => {
                history.push("/")
            }}>
                <div className={classes.title} onClick={() => {
                    history.push("/")
                }}>Гарантии
                </div>
            </div>
            <div className={classes.titleContainer} onClick={() => {
                history.push("/")
            }}>
                <div className={classes.title} onClick={() => {
                    history.push("/")
                }}>Возврат
                </div>
            </div>
            <div className={classes.titleContainer} onClick={() => {
                history.push("/")
            }}>
                <div className={classes.title}>Получение товара</div>
            </div>

        </div>
    )

}

export default NavBarComponentView