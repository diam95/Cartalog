import React, {useEffect, useState} from 'react'
import PartsFeedComponentView from "./PartsFeedComponentView";
import {useLocation} from "react-router-dom"
import firebase from "firebase";

const PartsFeedComponent = (props) => {

    const partsState = props.partsState
    const setPartsState = props.setPartsState
    const filterState = props.filterState
    const setFilterState = props.setFilterState

    const [availableParts, setAvailableParts] = useState({});

    const location = useLocation()

    useEffect(() => {

        if (location.pathname.split("/").length === 3) {

            const brand = location.pathname.split('/')[1]
            const model = location.pathname.split('/')[2].replace(" ", "-")

            const loadData = () => {

                const partsRef = firebase.database().ref("all_parts").child(brand).orderByKey().equalTo(model)

                partsRef.once('value').then(r => {
                    if (r.exists()) {

                        const temp = {...partsState}

                        temp[brand] = r.val()

                        setPartsState(temp)
                    }
                })

            }

            if (!partsState[brand]) {

                loadData()

            } else {

                if (!partsState[brand][model]) {

                    loadData()

                }

            }

        }

    }, [location, partsState, setPartsState])

    useEffect(() => {

        if (location.pathname.split("/").length === 3) {

            const brand = location.pathname.split('/')[1]
            const model = location.pathname.split('/')[2].replace(" ", "-")

            if (partsState[brand]) {
                if (partsState[brand][model]) {
                    setAvailableParts(partsState[brand][model])
                }
            }

        }

    }, [location.pathname, partsState])

    useEffect(() => {

        if (location.pathname.split("/").length === 3) {

            if (filterState.parts_filter.length !== 0) {

                const brand = location.pathname.split('/')[1]
                const model = location.pathname.split('/')[2].replace(" ", "-")

                const getDetailedFilterState = () => {

                    const partsDetailedRef = firebase.database().ref("parts_filter_detailed").child(brand).orderByKey().equalTo(model)
                    partsDetailedRef.once('value').then(r => {

                        if (r.exists()) {

                            const result = Object.values(r.val()).flat().map(partHref => {

                                return filterState.parts_filter[partHref]

                            })

                            const temp = {...filterState}

                            if (temp.parts_filter_detailed[brand]) {
                                temp.parts_filter_detailed[brand][model] = result
                                setFilterState(temp)
                            } else {
                                temp.parts_filter_detailed[brand] = {}
                                temp.parts_filter_detailed[brand][model] = result
                                setFilterState(temp)
                            }

                        }

                    })

                }

                if (filterState.parts_filter_detailed[brand]) {

                    if (!filterState.parts_filter_detailed[brand][model]) {
                        getDetailedFilterState()
                    }

                } else {

                    getDetailedFilterState()

                }
            }

        }

    }, [location, availableParts, filterState, setFilterState])

    return (
        <PartsFeedComponentView availableParts={availableParts}
                                filterState={filterState}
        />
    )

}

export default PartsFeedComponent