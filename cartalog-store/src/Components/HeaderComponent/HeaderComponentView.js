import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {Grid, Typography} from "@material-ui/core";
import StyledSwitch from "./StyledSwitch";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
    },
    logoAndTitleContainer: {
        marginLeft: theme.spacing(3),
        padding: theme.spacing(3),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        fontFamily: "Satisfy",
        cursor:"pointer"
    },
    titleContainer:{
        height:"100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        marginLeft: theme.spacing(3),
        fontFamily: "Satisfy",
        cursor:"pointer"
    },
    switchAndCartContainer: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginRight: theme.spacing(1)
    }

}))

const HeaderComponentView = (props) => {

    const darkMode = props.darkMode
    const setDarkMode = props.setDarkMode
    const cartState = props.cartState
    const handleGoToCart = props.handleGoToCart
    const handleGoToMainPage = props.handleGoToMainPage

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <Grid container spacing={0}>

                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>

                    <div className={classes.logoAndTitleContainer} onClick={() => {
                        handleGoToMainPage()
                    }}>

                        <img src={process.env.PUBLIC_URL + '/static/logo.png'} alt={"Cartalog logo"} className={classes.logo}/>
                        <Typography variant={"h3"} className={classes.title}>Cartalog</Typography>

                    </div>

                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>

                    <div className={classes.titleContainer}>
                        <Typography variant={"h6"}>Автозапчасти для японских
                            автомобилей в наличии и под заказ</Typography>
                    </div>

                </Grid>

                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>

                    <div className={classes.switchAndCartContainer}>

                        <StyledSwitch checked={darkMode}
                                      onChange={() => {
                                          setDarkMode(!darkMode)
                                      }}/>

                        <IconButton onClick={() => {
                            handleGoToCart()
                        }}>
                            <Badge badgeContent={cartState.items.length} color="primary">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>

                    </div>

                </Grid>

            </Grid>

        </div>
    )

}

export default HeaderComponentView