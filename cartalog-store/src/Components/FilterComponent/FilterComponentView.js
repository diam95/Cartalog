import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {useHistory} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import ButtonComponent from "./ButtonComponent";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "80%",
        marginTop: theme.spacing(2),
        marginLeft: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    root2: {
        width: "100%",
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    selectContainer: {
    },
    brandsContainer: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexFlow: "column wrap",
        justifyContent:"flex-start",
        [theme.breakpoints.down("md")]: {
            marginLeft: 0,
            marginTop: 0,
            paddingLeft:theme.spacing(1),
            paddingRight:theme.spacing(1)
        },
        overflowX: "hidden"
    },
    titleContainer: {
        marginTop: theme.spacing(1)
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
    allBrands: {
        color: "grey",
        cursor: "pointer",
        marginLeft: theme.spacing(1)
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
    },
    crumbItem: {
        cursor: "pointer"
    },
    buttonGroup: {
        display: "flex",
        marginTop: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            marginLeft: 8
        }
    },
    crumbsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: 0,
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            marginLeft: 8
        }
    },
    crumbsContainer2: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: 0,
        [theme.breakpoints.down("md")]: {
            marginLeft: 8
        }
    }

}))

const FilterComponentView = (props) => {

    console.log("FilterComponentView")

    const matches = props.matches

    const classes = useStyles()

    const carBrands = Object.values(props.filterState.brands)
    const carModels = props.filterState.models
    const locationArray = props.locationArray
    const handleBrandSelect = props.handleBrandSelect
    const handleModelSelect = props.handleModelSelect
    const handleClearSelect = props.handleClearSelect
    const handleShowPartsFilter = props.handleShowPartsFilter

    const history = useHistory()

    console.log(props._height)

    const getHeight = () => {

        return {height: props._height}

    }

    const renderContent = () => {

        if (locationArray[1].length > 0 && !locationArray[2]) {

            if (locationArray[1] === "partsFilter") {

            } else {

                if (carModels[locationArray[1]]) {

                    const content = Object.values(carModels[locationArray[1]]).map(model => {

                        return <div className={classes.titleContainer} key={model} onClick={() => {
                            handleModelSelect(locationArray[1], model)
                        }}>
                            <ButtonComponent text={model.toUpperCase()}/>
                        </div>

                    })

                    return (
                        <div className={classes.brandsContainer} style={getHeight()}>
                            {content}
                        </div>
                    )

                }

            }

        } else {

            if (!locationArray[2]) {

                const result = carBrands.map(brand => {

                    return <div className={classes.titleContainer} key={brand} onClick={() => {
                        handleBrandSelect(brand)
                    }}>
                        <ButtonComponent text={brand.toUpperCase()}/>
                    </div>

                })

                return <div className={classes.brandsContainer} style={getHeight()}>{result}</div>

            }

        }

    }

    const renderCrumbs = () => {

        if (locationArray[1].length > 0 && locationArray[1] !== "partsFilter") {

            const brand = locationArray[1]
            const model = locationArray[2]
            const partType = locationArray[3]

            if (locationArray[2] && !locationArray[3]) {

                return (
                    <Breadcrumbs aria-label="breadcrumb"
                                 className={classes.crumbsContainer2}>
                        <Typography variant={getCrumbVariant()} className={classes.crumbItem} onClick={() => {
                            history.push(`/${brand}`)
                        }}>
                            {brand[0].toUpperCase() + brand.substring(1)}
                        </Typography>
                        <Typography variant={getCrumbVariant()} className={classes.crumbItem} onClick={() => {
                            history.push(`/${brand}/${model}`)
                        }}>
                            {model.toUpperCase().replace("-", " ")}
                        </Typography>
                    </Breadcrumbs>
                )

            } else if (!locationArray[2]) {

                return (
                    <Breadcrumbs aria-label="breadcrumb"
                                 className={classes.crumbsContainer2}>
                        <Typography variant={getCrumbVariant()} className={classes.crumbItem} onClick={() => {
                            history.push(`/${brand}`)
                        }}>
                            {brand[0].toUpperCase() + brand.substring(1)}
                        </Typography>
                    </Breadcrumbs>
                )

            } else if (locationArray[3]) {

                return (
                    <Breadcrumbs aria-label="breadcrumb"
                                 className={classes.crumbsContainer2}>
                        <Typography variant={getCrumbVariant()} className={classes.crumbItem} onClick={() => {
                            history.push(`/${brand}`)
                        }}>
                            {brand[0].toUpperCase() + brand.substring(1)}
                        </Typography>
                        <Typography variant={getCrumbVariant()} className={classes.crumbItem} onClick={() => {
                            history.push(`/${brand}/${model}`)
                        }}>
                            {model.toUpperCase().replace("-", " ")}
                        </Typography>
                        <Typography variant={getCrumbVariant()} className={classes.crumbItem} onClick={() => {
                            history.push(`/${brand}/${model}/${partType}`)
                        }}>
                            {props.filterState.parts_filter[partType]}
                        </Typography>
                    </Breadcrumbs>
                )

            }

        } else if (locationArray[1] === "partsFilter") {

            if (locationArray[2]) {

                return (
                    <Breadcrumbs aria-label="breadcrumb"
                                 className={classes.crumbsContainer2}>
                        <Typography variant={getCrumbVariant()} className={classes.chooseBrand}>
                            {props.filterState.parts_filter[locationArray[2]]}
                        </Typography>
                    </Breadcrumbs>
                )

            } else {

                return (
                    <Breadcrumbs aria-label="breadcrumb"
                                 className={classes.crumbsContainer2}>
                        <Typography variant={getCrumbVariant()} className={classes.chooseBrand}>
                            Выберите наименование запчасти
                        </Typography>
                    </Breadcrumbs>
                )

            }

        } else {

            return (
                <Breadcrumbs aria-label="breadcrumb"
                             className={classes.crumbsContainer}>
                    <Typography variant={getCrumbVariant()} className={classes.chooseBrand}>
                        Выберите марку автомобиля
                    </Typography>
                </Breadcrumbs>
            )

        }

    }

    const getCrumbVariant = () => {

        if (matches) {
            return "h5"
        } else {
            return "h4"
        }


    }

    const getButtonVariant = (id) => {

        switch (id) {

            case 0:
                if (locationArray[1] === "partsFilter") {
                    return ""
                } else {
                    return "contained"
                }

            case 1:
                if (locationArray[1] === "partsFilter") {
                    return "contained"
                } else {
                    return ""
                }

            default:
                if (locationArray[1] === "partsFilter") {
                    return ""
                } else {
                    return "contained"
                }

        }


    }

    const renderButtonGroup = () => {

        if (matches) {
            return <ButtonGroup size={"small"} color="primary" aria-label="outlined primary button group">
                <Button variant={getButtonVariant(0)} onClick={handleClearSelect}>Марки модели</Button>
                <Button variant={getButtonVariant(1)} onClick={handleShowPartsFilter}>Наименование запчастей</Button>
            </ButtonGroup>
        } else {
            return <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button variant={getButtonVariant(0)} onClick={handleClearSelect}>Марки | модели</Button>
                <Button variant={getButtonVariant(1)} onClick={handleShowPartsFilter}>Наименование
                    запчастей</Button>
            </ButtonGroup>
        }


    }

    const getRootStyle = () => {

        if (matches) {
            return classes.root2
        } else {
            return classes.root
        }

    }

    return (

        <Grid container spacing={0}>

            <Grid item lg={2} xl={2} sm={false} md={false} xs={false}>

            </Grid>

            <Grid item lg={8} xl={8} sm={12} md={12} xs={12}>

                <div className={getRootStyle()}>

                    <div className={classes.buttonGroup}>

                        {renderButtonGroup()}

                    </div>

                    {locationArray[1].length > 0
                        ? <div className={classes.crumbsContainer}
                               onClick={() => {
                                   history.push("/")
                               }}
                        >
                            <KeyboardBackspaceIcon style={{color: "grey"}}/>
                            <Typography
                                variant={"subtitle1"} className={classes.allBrands}>Все
                                марки</Typography>
                        </div>
                        : ""
                    }
                    {renderCrumbs()}

                    <div className={classes.selectContainer}>

                        {renderContent()}

                    </div>

                </div>

            </Grid>

            <Grid item lg={2} xl={2} sm={false} md={false} xs={false}> </Grid>

        </Grid>

    )

}

export default FilterComponentView