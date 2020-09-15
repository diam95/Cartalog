import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        maxHeight: '80vh',
        overflow: 'auto',
    },
}));

const NamesListComponents = (props) => {

    console.log('<NamesListComponents/>');

    const classes = useStyles();

    const setClickedPartner = props.setCLickedPartner;

    const handleNameClick = (partner) => {

        switch (props.clickedSideMenu) {

            case 0:

                setClickedPartner();

                break;
            case 1:

                partner.type = 'autoparts';
                setClickedPartner(partner);

                break;

            case 2:

                partner.type = 'autoservice';
                setClickedPartner(partner);

                break;

            case 3:

                setClickedPartner();

                break;

            case 4:

                setClickedPartner();

                break;

        }

    };

    const namesList = () => {

        const partnersList = props.partnersList;

        const list = partnersList.map((partner) => {

            return (

                <ListItem button key={partner.uid} selected={props.clickedPartner.uid === partner.uid} onClick={() => {
                    handleNameClick(partner)
                }}>
                    <ListItemText primary={partner.name}/>
                </ListItem>

            )

        });

        return (list)

    };

    return (

        <div className={classes.root}>
            <List>
                {namesList()}
            </List>
        </div>

    )

};

export default NamesListComponents;
