import React from 'react'
import CarPickerComponentView from "./CarPickerComponentView";
import {useLocation, useHistory} from "react-router-dom";

const SearchComponent = (props) => {

    const carBrands = props.carBrands
    const carModels = props.carModels

    const locationArray = useLocation().pathname.split("/")
    const history = useHistory()

    const handleBrandSelect = (brand) => {

        history.push(`/${brand.toLowerCase()}`)

    }

    const handleModelSelect = (brand, model) => {

        history.push(`/${brand.toLowerCase()}/${model.toLowerCase()}`)

    }

    const handleClearSelect = () => {

        history.push(`/`)

    }

    return (
        <CarPickerComponentView carBrands={carBrands}
                                carModels={carModels}
                                locationArray={locationArray}
                                handleModelSelect={handleModelSelect}
                                handleBrandSelect={handleBrandSelect}
                                handleClearSelect={handleClearSelect}
        />
    )

}

export default SearchComponent