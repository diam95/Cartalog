import React, {useState} from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from "react-router-dom"
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import NavBarComponent from "../NavBarComponent/NavBarComponent";
import StyledSwitch from "../FilterComponent/StyledSwitch";

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
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1)
    },
    logo: {
        width: 40,
        height: 40,
        cursor: "pointer",
    },
    titleText: {
        fontFamily: `Satisfy`,
        fontWeight: 500,
        marginLeft: theme.spacing(1),
        cursor: "pointer",
        userSelect: "none",
        fontSize: 32
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

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    return (
        <div className={classes.root}>

            <React.Fragment>
                <SwipeableDrawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                    onOpen={toggleDrawer("left", true)}
                >
                    <NavBarComponent/>
                </SwipeableDrawer>
            </React.Fragment>

            <div className={classes.titleContainer}>

                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                    <IconButton onClick={handleGoToMainPage}>
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant={"h5"} className={classes.titleText}
                                onClick={handleGoToMainPage}>Cartalog</Typography>
                </div>
                <div style={{display: "flex", alignItems: "Center", justifyContent: "center"}}>

                    <StyledSwitch checked={props.darkMode}
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