import React, {useEffect, useState} from 'react'
import PartsFeedComponentView from "./PartsFeedComponentView";
import firebase from "firebase";

const PartsFeedComponent = (props) => {

    const partsState = props.partsState
    const setPartsState = props.setPartsState
    const matches = props.matches
    const setFilterState = props.setFilterState

    const locationArray = props.locationArray
    const history = props.history

    const [partsFeedList, setPartsFeedList] = useState([]);
    const [partsFeedListForFilter, setPartsFeedListForFilter] = useState([]);
    const [partsFeedListForPartsFeed, setPartsFeedListForPartsFeed] = useState([]);

    useEffect(() => {

        if (locationArray.length > 3) {

            const temp = {...partsState}
            const brand = locationArray[1]
            const model = locationArray[2]
            const partType = locationArray[3]

            const loadData = () => {

                const dbRef = firebase.database().ref('all_parts').child(brand).child(model).child(partType)
                dbRef.once('value').then(r => {

                    if (r.exists()) {

                        if (temp[brand]) {

                            if (temp[brand][model]) {

                                if (temp[brand][model][partType]) {

                                } else {
                                    temp[brand][model][partType] = r.val()
                                    setPartsState(temp)
                                }

                            } else {
                                temp[brand][model] = {}
                                temp[brand][model][partType] = r.val()
                                setPartsState(temp)
                            }

                        } else {
                            temp[brand] = {}
                            temp[brand][model] = {}
                            temp[brand][model][partType] = r.val()
                            setPartsState(temp)
                        }


                    }

                })

            }

            if (temp[brand]) {

                if (temp[brand][model]) {

                    if (temp[brand][model][partType]) {

                        setPartsFeedList(partsState[brand][model][partType])

                    } else {
                        loadData()
                    }

                } else {
                    loadData()
                }

            } else {
                loadData()
            }

            return (() => {
                setPartsFeedList([])
            })

        } else if (locationArray.length === 3 && locationArray[1] === "partsFilter") {

            const dbRef = firebase.database().ref('all_parts_by_part_names').child(locationArray[2])
            const temp = {...partsState}

            if (temp.all_parts_by_part_names) {

                if (!temp.all_parts_by_part_names[locationArray[2]]) {

                    dbRef.once('value').then(r => {

                        if (r.exists()) {

                            temp.all_parts_by_part_names[locationArray[2]] = r.val()
                            setPartsState(temp)

                        }

                    })

                } else {
                    setPartsFeedList(partsState.all_parts_by_part_names[locationArray[2]])
                }

            } else {

                temp.all_parts_by_part_names = {}

                dbRef.once('value').then(r => {

                    if (r.exists()) {

                        temp.all_parts_by_part_names[locationArray[2]] = r.val()
                        setPartsState(temp)

                    }

                })

            }

            return (() => {
                setPartsFeedList([])
            })

        }

    }, [locationArray, partsState, setPartsState])

    useEffect(() => {

        console.log({partsFeedList})

        setPartsFeedListForPartsFeed(partsFeedList)
        setPartsFeedListForFilter(partsFeedList)

    }, [locationArray, partsFeedList])

    const renderCase = () => {

        if (locationArray.length === 6) {

            if (locationArray[1] !== "partsFilter" && locationArray[1] !== "allBrands") {

                if (locationArray[2] !== "allModels") {

                    if (locationArray[3] !== "allParts") {
                        return true
                    } else {
                        return false
                    }

                } else return false

            } else return false

        } else if (locationArray.length === 3 && locationArray[1] === "partsFilter") {
            return true
        } else if (locationArray.length === 3 && locationArray[1] !== "partsFilter") {
            return false
        } else if (locationArray.length === 4 && locationArray[1] !== "partsFilter") {
            return true
        } else return false

    }

    return (
        <>
            {renderCase()
                ? <PartsFeedComponentView partsFeedListForPartsFeed={partsFeedListForPartsFeed}
                                          partsFeedListForFilter={partsFeedListForFilter}
                                          matches={matches}
                                          filterState={props.filterState}
                                          setFilterState={props.setFilterState}
                                          locationArray={locationArray}
                                          history={history}
                />
                : <></>
            }
        </>
    )

}

export default PartsFeedComponent