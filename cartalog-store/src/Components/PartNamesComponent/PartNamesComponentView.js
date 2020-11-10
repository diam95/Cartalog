import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {useLocation} from "react-router-dom"

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%"
    },
    partTitlesContainer: {
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    partLinkContainer: {
        marginTop: theme.spacing(1)
    },
    partLink: {
        textDecoration: "none",
        cursor: "pointer",
        color: "black",
        "&:hover": {
            color: "blue",
            textDecoration: "underline"
        }
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
        marginBottom: theme.spacing(2)
    },
    letterPartsContainer: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1)
    }
}))

const PartNamesComponentView = (props) => {

    const parts_filter = props.parts_filter

    const classes = useStyles()

    const location = useLocation()

    const getHref = (href) => {

        const brand = location.pathname.split('/')[1]
        const model = location.pathname.split('/')[2]

        const result = "/" + brand + "/" + model + "/" + href

        return result

    }

    const renderPartNames = () => {

        if (Object.keys(parts_filter).length !== 0) {

            const res = {}

            const lettersArray = Array.from(new Set(Object.values(parts_filter).map(part_name => {
                return part_name[0]
            }))).sort()

            const partHrefs = Object.keys(parts_filter)
            const partNames = Object.values(parts_filter)

            partNames.forEach((part_name, ind) => {

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

                const partNames = Object.values(res[letter])
                const partHrefs = Object.keys(res[letter])

                return partNames.map((part_name, idx) => {

                    return (
                        <div className={classes.partLinkContainer} key={part_name}>
                            <a className={classes.partLink}
                               href={`${getHref(partHrefs[idx])}`}>{part_name}</a>
                        </div>
                    )

                })

            }

            return lettersArray.map(letter => {

                return (
                    <div className={classes.letterPartsContainer} key={letter}>
                        <div className={classes.letterContainer}>{letter}</div>
                        {renderPartNames(letter)}
                    </div>
                )

            })
        }

    }

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>

                <Grid item lg={2} xl={2} sm={0} md={0} xs={0}></Grid>

                <Grid item lg={8} xl={8} sm={12} md={12} xs={12}>
                    <div className={classes.partTitlesContainer} style={props._height}>{renderPartNames()}</div>
                </Grid>

                <Grid item lg={2} xl={2} sm={0} md={0} xs={0}></Grid>

            </Grid>

        </div>
    )

}

export default PartNamesComponentView