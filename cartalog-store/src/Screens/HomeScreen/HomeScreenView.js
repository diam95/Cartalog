import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import NavBarComponent from "../../Components/NavBarComponent/NavBarComponent";
import PartsFeedComponent from "../../Components/PartsFeedComponent/PartsFeedComponent";
import PartNamesComponent from "../../Components/PartNamesComponent/PartNamesComponent";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }

}))

const HomeScreenView = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <HeaderComponent/>

            <NavBarComponent/>

            <FilterComponent filterState={props.filterState}
                             partsState={props.partsState}
                             setPartsState={props.setPartsState}
            />

            <PartNamesComponent filterState={props.filterState}/>

            <PartsFeedComponent partsState={props.partsState}
                                setFilterState={props.setFilterState}
                                setPartsState={props.setPartsState}
                                filterState={props.filterState}
            />


        </div>
    )

}

export default HomeScreenView