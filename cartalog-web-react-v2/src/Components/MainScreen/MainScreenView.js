import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TopAppBar from "../common/TopAppBar/TopAppBar";
import Grid from "@material-ui/core/Grid";
import RequestsSidebar from "./RequestsSidebar/RequestsSidebar";
import ChatComponent from "./ChatComponent/ChatComponent";
import RightSideMenu from "./RightSideMenu/RightSideMenu";
import bckgrImg from "../../assets/backgr.jpg"

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        minHeight: "100vh",
        background: `url(${bckgrImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow:"hidden"
    }

}))

const MainScreenView = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData
    const request = props.request
    const answeredRequests = props.answeredRequests

    const classes = useStyles()

    return (

        <div className={classes.root}>

            <TopAppBar/>

            <Grid container spacing={0}>

                <Grid item lg={3} sm={3} md={3} xl={3} xs={3}>

                    <RequestsSidebar requestsDataset={requestsDataset}
                                     answeredRequests={answeredRequests}
                    />

                </Grid>

                <Grid item lg={6} sm={6} md={6} xl={6} xs={6}>

                    {request
                        ? <ChatComponent requestsDataset={requestsDataset}
                                         partnerData={partnerData}
                                         request={request}
                        />
                        : <div/>
                    }

                </Grid>

                <Grid item lg={3} sm={3} md={3} xl={3} xs={3}>

                    {request
                        ? <RightSideMenu request={request}
                                         partnerData={partnerData}
                        />
                        : <div/>
                    }

                </Grid>

            </Grid>

        </div>

    )

}

export default MainScreenView