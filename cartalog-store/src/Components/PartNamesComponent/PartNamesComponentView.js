import React, {useEffect, useState} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {useHistory} from "react-router-dom";
import {Grid} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => createStyles({

    root: {},
    partTitlesContainer: {
        columns: "4 auto",
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            columns: "1 auto",
            marginTop: theme.spacing(1)
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
    gridContent:{
        width:"100%",
    }

}))


const PartNamesComponentView = (props) => {

    const filterState = props.filterState
    const locationArray = props.locationArray
    const matches = props.matches

    const history = useHistory()

    const [partNamesArray, setPartNamesArray] = useState([]);
    const classes = useStyles()

    useEffect(() => {

        if (locationArray.length === 3) {

            const brand = locationArray[1]
            const model = locationArray[2]

            if (filterState.parts_filter_detailed[brand]) {

                if (filterState.parts_filter_detailed[brand][model]) {

                    setPartNamesArray(filterState.parts_filter_detailed[brand][model])

                }

            }

        }

        return (() => {
            setPartNamesArray([])
        })

    }, [locationArray, filterState.parts_filter_detailed])

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

            const partHrefs = partNamesArray.map(part => {
                return Object.keys(part)[0]
            })
            const partNames = partNamesArray.map(part => {
                return Object.values(part)[0]
            })

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

                return partNames.sort().map((part_name) => {

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

            return lettersArraySorted.map(letter => {

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

        } else {
            return <CircularProgress className={classes.progress}/>
        }

    }

    return (
        <div className={classes.root}>

            <Grid container spacing={0}>

                <Grid item xl={2} lg={2} md={false} sm={false} xs={false}/>

                <Grid item xl={8} lg={8} md={12} sm={12} xs={12} className={classes.gridContent}>

                        <div className={classes.partTitlesContainer}>
                            {locationArray.length === 3
                                ? renderContent()
                                : <div/>
                            }
                        </div>

                </Grid>

                <Grid item xl={2} lg={2} md={false} sm={false} xs={false}/>

            </Grid>

        </div>
    )

}

export default PartNamesComponentView