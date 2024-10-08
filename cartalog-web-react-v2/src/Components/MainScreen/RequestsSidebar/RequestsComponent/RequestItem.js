import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({

    requestItemContainer1: {
        width: `calc(100% - ${2 * theme.spacing(2)}px)`,
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
        width: `calc(100% - ${2 * theme.spacing(2)}px)`,
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
        width: `calc(100% - ${2 * theme.spacing(2)}px)`,
        height: 64,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#98e79f"
    },
    titleContainer: {
        width: "85%"
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
        width: "15%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-en d",
        justifyContent: "space-between",
        height: "100%"
    },
    timeText: {
        textAlign: "right",
        fontSize: 14,
        fontWeight: 500,
        color: "#808080",
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
    const answeredRequests = props.answeredRequests
    const newMessages = props.newMessages

    const classes = useStyles()

    const history = useHistory()
    const location = useLocation()

    const handleUserRequestClick = () => {

        history.push(`/request/${request.key}`)

    }

    const renderTime = (timestamp) => {

        const answeredRequestsKeys = Object.keys(answeredRequests)

        const getTimestamp = () => {

            if(!answeredRequestsKeys.includes(request.key)){
                return timestamp
            } else {

                const index = answeredRequestsKeys.indexOf(request.key)
                const vals = Object.values(answeredRequests)

                if(vals[index]===0){
                    return timestamp
                } else {
                    return vals[index]
                }

            }

        }

        const today = new Date().toLocaleDateString("ru")
        const date = new Date(getTimestamp()).toLocaleDateString("ru")
        const time = new Date(getTimestamp()).toLocaleTimeString("ru").slice(0, -3)

        const day = new Date(getTimestamp()).getDate()
        const month = new Date(getTimestamp()).getMonth() + 1

        const getMonth = () => {

            switch (month) {

                case 1:
                    return ("янв")

                case 2:
                    return ("фев")

                case 3:
                    return ("мар")

                case 4:
                    return ("апр")

                case 5:
                    return ("май")

                case 6:
                    return ("июн")

                case 7:
                    return ("июл")

                case 8:
                    return ("авг")

                case 9:
                    return ("сент")

                case 10:
                    return ("окт")

                case 11:
                    return ("нояб")

                case 12:
                    return ("дек")

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

        const locationArr = location.pathname.split("/")

        if (locationArr[2] === request.key) {

            return classes.requestItemContainerClicked

        } else if (answeredRequests) {

            const answeredRequestsArr = Object.keys(answeredRequests)

            if (answeredRequestsArr.includes(request.key)) {

                return classes.requestItemContainer1

            } else return classes.requestItemContainer2

        }

    }

    const renderOffersCount = () => {

        if (newMessages) {

            const requestKey = request.key

            if (newMessages[requestKey]) {

                const count = newMessages[requestKey]

                if (count !== 0) {
                    return <div className={classes.newMessagesCount}>{count}</div>
                }

            }

        }

    }

    return (
        <div className={getContainerStyle()} onClick={handleUserRequestClick}>
            <div className={classes.titleContainer}>
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