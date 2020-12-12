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

    const [frameNumbersArray, setFrameNumbersArray] = useState([]);
    const [frameNumber, setFrameNumber] = useState(undefined);

    const [enginesArray, setEnginesArray] = useState([]);
    const [engine, setEngine] = useState(undefined);

    useEffect(() => {

        if (filterState.all_brands) {
            setBrandsArray(filterState.all_brands)
        }

        if(brand){
            if (filterState.all_models[brandsArray[brand]]) {
                setModelsArray(filterState.all_models[brandsArray[brand]])
            }else {

                const modelsRef = firebase.database().ref

            }
        } else {
            if (filterState.all_models[locationArray[1]]) {
                setModelsArray(filterState.all_models[locationArray[1]])
            } 
        }

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

    }, [locationArray, filterState, partsFeedListForFilter, brand])

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
                const ind = Object.keys(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]).indexOf(locationArray[3])
                setPartName(ind)
            }

        }

        if (frameNumbersArray.length > 0 && !frameNumber) {
            setFrameNumber(frameNumbersArray.indexOf(locationArray[4]))
        }

        if (enginesArray.length > 0 && !engine) {
            setEngine(enginesArray.indexOf(locationArray[5]))
        }

    }, [brandsArray, brand, locationArray, modelsArray, model, partNamesArray.length, partName, partNamesArray, filterState.parts_filter_detailed, frameNumbersArray, frameNumber, enginesArray, engine])

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

        if (locationArray[4] && frameNumbersArray.length > 0) {
            console.log(frameNumbersArray)
            console.log(frameNumbersArray.indexOf(locationArray[4]));
            setFrameNumber(frameNumbersArray.indexOf(locationArray[4]))
        }

        if (locationArray[5] && enginesArray.length > 0) {
            setFrameNumber(enginesArray.indexOf(locationArray[5]))
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