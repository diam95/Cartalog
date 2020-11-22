import React, {useEffect} from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {useHistory} from "react-router-dom";
import {Typography} from "@material-ui/core";
import ButtonComponent from "./ButtonComponent";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from "@material-ui/core/styles";
import PartNamesComponent from "../PartNamesComponent/PartNamesComponent";

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
        marginTop: theme.spacing(0),
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    selectContainer: {
        width: "100vw"
    },
    brandsContainer: {
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "flex-start",
        [theme.breakpoints.down("md")]: {
            marginTop: 0
        }
    },
    titleContainer: {
        display: "inline-block",
        marginTop: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing(1)
        }
    },
    title: {
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
            marginLeft: theme.spacing(1)
        }
    },
    crumbsContainer2: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: 0,
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing(2),
            marginTop: theme.spacing(2)
        }
    },
    tabRoot: {
        padding: 0
    },
    tabsHeaderContainer: {
        [theme.breakpoints.down("md")]:{
            width: "100%",
            display: 'flex',
            flexDirection: "column",
            alignItems: "center"
        }
    }

}))

const FilterComponentView = (props) => {

    console.log("FilterComponentView")

    const matches = props.matches

    const classes = useStyles()
    const theme = useTheme();

    const carBrands = Object.values(props.filterState.brands)
    const locationArray = props.locationArray
    const handleBrandSelect = props.handleBrandSelect
    const handleShowPartsFilter = props.handleShowPartsFilter
    const handleClearSelect = props.handleClearSelect
    const handleModelSelect = props.handleModelSelect

    const [value, setValue] = React.useState(0);

    useEffect(() => {

        if (locationArray[1] === "partsFilter") {
            setValue(1)
        } else {
            setValue(0)
        }

    }, [locationArray])

    const handleChange = (event, newValue) => {
        if (newValue === 1) {
            handleShowPartsFilter()
        } else {
            handleClearSelect()
        }
        setValue(newValue)
    }

    const handleChangeIndex = (index) => {
        if (index === 1) {
            handleShowPartsFilter()
        } else {
            handleClearSelect()
        }
        setValue(index)
    }

    const history = useHistory()

    const getHeight = () => {

        if (locationArray[3]) {
            return {height: 0}
        } else return {height: props._height}

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
                            Выберите марку автомобиля
                        </Typography>
                    </Breadcrumbs>
                )

            }

        } else {

            return (
                <Breadcrumbs aria-label="breadcrumb"
                             className={classes.crumbsContainer2}>
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

    const getRootStyle = () => {

        if (matches) {
            return classes.root2
        } else {
            return classes.root
        }

    }

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const renderModelsTab = () => {

        const result = () => {

            if (locationArray[1].length === 0) {
                return carBrands.map(brand => {

                    return <div className={classes.titleContainer} key={brand} onClick={() => {
                        handleBrandSelect(brand)
                    }}>
                        <ButtonComponent text={brand.toUpperCase()}/>
                    </div>

                })
            } else {

                if (locationArray[1] === "partsFilter") {

                } else {

                    if (locationArray[2]) {

                        return (
                            <div className={classes.selectContainer}>
                                <PartNamesComponent matches={props.matches}
                                                    filterState={props.filterState}
                                />
                            </div>
                        )
                    } else {

                        if (props.filterState.models[locationArray[1]]) {

                            return Object.values(props.filterState.models[locationArray[1]]).map(model => {

                                return <div className={classes.titleContainer} key={model} onClick={() => {
                                    handleModelSelect(locationArray[1], model)
                                }}>
                                    <ButtonComponent text={model.toUpperCase()}/>
                                </div>

                            })

                        }

                    }

                }

            }

        }

        if (props.matches) {
            return (
                <div className={classes.selectContainer}>
                    {renderCrumbs()}
                    <div className={classes.brandsContainer} style={getHeight()}>{result()}</div>
                </div>
            )
        } else {
            return (
                <div>
                    {renderCrumbs()}
                    <div className={classes.brandsContainer} style={getHeight()}>{result()}</div>
                </div>
            )
        }

    }

    const renderPartsTab = () => {

        if (props.matches) {
            return (
                <div className={classes.selectContainer}>
                    <Breadcrumbs aria-label="breadcrumb"
                                 className={classes.crumbsContainer}>
                        <Typography variant={getCrumbVariant()} className={classes.chooseBrand}>
                            Выберите запчасть по названию
                        </Typography>
                    </Breadcrumbs>

                </div>
            )
        } else {
            return (
                <div>
                    <Breadcrumbs aria-label="breadcrumb"
                                 className={classes.crumbsContainer}>
                        <Typography variant={getCrumbVariant()} className={classes.chooseBrand}>
                            Выберите запчасть по названию
                        </Typography>
                    </Breadcrumbs>

                </div>
            )
        }


    }

    return (

        <Grid container spacing={0}>

            <Grid item lg={2} xl={2} sm={false} md={false} xs={false}>

            </Grid>

            <Grid item lg={8} xl={8} sm={12} md={12} xs={12}>

                <div className={getRootStyle()}>

                    <div className={classes.tabsHeaderContainer}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Марки / модели" {...a11yProps(0)}/>
                            <Tab label="Названия запчастей" {...a11yProps(1)}/>
                        </Tabs>

                    </div>

                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >

                        <TabPanel value={value} index={0} classes={{root: classes.tabRoot}}>

                                {renderModelsTab()}

                        </TabPanel>

                        <TabPanel value={value} index={1}>

                            {renderPartsTab()}

                        </TabPanel>

                    </SwipeableViews>
                </div>

            </Grid>

            <Grid item lg={2} xl={2} sm={false} md={false} xs={false}> </Grid>

        </Grid>

    )

}

export default FilterComponentView