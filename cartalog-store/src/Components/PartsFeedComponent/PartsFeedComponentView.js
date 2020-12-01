import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import noImage from "../../assets/no-photo.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => createStyles({

    root: {},
    feedContainer: {
        display: `grid`,
        gridTemplateColumns: `50fr 50fr`,
        gridAutoRows: `1fr`,
        [theme.breakpoints.down("md")]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center"
        }
    },
    partCardContainer: {
        width: `calc(100%)`,
        [theme.breakpoints.down("md")]: {
            width: `calc(100% - ${theme.spacing(2)}px)`,
            marginLeft: theme.spacing(1)
        }
    },
    partCard: {
        marginRight:theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ffffff00",
        '&:hover': {
            borderColor: "grey"
        },
        [theme.breakpoints.down("md")]:{
            marginRight:theme.spacing(0),
            '&:hover': {
                borderColor: "#ffffff00"
            }
        }
    },
    partCardInfoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        height: "auto",
        padding:theme.spacing(1),
        [theme.breakpoints.down("md")]:{
            padding:theme.spacing(0)
        }
    },
    partCardTitle: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(1)
        }
    },
    partCardCaptionsContainer: {
        width: `calc(100% - ${theme.spacing(1)}px)`,
        display: "flex",
        flexFlow: "row wrap",
    },
    partCardPriceContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: `calc(100% - ${theme.spacing(2)}px)`,
        marginLeft: theme.spacing(1)
    },
    partCardPrice: {

    },
    partStatus: {
        color: "Green"
    },
    partCardImage: {
        width: "100%",
        minHeight: 315,
        maxHeight: 345,
        objectFit: "cover",
        [theme.breakpoints.down("md")]: {
            minHeight: 240,
            maxHeight: 280,
        }
    },
    partCardCaptions: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    progress: {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing(3)
        }
    }

}))

const PartsFeedComponentView = (props) => {

    const partsFeedList = props.partsFeedList

    const classes = useStyles()

    const history = useHistory()

    const renderPartCards = () => {

        const handleItemCLick = (part) => {

            const brand = part.brand
            const model = part.model
            const partType = part.partType
            const partHref = part.partHref

            history.push("/"+brand+"/"+model+"/"+partType+"/"+partHref)

        }

        const renderImg = (part) => {

            const getSrc = (part) => {

                if (part.images) {
                    if (part.images[0]) {

                        if (part.images[0].includes("https://")) {
                            return part.images[0]
                        } else {
                            return noImage
                        }

                    } else {
                        return noImage
                    }
                } else {
                    return noImage
                }

            }

            return (<img src={getSrc(part)} alt={part.title} className={classes.partCardImage}/>)

        }

        const renderCaptions = (captions) => {

            const captionsArray = []

            captionsArray.push(
                <Button variant={"contained"} disableElevation
                        className={classes.partCardCaptions}>{captions[1].captionValue}</Button>
            )
            if (captions[2]) {
                captionsArray.push(
                    <Button variant={"contained"} disableElevation
                            className={classes.partCardCaptions}>{captions[2].captionValue}</Button>
                )
            }

            return captionsArray

        }

        return Object.values(partsFeedList).map(part => {
            return (
                <div style={{display: "inline-block"}} key={part.partHref}>
                    <div className={classes.partCardContainer} key={part.href} onClick={() => {
                        handleItemCLick(part)
                    }}>
                        <div className={classes.partCard}>
                            {renderImg(part)}
                            <div className={classes.partCardInfoContainer}>
                                <Typography variant={"h6"}
                                            className={classes.partCardTitle}>{part.title}</Typography>
                                <div
                                    className={classes.partCardCaptionsContainer}>{part.captions ? renderCaptions(part.captions) : ""}</div>
                                <div className={classes.partCardPriceContainer}>
                                    <Typography variant={"h4"}
                                                className={classes.partCardPrice}>{part.price + " ₽"}</Typography>
                                    <Button disableElevation
                                            classes={{root: classes.partStatus}}
                                            size={"large"}
                                    >
                                        Подробнее
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

    }

    return (
        <div className={classes.root}>

            <Grid container spacing={0}>
                <Grid item lg={2} sm={false}/>
                <Grid item lg={8}>
                    <div className={classes.feedContainer}>
                        {renderPartCards()}
                        {partsFeedList.length === 0 ? <CircularProgress className={classes.progress}/> : <></>}
                    </div>
                </Grid>
                <Grid item lg={2} sm={false}/>
            </Grid>

        </div>
    )

}

export default PartsFeedComponentView