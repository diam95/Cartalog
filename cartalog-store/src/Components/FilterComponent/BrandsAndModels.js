import React from "react"
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useHistory, useLocation} from "react-router-dom"
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        overflow: "hidden"
    },
    buttonsContainer: {
        columns: "6 auto",
        [theme.breakpoints.down("md")]: {
            columns: "2 auto"
        }
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "left"
    }

}))

const BrandsAndModels = (props) => {

    const classes = useStyles()

    const history = useHistory()
    const location = useLocation()
    const locationArray = location.pathname.split("/")

    const filterState = props.filterState

    const renderContent = () => {

        if (locationArray[1].length === 0 && locationArray[1] !== "partsFilter" && locationArray.length === 2) {

            if (filterState.all_brands.length > 0) {

                return (
                    <div className={classes.buttonsContainer}>
                        {filterState.all_brands.sort().map(brand => {

                            return <Button key={brand} size={"large"} className={classes.button} onClick={() => {
                                history.push(`/${brand}`)
                            }}>{brand}</Button>

                        })}
                    </div>
                )

            } else {

            }

        } else if (locationArray.length === 2 && locationArray[1].length > 0 && locationArray[1] !== "partsFilter") {

            if (filterState.all_models[locationArray[1]]) {

                return (
                    <div className={classes.buttonsContainer}>
                        {filterState.all_models[locationArray[1]].sort().map(model => {

                            return <Button key={model} size={"large"} className={classes.button} onClick={() => {
                                history.push(`/${locationArray[1].replace(/ /g, "-")}/${model.replace(/ /g, "-")}`)
                            }}>{model}</Button>

                        })}
                    </div>
                )

            } else if (locationArray[1] !== "cart") {
                return (
                    <CircularProgress/>
                )
            }

        }

    }

    const renderProgress = () => {

        if (locationArray.length === 2) {

            if (locationArray[1].length === 0) {

                if (filterState.all_brands.length > 0) {

                } else {

                    return <CircularProgress size={36}/>

                }

            }

        }

    }

    return (
        <div className={classes.root}>

            {renderContent()}

            {renderProgress()}

        </div>
    )

}

export default BrandsAndModels