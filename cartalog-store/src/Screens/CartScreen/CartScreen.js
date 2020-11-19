import React from 'react'
import CartScreenView from "./CartScreenView";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const CartScreen = (props) => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'),{noSsr:true});

    const setCartState = props.setCartState
    const cartState = props.cartState

    const handleRemoveFromCart = (item) => {

        if (cartState.items.includes(item)) {

            const ind = cartState.items.indexOf(item)
            const temp = {...cartState}
            temp.items.splice(ind, 1)
            setCartState(temp)

        }

    }

    return (
        <CartScreenView handleRemoveFromCart={handleRemoveFromCart}
                        cartState={cartState}
                        matches={matches}
                        setDarkMode={props.setDarkMode}
                        darkMode={props.darkMode}
                        filterState={props.filterState}
        />
    )

}

export default CartScreen