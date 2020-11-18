import React, {useEffect, useState} from 'react'
import PartsFeedComponentView from "./PartsFeedComponentView";
import {useLocation, useHistory} from "react-router-dom"
import firebase from "firebase";

const PartsFeedComponent = (props) => {

    const partsState = props.partsState
    const setPartsState = props.setPartsState
    const filterState = props.filterState
    const setFilterState = props.setFilterState

    const [availableParts, setAvailableParts] = useState({});

    const location = useLocation()
    const history = useHistory()

    const handleItemCLick = (item) => {

        const brand = item.brand
        const model = item.model
        const partType = item.partType
        const partHref = item.partHref

        history.push(`/${brand}/${model}/${partType}/${partHref}/`)

    }

    useEffect(()=>{
        setAvailableParts({})
    },[location.pathname])

    useEffect(() => {

        if (location.pathname.split("/").length === 4) {

            const brand = location.pathname.split('/')[1]
            const model = location.pathname.split('/')[2].replace(" ", "-")
            const partHref = location.pathname.split('/')[3]

            const loadData = () => {

                console.log("load data")

                const partsRef = firebase.database().ref("all_parts").child(brand).child(model).orderByKey().equalTo(partHref)

                partsRef.once('value').then(r => {

                    if (r.exists()) {

                        const temp = {...partsState}

                        if (temp[brand]) {

                            temp[brand][model] = r.val()

                        } else {

                            temp[brand] = {}
                            temp[brand][model] = r.val()

                        }

                        setPartsState(temp)

                    }

                })

            }

            if (!partsState[brand]) {
                loadData()
            } else if (!partsState[brand][model]) {
                loadData()
            } else if (!partsState[brand][model][partHref]) {
                loadData()
            }

        } else if (location.pathname.split("/").length === 3 && location.pathname.split("/")[1] === "partsFilter") {

            const partHref = location.pathname.split('/')[2]

            if (!partsState.all_parts_by_partNames[partHref]) {
                const partsRef = firebase.database().ref('all_parts_by_partNames').child(partHref)
                partsRef.once('value').then(r => {

                    if (r.exists()) {

                        const partsByName = r.val()
                        const temp = {...partsState}

                        if (temp.all_parts_by_partNames) {
                            temp.all_parts_by_partNames[partHref] = partsByName
                        } else {
                            temp.all_parts_by_partNames = {}
                            temp.all_parts_by_partNames[partHref] = partsByName
                        }

                        setPartsState(temp)

                    }

                })
            }


        }

    }, [filterState.parts_filter_detailed, location, partsState, setPartsState])

    useEffect(() => {

        if (location.pathname.split("/").length === 4) {

            const brand = location.pathname.split('/')[1]
            const model = location.pathname.split('/')[2].replace(" ", "-")

            if (partsState[brand]) {
                if (partsState[brand][model]) {
                    setAvailableParts(partsState[brand][model])
                }
            }

        } else if (location.pathname.split("/").length === 3 && location.pathname.split("/")[1] === "partsFilter") {

            const partType = location.pathname.split("/")[2]

            if (partsState.all_parts_by_partNames[partType]) {

                const result = {}
                result[partType] = partsState.all_parts_by_partNames[partType]
                setAvailableParts(result)

            }

        } else {
            setAvailableParts({})
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

    const renderContent = () => {

        if (location.pathname.split("/").length === 4) {

            return (
                <PartsFeedComponentView availableParts={availableParts}
                                        filterState={filterState}
                                        handleItemCLick={handleItemCLick}
                                        matches={props.matches}
                />
            )
        } else if (location.pathname.split("/").length === 3 && location.pathname.split("/")[1] === "partsFilter") {
            return (
                <PartsFeedComponentView availableParts={availableParts}
                                        filterState={filterState}
                                        handleItemCLick={handleItemCLick}
                                        matches={props.matches}
                />
            )
        } else return <div/>
    }

    return (
        <div style={{
            width: "100%",
            minHeight: "100%"
        }}>
            {renderContent()}
        </div>
    )

}

export default PartsFeedComponent