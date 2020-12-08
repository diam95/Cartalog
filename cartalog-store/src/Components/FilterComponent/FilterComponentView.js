import React from 'react'
import {makeStyles, createStyles, useTheme} from '@material-ui/core/styles';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useHistory, useLocation} from 'react-router-dom';
import BrandsAndModels from "./BrandsAndModels";
import {Grid} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import PartNamesComponent from "../PartNamesComponent/PartNamesComponent";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(0)
        }
    },
    root2: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(0),
        }
    },
    tabsContainer: {
        width: "100%",
        [theme.breakpoints.down("md")]: {
            width: `calc(100% - ${theme.spacing(4)}px)`,
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        }
    },
    tabPanelContainer: {
        width: "100%"
    },
    tabPanel: {
        width: "100%",
    },
    crumbContainer: {
        marginTop: theme.spacing(2),
        userSelect: "none"
    },
    crumbText: {
        cursor: "pointer"
    }

}))

const FilterComponentView = (props) => {

    const classes = useStyles()
    const theme = useTheme();

    const history = useHistory();
    const location = useLocation();
    const locationArray = location.pathname.split("/")

    const matches = props.matches
    const filterState = props.filterState

    function TabPanel(props) {

        const {children, value, index, ...other} = props;

        return (
            <div
                className={classes.tabPanelContainer}
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <div className={classes.tabPanel}>{children}</div>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const handleCrumbClick = (id) => {

        switch (id) {

            case 0:
                history.push(`/${locationArray[1]}`)
                break;

            case 1:
                history.push(`/${locationArray[1]}/${locationArray[2]}`)
                break;

            case 2:
                history.push(`/${locationArray[1]}/${locationArray[2]}/${locationArray[3]}`)
                break;

            default:
                history.push("/")
                break;

        }

    }

    const handleChange = (event, newValue) => {
        if (newValue === 0) {
            history.push("/")
        } else {
            history.push("/partsFilter")
        }
    };

    const getVariant = () => {

        if (matches) {
            return "fullWidth"
        }

    }

    const getTab = () => {

        if (location.pathname.split("/")[1] === "partsFilter") {
            return 1
        } else {
            return 0
        }

    }

    const renderCrumbs = () => {

        const locationArray = location.pathname.split("/")

        const getPartName = () => {

            if (filterState.parts_filter_detailed[locationArray[1]]) {

                if (filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]) {

                    return filterState.parts_filter_detailed[locationArray[1]][locationArray[2]][locationArray[3]].toUpperCase()

                } else {

                    return 2

                }

            } else if (locationArray[1] === "partsFilter") {

                if (filterState.all_part_names) {
                    return filterState.all_part_names[locationArray[2]].toUpperCase()
                } else {
                    return <CircularProgress size={18}/>
                }

            } else {
                return <CircularProgress size={18}/>
            }

        }

        switch (locationArray.length) {

            case 2:
                if (locationArray[1].length > 0 && locationArray[1] !== "partsFilter" && locationArray[1] !== "cart") {
                    return (
                        <Breadcrumbs aria-label="breadcrumb" className={classes.crumbContainer}>
                            <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                                handleCrumbClick(0)
                            }}>{locationArray[1].toUpperCase()}</Typography>
                        </Breadcrumbs>
                    )
                } else if (locationArray[1].length > 0 && locationArray[1] === "cart") {
                    return (
                        <Breadcrumbs aria-label="breadcrumb" className={classes.crumbContainer}>
                            <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                                handleCrumbClick(0)
                            }}>Корзина</Typography>
                        </Breadcrumbs>
                    )
                } else if (locationArray[1].length === 0) {
                    return (
                        <Breadcrumbs aria-label="breadcrumb" className={classes.crumbContainer}>
                            <Typography className={classes.crumbText} variant={"h6"}>
                                Выберите марку автомобиля
                            </Typography>
                        </Breadcrumbs>
                    )
                } else if (locationArray[1] === "partsFilter") {
                    return (
                        <Breadcrumbs aria-label="breadcrumb" className={classes.crumbContainer}>
                            <Typography className={classes.crumbText} variant={"h6"}>
                                Выберите запчасть
                            </Typography>
                        </Breadcrumbs>
                    )
                } else {
                    break;
                }

            case 3:

                if (locationArray[1] === "partsFilter") {
                    return (
                        <Breadcrumbs aria-label="breadcrumb" className={classes.crumbContainer}>

                            <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                                handleCrumbClick(0)
                            }}>НАИМЕНОВАНИЯ ЗАПЧАСТЕЙ
                            </Typography>

                            <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                                handleCrumbClick(1)
                            }}>{getPartName()}
                            </Typography>

                        </Breadcrumbs>
                    )
                } else {
                    return (
                        <Breadcrumbs aria-label="breadcrumb" className={classes.crumbContainer}>

                            <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                                handleCrumbClick(0)
                            }}>{locationArray[1].toUpperCase()}
                            </Typography>

                            <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                                handleCrumbClick(1)
                            }}>{locationArray[2].toUpperCase().replace(/-/g, " ")}
                            </Typography>

                        </Breadcrumbs>
                    )
                }


            case 4:

                return (
                    <Breadcrumbs aria-label="breadcrumb" className={classes.crumbContainer}>

                        <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                            handleCrumbClick(0)
                        }}>{locationArray[1].toUpperCase()}
                        </Typography>

                        <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                            handleCrumbClick(1)
                        }}>{locationArray[2].toUpperCase().replace(/-/g, " ")}
                        </Typography>

                        <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                            handleCrumbClick(2)
                        }}>{getPartName()}
                        </Typography>

                    </Breadcrumbs>
                )

            case 5:

                return (
                    <Breadcrumbs aria-label="breadcrumb" className={classes.crumbContainer}>

                        <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                            handleCrumbClick(0)
                        }}>{locationArray[1].toUpperCase()}
                        </Typography>

                        <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                            handleCrumbClick(1)
                        }}>{locationArray[2].toUpperCase().replace(/-/g, " ")}
                        </Typography>

                        <Typography className={classes.crumbText} variant={"h6"} onClick={() => {
                            handleCrumbClick(2)
                        }}>{getPartName()}
                        </Typography>

                    </Breadcrumbs>
                )

        }

    }

    const getRootStyle = () => {

        if (locationArray.length >= 3) {
            return classes.root2
        } else {
            return classes.root
        }
    }

    return (
        <div className={getRootStyle()}>

            <Grid container spacing={0}>

                <Grid item xl={2} lg={2} md={false} sm={false} xs={false}/>

                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>

                    <div className={classes.tabsContainer}>

                        <Tabs
                            value={getTab()}
                            variant={getVariant()}
                            onChange={handleChange}
                            indicatorColor={"primary"}
                            aria-label="full width tabs example"
                        >
                            <Tab label="Марки | модели" {...a11yProps(0)} wrapped={matches}/>
                            <Tab label="Названия запчастей" {...a11yProps(1)} wrapped={matches}/>
                        </Tabs>

                        <TabPanel value={getTab()} index={0} dir={theme.direction}>
                            {renderCrumbs()}
                            {locationArray[1] !== "cart" && locationArray[1] !== "partsFilter"
                                ? <BrandsAndModels filterState={filterState}
                                                   matches={matches}
                                />
                                : <></>
                            }

                        </TabPanel>
                        <TabPanel value={getTab()} index={1} dir={theme.direction}>
                            {renderCrumbs()}
                        </TabPanel>

                    </div>

                </Grid>

                <Grid item xl={2} lg={2} md={false} sm={false} xs={false}/>

            </Grid>

        </div>
    )

}

export default FilterComponentView