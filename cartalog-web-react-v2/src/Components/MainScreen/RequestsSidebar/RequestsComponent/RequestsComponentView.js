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

    const sortedDataset = props.sortedDataset
    const answeredRequests = props.answeredRequests
    const newMessages = props.newMessages

    const classes = useStyles()

    const renderRequests = () => {

        if (sortedDataset.length > 0) {

            return sortedDataset.map((request) => {

                return <RequestItem request={request}
                                    answeredRequests={answeredRequests}
                                    key={request.key}
                                    newMessages={newMessages}
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