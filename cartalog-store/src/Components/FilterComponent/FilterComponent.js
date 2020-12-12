import React, {useEffect} from 'react'
import FilterComponentView from "./FilterComponentView";
import firebase from "firebase/app"
import "firebase/database"

const FilterComponent = (props) => {

    const matches = props.matches
    const filterState = props.filterState
    const setFilterState = props.setFilterState

    const locationArray = props.locationArray
    const history = props.history

    useEffect(() => {

        if (filterState.all_brands.length === 0) {

            const allBrandsRef = firebase.database().ref('all_brands')
            allBrandsRef.once("value").then(r => {

                if (r.exists()) {
                    const temp = {...filterState}
                    temp.all_brands = Object.values(r.val())
                    setFilterState(temp)
                }

            })

        }

        const brand = locationArray[1]

        if (brand.length > 0 && locationArray[1] !== "partsFilter") {

            if (!filterState.all_models[brand]) {

                const allModelsRef = firebase.database().ref('all_models').child(brand)
                allModelsRef.once("value").then(r => {

                    if (r.exists()) {

                        const temp = {...filterState}
                        temp.all_models[brand] = Object.values(r.val())
                        setFilterState(temp)

                    }

                })

            }

        }

    }, [filterState, locationArray, setFilterState])

    return (
        <>
            {locationArray[1] !== "cart" &&
            locationArray[1] !== "services" &&
            locationArray[1] !== "payment" &&
            locationArray[1] !== "shipping" &&
            locationArray[1] !== "guarantees" &&
            locationArray[1] !== "refund" &&
            locationArray[1] !== "about" &&
            locationArray[1] !== "contacts"
                ? <FilterComponentView matches={matches}
                                       filterState={filterState}
                                       setFilterState={setFilterState}
                                       locationArray={locationArray}
                                       history={history}
                />
                : <></>
            }
        </>

    )

}

export default FilterComponent