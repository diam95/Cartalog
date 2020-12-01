import React from 'react'
import HomeScreenView from "./HomeScreenView";

const HomeScreen = (props) => {

    const matches = props.matches
    const setDarkMode = props.setDarkMode
    const darkMode = props.darkMode
    const cartState = props.cartState
    const setCartState = props.setCartState
    const filterState = props.filterState
    const setFilterState = props.setFilterState
    const partsState= props.partsState
    const setPartsState= props.setPartsState

    return (
        <HomeScreenView matches={matches}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        cartState={cartState}
                        setCartState={setCartState}
                        filterState={filterState}
                        setFilterState={setFilterState}
                        partsState={partsState}
                        setPartsState={setPartsState}
        />
    )

}

export default HomeScreen