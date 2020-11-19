import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent/NavBarComponent";
import {IconButton, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh"
    },
    itemContainer: {
        width:`calc(100% - ${theme.spacing(2)}px)`,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    content: {},
    itemImage: {
        width: 60,
        height: 60,
        objectFit: "cover"
    },
    itemTitle: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }

}))

const CartScreenView = (props) => {

    const cartState = props.cartState
    const filterState = props.filterState

    const handleRemoveFromCart = props.handleRemoveFromCart

    const classes = useStyles()

    const renderItems = () => {

        return cartState.items.map(item => {

            return (
                <Paper className={classes.itemContainer}>
                    <img className={classes.itemImage} src={item.images[0]} alt={""}/>
                    <div>
                        <Typography variant={"subtitle2"} className={classes.itemTitle}>{filterState.parts_filter[item.partType]}</Typography>
                        <Typography variant={"body2"} className={classes.itemTitle}>{item.brand.toUpperCase()} {item.model.toUpperCase()}</Typography>
                        <Typography variant={"h6"} className={classes.itemTitle}>{item.price} ₽</Typography>
                    </div>

                    <IconButton onClick={() => {
                        handleRemoveFromCart(item)
                    }}>
                        <CloseIcon/>
                    </IconButton>
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


            <NavBarComponent matches={props.matches}
            />

            <Typography variant={"h6"}>Всего товаров: {cartState.items.length}</Typography>

            <div className={classes.content}>
                {renderItems()}
            </div>

        </div>

    )

}

export default CartScreenView