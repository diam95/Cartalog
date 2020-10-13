import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import RequestItem from "./RequestItem";

const useStyles = makeStyles((theme) => ({

    root: {
        width: "100%",
        height: `calc(100vh - 36px - 56px)`,
        overflowX:"hidden",
        overflowY:"auto"
    }

}))

const RequestsComponentView = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData
    const setClickedRequestInd = props.setClickedRequestInd
    const clickedRequestInd = props.clickedRequestInd

    const classes = useStyles()

    const renderRequests = () => {


        if (requestsDataset.length > 0) {

            return requestsDataset.map((request,id) => {

                return <RequestItem request={request}
                                    partnerData={partnerData}
                                    id={id}
                                    clickedRequestInd={clickedRequestInd}
                                    setClickedRequestInd={setClickedRequestInd}
                />

            })

        } else return <div className={classes.spacer}/>

    }

    return (

        <div className={classes.root}>
            {renderRequests()}
        </div>

    )

}

export default RequestsComponentView