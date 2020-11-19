import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import logo from "../../assets/logo.png";
import {Typography} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from "react-router-dom"

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        overflow: "auto"
    },
    titleContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(1)
    },
    logo: {
        width: 40,
        height: 40,
        cursor: "pointer",
    },
    titleText: {
        marginLeft: theme.spacing(1),
        cursor: "pointer",
        userSelect:"none"
    },
    descrContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontSize: 20,
        fontWeight: 500,
        marginBottom: theme.spacing(1)
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

const HeaderComponentViewMobile = (props) => {

    console.log("HeaderComponentViewMobile")

    const classes = useStyles()

    const history = useHistory()

    const handleGoToMainPage = props.handleGoToMainPage

    return (
        <div className={classes.root}>

            <div className={classes.titleContainer}>

                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src={logo} alt="Карталог логотип" className={classes.logo} onClick={handleGoToMainPage}/>

                    <Typography variant={"h5"} className={classes.titleText}
                                onClick={handleGoToMainPage}>Cartalog</Typography>
                </div>
                <div style={{display: "flex", alignItems: "Center", justifyContent: "center"}}>
                    <Switch
                        icon={<Brightness7Icon style={{color: "#eccb28", marginTop: -2}}/>}
                        checkedIcon={<Brightness3Icon style={{marginLeft: 0, color: "#afaea6", marginTop: -2}}/>}
                        color={"primary"}
                        checked={props.darkMode}
                        onChange={() => {
                            props.setDarkMode(!props.darkMode)
                        }}/>

                    <IconButton onClick={() => {
                        history.push("/cart")
                    }}>
                        <Badge badgeContent={props.cartState.items.length} color="primary">
                            <ShoppingCartIcon/>
                        </Badge>
                    </IconButton>

                </div>


            </div>

        </div>
    )

}

export default HeaderComponentViewMobile