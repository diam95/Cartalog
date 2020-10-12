import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    root: {
        width:"100%",
        background:"white"
    },
    contentContainer:{
        padding: theme.spacing(2)
    },
    titleText: {
        fontWeight: 500,
        fontSize: "18",
        color: "black",
        marginLeft:5
    },
    subtitleText: {
        fontSize: 18,
        fontWeight: 400,
        color: "#6d6d6d"
    },
    requestContainer:{
        padding: theme.spacing(2),
        "&:hover":{
            background:"#eee"
        }
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
    requestsCount:{
        marginTop:theme.spacing(1),
        width:"100%",
        color:"green",
        textAlign:"center"
    }

}))

const UserInfoComponentView = (props) => {

    const phoneNumber = props.phoneNumber
    const userData = props.userData
    const userRequests = props.userRequests
    const request = props.request
    const handleRequestClick = props.handleRequestClick

    const classes = useStyles()

    const renderTime = (timestamp) => {

        const date = new Date(timestamp).toLocaleDateString("ru")
        const time = new Date(timestamp).toLocaleTimeString("ru").slice(0, -3)

        return time + " " + date

    }

    const renderRequests = () => {

        if(userRequests.length!==0){

            const requestView = (item) => {

                return(
                        <div className={classes.requestContainer} onClick={()=> {
                            handleRequestClick(item.key)
                        }}>
                            <div
                                className={classes.requestItemTitle}>{item.make} {item.model} {item.year}, {item.VIN}</div>
                            <div className={classes.requestItemSubtitle}>{item.description}</div>
                        </div>
                )

            }

            return userRequests.map((item) => {

                return requestView(item)

            })
        }

    }

    return (

        <div className={classes.root}>

            <div className={classes.contentContainer}>

                <div className={classes.subtitleText}>Дата создания заявки:
                    <span className={classes.titleText}>{renderTime(-request.timestamp)}</span>
                </div>
                <div className={classes.subtitleText}>Юзер:
                    <span className={classes.titleText}>{phoneNumber}</span>
                </div>
                <div className={classes.subtitleText}>Был онлайн:
                    <span className={classes.titleText}>{renderTime(userData.lastOnline)}</span>
                </div>
                <div className={classes.subtitleText}>Платформа:
                    <span className={classes.titleText}>{userData.client}</span>
                </div>

            </div>

            <Divider orientation={"horizontal"}/>

            <div className={classes.requestsContainer}>

                <div className={classes.requestsCount}>Заявки пользователя ({userRequests.length})</div>

                {renderRequests()}

            </div>

        </div>

    )

}

export default UserInfoComponentView