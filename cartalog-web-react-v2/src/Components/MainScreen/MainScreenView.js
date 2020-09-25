import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Content from "./Content/Content";
import MainScreen from "./MainScreen";

const useStyles = makeStyles(()=>({

    root:{
        width:"100%",
        minHeight:"100vh",
        backgroundColor:"#fafafa",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    }

}))

const MainScreenView = (props) => {

    const isLoggedIn = props.isLoggedIn
    const citiesArray = props.citiesArray
    const selectedCity = props.selectedCity
    const setSelectedCity = props.setSelectedCity
    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    const classes = useStyles()

    return(

        <div className={classes.root}>
            {isLoggedIn
                ?<Content
                    citiesArray={citiesArray}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    requestsDataset={requestsDataset}
                    partnerData={partnerData}
                />
                :<CircularProgress/>
            }
        </div>

    )

}

export default MainScreenView