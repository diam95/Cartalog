import React from "react";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({

    requestItemContainer1: {
        width:`calc(100% - ${2 * theme.spacing(2)}px)`,
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
        width:`calc(100% - ${2 * theme.spacing(2)}px)`,
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
        background: "#dedede"
    },
    requestItemContainerClicked: {
        width:`calc(100% - ${2 * theme.spacing(2)}px)`,
        height: 64,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#a7c1ec"
    },
    titleContainer:{
        width:"85%"
    },
    requestItemTitle: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        margin: 0,
        padding: 0,
        fontSize: 18,
        fontWeight: 600,
        color: "black"
    },
    requestItemSubtitle: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: 16,
        fontWeight: 400,
        color: "#505050"
    },
    spacer: {
        height: 15
    },
    timeContainer: {
        width:"15%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-en d",
        justifyContent: "space-between",
        height: "100%"
    },
    timeText: {
        textAlign:"right",
        fontSize:14,
        fontWeight:500,
        color:"#808080",
        marginTop: theme.spacing(1)
    },
    newMessagesCount: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#273889",
        color: "white",
        padding: 3,
        minWidth: 15,
        borderRadius: 100,
        marginBottom: theme.spacing(1)
    }

}))

const RequestItem = (props) => {

    const request = props.request
    const partnerData = props.partnerData
    const id = props.id
    const setClickedRequestInd = props.setClickedRequestInd
    const clickedRequestInd = props.clickedRequestInd

    const classes = useStyles()

    const history = useHistory()

    const handleUserRequestClick = () => {

        setClickedRequestInd(id)
        history.push(`/request/${request.key}`)

    }

    const renderTime = (timestamp) => {

        const today = new Date().toLocaleDateString("ru")
        const date = new Date(timestamp).toLocaleDateString("ru")
        const time = new Date(timestamp).toLocaleTimeString("ru").slice(0, -3)

        const day = new Date(timestamp).getDate()
        const month = new Date(timestamp).getMonth() + 1

        const getMonth = () => {

            switch (month){

                case 1:
                    return("янв")

                case 2:
                    return("фев")

                case 3:
                    return("мар")

                case 4:
                    return("апр")

                case 5:
                    return("май")

                case 6:
                    return("июн")

                case 7:
                    return("июл")

                case 8:
                    return("авг")

                case 9:
                    return("сент")

                case 10:
                    return("окт")

                case 11:
                    return("нояб")

                case 12:
                    return("дек")

                default:
                    return "мес"

            }

        }

        if (today === date) {

            return time

        } else {

            return day + " " + getMonth()

        }

    }

    const getContainerStyle = () => {

        if(clickedRequestInd===id){
            return classes.requestItemContainerClicked
        } else {

            if (partnerData.answeredRequests) {

                const answeredRequests = Object.keys(partnerData.answeredRequests)
                if (answeredRequests.includes(request.key)) {
                    return classes.requestItemContainer1
                } else return classes.requestItemContainer2

            }

        }

    }

    const renderOffersCount = () => {

        if (partnerData.answeredRequests) {

            const answeredRequests = Object.keys(partnerData.answeredRequests)
            if (answeredRequests.includes(request.key)) {

                const index = answeredRequests.indexOf(request.key)
                const count = Object.values(partnerData.answeredRequests)[index]

                if (count !== 0) {
                    return <div className={classes.newMessagesCount}>{count}</div>
                }

            }

        }

    }

    return (
        <div className={getContainerStyle()} onClick={handleUserRequestClick}>
            <div className={classes.titleContainer}>
                <div className={classes.requestItemTitle}>{request.make} {request.model} {request.year}, {request.VIN}</div>
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