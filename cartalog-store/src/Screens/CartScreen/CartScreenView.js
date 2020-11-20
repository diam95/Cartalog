import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent/NavBarComponent";
import {IconButton, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

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
    itemTitle: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    itemDetails: {
        alignSelf: "flex-start"
    },
    captionsContainer: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    captionChip: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    captionAvatar:{
        background:theme.palette.background.paper,
        borderRadius:10,
        display:"flex"
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

                    <div>
                        <div style={{display: "flex",padding:8}}>
                            <div style={{display: "flex",width:"100%",justifyContent:"flex-start",alignItems:"flex-start"}}>

                                <img className={classes.itemImage} src={item.images[0]} alt={""}/>

                                <div className={classes.itemDetails}>
                                    <Typography variant={"subtitle2"}
                                                className={classes.itemTitle}>{filterState.parts_filter[item.partType]}</Typography>
                                    <Typography variant={"body2"}
                                                className={classes.itemTitle}>{item.brand.toUpperCase()} {item.model.toUpperCase()}</Typography>
                                    <Typography variant={"h6"} className={classes.itemTitle}>{item.price} ₽</Typography>
                                </div>

                            </div>


                            <IconButton onClick={() => {
                                handleRemoveFromCart(item)
                            }}>
                                <CloseIcon/>
                            </IconButton>


                        </div>

                        <div className={classes.captionsContainer}>
                            {item.captions.map(caption => <Chip className={classes.captionChip}
                                                                size={"small"}
                                                                variant={"outlined"}
                                                                label={caption.captionValue}/>)}
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

            <Typography variant={"h6"}>Всего товаров: {cartState.items.length}</Typography>

            <div className={classes.content}>
                {renderItems()}
            </div>

        </div>

    )

}

export default CartScreenView