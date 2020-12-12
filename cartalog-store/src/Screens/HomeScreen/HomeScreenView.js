import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent/NavBarComponent";
import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import PartNamesComponent from "../../Components/PartNamesComponent/PartNamesComponent";
import PartsFeedComponent from "../../Components/PartsFeedComponent/PartsFeedComponent";
import CartComponent from "../../Components/CartComponent/CartComponent";
import FooterComponent from "../../Components/FooterComponent/FooterComponent";
import InfoComponent from "../../Components/InfoComponent/InfoComponent";
import PartDetailedComponent from "../../Components/PartDetailedComponent/PartDetailedComponent";
import {useLocation,useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    }

}))

const HomeScreen = (props) => {

    const classes = useStyles()
    const matches = props.matches
    const darkMode = props.darkMode
    const setDarkMode = props.setDarkMode
    const cartState = props.cartState
    const setCartState = props.setCartState
    const filterState = props.filterState
    const setFilterState = props.setFilterState
    const partsState = props.partsState
    const setPartsState = props.setPartsState

    const locationArray = useLocation().pathname.split("/")
    const history = useHistory()

    return (
        <div className={classes.root}>

            <HeaderComponent matches={matches}
                             darkMode={darkMode}
                             setDarkMode={setDarkMode}
                             cartState={cartState}
            />

            <NavBarComponent matches={matches}/>

            <FilterComponent matches={matches}
                             filterState={filterState}
                             setFilterState={setFilterState}
                             locationArray={locationArray}
                             history={history}
            />

            <PartNamesComponent filterState={filterState}
                                setFilterState={setFilterState}
                                matches={matches}
            />

            <PartsFeedComponent matches={matches}
                                filterState={filterState}
                                partsState={partsState}
                                setFilterState={setFilterState}
                                setPartsState={setPartsState}
                                locationArray={locationArray}
                                history={history}
            />

            <PartDetailedComponent matches={matches}
                                   partsState={partsState}
                                   cartState={cartState}
                                   setPartsState={setPartsState}
                                   setCartState={setCartState}

            />

            <CartComponent cartState={cartState}
                           setCartState={setCartState}/>

            <InfoComponent/>

            <FooterComponent/>

        </div>
    )

}

export default HomeScreen