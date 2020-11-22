import React, {useEffect} from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent/NavBarComponent";
import {useHistory} from "react-router-dom";
import {IconButton, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import lottie from "lottie-web";
import emptyCart from "../../assets/4505-empty-cart-version-2.json";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh"
    },
    itemContainer: {
        width: `calc(100% - ${theme.spacing(2)}px)`,
        margin: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    content: {
        width: "100%"
    },
    itemImage: {
        width: 90,
        height: 90,
        objectFit: "cover"
    },
    itemDetails: {
        height: "100%",
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: theme.spacing(1),
        marginTop:theme.spacing(1)
    },
    captionsContainer: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    captionChip: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    captionAvatar: {
        background: theme.palette.background.paper,
        borderRadius: 10,
        display: "flex"
    },
    emptyCartContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        userSelect: "none"
    },
    emptyCartLoopContainer: {
        width: "100%"
    }

}))

const CartScreenView = (props) => {

    const cartState = props.cartState
    const filterState = props.filterState

    const handleRemoveFromCart = props.handleRemoveFromCart
    console.log(cartState.items.length)
    const history = useHistory()

    const classes = useStyles()

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#react-logo"),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: emptyCart
        });
    }, []);

    const renderItems = () => {

        if (cartState.items.length === 0) {
            return (
                <div className={classes.emptyCartContainer}>
                    <div id="react-logo" className={classes.emptyCartContainer}/>
                    <Typography variant={"h5"}>В корзине пусто :(</Typography>
                    <Typography variant={"subtitle1"} onClick={() => {
                        history.push("/")
                    }}>На главную</Typography>
                </div>
            )
        } else return cartState.items.map(item => {

            return (
                <Paper className={classes.itemContainer} key={item.title}>

                    <div style={{
                        width: "100%",
                        height: "100%"
                    }}>

                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "100%"
                        }}>

                            <div style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                height: "100%"
                            }}>

                                <img className={classes.itemImage} src={item.images[0]} alt={""}/>

                                <div className={classes.itemDetails}>
                                    <Typography
                                        variant={"button"}>{filterState.parts_filter[item.partType]}</Typography>
                                    <Typography
                                        variant={"body2"}>{item.brand.toUpperCase()} {item.model.toUpperCase()}</Typography>
                                    <Typography variant={"h6"}>{item.price} ₽</Typography>
                                </div>

                            </div>

                            <IconButton onClick={() => {
                                handleRemoveFromCart(item)
                            }}>
                                <CloseIcon/>
                            </IconButton>

                        </div>

                    </div>


                </Paper>
            )

        })


    }

    return (

        <div className={classes.root}>

            <HeaderComponent darkMode={props.darkMode}
                             matches={props.matches}
                             setDarkMode={props.setDarkMode}
                             cartState={props.cartState}
            />


            {props.matches
                ? <div/>
                : <NavBarComponent matches={props.matches}
                />
            }

            {cartState.items.length > 0
                ? <Typography variant={"h6"}>Всего товаров: {cartState.items.length}</Typography>
                : ""}


            <div className={classes.content}>
                {renderItems()}
            </div>

        </div>

    )

}

export default CartScreenView