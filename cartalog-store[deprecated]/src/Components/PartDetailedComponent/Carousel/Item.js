import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({

    carouselImage: {
        width: `100%`,
        height: 240,
        objectFit:"cover",
    }

}))

const Item = (props) => {

    const src = props.src

    const classes = useStyles()

    return (
        <img src={src} className={classes.carouselImage} alt={"123"}/>
    )

}

export default Item