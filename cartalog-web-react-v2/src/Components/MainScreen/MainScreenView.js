import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Content from "./Content/Content";

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#cee4ee",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }

}))

const MainScreenView = (props) => {

    const isLoggedIn = props.isLoggedIn
    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    const classes = useStyles()

    return (

        <div className={classes.root}>
            {isLoggedIn
                ? <Content requestsDataset={requestsDataset}
                           partnerData={partnerData}
                />
                : <CircularProgress/>
            }
        </div>

    )

}

export default MainScreenView