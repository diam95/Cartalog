import React, {useEffect, useState} from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import StyledSwitch from "./StyledSwitch";
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import PaymentIcon from '@material-ui/icons/Payment';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SecurityIcon from '@material-ui/icons/Security';
import {useHistory} from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        overflow: "auto",
        height: 64
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
    },
    cartalog2020: {
        marginTop: "auto",
        width: "100%",
        textAlign: "center",
        marginBottom: theme.spacing(1)
    },
    listRoot: {
        marginRight: theme.spacing(2)
    }

}))

const HeaderComponentViewMobile = (props) => {

    console.log("HeaderComponentViewMobile")

    const handleGoToMainPage = props.handleGoToMainPage
    const handleGoToCart = props.handleGoToCart
    const darkMode = props.darkMode
    const cartState = props.cartState
    const setDarkMode = props.setDarkMode

    const classes = useStyles()

    const [open, setOpen] = useState(false);

    const history = useHistory()

    const handleListItemClick = (url) => {

        setOpen(false)
        history.push(`/${url}`)

    }

    return (
        <div className={classes.root}>

            <React.Fragment>
                <SwipeableDrawer
                    anchor={"left"}
                    open={open}
                    onClose={() => {
                        setOpen(false)
                    }}
                    onOpen={() => {
                        setOpen(true)
                    }}
                >
                    <List component="nav" aria-label="main mailbox folders" className={classes.listRoot}>

                        <ListItem button onClick={()=>{handleListItemClick("")}}>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Автозапчасти"/>
                        </ListItem>

                        <ListItem button onClick={()=>{handleListItemClick("services")}}>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Услуги"/>
                        </ListItem>

                        <ListItem button onClick={()=>{handleListItemClick("payment")}}>
                            <ListItemIcon>
                                <PaymentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Оплата"/>
                        </ListItem>

                        <ListItem button onClick={()=>{handleListItemClick("shipping")}}>
                            <ListItemIcon>
                                <FlightTakeoffIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Доставка"/>
                        </ListItem>

                        <ListItem button onClick={()=>{handleListItemClick("guarantees")}}>
                            <ListItemIcon>
                                <SecurityIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Гарантии"/>
                        </ListItem>

                        <ListItem button onClick={()=>{handleListItemClick("refund")}}>
                            <ListItemIcon>
                                <KeyboardReturnIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Возврат"/>
                        </ListItem>

                        <ListItem button onClick={()=>{handleListItemClick("about")}}>
                            <ListItemIcon>
                                <InfoOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="О нас"/>
                        </ListItem>

                        <ListItem button onClick={()=>{handleListItemClick("contacts")}}>
                            <ListItemIcon>
                                <ContactPhoneIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Контакты"/>
                        </ListItem>

                    </List>
                    <Typography variant={"subtitle2"} className={classes.cartalog2020}>© Cartalog 2020</Typography>
                </SwipeableDrawer>
            </React.Fragment>

            <div className={classes.titleContainer}>

                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                    <IconButton onClick={() => {
                        setOpen(true)
                    }}>
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant={"h5"} className={classes.titleText}
                                onClick={() => {
                                    handleGoToMainPage()
                                }}>Cartalog</Typography>

                </div>

                <div style={{display: "flex", alignItems: "Center", justifyContent: "center", marginRight: 8}}>

                    <StyledSwitch checked={darkMode}
                                  onChange={() => {
                                      setDarkMode(!darkMode)
                                  }}/>

                    <IconButton onClick={() => {
                        handleGoToCart()
                    }}
                    >

                        <Badge badgeContent={cartState.items.length} color="primary">
                            <ShoppingCartIcon/>
                        </Badge>

                    </IconButton>

                </div>


            </div>

        </div>
    )

}

export default HeaderComponentViewMobile