import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(3)
    },
    selectContainer: {
        display: "flex",
        flexDirection: "column",
        maxHeight: 240,
        maxWidth:"100%",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    titleContainer: {
        padding: 8,
        marginRight: 16,
        marginTop: 8,
        fontWeight: 700,
        fontSize: 16,
        textAlign:"left",
        cursor: "pointer",
        "&:hover": {
            background: "#0f478e",
            color: "white"
        }
    }

}))

const CarPickerComponentView = (props) => {

    const classes = useStyles()

    const carBrands = props.carBrands
    const carModels = props.carModels
    const locationArray = props.locationArray
    const handleBrandSelect = props.handleBrandSelect
    const handleModelSelect = props.handleModelSelect
    const handleClearSelect = props.handleClearSelect

    const renderContent = () => {

        console.log(locationArray)

        if (locationArray[1].length > 0 && !locationArray[2]) {

            if (carModels) {

                return Array.from(Object.keys(carModels[locationArray[1]])).map((model, id) => {

                    const modelT = model[0].toUpperCase() + model.slice(1, model.length)

                    return <div className={classes.titleContainer} key={id} onClick={() => {
                        handleModelSelect(locationArray[1], model)
                    }}>{modelT}</div>

                })

            }

        } else {

            if (locationArray[2]) {

                return <div>Parts</div>

            } else {

                return carBrands.map((brand, id) => {

                    return <div className={classes.titleContainer} key={id} onClick={() => {
                        handleBrandSelect(brand)
                    }}>{brand}</div>

                })

            }

        }

    }

    return (

        <Grid container>

            <Grid item lg={2} xl={2} sm={0} md={0} xs={0}>

            </Grid>

            <Grid item lg={8} xl={8} sm={12} md={12} xs={12}>
                <div className={classes.root}>

                    <div style={{fontSize: 24, fontWeight: "bold", color: "#26293e"}}>Выберите марку
                        автомобиля
                    </div>

                    <div style={{display: "flex", marginTop: 16}}>

                        <div style={{
                            padding: 8,
                            background: "#0f478e",
                            color: "white",
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "#fff",
                            cursor: "pointer",
                            fontSize: 16,
                            fontWeight: 500
                        }}
                             onClick={handleClearSelect}
                        >Марки/модели
                        </div>

                        <div style={{
                            marginLeft: 16,
                            padding: 8,
                            background: "white",
                            color: "black",
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "#808080",
                            cursor: "pointer",
                            fontSize: 16,
                            fontWeight: 500
                        }}>Наименование запчастей
                        </div>

                    </div>

                    <div className={classes.selectContainer}>

                        {renderContent()}

                    </div>

                </div>

            </Grid>

            <Grid item lg={2} xl={2} sm={0} md={0} xs={0}>

            </Grid>

        </Grid>

    )

}

export default CarPickerComponentView