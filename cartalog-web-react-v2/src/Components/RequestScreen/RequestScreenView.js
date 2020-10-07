import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Divider} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import {useHistory} from 'react-router-dom';
import ChatComponent from "./ChatComponent/ChatComponent";
import ChatInputComponent from "./ChatInputComponent/ChatInputComponent";
import TopAppBar from "../TopAppBar/TopAppBar";
import Grid from "@material-ui/core/Grid";
import SideBar from "../SideBar/SideBar";
import SideMenu from "../SideMenu/SideMenu";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({

    root: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#cee4ee"
    },
    header: {
        width: "100%",
        height: 64,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerButtonContainer: {
        height: "100%",
        width: "25%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "grab"
    },
    headerBackButton: {
        height: "100%",
        width: 200,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        "&:hover": {
            background: "linear-gradient(90deg, rgba(234,240,242,1) 0%, rgba(255,255,255,1) 100%)"
        },
        paddingLeft: 15
    },
    headerBackButtonText: {
        fontWeight: 400,
        fontSize: 18,
        color: "#6f6f6f"
    },
    requestTitleContainer: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    requestTitleTitleText: {
        fontSize: 18,
        fontWeight: 600,
        color: "black"
    },
    requestTitleSubtitleText: {
        fintSize: 18,
        fontWeight: 400,
        color: "#6f6f6f"
    },
    actionsContainer: {
        height: "100%",
        width: "25%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 15
    },
    paperRoot: {
        height: "70vh",
        marginTop: theme.spacing(2)
    },
    sidebarContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    titleProgressContainer:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }

}))


const RequestScreenView = (props) => {

    const classes = useStyles()

    const partnerData = props.partnerData
    const request = props.request

    const history = useHistory()

    const renderRequestScreenHeader = () => {

        const renderBackButton = () => {

            const handleBackClick = () => {

                history.push("/")

            }

            return (
                <div className={classes.headerButtonContainer} onClick={() => {
                    handleBackClick()
                }}>
                    <div className={classes.headerBackButton}>
                        <ArrowBackIosIcon fontSize={"small"} color={"disabled"}/>
                        <div className={classes.headerBackButtonText}>Назад</div>
                    </div>
                </div>
            )

        }

        const renderRequestTitle = () => {

            if (request.make) {
                return (
                    <div className={classes.requestTitleContainer}>
                        <div className={classes.requestTitleTitleText}>
                            {request.make} {request.model} {request.year}, {request.VIN}
                        </div>
                        <div className={classes.requestTitleSubtitleText}>
                            {request.description}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className={classes.titleProgressContainer}>
                        <CircularProgress size={28}/>
                    </div>
                )
            }

        }

        const renderActions = () => {

            return (
                <div className={classes.actionsContainer}>
                    <AirlineSeatReclineNormalIcon/>
                    <AssistantPhotoIcon/>
                </div>
            )

        }

        return (
            <div className={classes.header}>
                {renderBackButton()}
                {renderRequestTitle()}
                {renderActions()}
            </div>
        )

    }

    return (

        <div className={classes.root}>

            <TopAppBar/>

            <Grid container spacing={0}>

                <Grid item lg={3}>
                    <div className={classes.sidebarContainer}>
                        <SideBar/>
                    </div>
                </Grid>

                <Grid item lg={5}>

                    <Paper className={classes.paperRoot} elevation={1}>

                        {renderRequestScreenHeader()}
                        <Divider/>

                        <ChatComponent partnerData={partnerData}/>

                    </Paper>

                    <ChatInputComponent/>

                </Grid>

                <Grid item lg={3}>

                    <SideMenu/>

                </Grid>

                <Grid item lg={2}>

                </Grid>

            </Grid>

        </div>

    )

}

export default RequestScreenView