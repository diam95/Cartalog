import React, {useEffect, useState} from 'react'
import FilterComponentView from "./FilterComponentView";
import {useLocation, useHistory} from "react-router-dom";

const FilterComponent = (props) => {

    const locationArray = useLocation().pathname.split("/")
    const history = useHistory()

    const [_height, setHeight] = useState(100);

    useEffect(() => {

        if (locationArray[1].length > 0 && !locationArray[2]) {

            if (locationArray[1] === "partsFilter") {

            } else {

                if (props.filterState.models[locationArray[1]]) {

                    if (props.filterState.models[locationArray[1]].length > 0) {

                        const count = props.filterState.models[locationArray[1]].length * 10

                        setHeight(count)

                    }

                }

            }

        } else if (locationArray[2]) {

            if (props.filterState.models[locationArray[1]]) {

                if (props.filterState.models[locationArray[1]].length > 0) {

                    const count = props.filterState.models[locationArray[1]].length * 10

                    setHeight(count)

                }

            }

        } else {

            if (props.filterState.brands.length > 0) {

                const count = props.filterState.brands.length * 10

                setHeight(count)

            }

        }

    }, [props.filterState, locationArray])

    const handleBrandSelect = (brand) => {

        history.push(`/${brand.toLowerCase()}`)

    }

    const handleModelSelect = (brand, model) => {

        history.push(`/${brand.toLowerCase()}/${model.toLowerCase().replace(" ", "-")}`)

    }

    const handleShowPartsFilter = () => {

        history.push(`/partsFilter`)

    }

    const handleClearSelect = () => {

        history.push(`/`)

    }

    return (
        <FilterComponentView locationArray={locationArray}
                             handleModelSelect={handleModelSelect}
                             handleBrandSelect={handleBrandSelect}
                             handleClearSelect={handleClearSelect}
                             handleShowPartsFilter={handleShowPartsFilter}
                             filterState={props.filterState}
                             partsState={props.partsState}
                             setPartsState={props.setPartsState}
                             _height={_height}

        />
    )

}

export default FilterComponent