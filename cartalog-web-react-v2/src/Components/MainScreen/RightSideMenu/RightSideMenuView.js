import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import UserInfoComponent from "./UserInfoComponent/UserInfoComponent";
import PartLinksComponent from "./PartLinksComponent/PartLinksComponent";

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        height: `calc(100vh - 36px)`,
        background:"#cecece"
    }

}))

const RightSideMenuView = (props) => {

    const classes = useStyles()

    const request = props.request
    const partnerData = props.partnerData

    return (

        <div className={classes.root}>

            <UserInfoComponent request={request}
                               partnerData={partnerData}
            />

            <PartLinksComponent partnerData={partnerData}
                                request={request}
            />

        </div>

    )

}

export default RightSideMenuView