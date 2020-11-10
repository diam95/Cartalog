import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    brandsContainer: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexFlow: "column wrap"
    },
    partTitlesContainer: {
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: 2000
    },
    selectContainer: {
        marginTop: theme.spacing(1)
    },
    titleContainer: {
        margin:theme.spacing(1)
    },
    title: {
        display: "inline-block",
        cursor: "pointer",
        "&:hover": {
            background: "#0f478e",
            color: "white"
        },
        padding: 10,
        lineHeight: 1
    },
    chooseBrand: {
        marginTop: theme.spacing(3),
        fontSize: 24,
        fontWeight: "bold",
        color: "#26293e"
    },
    partNamesBtn: {
        marginLeft: 16,
        padding: 8,
        background: "white",
        color: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#808080",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 500,
        "&:hover": {
            background: "#5555b3",
            color: `white`
        }
    }

}))

const FilterComponentView = (props) => {

    const classes = useStyles()

    const carBrands = props.filterState.brands
    const carModels = props.filterState.models
    const locationArray = props.locationArray
    const handleBrandSelect = props.handleBrandSelect
    const handleModelSelect = props.handleModelSelect
    const handleClearSelect = props.handleClearSelect
    const handleShowPartsFilter = props.handleShowPartsFilter

    const history = useHistory()

    const getHeight = () => {

        return {height:props._height}

    }

    const renderContent = () => {

        if (locationArray[1].length > 0 && !locationArray[2]) {

            if (locationArray[1] === "partsFilter") {

            } else {

                if (carModels[locationArray[1]]) {

                    const content = Array.from(Object.values(carModels[locationArray[1]])).map((model, id) => {

                        return (
                            <div className={classes.titleContainer} key={id} onClick={() => {
                                handleModelSelect(locationArray[1], model)
                            }}>
                                <Typography variant={"h6"} className={classes.title}>{model.toUpperCase()}</Typography>
                            </div>
                        )

                    })

                    return <div className={classes.brandsContainer} style={getHeight()}>{content}</div>

                }

            }

        } else {

            if (!locationArray[2]) {

                const result = carBrands.map((brand, id) => {

                    return <div className={classes.titleContainer} key={id} onClick={() => {
                        handleBrandSelect(brand)
                    }}>
                        <Typography variant={"h6"} className={classes.title}>{brand.toUpperCase()}</Typography>
                    </div>

                })

                return <div className={classes.brandsContainer} style={getHeight()}>{result}</div>

            }

        }

    }

    const renderCrumbs = () => {

        if(locationArray[1].length>0 && locationArray[1]!=="partsFilter"){

            const brand = locationArray[1]
            const model = locationArray[2]

            if(locationArray[2]){

                return (
                    <Breadcrumbs aria-label="breadcrumb" className={classes.chooseBrand}>
                        <div onClick={()=>{history.push(`/${brand}`)}}>
                            {brand[0].toUpperCase() + brand.substring(1)}
                        </div>
                        <div onClick={()=>{history.push(`/${brand}/${model}`)}}>
                            {model[0].toUpperCase() + model.substring(1).replace("-"," ")}
                        </div>
                    </Breadcrumbs>
                )

            } else {

                return (
                    <Breadcrumbs aria-label="breadcrumb" className={classes.chooseBrand}>
                        <Link color="inherit" href={`/${brand}`}>
                            {brand[0].toUpperCase() + brand.substring(1)}
                        </Link>
                    </Breadcrumbs>
                )

            }

        } else {

            return (
                <Breadcrumbs aria-label="breadcrumb">
                    <div className={classes.chooseBrand}>
                        Выберите марку автомобиля
                    </div>
                </Breadcrumbs>
            )

        }
    }

    return (

        <Grid container spacing={0}>

            <Grid item lg={2} xl={2} sm={0} md={0} xs={0}>

            </Grid>

            <Grid item lg={8} xl={8} sm={12} md={12} xs={12}>

                <div className={classes.root}>

                    {renderCrumbs()}

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

                        <div className={classes.partNamesBtn}
                             onClick={handleShowPartsFilter}
                        >Наименование запчастей
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

export default FilterComponentView