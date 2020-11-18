import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import NavBarComponent from "../../Components/NavBarComponent/NavBarComponent";
import PartsFeedComponent from "../../Components/PartsFeedComponent/PartsFeedComponent";
import PartNamesComponent from "../../Components/PartNamesComponent/PartNamesComponent";
import FooterComponent from "../../Components/FooterComponent/FooterComponent";
import PartDetailedComponent from "../../Components/PartDetailedComponent/PartDetailedComponent";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
    }

}))

const HomeScreenView = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <HeaderComponent darkMode={props.darkMode}
                             matches={props.matches}
                             setDarkMode={props.setDarkMode}/>

            <NavBarComponent matches={props.matches}
            />

            <FilterComponent filterState={props.filterState}
                             partsState={props.partsState}
                             matches={props.matches}
                             setPartsState={props.setPartsState}
            />

            <PartNamesComponent filterState={props.filterState}
                                partsState={props.partsState}
                                matches={props.matches}
            />

            <PartsFeedComponent partsState={props.partsState}
                                setFilterState={props.setFilterState}
                                setPartsState={props.setPartsState}
                                filterState={props.filterState}
                                matches={props.matches}
            />

            <PartDetailedComponent partsState={props.partsState}
                                   setPartsState={props.setPartsState}
                                   matches={props.matches}
            />

            <FooterComponent/>

        </div>
    )

}

export default HomeScreenView