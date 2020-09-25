import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TopAppBar from "./TopAppBar/TopAppBar";
import Grid from "@material-ui/core/Grid";
import SideBar from "./SideBar/SideBar";
import TheTable from "./TheTable/TheTable";
import MainScreen from "../MainScreen";
const useStyles = makeStyles(()=>({

    root:{
        width:"100%",
        minHeight:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start"
    }

}))

const ContentView = (props) => {

    const citiesArray = props.citiesArray
    const selectedCity = props.selectedCity
    const setSelectedCity = props.setSelectedCity
    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    const classes = useStyles()

    return(

        <div className={classes.root}>

            <TopAppBar citiesArray={citiesArray}
                       selectedCity={selectedCity}
                       setSelectedCity={setSelectedCity}
                       partnerData={partnerData}
            />

            <Grid container>

                <Grid item lg={2}>
                    <SideBar/>
                </Grid>

                <Grid item lg={8}>
                    <TheTable requestsDataset={requestsDataset}
                              partnerData={partnerData}
                    />
                </Grid>

                <Grid item lg={2}>
                    Right Side Bar
                </Grid>

            </Grid>

        </div>

    )

}

export default ContentView