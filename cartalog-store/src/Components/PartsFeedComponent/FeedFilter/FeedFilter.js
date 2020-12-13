import React, {useEffect, useState} from "react";
import FeedFilterView from "./FeedFilterView";
import firebase from "firebase/app";

const FeedFilter = (props) => {

    const filterState = props.filterState
    const partsFeedListForFilter = props.partsFeedListForFilter
    const setFilterState = props.setFilterState

    const [filterDialogIsOpen, setFilterDialogIsOpen] = useState(false);

    const locationArray = props.locationArray
    const history = props.history

    const [brandsArray, setBrandsArray] = useState([]);
    const [brand, setBrand] = useState(undefined);

    const [modelsArray, setModelsArray] = useState([]);
    const [model, setModel] = useState(undefined);

    const [partNamesArray, setPartNamesArray] = useState([]);
    const [partName, setPartName] = useState(undefined);
    console.log({partName})

    const [frameNumbersArray, setFrameNumbersArray] = useState([]);
    const [frameNumber, setFrameNumber] = useState(undefined);

    const [enginesArray, setEnginesArray] = useState([]);
    const [engine, setEngine] = useState(undefined);

    useEffect(() => {

        if (filterState.all_brands) {
            setBrandsArray(filterState.all_brands)
        }

        if (brand) {
            if (filterState.all_models[brandsArray[brand]]) {
                setModelsArray(filterState.all_models[brandsArray[brand]])
            } else {

                if (brandsArray[brand]) {
                    const modelsRef = firebase.database().ref("all_models").child(brandsArray[brand])
                    modelsRef.once('value').then(r => {
                        if (r.exists()) {
                            const temp = {...filterState}
                            temp.all_models[brandsArray[brand]] = r.val()
                            setFilterState(temp)
                        }
                    })
                }

            }
        } else {
            if (filterState.all_models[locationArray[1]]) {
                setModelsArray(filterState.all_models[locationArray[1]])
            }
        }

        if (model && brand) {

            if (modelsArray.length > 0 && brandsArray.length > 0) {

                if (filterState.parts_filter_detailed[brandsArray[brand]]) {

                    if (filterState.parts_filter_detailed[brandsArray[brand]][modelsArray[model]]) {

                        const partNames = Object.values(filterState.parts_filter_detailed[brandsArray[brand]][modelsArray[model]])
                        const partHrefs = Object.keys(filterState.parts_filter_detailed[brandsArray[brand]][modelsArray[model]])

                        const tempArray = partHrefs.map((href, ind) => {

                            return {
                                partHref: href,
                                partName: partNames[ind]
                            }

                        })

                        setPartNamesArray(tempArray)

                    } else {

                        if (brandsArray[brand] && modelsArray[model]) {

                            const partNamesRef = firebase.database().ref('parts_filter_detailed').child(brandsArray[brand]).child(modelsArray[model])
                            partNamesRef.once('value').then(r => {
                                if (r.exists()) {
                                    const partNames = Object.values(r.val())
                                    const partHrefs = Object.keys(r.val())

                                    const tempArray = partHrefs.map((href, ind) => {

                                        return {
                                            partHref: href,
                                            partName: partNames[ind]
                                        }

                                    })

                                    setPartNamesArray(tempArray)
                                }
                            })

                        }

                    }

                } else {

                    if (brandsArray[brand] && modelsArray[model]) {

                        const partNamesRef = firebase.database().ref('parts_filter_detailed').child(brandsArray[brand]).child(modelsArray[model])
                        partNamesRef.once('value').then(r => {
                            if (r.exists()) {
                                const partNames = Object.values(r.val())
                                const partHrefs = Object.keys(r.val())

                                const tempArray = partHrefs.map((href, ind) => {

                                    return {
                                        partHref: href,
                                        partName: partNames[ind]
                                    }

                                })

                                setPartNamesArray(tempArray)
                            }
                        })

                    }

                }

            }

        } else {
            if (filterState.parts_filter_detailed[locationArray[1]]) {
                if (filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]) {
                    const partNames = Object.values(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]])
                    const partHrefs = Object.keys(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]])
                    const tempArray = partHrefs.map((href, ind) => {

                        return {
                            partHref: href,
                            partName: partNames[ind]
                        }

                    })
                    setPartNamesArray(tempArray)
                }
            }
        }

        if (Object.values(partsFeedListForFilter).length > 0) {

            const frameNumbersTemp = Object.values(partsFeedListForFilter).map(part => {

                const result = part.captions.filter(item => {

                    return item.captionTitle.toLowerCase().includes("кузов")

                })

                if (result.length > 0) {
                    return result.map(caption => {
                        return caption.captionValue
                    })[0]
                }

            })

            setFrameNumbersArray(frameNumbersTemp)

        }

        if (Object.values(partsFeedListForFilter).length > 0) {

            const enginesArrayTemp = Object.values(partsFeedListForFilter).map(part => {

                const result = part.captions.filter(item => {

                    return item.captionTitle.toLowerCase().includes("двигатель")

                })

                if (result.length > 0) {
                    return result.map(caption => {
                        return caption.captionValue
                    })[0]
                }

            })

            setEnginesArray(enginesArrayTemp)

        }

    }, [locationArray, filterState, partsFeedListForFilter, brand, brandsArray, setFilterState, model, modelsArray])

    useEffect(() => {

        if (brandsArray.length > 0 && !brand) {
            setBrand(brandsArray.indexOf(locationArray[1]))
        }

        if (modelsArray.length > 0 && !model) {
            setModel(modelsArray.indexOf(locationArray[2]))
        }

        if (partNamesArray.length > 0 && !partName) {

            if (
                locationArray[1] !== "allBrands" &&
                locationArray[2] !== "allModels" &&
                locationArray[3] !== "allParts"
            ) {

                if(filterState.parts_filter_detailed[locationArray[1]]){
                    if(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]){
                        const ind = Object.keys(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]).indexOf(locationArray[3])
                        setPartName(ind)
                    }
                }

            }

        }

        if (frameNumbersArray.length > 0 && !frameNumber && locationArray[4] && locationArray[4] !== "allFrames") {
            setFrameNumber(frameNumbersArray.indexOf(locationArray[4]))
        }

        if (enginesArray.length > 0 && !engine && locationArray[5] && locationArray[5] !== "allEngines") {
            console.log("setEngine")
            setEngine(enginesArray.indexOf(locationArray[5]))
        }

    }, [brandsArray, brand, locationArray, modelsArray, model, partNamesArray.length, partName, partNamesArray, filterState.parts_filter_detailed, frameNumbersArray, frameNumber, enginesArray, engine])

    useEffect(() => {

        if (locationArray[2] !== modelsArray[model]) {
            setPartNamesArray([])
            setPartName(undefined)
        }

    }, [locationArray, model, modelsArray])

    const handleChange = (type, event) => {

        switch (type) {

            case"brand":
                setBrand(event.target.value)
                break;

            case"model":
                setModel(event.target.value)
                break;

            case"partName":
                setPartName(event.target.value)
                break;

            case"frameNumber":
                setFrameNumber(event.target.value)
                break;

            case"engine":
                setEngine(event.target.value)
                break;

            default:
                break;

        }

    }

    const handleOpen = () => {

        setFilterDialogIsOpen(true)

    }

    const handleClose = () => {

        if (locationArray[1] && brandsArray.length > 0) {
            setBrand(brandsArray.indexOf(locationArray[1]))
        }

        if (locationArray[2] && modelsArray.length > 0) {
            setModel(modelsArray.indexOf(locationArray[2]))
        }

        if (locationArray[3] && partNamesArray.length > 0) {
            const ind = Object.keys(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]).indexOf(locationArray[3])
            setPartName(ind)
        }

        if (frameNumbersArray.length > 0 && !frameNumber && locationArray[4] && locationArray[4] !== "allFrames") {
            setFrameNumber(frameNumbersArray.indexOf(locationArray[4]))
        }

        if (enginesArray.length > 0 && !engine && locationArray[5] && locationArray[5] !== "allEngines") {
            console.log("setEngine")
            setEngine(enginesArray.indexOf(locationArray[5]))
        }

        setFilterDialogIsOpen(false)

    }

    const handleApplyFilter = () => {

        const getBrandHref = () => {

            if (brand) {
                return `/${brandsArray[brand]}`
            } else {
                return "/allBrands"
            }

        }

        const getModelHref = () => {

            if (model) {
                return `/${modelsArray[model]}`
            } else {
                return "/allModels"
            }

        }

        const getPartNameHref = () => {

            if (partName) {
                if (partNamesArray[partName]) {
                    return `/${partNamesArray[partName].partHref}`
                } else return "/allParts"
            } else {
                return "/allParts"
            }

        }

        const getFrameHref = () => {

            if (frameNumber) {
                return `/${frameNumbersArray[frameNumber]}`
            } else {
                return "/allFrames"
            }

        }

        const getEngineHref = () => {

            if (engine) {
                return `/${enginesArray[engine]}`
            } else {
                return "/allEngines"
            }

        }

        console.log(getPartNameHref())

        history.push(getBrandHref() + getModelHref() + getPartNameHref() + getFrameHref() + getEngineHref())
        handleClose()

    }

    return (
        <FeedFilterView filterDialogIsOpen={filterDialogIsOpen}
                        matches={props.matches}
                        locationArray={locationArray}
                        brandsArray={brandsArray}
                        brand={brand}
                        modelsArray={modelsArray}
                        model={model}
                        partNamesArray={partNamesArray}
                        partName={partName}
                        frameNumbersArray={frameNumbersArray}
                        frameNumber={frameNumber}
                        enginesArray={enginesArray}
                        engine={engine}
                        handleChange={handleChange}
                        handleClose={handleClose}
                        handleApplyFilter={handleApplyFilter}
                        handleOpen={handleOpen}
        />
    )
}

export default FeedFilter