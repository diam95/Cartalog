import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Dots from "./Dots/Dots";
import Item from "./Item";
import {Icon} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    root: {
        padding: 0,
        width: "100%"
    }

}))

const CarouselView = (props) => {

    const carouselImagesList = props.carouselImagesList

    const classes = useStyles()

    const [dotID, setDotID] = useState(0);

    const renderItems = () => {

        return carouselImagesList.map(imageSrc => {
            return (<Item src={imageSrc} key={imageSrc}/>)
        })

    }

    return (
        <div className={classes.root}>

            <Carousel slidesPerPage={1}
                      offset={0}
                      centered
                      infinite
                      keepDirectionWhenDragging={true}
                      onChange={(id) => {
                          setDotID(id)
                      }}
            >

                {renderItems()}

            </Carousel>

            <Dots dotID={dotID} number={carouselImagesList.length}/>

        </div>
    )


}

export default CarouselView
