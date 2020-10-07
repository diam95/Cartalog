import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TopAppBar from "../../TopAppBar/TopAppBar";
import Grid from "@material-ui/core/Grid";
import SideBar from "../../SideBar/SideBar";
import TheTable from "./TheTable/TheTable";

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#cee4ee"
    },
    sidebarContainer:{
        width:"100%",
        display:"flex",
        justifyContent:"flex-end"
    }

}))

const ContentView = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    const classes = useStyles()

    return (

        <div className={classes.root}>

            <TopAppBar/>

            <Grid container spacing={0}>

                <Grid item lg={3}>
                    <div className={classes.sidebarContainer}>
                        <SideBar/>
                    </div>
                </Grid>

                <Grid item lg={6}>

                    <TheTable requestsDataset={requestsDataset}
                              partnerData={partnerData}
                    />

                </Grid>

                <Grid item lg={3}>

                </Grid>

            </Grid>

        </div>

    )

}

export default ContentView