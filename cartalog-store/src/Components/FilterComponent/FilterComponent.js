import React, {useEffect} from 'react'
import FilterComponentView from "./FilterComponentView";
import firebase from "firebase/app"
import "firebase/database"
import {useLocation} from "react-router-dom"

const FilterComponent = (props) => {

    const matches = props.matches
    const filterState = props.filterState
    const setFilterState = props.setFilterState

    const location = useLocation()
    const locationArray = location.pathname.split("/")

    useEffect(() => {

        if (filterState.all_brands.length === 0) {

            const allBrandsRef = firebase.database().ref('brands_models').child("brands")
            allBrandsRef.once("value").then(r => {

                if (r.exists()) {
                    const temp = {...filterState}
                    temp.all_brands = Object.values(r.val())
                    setFilterState(temp)
                }

            })

        }

        const brand = location.pathname.split("/")[1]

        if (brand.length > 0 && location.pathname.split("/")[1] !== "partsFilter") {

            if (!filterState.all_models[brand]) {

                const allModelsRef = firebase.database().ref('brands_models').child("models").child(brand)
                allModelsRef.once("value").then(r => {

                    if (r.exists()) {

                        const temp = {...filterState}
                        temp.all_models[brand] = Object.values(r.val())
                        setFilterState(temp)

                    }

                })

            }

        }

    }, [filterState, location])

    return (
        <>
            {locationArray[1] !== "cart"
                ? <FilterComponentView matches={matches}
                                       filterState={filterState}
                />
                : <></>
            }
        </>

    )

}

export default FilterComponent