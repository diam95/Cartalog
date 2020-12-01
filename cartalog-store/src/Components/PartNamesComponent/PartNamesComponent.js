import React, {useEffect} from 'react'
import PartNamesComponentView from "./PartNamesComponentView";
import {useLocation} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";

const PartNamesComponent = (props) => {

    const locationArray = useLocation().pathname.split("/")

    const filterState = props.filterState
    const matches = props.matches
    const setFilterState = props.setFilterState

    useEffect(() => {

        if (locationArray.length > 2) {

            const brand = locationArray[1]
            const model = locationArray[2]

            const loadDetailedFilter = () => {

                const partsDetailedRef = firebase.database().ref('parts_filter_detailed').child(brand).child(model)
                partsDetailedRef.once('value').then(r => {

                    if (r.exists()) {
                        const temp = {...filterState}
                        if (temp.parts_filter_detailed[brand]) {
                            temp.parts_filter_detailed[brand][model] = r.val()
                            setFilterState(temp)
                        } else {
                            temp.parts_filter_detailed[brand] = {}
                            temp.parts_filter_detailed[brand][model] = r.val()
                            setFilterState(temp)
                        }

                    }

                })

            }

            if (filterState.parts_filter_detailed[brand]) {

                if (filterState.parts_filter_detailed[brand][model]) {


                } else {
                    loadDetailedFilter()
                }

            } else {
                loadDetailedFilter()
            }

        }

    }, [locationArray])

    return (
        <PartNamesComponentView filterState={filterState}
                                matches={matches}
                                locationArray={locationArray}
        />
    )

}

export default PartNamesComponent