import React from 'react'
import {createStyles, makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import noImage from "../../pics/no-photo.svg"
import Button from "@material-ui/core/Button";
import AwesomeSlider from "react-awesome-slider";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        marginTop: theme.spacing(1),
        width: "100%"
    },
    partCardsContainer: {
        width: "80%",
        marginLeft: "10%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginLeft: 0
        },
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    partCardContainer: {
        width: `calc(50% - ${theme.spacing(1)}px)`,
        [theme.breakpoints.down("md")]: {
            width: "100%"
        }
    },
    partCard: {
        marginBottom: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ffffff00",
        paddingBottom: theme.spacing(3),
        "&:hover": {
            borderColor: "#808080"
        },
        [theme.breakpoints.down("md")]: {
            "&:hover": {
                borderStyle: "none",
            },
            borderWidth: 0
        },
        cursor: "pointer"
    },
    partCardTitle: {
        padding: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(0)
        },

    },
    partCardImage: {
        width: "100%",
        minHeight: 315,
        maxHeight: 345,
        objectFit: "contain"
    },
    partCardCaptionsContainer: {
        display: "flex",
        flexFlow: "row wrap",
    },
    partCardCaptions: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    noPadding: {
        padding: 0
    },
    partCardPrice: {},
    partStatus: {
        color: "Green"
    },
    partCardInfoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        height: "auto",
        marginTop: theme.spacing(1)
    },
    partCardPriceContainer: {
        marginTop: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: `calc(100% - ${theme.spacing(2)}px)`,
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down("md")]: {
            width: `calc(100% - ${theme.spacing(1)}px)`,
        }
    }

}))

const PartsFeedComponentView = (props) => {

    const matches = props.matches

    const classes = useStyles()

    console.log(props.availableParts)

    const availableParts = Object.values(props.availableParts).flat()

    const renderPartCards = () => {

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

        const renderImg = (part) => {

            if (matches) {
                return (
                    <AwesomeSlider bullets={false}
                                   organicArrows={true}
                                   buttons={true}
                    >
                        {part.images.filter(item => {
                            return item.includes("https")
                        }).map(src => {
                            return <div data-src={src}/>
                        })}
                    </AwesomeSlider>
                )
            } else {
                return (<img src={getSrc(part)} alt={part.title} className={classes.partCardImage}/>)
            }
        }

        const partCards = availableParts.map(partType => {

            const getPartStatus = (part) => {

                if (part.status.includes("агадан")) {
                    return "На складе Магадан"
                } else if (part.status.includes("адивосток")) {
                    return "На складе Владивосток"
                } else if (part.status.includes("овосибирск")) {
                    return "На складе Новосибирск"
                }

            }

            return Object.values(partType).map(part => {

                return (
                    <div className={classes.partCardContainer} onClick={() => {
                        props.handleItemCLick(part)
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
                                            size={"small"}
                                    >
                                        {getPartStatus(part)}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            })

        })

        return (
            <div className={classes.partCardsContainer}>
                {partCards}
            </div>
        )

    }

    return (
        <div className={classes.root}>

            <Grid container spacing={0}>
                <Grid item lg={2} sm={0}></Grid>
                <Grid item lg={8}>{renderPartCards()}</Grid>
                <Grid item lg={2} sm={0}></Grid>
            </Grid>


        </div>
    )

}

export default PartsFeedComponentView