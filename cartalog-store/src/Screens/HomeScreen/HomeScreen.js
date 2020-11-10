import React from 'react'
import HomeScreenView from "./HomeScreenView";

const HomeScreen = (props) => {

    return (
        <HomeScreenView filterState={props.filterState}
                        setFilterState={props.setFilterState}
                        partsState={props.partsState}
                        setPartsState={props.setPartsState}
        />
    )

}

export default HomeScreen