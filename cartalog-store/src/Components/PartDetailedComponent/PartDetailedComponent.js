import React, {useEffect, useState} from 'react'
import PartDetailedComponentView from "./PartDetailedComponentView";
import {useLocation} from "react-router-dom"
import firebase from "firebase/app";
import "firebase/database";
import {useSnackbar} from "notistack"
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => createStyles({

    progress: {
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing(2)
        }
    }

}))

const PartDetailedComponent = (props) => {

    const location = useLocation()

    const classes = useStyles()

    const partsState = props.partsState
    const setPartsState = props.setPartsState
    const setCartState = props.setCartState
    const cartState = props.cartState

    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const [part, setPart] = useState(undefined);
    const history = useHistory()

    const handleAddToCart = () => {

        const temp = {...cartState}

        const isDuplicate = temp.items.filter(item => {
            return part.title === item.title
        }).length > 0

        if (!isDuplicate) {

            temp.items.push(part)
            setCartState(temp)

            const handleRemove = () => {

                const ind = cartState.items.indexOf(part)
                const temp = {...cartState}
                temp.items.splice(ind, 1)
                setCartState(temp)
                closeSnackbar()

            }

            enqueueSnackbar('Товар добавлен в корзину', {
                variant: "success",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                preventDuplicate: true,
                action: <Button style={{color: "White"}} onClick={() => {
                    handleRemove()
                }}>
                    Отменить
                </Button>
            })

        } else {

            enqueueSnackbar('Вы уже добавили этот товар', {
                variant: "warning",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                preventDuplicate: true,
                action: <Button style={{color: "White"}} onClick={() => {
                    closeSnackbar()
                }}>
                    Ок
                </Button>
            })

        }

    }

    useEffect(() => {

        setPart(undefined)

    }, [location])

    useEffect(() => {

        if (location.pathname.split("/").length === 5) {

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
            {location.pathname.split("/").length === 5
                ? <>
                    {part ? <PartDetailedComponentView handleAddToCart={handleAddToCart}
                                                       part={part}
                                                       matches={props.matches}
                    /> : <CircularProgress className={classes.progress}/>}
                </>
                : <></>
            }

        </div>
    )

}

export default PartDetailedComponent