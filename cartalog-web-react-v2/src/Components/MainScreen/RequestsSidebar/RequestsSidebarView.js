import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Searchbar from "./Searchbar/Searchbar";
import {Divider} from "@material-ui/core";
import RequestsComponent from "./RequestsComponent/RequestsComponent";

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        height: `calc(100vh - 36px)`,
        backgroundColor: "white"
    }

}))

const RequestsSidebarView = (props) => {

    const classes = useStyles()

    const requestsDataset = props.requestsDataset
    const answeredRequests = props.answeredRequests

    return (

        <div className={classes.root}>

            <Searchbar/>

            <Divider/>

            <RequestsComponent requestsDataset={requestsDataset}
                               answeredRequests={answeredRequests}
            />

        </div>

    )

}

export default RequestsSidebarView