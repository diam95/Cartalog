import React from 'react'
import CartComponentView from "./CartComponentView";
import {useLocation} from "react-router-dom";

const CartComponent = (props) => {

    const locationArray = useLocation().pathname.split("/")

    const cartState = props.cartState
    const setCartState = props.setCartState

    return (
        <>
            {locationArray[1] === "cart"
                ? <CartComponentView cartState={cartState}
                                     setCartState={setCartState}
                />
                : <></>
            }
        </>
    )

}

export default CartComponent