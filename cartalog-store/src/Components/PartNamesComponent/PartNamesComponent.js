import React, {useEffect, useState} from 'react'
import PartNamesComponentView from "./PartNamesComponentView";
import {useLocation} from 'react-router-dom'

const PartNamesComponent = (props) => {

    const filterState = props.filterState

    const [parts_filter, setPartsFilter] = useState({});
    const [_height, setHeight] = useState({height: 2000});

    const location = useLocation()

    useEffect(() => {

        if (location.pathname.split("/").length === 3) {

            const brand = location.pathname.split("/")[1]
            const model = location.pathname.split("/")[2]

            if (filterState.parts_filter_detailed[brand]) {

                if (filterState.parts_filter_detailed[brand][model]) {

                    const temp = filterState.parts_filter_detailed[brand][model]

                    const partsFilterTemp = {}
                    temp.forEach(partName => {

                        const href = Object.keys(filterState.parts_filter)[Object.values(filterState.parts_filter).indexOf(partName)]
                        partsFilterTemp[href] = partName

                    })

                    setPartsFilter(partsFilterTemp)

                }

            }

        } else if (location.pathname.split("/")[1] === "partsFilter") {
            setPartsFilter(filterState.parts_filter)
        } else {
            setPartsFilter({})
        }

    }, [location, filterState])

    useEffect(() => {

        const count = Object.keys(parts_filter).length * 16
        setHeight({height: count})

    }, [parts_filter])

    return (
        <PartNamesComponentView parts_filter={parts_filter} _height={_height}/>
    )

}

export default PartNamesComponent