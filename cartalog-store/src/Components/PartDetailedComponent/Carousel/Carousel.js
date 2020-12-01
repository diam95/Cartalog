import React from "react";
import CarouselView from "./CarouselView";

const Carousel = (props) => {

    const carouselImagesList = props.carouselImagesList

    return(

        <CarouselView carouselImagesList={carouselImagesList}/>

    )
}

export default Carousel