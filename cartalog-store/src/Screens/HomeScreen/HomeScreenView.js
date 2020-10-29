import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import Grid from "@material-ui/core/Grid";
import CarPickerComponent from "../../Components/CarPickerComponent/CarPickerComponent";
import NavBarComponentView from "../../Components/NavBarComponent/NavBarComponentView";
import NavBarComponent from "../../Components/NavBarComponent/NavBarComponent";

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

    const carBrands = props.carBrands
    const carModels = props.carModels

    return (
        <div className={classes.root}>

            <HeaderComponent/>

            <NavBarComponent/>

            <CarPickerComponent carBrands={carBrands}
                                carModels={carModels}
            />


        </div>
    )

}

export default HomeScreenView