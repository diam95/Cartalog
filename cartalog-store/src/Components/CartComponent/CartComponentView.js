import React, {useEffect} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {colors, Grid, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from "@material-ui/core/Button";
import {useSnackbar} from "notistack";
import lottie from "lottie-web";
import emptyCart from "../../assets/4505-empty-cart-version-2.json";
import {useHistory} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import PaymentWidgetComponent from "../PaymentWidgetComponent/PaymentWidgetComponent";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        minHeight: `calc(100vh - 64px)`
    },
    contentContainer: {
        marginTop: theme.spacing(1)
    },
    cartContainer: {
        width: "100%"
    },
    cartItemContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: theme.spacing(3),
        marginLeft:theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            paddingLeft: theme.spacing(2),
            marginLeft:theme.spacing(0)
        }
    },
    cartItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    cartItemImg: {
        width: 90,
        height: 90,
        [theme.breakpoints.down("md")]: {
            width: 72,
            height: 72
        }
    },
    cartItemDetailsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: theme.spacing(2)
    },
    emptyCartContainer: {

        display: "none",
        [theme.breakpoints.down("md")]: {
            display: "block"
        }
    },
    emptyCartTitle: {
        marginLeft: theme.spacing(2)
    },
    emptyCartTitle2: {
        color: "#397baf",
        marginLeft: theme.spacing(2),
        textDecoration: "underline"
    },
    crumb: {
        marginLeft: theme.spacing(2)
    },
    crumbText: {
        userSelect: "none",
        cursor: "pointer"
    },
    cartContent: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column"
        }
    },
    tinkoffPayRow: {
        display: `block`,
        margin: `1%`,
        width: 160
    },
    paperRoot: {
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(16deg, rgba(61,67,75,1) 0%, rgba(79,90,106,1) 59%, rgba(85,111,145,1) 100%)`,
        padding: theme.spacing(10),
        [theme.breakpoints.down("md")]: {
            margin: theme.spacing(1),
        }
    },
    totalContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    total: {
        display: "inline-block",
        background: "#808080",
        padding: theme.spacing(1),
        fontSize: 16,
        fontWeight: 600,
        color: "white",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderRadius: 5
    },
    checkOutButton: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    nuance: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }

}))

const CartComponentView = (props) => {

    const classes = useStyles()

    const cartState = props.cartState
    const setCartState = props.setCartState

    const history = useHistory()

    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const renderContent = () => {

        if (cartState.items.length === 0) {

            return (
                <div className={classes.emptyCartContainer}>
                    <Typography className={classes.emptyCartTitle} variant={"h5"}>В корзине пусто :(</Typography>
                    <Typography className={classes.emptyCartTitle2} variant={"subtitle1"} onClick={() => {
                        history.push("/")
                    }}>На главную</Typography>
                </div>
            )

        } else {

            const items = cartState.items.map(part => {

                const handleRemoveFromCart = (item) => {

                    if (cartState.items.includes(item)) {

                        const ind = cartState.items.indexOf(item)
                        const temp = {...cartState}
                        temp.items.splice(ind, 1)
                        setCartState(temp)

                        const handleUndo = (item) => {

                            const temp = {...cartState}
                            temp.items.push(item)
                            setCartState(temp)
                            closeSnackbar()

                        }

                        enqueueSnackbar('Товар удален из корзины', {
                            variant: "warning",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            },
                            preventDuplicate: true,
                            action: <Button style={{color: "White"}} onClick={() => {
                                handleUndo(item)
                            }}>
                                Отменить
                            </Button>
                        })

                    }

                }

                const handleCartPartClick = () => {

                    history.push(`${part.brand}/${part.model}/${part.partType}/${part.partHref}`)

                }

                return (
                    <div className={classes.cartItemContainer}>

                        <div className={classes.cartItem}>

                            <Avatar className={classes.cartItemImg} src={part.images[0]} onClick={handleCartPartClick}/>

                            <div className={classes.cartItemDetailsContainer} onClick={handleCartPartClick}>
                                <Typography variant={"body2"}>{part.title}</Typography>
                                <Typography variant={"h6"}>{part.price} ₽</Typography>
                            </div>

                            <IconButton onClick={() => {
                                handleRemoveFromCart(part)
                            }}>
                                <DeleteOutlineIcon/>
                            </IconButton>

                        </div>

                    </div>

                )

            })

            const getTotalPrice = () => {

                return cartState.items.reduce((acc, item) => {

                    return parseInt(acc) + parseInt(item.price)

                }, [0])

            }

            return (
                <div className={classes.contentContainer}>

                    {items}

                    <Divider variant={"middle"}/>

                    <div className={classes.totalContainer}>

                        <div className={classes.total}>К оплате:</div>
                        <Typography variant={"h6"}>{getTotalPrice()} ₽*</Typography>

                    </div>

                    <Typography variant={"caption"}
                                className={classes.nuance}
                    >
                        *Доставка оплачивается при получении заказа
                    </Typography>

                    <div className={classes.checkOutButton}>
                        <Button fullWidth
                                variant={"outlined"}
                                color={"primary"}
                        >
                            Оформить заказ
                        </Button>
                    </div>

                </div>
            )

        }

    }

    useEffect(() => {

        if (cartState.items.length === 0) {
            lottie.loadAnimation({
                container: document.querySelector("#react-logo"),
                renderer: 'svg',
                loop: true,
                animationData: emptyCart
            });
        }

        return(()=>{
            lottie.destroy()
        })

    }, [cartState.items]);

    return (
        <div className={classes.root}>

            <Grid container spacing={0}>

                <Grid item xl={2} lg={2} md={false} sm={false} xs={false}/>

                <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>

                    <div className={classes.cartContainer}>

                        <Breadcrumbs className={classes.crumb}>
                            <Typography className={classes.crumbText}
                                        variant={"subtitle2"}
                                        onClick={() => {
                                            history.push("/")
                                        }}
                            >Вернуться к выбору запчастей</Typography>
                        </Breadcrumbs>

                        <Breadcrumbs className={classes.crumb}>
                            <Typography variant={"h6"}>Корзина</Typography>
                        </Breadcrumbs>

                        <div id="react-logo" className={classes.emptyCartContainer}/>

                        <div className={classes.cartContent}>
                            {renderContent()}
                            {/* <Paper className={classes.paperRoot} elevation={false}>
                            </Paper>*/}
                            {/*<PaymentWidgetComponent/>*/}
                        </div>

                    </div>

                </Grid>

                <Grid item xl={2} lg={2} md={false} sm={false} xs={false}/>

            </Grid>

        </div>
    )

}

export default CartComponentView