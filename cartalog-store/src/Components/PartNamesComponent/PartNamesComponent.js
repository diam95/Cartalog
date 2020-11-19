import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import PartNamesComponentView from "./PartNamesComponentView";

const PartNamesComponent = (props) => {

    const filterState = props.filterState

    const [parts_filter, setPartsFilter] = useState({});

    const location = useLocation()

    useEffect(() => {


       if (location.pathname.split("/").length === 3) {

            if (location.pathname.split("/")[1] === "partsFilter") {

                setPartsFilter({})

            } else {

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
            }

        } else if (location.pathname.split("/")[1] === "partsFilter") {
            setPartsFilter(filterState.parts_filter)
        } else {
            setPartsFilter({})
        }

    }, [location, filterState])

    const renderContent = () => {

        if (location.pathname.includes("partsFilter") || location.pathname.split("/").length === 3) {
            return (
                <div><PartNamesComponentView parts_filter={parts_filter}
                                             matches={props.matches}/></div>

            )
        } else {
            return <div hidden={true}><PartNamesComponentView parts_filter={parts_filter}
                                                              matches={props.matches}/></div>
        }

    }

    return (
        <div style={{width: "100%"}}>
            {renderContent()}
        </div>
    )

}

export default PartNamesComponent