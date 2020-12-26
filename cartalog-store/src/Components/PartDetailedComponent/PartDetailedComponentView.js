import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Grid, Paper, Typography} from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Carousel from "react-material-ui-carousel";
import bcgr from "../../assets/bcgr.png";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        width: "100%",
        [theme.breakpoints.down("md")]: {
            width: `100%`,
            marginLeft: 0
        }
    },
    imagesContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingRight: theme.spacing(3)
    },
    partDetailsContainer: {
        width:"100%",
        display: "flex",
        flexDirection: "column",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        [theme.breakpoints.down("md")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
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
    price: {
        marginTop: theme.spacing(2)
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100vw",
        overflow: "hidden"
    },
    detailsContainer: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    carouselImage: {
        width: "100%",
        minWidth: "100%",
        objectFit: "cover",
        height: 240
    },
    carouselRoot: {
        marginTop:theme.spacing(1),
        width: "100%",
        backgroundImage:`url(${bcgr})`,
        backgroundSize:"contain",
        backgroundRepeat:"no-repeat"
    }

}))

const PartDetailedComponentView = (props) => {

    const matches = props.matches

    const handleAddToCart = props.handleAddToCart

    const classes = useStyles()
    const part = props.part

    const renderImages = () => {

        if (part) {

            if (part.images) {

                return part.images.map(imageSrc => {

                    return <img key={imageSrc} src={imageSrc} alt={part.title} className={classes.image}/>

                })

            }


        }

    }

    const renderCaptions = () => {

        if (part) {

            return part.captions.map(caption => {

                return (
                    <div key={caption.captionValue} className={classes.captionsContainer}>
                        <Typography variant={"subtitle1"}>{caption.captionTitle}</Typography>
                        <Button size={"small"} variant={"contained"} disableElevation
                                className={classes.partCardCaptionsButton}>{caption.captionValue}</Button>
                    </div>
                )

            })

        }

    }

    const Item = (props) => {

        return (
                <img src={props.item} alt={"img"} className={classes.carouselImage}/>
        )

    }

    const getGridContent = () => {

        if (matches) {

            return (
                <div className={classes.container}>

                    <Carousel autoPlay={false}
                              className={classes.carouselRoot}
                              indicators={true}
                              animation={"fade"}
                              navButtonsAlwaysVisible={true}

                                                  >
                        {
                            part.images.filter(item => item.includes("https")).map((item, i) => <Item key={i}
                                                                                                      item={item}/>)
                        }
                    </Carousel>

                    <div className={classes.partDetailsContainer}>
                        <div>
                            <Typography variant={"h6"}>{part.title}</Typography>
                            <Typography variant={"h4"}
                                        className={classes.price}>{parseInt(part.price)} ₽</Typography>
                            <Button size={"large"}
                                    variant={"contained"}
                                    color={"primary"}
                                    startIcon={<ShoppingCart/>}
                                    style={{marginTop: 16}}
                                    onClick={handleAddToCart}
                            >
                                Добавить в корзину
                            </Button>
                        </div>
                        <div>{renderCaptions()}</div>

                        <div className={classes.detailsContainer}>
                            <Typography variant={"subtitle2"}
                                        style={{marginTop: 24}}>{part.description.length > 0 ? "Дополнительно:" : ""}</Typography>
                            <Typography variant={"button"}>{part.description}</Typography>
                        </div>


                    </div>
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
                                <Typography variant={"h3"} style={{marginTop: 8}}>{parseInt(part.price)} ₽</Typography>
                                <Button size={"large"}
                                        variant={"contained"}
                                        color={"primary"}
                                        startIcon={<ShoppingCart/>}
                                        style={{marginTop: 16}}
                                        onClick={handleAddToCart}
                                >
                                    Добавить в корзину
                                </Button>
                            </div>
                            <div>{renderCaptions()}</div>
                            <Typography variant={"subtitle2"}
                                        style={{marginTop: 16}}>{part.description.length > 0 ? "Дополнительно:" : ""}</Typography>
                            <Typography variant={"button"}>{part.description}</Typography>
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