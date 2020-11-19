import React, {useEffect, useState} from 'react'
import PartDetailedComponentView from "./PartDetailedComponentView";
import {useLocation} from "react-router-dom"
import firebase from "firebase/app";
import "firebase/database";
import {useSnackbar} from "notistack"
import Button from "@material-ui/core/Button";

const PartDetailedComponent = (props) => {

    const location = useLocation()

    const partsState = props.partsState
    const setPartsState = props.setPartsState
    const setCartState = props.setCartState
    const cartState = props.cartState

    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const [part, setPart] = useState(undefined);

    const handleAddToCart = () => {

        const temp = {...cartState}
        temp.items.push(part)
        setCartState(temp)

        enqueueSnackbar('Товар добавлен в корзину', {
            variant: "success",
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },
            preventDuplicate: true,
            action: <Button style={{color:"White"}} onClick={() => closeSnackbar()}>
                Отменить
            </Button>
        })

    }

    useEffect(() => {

        setPart(undefined)

    }, [location])

    useEffect(() => {

        if (location.pathname.split("/").length === 6) {

            console.log(location.pathname)
            const brand = location.pathname.split("/")[1]
            const model = location.pathname.split("/")[2]
            const partType = location.pathname.split("/")[3]
            const partHref = location.pathname.split("/")[4]

            const loadPart = () => {

                const partRef = firebase.database().ref("all_parts").child(brand).child(model).child(partType).child(partHref)
                partRef.once("value").then(r => {

                    if (r.exists()) {

                        const temp = {...partsState}

                        if (temp[brand]) {

                            if (temp[brand][model]) {

                                if (temp[brand][model][partType]) {

                                    temp[brand][model][partType][partHref] = r.val()
                                    setPartsState(temp)

                                } else {

                                    temp[brand][model][partType] = {}
                                    temp[brand][model][partType][partHref] = r.val()
                                    setPartsState(temp)

                                }

                            } else {

                                temp[brand][model] = {}
                                temp[brand][model][partType] = {}
                                temp[brand][model][partType][partHref] = r.val()
                                setPartsState(temp)

                            }

                        } else {

                            temp[brand] = {}
                            temp[brand][model] = {}
                            temp[brand][model][partType] = {}
                            temp[brand][model][partType][partHref] = r.val()
                            setPartsState(temp)

                        }
                    }

                })

            }

            if (partsState[brand]) {

                if (partsState[brand][model]) {

                    if (partsState[brand][model][partType]) {

                        if (partsState[brand][model][partType][partHref]) {

                            setPart(partsState[brand][model][partType][partHref])

                        } else {
                            loadPart()
                        }

                    } else {
                        loadPart()
                    }

                } else {
                    loadPart()
                }

            } else {
                loadPart()
            }


        }

    }, [location, partsState, setPartsState])

    return (
        <div style={{width: "100%"}}>
            {part ? <PartDetailedComponentView handleAddToCart={handleAddToCart}
                                               part={part}
                                               matches={props.matches}
            /> : <div/>}
        </div>
    )

}

export default PartDetailedComponent