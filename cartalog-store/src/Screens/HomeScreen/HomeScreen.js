import React from 'react'
import HomeScreenView from "./HomeScreenView";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const HomeScreen = (props) => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'),{noSsr:true});

    return (
        <HomeScreenView filterState={props.filterState}
                        setFilterState={props.setFilterState}
                        partsState={props.partsState}
                        setPartsState={props.setPartsState}
                        darkMode={props.darkMode}
                        setDarkMode={props.setDarkMode}
                        matches={matches}
                        setCartState={props.setCartState}
                        cartState={props.cartState}
        />
    )

}

export default HomeScreen