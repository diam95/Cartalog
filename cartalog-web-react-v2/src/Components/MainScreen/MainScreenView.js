import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TopAppBar from "../common/TopAppBar/TopAppBar";
import Grid from "@material-ui/core/Grid";
import RequestsSidebar from "./RequestsSidebar/RequestsSidebar";
import ChatComponent from "./ChatComponent/ChatComponent";
import RightSideMenu from "./RightSideMenu/RightSideMenu";

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#cee4ee",
        overflow:"hidden"
    }

}))

const MainScreenView = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData
    const request = props.request

    const classes = useStyles()

    return (

        <div className={classes.root}>

            <TopAppBar/>

            <Grid container spacing={0}>

                <Grid item lg={3}>

                    <RequestsSidebar requestsDataset={requestsDataset}
                                     partnerData={partnerData}
                    />

                </Grid>

                <Grid item lg={6}>

                    <ChatComponent requestsDataset={requestsDataset}
                                   partnerData={partnerData}
                                   request={request}
                    />

                </Grid>

                <Grid item lg={3}>

                    <RightSideMenu request={request}
                    />

                </Grid>

            </Grid>

        </div>

    )

}

export default MainScreenView