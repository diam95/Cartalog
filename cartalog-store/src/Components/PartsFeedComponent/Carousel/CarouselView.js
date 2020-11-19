import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Dots from "./Dots/Dots";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({

    root: {
        margin: 0,
        padding: 0,
        width: `calc(100vw - ${theme.spacing(2)}px)`
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
                      offset={4}
                      centered
                      infinite
                      keepDirectionWhenDragging
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
