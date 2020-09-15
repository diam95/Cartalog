import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import PartnerInfoCard from "./PartnerInfoCard/PartnerInfoCard";
import PartnerCard from "./PartnerCard/PartnerCard";
import PartnerTable from "./PartnerTable/PartnerTable";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
},
    main:{
        display:'flex',
        flexDirection:'column'
    },
    cube: {
        flexGrow: 1,
        margin: theme.spacing(1),
    }
}));

const PartnerContent = (props) => {

    console.log('<PartnerContent/>');

    const classes = useStyles();

    const partner = props.clickedPartner;

    return (
        <div className={classes.main}>

            <div className={classes.root}>

                <div className={classes.cube}>
                    <PartnerCard partner={partner}/>
                </div>

                <div className={classes.cube}>
                    <PartnerInfoCard partner={partner} store={props.store}/>
                </div>

            </div>

            <div>
                <PartnerTable partner={partner} store={props.store}/>
            </div>

        </div>
    )

};

export default PartnerContent;
