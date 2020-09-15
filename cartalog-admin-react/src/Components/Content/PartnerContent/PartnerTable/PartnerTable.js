import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {makeStyles} from "@material-ui/core/styles";
import * as firebase from "firebase";
import ChatDialog from "./ChatDialog/ChatDialog";

const useStyles = makeStyles((theme) => ({

    root: {
        margin: theme.spacing(1),
    }

}));

const PartnerTable = (props) => {

    console.log('<PartnerTable/>');

    const classes = useStyles();
    const partner = props.partner;
    const store = props.store;

    const [requestDataset, setRequestDataset] = useState([]);
    const [clickedRequest, setClickedRequest] = useState({});

    console.log(requestDataset);

    useEffect(() => {

        console.log(partner);
        console.log(store);

        const vendorID = partner.uid;

        const requests = store.requests;
        console.log(requests);

        const requestsMagadan = requests.magadan;
        console.log(requestsMagadan);

        const type = partner.type;
        const requestsMagadanType = requestsMagadan[type];
        console.log(requestsMagadanType);

        const partners2 = store.partners2;
        console.log(partners2);

        const vendorObj = partners2[vendorID];
        console.log(vendorObj);

        if (vendorObj){

            const answeredRequests = vendorObj.answeredRequests;
            console.log(answeredRequests);

            if (answeredRequests){

                const answeredRequestsKeys = Object.keys(answeredRequests);
                console.log(answeredRequestsKeys);

                const requestDataset = [];
                answeredRequestsKeys.forEach(key => {

                    console.log(requestsMagadanType[key]);
                    console.log(key);

                    requestDataset.push(requestsMagadanType[key]);

                    if (requestDataset.length === answeredRequestsKeys.length){
                        setRequestDataset(requestDataset.reverse())
                    }

                })

            } else {
                setRequestDataset([])
            }

        } else {
            setRequestDataset([])
        }

    }, [partner, store]);

    const handleRowClick= (id) => {

        const request = requestDataset[id];

        setClickedRequest(request);

    };

    return (
        <div className={classes.root}>
            <MaterialTable
                columns={[
                    {title: 'Марка', field: 'make'},
                    {title: 'Модель', field: 'model'},
                    {title: 'Год', field: 'year'},
                    {title: 'VIN', field: 'VIN'},
                    {title: 'Описание', field: 'description'}
                ]}
                data={requestDataset}
                onRowClick={(event, rowData) => {
                    handleRowClick(rowData.tableData.id);
                }}
                title="Ответы"/>
                <ChatDialog clickedRequest={clickedRequest} setClickedRequest={setClickedRequest} store={store} vendorID={partner.uid}/>
        </div>
    )

};

export default PartnerTable;
