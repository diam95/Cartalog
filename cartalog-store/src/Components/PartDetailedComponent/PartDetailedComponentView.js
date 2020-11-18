import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Grid, Typography} from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import AwesomeSlider from "react-awesome-slider";
import 'react-awesome-slider/dist/styles.css';

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        width: "80%",
        marginLeft: "10%",
        [theme.breakpoints.down("md")]: {
            width: `100%`,
            marginLeft: 0
        },
        marginTop: theme.spacing(2)
    },
    imagesContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingRight: theme.spacing(3)
    },
    partDetailsContainer: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("md")]:{
            padding:theme.spacing(1)
        }
    },
    image: {
        objectFit: "contain",
        width: "100%",
        marginBottom: theme.spacing(3)
    },
    captionsContainer: {
        marginTop: theme.spacing(3),
        display: "flex",
        alignItems: "center"
    },
    partCardCaptionsButton: {
        marginLeft: theme.spacing(1)
    },
    price:{
        marginTop:theme.spacing(2)
    }

}))

const PartDetailedComponentView = (props) => {

    console.log("PartDetailedComponentView")

    const matches = props.matches

    const classes = useStyles()
    console.log(`PartDetailedComponentView`)
    const part = props.part

    const renderImages = () => {

        if (part) {

            if (part.images) {

                return part.images.map(imageSrc => {

                    return <img src={imageSrc} alt={part.title} className={classes.image}/>

                })

            }


        }

    }

    const renderCaptions = () => {

        if (part) {

            return part.captions.map(caption => {

                return (
                    <div className={classes.captionsContainer}>
                        <div>{caption.captionTitle}</div>
                        <Button variant={"contained"} disableElevation
                                className={classes.partCardCaptionsButton}>{caption.captionValue}</Button>
                    </div>
                )

            })

        }

    }

    const getGridContent = () => {

        if (matches) {
            return (
                <div className={classes.root}>

                    <Grid item>

                        <AwesomeSlider bullets={false}
                                       organicArrows={true}
                                       buttons={true}
                        >
                            {part.images.filter(item=>{return item.includes("https")}).map(src=>{
                                return <div data-src={src} />
                            })}
                        </AwesomeSlider>

                        <div className={classes.partDetailsContainer}>
                            <div>
                                <Typography variant={"h5"}>{part.title}</Typography>
                                <Typography variant={"h3"} className={classes.price}>{part.price} ₽</Typography>
                                <Button size={"large"}
                                        variant={"contained"}
                                        fullWidth={true}
                                        color={"primary"}
                                        startIcon={<ShoppingCart/>}
                                        style={{marginTop: 16}}
                                >
                                    Добавить в корзину
                                </Button>
                            </div>
                            <div>{renderCaptions()}</div>
                        </div>
                    </Grid>

                </div>
            )
        } else {
            return (
                <div className={classes.root}>

                    <Grid item lg={7}>
                        <div className={classes.imagesContainer}>
                            {renderImages()}
                        </div>
                    </Grid>

                    <Grid item lg={5}>
                        <div className={classes.partDetailsContainer}>
                            <div>
                                <Typography variant={"h5"}>{part.title}</Typography>
                                <Typography variant={"h3"} style={{marginTop: 8}}>{part.price} ₽</Typography>
                                <Button size={"large"}
                                        variant={"contained"}
                                        color={"primary"}
                                        startIcon={<ShoppingCart/>}
                                        style={{marginTop: 16}}
                                >
                                    Добавить в корзину
                                </Button>
                            </div>
                            <div>{renderCaptions()}</div>
                        </div>
                    </Grid>

                </div>
            )
        }

    }

    return (
        <Grid container spacing={0}>
            <Grid item lg={2}></Grid>
            <Grid item lg={8}>
                {getGridContent()}
            </Grid>
            <Grid item lg={2}></Grid>
        </Grid>

    )

}

export default PartDetailedComponentView