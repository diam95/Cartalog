import React from 'react'
import HomeScreenView from "./HomeScreenView";

const HomeScreen = (props) => {

    const carBrands=props.carBrands
    const carModels=props.carModels

    return (
        <HomeScreenView carBrands={carBrands}
                        carModels={carModels}
        />
    )

}

export default HomeScreen