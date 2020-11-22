import React, {useEffect, useState} from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom"
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        height: "100%"
    },
    partTitlesContainer: {
        marginTop: theme.spacing(2),
        width: "80%",
        marginLeft: "10%",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    partTitlesContainer2: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    partLinkContainer: {},
    partLink: {
        justifyContent: "flex-start"
    },
    letterContainer: {
        background: "#d4d4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: 18,
        fontSize: 18,
        fontWeight: 700,
        color: "#292938",
    },
    letterPartsContainer: {
        marginBottom: theme.spacing(3),
        display: "flex",
        flexFlow: "column wrap"
    },
    searchContainer: {
        width: "90%",
        marginLeft: "5%"
    }

}))

const PartNamesComponentView = (props) => {

    const matches = props.matches

    const parts_filter = props.parts_filter

    const classes = useStyles()

    const location = useLocation()
    const history = useHistory()
    const [_height, setHeight] = useState(0)

    const getHref = (href) => {

        const brand = location.pathname.split('/')[1]
        const model = location.pathname.split('/')[2]

        if (model) {

            return "/" + brand + "/" + model + "/" + href

        } else {

            return "/" + brand + "/" + href

        }

    }

    const renderPartNames = () => {

        if (Object.keys(parts_filter).length !== 0) {

            const res = {}

            const lettersArray = []

            const partHrefs = Object.keys(parts_filter)
            const partNames = Object.values(parts_filter)

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

                return partNames.sort().map((part_name) => {

                    const idx = partNames1.indexOf(part_name)
                    return (
                        <div className={classes.partLinkContainer} key={part_name}>
                            <Button classes={{root: classes.partLink}} size={"small"} key={part_name} onClick={() => {
                                history.push(getHref(partHrefs[idx]))
                            }}>{part_name}</Button>
                        </div>
                    )

                })

            }

            const lettersArraySorted = Array.from(new Set(lettersArray)).sort()

            if (matches) {
                const height = lettersArraySorted.length * 72 + partNames.length * 31
                if (height !== _height) {
                    setHeight(height)
                }
            } else {
                const height = lettersArraySorted.length * 36 + partNames.length * 10
                if (height !== _height) {
                    setHeight(height)
                }
            }

            return lettersArraySorted.map(letter => {

                return (
                    <div className={classes.letterPartsContainer} key={letter}>
                        <Avatar style={{background: "#485ab8"}}>{letter.toString()}</Avatar>
                        <div style={{height: 8}}/>
                        {renderPartNames(letter)}
                    </div>
                )

            })

        }

    }

    const getStyle = () => {

        if (matches) {
            return classes.partTitlesContainer2
        } else {
            return classes.partTitlesContainer
        }

    }

    const getHeight = () => {

        const style = {}
        style.height = _height
        return style

    }

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>

                <Grid item lg={2} xl={2} sm={false} md={false} xs={false}></Grid>

                <Grid item lg={8} xl={8} sm={12} md={12} xs={12}>

                    <div className={getStyle()} style={getHeight()}>{renderPartNames()}</div>

                </Grid>

                <Grid item lg={2} xl={2} sm={false} md={false} xs={false}></Grid>

            </Grid>

        </div>
    )

}

export default PartNamesComponentView