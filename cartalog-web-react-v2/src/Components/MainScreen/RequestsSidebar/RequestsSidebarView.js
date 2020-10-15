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

    const sortedDataset = props.sortedDataset
    const answeredRequests = props.answeredRequests
    const newMessages = props.newMessages

    return (

        <div className={classes.root}>

            <Searchbar/>

            <Divider/>

            <RequestsComponent sortedDataset={sortedDataset}
                               answeredRequests={answeredRequests}
                               newMessages={newMessages}
            />

        </div>

    )

}

export default RequestsSidebarView