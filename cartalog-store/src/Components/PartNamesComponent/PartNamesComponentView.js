import React, {useEffect, useState} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {useHistory} from "react-router-dom";
import {Grid, TextField} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%"
    },
    partTitlesContainer: {
        columns: "4 auto",
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            columns: "1 auto",
            marginTop: theme.spacing(0)
        },
        columnFill: "auto"
    },
    partLinkContainer: {},
    partLink: {
        justifyContent: "flex-start",
        textAlign: "left"
    },
    container: {
        display: "inline-block",
        width: "100%"
    },
    contentContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    letterPartsContainer: {
        marginBottom: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        [theme.breakpoints.down("md")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    avatar: {
        background: "#485ab8",
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing(0)
        }
    },
    progress: {
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing(2)
        }
    },
    gridContent: {
        width: "100%",
    },
    autocomplete: {
        width: "100%",
        [theme.breakpoints.down("md")]: {
            width: `calc(100% - ${theme.spacing(4)}px)`,
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            marginTop: theme.spacing(1)
        }
    }

}))


const PartNamesComponentView = (props) => {

    const filterState = props.filterState
    const locationArray = props.locationArray
    const matches = props.matches

    const history = useHistory()

    const [partNamesArray, setPartNamesArray] = useState([]);
    const classes = useStyles()

    const partsNameArrayLol = Object.values(partNamesArray)
    const partsNameHrefs = Object.keys(partNamesArray)

    useEffect(() => {

        if (locationArray.length === 3) {

            const brand = locationArray[1]
            const model = locationArray[2]

            if (filterState.parts_filter_detailed[brand]) {

                if (filterState.parts_filter_detailed[brand][model]) {

                    setPartNamesArray(filterState.parts_filter_detailed[brand][model])

                }

            }

        } else if (locationArray[1] === "partsFilter") {

            if (filterState.all_part_names) {

                setPartNamesArray(filterState.all_part_names)

            }

        } else if (locationArray.length === 6 &&
            locationArray[1] !== "allBrands" &&
            locationArray[2] !== "allModels" &&
            locationArray[3] === "allParts") {

            if (filterState.parts_filter_detailed[locationArray[1]]) {
                if (filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]) {
                    setPartNamesArray(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]])
                }
            }

        }

        return (() => {
            setPartNamesArray([])
        })

    }, [locationArray, filterState.parts_filter_detailed, filterState.all_part_names])

    const renderContent = () => {

        if (partNamesArray.length !== 0) {

            const getHref = (href) => {

                const brand = locationArray[1]
                const model = locationArray[2]

                if (model) {

                    return "/" + brand + "/" + model + "/" + href

                } else {

                    return "/" + brand + "/" + href

                }

            }

            const res = {}

            const lettersArray = []

            const partHrefs = Object.keys(partNamesArray)
            const partNames = Object.values(partNamesArray)

            partNames.forEach((part_name, ind) => {

                lettersArray.push([part_name[0]].toString())

                if (res[part_name[0]]) {

                    if (res[part_name[0]][partHrefs[ind]]) {

                        res[part_name[0]][partHrefs[ind]] = part_name

                    } else {

                        res[part_name[0]][partHrefs[ind]] = part_name

                    }
                } else {

                    res[part_name[0]] = {}
                    res[part_name[0]][partHrefs[ind]] = part_name

                }

            })

            const renderPartNames = (letter) => {

                const partNames1 = Object.values(res[letter])
                const partNames = Object.values(res[letter])
                const partHrefs = Object.keys(res[letter])

                const getSize = () => {

                    return (matches ? "small" : "small")

                }

                return partNames.map((part_name) => {

                    const idx = partNames1.indexOf(part_name)
                    return (
                        <div className={classes.partLinkContainer} key={part_name}>
                            <Button classes={{root: classes.partLink}} size={getSize()} key={part_name}
                                    onClick={() => {
                                        history.push(getHref(partHrefs[idx]))
                                    }}>{part_name}</Button>
                        </div>
                    )

                })

            }

            const lettersArraySorted = Array.from(new Set(lettersArray)).sort()

            const result = lettersArraySorted.map(letter => {

                return (
                    <div className={classes.container} key={letter}>
                        <div className={classes.letterPartsContainer} key={letter}>
                            <Avatar className={classes.avatar}>{letter.toString()}</Avatar>
                            <div style={{height: 8}}/>
                            {renderPartNames(letter)}
                        </div>
                    </div>
                )

            })

            return (
                <div className={classes.contentContainer}>

                    <Autocomplete
                        id="combo-box-demo"
                        options={partsNameArrayLol}
                        getOptionLabel={(option) => option}
                        blurOnSelect
                        onChange={handleChange}
                        loading={partsNameArrayLol.length === 0}
                        className={classes.autocomplete}
                        renderInput={(params) => <TextField margin={"dense"} {...params}
                                                            label="Поиск по названию запчасти" variant="outlined"/>}
                    />

                    <div className={classes.partTitlesContainer}>
                        {result}
                    </div>

                </div>
            )

        } else if (locationArray[1] === "partsFilter" && locationArray.length === 2) {
            return <CircularProgress className={classes.progress}/>
        } else if (locationArray[1] !== "partsFilter" && locationArray.length === 3) {
            return <CircularProgress className={classes.progress}/>
        }

    }

    const renderCase = () => {

        if (locationArray.length === 6) {

            if (locationArray[1] !== "allBrands") {

                if (locationArray[2] !== "allModels") {

                    if (locationArray[3] === "allParts") {
                        return true
                    }

                }

            }

        } else if (locationArray.length === 2 && locationArray[1] === "partsFilter") {
            return true
        } else if (locationArray.length === 3 && locationArray[1] !== "partsFilter") {
            return true
        }

    }

    const handleChange = (event, value) => {

        history.push(`/partsFilter/${partsNameHrefs[partsNameArrayLol.indexOf(value)]}`)

    }

    return (
        <div className={classes.root}>

            <Grid container spacing={0}>

                <Grid item xl={3} lg={3} md={false} sm={false} xs={false}/>

                <Grid item xl={6} lg={6} md={12} sm={12} xs={12} className={classes.gridContent}>

                    <div>
                        {renderCase()
                            ? renderContent()
                            : <div/>
                        }
                    </div>

                </Grid>

                <Grid item xl={3} lg={3} md={false} sm={false} xs={false}/>

            </Grid>

        </div>
    )

}

export default PartNamesComponentView