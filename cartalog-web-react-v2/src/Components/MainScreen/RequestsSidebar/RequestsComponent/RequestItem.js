import React from "react";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({

    requestItemContainer1: {
        height: 64,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
            background: "#eee"
        }
    },
    requestItemContainer2: {
        height: 64,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
            background: "#eee"
        },
        background:"#dedede"
    },
    requestItemTitle: {
        margin: 0,
        padding: 0,
        fontSize: 18,
        fontWeight: 600,
        color: "black"
    },
    requestItemSubtitle: {
        fontSize: 16,
        fontWeight: 400,
        color: "#505050"
    },
    spacer: {
        height: 15
    },
    timeContainer: {
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-end",
        justifyContent:"space-between",
        height: "100%"
    },
    timeText: {
        marginTop:theme.spacing(1)
    },
    newMessagesCount: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        background:"#273889",
        color:"white",
        padding:3,
        minWidth:15,
        borderRadius:100,
        marginBottom:theme.spacing(1)
    }

}))

const RequestItem = (props) => {

    const request = props.request
    const partnerData = props.partnerData

    const classes = useStyles()

    const history = useHistory()

    const handleUserRequestClick = () => {

        history.push(`/request/${request.key}`)

    }

    const renderTime = (timestamp) => {

        const today = new Date().toLocaleDateString("ru")
        const date = new Date(timestamp).toLocaleDateString("ru")
        const time = new Date(timestamp).toLocaleTimeString("ru").slice(0, -3)

        if (today === date) {

            return time

        } else {

            const relativeTime = moment(timestamp).locale("RU").startOf('days').fromNow();
            return relativeTime

        }

    }

    const getContainerStyle = () => {

        if (partnerData.answeredRequests){

            const answeredRequests = Object.keys(partnerData.answeredRequests)
            if (answeredRequests.includes(request.key)){
                return classes.requestItemContainer1
            } else return classes.requestItemContainer2

        }

    }

    const renderOffersCount = () => {

        if (partnerData.answeredRequests){

            const answeredRequests = Object.keys(partnerData.answeredRequests)
            if(answeredRequests.includes(request.key)){

                const index = answeredRequests.indexOf(request.key)
                const count = Object.values(partnerData.answeredRequests)[index]

                if(count!==0){
                    return <div className={classes.newMessagesCount}>{count}</div>
                }

            }

        }

    }

    return (
        <div className={getContainerStyle()} onClick={handleUserRequestClick}>
            <div>
                <div
                    className={classes.requestItemTitle}>{request.make} {request.model} {request.year}, {request.VIN}</div>
                <div className={classes.requestItemSubtitle}>{request.description}</div>
            </div>

            <div className={classes.timeContainer}>
                <div className={classes.timeText}>{renderTime(-request.timestamp)}</div>
                {renderOffersCount()}
            </div>
        </div>
    )

}

export default RequestItem