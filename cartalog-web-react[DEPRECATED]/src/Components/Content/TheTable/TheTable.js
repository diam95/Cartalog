import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {makeStyles} from "@material-ui/core/styles";
import DialogNewMessage from "./Dialogs/DialogNewMessage";
import DialogChat from "./Dialogs/DialogChat";
import * as firebase from "firebase";
import * as moment from "moment";
import {useSnackbar, withSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    circle: {
        height: `8px`,
        width: `8px`,
        backgroundColor: `#5570bb`,
        borderRadius: `50%`,
        display: `inline-block`,
    },
    table: {},
    newMessagesCounter: {
        fontWeight: `bold`,
        fontSize: 16,
        color: `green`
    },
}));

function TheTable(props) {

    console.log(`<Table/>`);

    const classes = useStyles();
    const vendorData = props.vendorData;

    const [dialogNewMessageIsOpen, setDialogNewMessageIsOpen] = useState(false);
    const [dialogChatIsOpen, setDialogChatIsOpen] = useState(false);
    const [requestData, setRequestData] = useState(null);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [tableDataset, setTableDataset] = useState([]);

    const [requestsDataset, setRequestsDataset] = useState([]);
    const [answeredRequestsDataset, setAnsweredRequestsDataset] = useState([]);
    const [answeredRequests, setAnsweredRequests] = useState([]);

    const isLoading = requestsDataset.length === 0;

    //LOAD REQUEST DATASET
    useEffect(() => {

        const city = vendorData.city;
        const type = vendorData.type;

        const requestsRef = firebase.database().ref(`requests`).child(city).child(type);

        //INIT
        const initRequestDataset = () => {

            const tempDataset = [];
            let tempFirstRequestTimestamp = 0;

            const requestsRef = firebase.database().ref(`requests`).child(city).child(type);

            requestsRef.orderByChild(`timestamp`).limitToFirst(20).on(`child_added`, snap => {

                console.log(`child_added`);

                const request = snap.val();
                const requestTimestamp = request.timestamp;

                if (tempFirstRequestTimestamp === 0) {

                    tempFirstRequestTimestamp = requestTimestamp;

                }

                request.time = handleTime(requestTimestamp);
                tempDataset.push(request);

                const length = tempDataset.length;

                if (length === 20) {

                    setRequestsDataset(tempDataset);

                }

            });

        };

        if (requestsDataset.length === 0) {

            initRequestDataset();

        }

        return (() => {

            requestsRef.off(`child_added`);

        });

    }, [requestsDataset, vendorData]);
    
    //LOAD UPDATES AND HANDLE REMOVED REQUESTS
    useEffect(() => {

        if (requestsDataset.length > 0) {

            const city = vendorData.city;
            const type = vendorData.type;

            const requestsRef = firebase.database().ref(`requests`).child(city).child(type);


            const tempDataset = [...requestsDataset];

            const lastMessageTimestamp = requestsDataset[0].timestamp;

            const loadUpdates = () => {

                requestsRef.orderByChild(`timestamp`).endAt(lastMessageTimestamp - 1).on("child_added", snap => {

                    console.log(`child_added`);

                    const request = snap.val();
                    const timestamp = request.timestamp;

                    request.time = handleTime(timestamp);
                    tempDataset.unshift(request);

                    setRequestsDataset(tempDataset);

                });

                requestsRef.on("child_removed", snap => {

                    console.log(`child_removed`);

                    const deletedRequestKey = snap.key;

                    for (let i = 0; i < answeredRequests.length; i++) {

                        const requestKey = answeredRequests[i].requestKey;

                        if (requestKey === deletedRequestKey) {

                            const temp = [...answeredRequests];
                            temp.splice(i, 1);
                            setAnsweredRequests(temp);

                            const vendorID = vendorData.vendorID;
                            const answeredRequestsRef = firebase.database().ref(`partners2`).child(vendorID).child(`answeredRequests`);

                            answeredRequestsRef.child(deletedRequestKey).remove().then(r => {
                            });

                        }

                    }
                    
                    for (let i = 0; i < answeredRequestsDataset.length; i++) {

                        const requestKey = answeredRequestsDataset[i].key;

                        if (requestKey === deletedRequestKey) {

                            const temp = [...answeredRequestsDataset];
                            temp.splice(i, 1);
                            setAnsweredRequestsDataset(temp);

                        }

                    }

                    for (let i = 0; i < requestsDataset.length; i++) {

                        const requestKey = requestsDataset[i].key;

                        if (deletedRequestKey === requestKey) {

                            const tempDataset = [...requestsDataset];
                            tempDataset.splice(i, 1);

                            setRequestsDataset(tempDataset);

                        }

                    }

                })

            };

            loadUpdates();

            return (() => {

                requestsRef.off(`child_added`);
                requestsRef.off(`child_removed`);

            })

        }

    }, [vendorData, requestsDataset, answeredRequests, answeredRequestsDataset]);

    //LOAD ANSWERS
    useEffect(() => {

        const vendorID = vendorData.vendorID;
        const answeredRequestsRef = firebase.database().ref(`partners2`).child(vendorID).child(`answeredRequests`);

        const loadRequestAnswers = () => {

            const answeredRequestsTemp = [];
            const answeredRequestsKeys = [];

            let init = false;

            answeredRequestsRef.on(`child_added`, snap => {

                console.log(`child_added`);

                const obj = {requestKey: snap.key, count: snap.val()};

                answeredRequestsTemp.push(obj);
                answeredRequestsKeys.push(snap.key);

                if (init) {

                    setAnsweredRequests([...answeredRequestsTemp])

                }

            });

            answeredRequestsRef.once(`value`, snap => {

                console.log(`value`);

            }).then(r => {

                init = true;
                setAnsweredRequests(answeredRequestsTemp);

                answeredRequestsRef.on(`child_changed`, snap => {

                    console.log(`child_changed`);

                    const ind = answeredRequestsKeys.indexOf(snap.key);
                    answeredRequestsTemp[ind] = {requestKey: snap.key, count: snap.val()};

                    setAnsweredRequests([...answeredRequestsTemp]);

                });

                answeredRequestsRef.on(`child_removed`, snap => {

                    console.log(`child_removed`);

                    const ind = answeredRequestsKeys.indexOf(snap.key);
                    answeredRequestsTemp.splice(ind, 1);

                    setAnsweredRequests([...answeredRequestsTemp]);

                })

            });

        };

        loadRequestAnswers();

    }, [vendorData]);

    //NEW MESSAGE SNACKBAR
    useEffect(() => {

        if (requestsDataset.length !== 0) {

            const handleMessageSnackClick = (requestKey) => {

                const answeredRequestsKeys = [];

                requestsDataset.forEach(request => {

                    const key = request.key;

                    if (key === requestKey) {

                        setRequestData(request)

                    }

                });

                for (let i = 0; i < answeredRequests.length; i++) {

                    const answeredRequestKey = answeredRequests[i].requestKey;
                    answeredRequestsKeys.push(answeredRequestKey);

                    if (answeredRequestsKeys.length === answeredRequests.length) {

                        if (answeredRequestsKeys.includes(requestKey)) {

                            setDialogChatIsOpen(true);
                            closeSnackbar(requestKey);

                        }

                    }

                }

            };

            const vendorID = vendorData.vendorID;

            const lastMessageRef = firebase.database().ref(`partners2`).child(vendorID);

            lastMessageRef.orderByKey().equalTo(`lastMessage`).on(`child_added`, snap => {

                console.log(`child_added`);

                const message = (snap.val());

                for (let i = 0; i < requestsDataset.length; i++) {

                    if (requestsDataset[i].key === message.key) {

                        if (dialogChatIsOpen) {

                            if (requestData.key !== message.key) {

                                const request = requestsDataset[i];

                                const obj = {message, request, vendorData, handleMessageSnackClick};

                                enqueueSnackbar(obj, {persist: true, key: request.key});

                                lastMessageRef.child(`lastMessage`).remove().then(r => {

                                    return (() => {
                                        lastMessageRef.off(`child_added`)
                                    })

                                });

                            } else {

                                lastMessageRef.child(`lastMessage`).remove().then(r => {

                                    return (() => {
                                        lastMessageRef.off(`child_added`)
                                    })

                                });

                            }

                        } else {

                            const request = requestsDataset[i];

                            const obj = {message, request, vendorData, handleMessageSnackClick};

                            enqueueSnackbar(obj, {persist: true, key: request.key});

                            lastMessageRef.child(`lastMessage`).remove().then(r => {

                                return (() => {
                                    lastMessageRef.off(`child_added`)
                                })

                            });

                        }


                    }

                }

            });

            return (() => {
                lastMessageRef.off(`child_added`);
            })
        }

    }, [answeredRequests, closeSnackbar, dialogChatIsOpen, enqueueSnackbar, requestData, requestsDataset, vendorData]);

    //SWITCH NEW - ANSWERED REQUESTS
    useEffect(() => {

            switch (props.clickedMenuItemIndex) {

                case 0:

                    setTableDataset(requestsDataset);

                    break;

                case 1:

                    if (answeredRequests.length !== 0) {

                        const answeredRequestsDatasetTemp = [...answeredRequestsDataset];
                        const answeredRequestsKeys = [];

                        for (let i = 0; i < answeredRequests.length; i++) {

                            const answeredRequestKey = answeredRequests[i].requestKey;
                            answeredRequestsKeys.push(answeredRequestKey);

                            if (answeredRequestsKeys.length === answeredRequests.length) {

                                if (answeredRequestsKeys.length > answeredRequestsDatasetTemp.length) {

                                    if (answeredRequestsDatasetTemp.length === 0) {

                                        for (let j = 0; j < requestsDataset.length; j++) {

                                            const requestKey = requestsDataset[j].key;

                                            if (answeredRequestsKeys.includes(requestKey)) {

                                                answeredRequestsDatasetTemp.push(requestsDataset[j]);
                                                answeredRequestsKeys.splice(answeredRequestsKeys.indexOf(requestKey), 1)

                                            }

                                            if (j === requestsDataset.length - 1) {

                                                if (answeredRequestsDatasetTemp.length === answeredRequests.length) {

                                                    setAnsweredRequestsDataset(answeredRequestsDatasetTemp);

                                                } else {

                                                    const city = vendorData.city;
                                                    const type = vendorData.type;

                                                    const requestsRef = firebase.database().ref(`requests`).child(city).child(type);

                                                    answeredRequestsKeys.forEach((item, ind) => {

                                                        requestsRef.child(item).once(`value`, snap => {

                                                            if (snap.exists()) {

                                                                console.log(`value`);

                                                                const request = snap.val();
                                                                const requestTimestamp = request.timestamp;

                                                                request.time = handleTime(requestTimestamp);
                                                                answeredRequestsDatasetTemp.push(request);

                                                            }

                                                        }).then(r => {

                                                            if (ind === answeredRequestsKeys.length - 1) {

                                                                setAnsweredRequestsDataset(answeredRequestsDatasetTemp);

                                                            }

                                                        })

                                                    })


                                                }

                                            }

                                        }

                                    } else {

                                        const answeredRequestsDatasetKeys = [];

                                        for (let k = 0; k < answeredRequestsDatasetTemp.length; k++) {

                                            const answeredRequestsDatasetKey = answeredRequestsDatasetTemp[k].key;
                                            answeredRequestsDatasetKeys.push(answeredRequestsDatasetKey);

                                            if (answeredRequestsDatasetKeys.length === answeredRequestsDatasetTemp.length) {

                                                const template = [];

                                                for (let m = 0; m < answeredRequestsKeys.length; m++) {

                                                    const key = answeredRequestsKeys[m];

                                                    if (!answeredRequestsDatasetKeys.includes(key)) {

                                                        template.push(key)

                                                    }

                                                    if (m === answeredRequestsKeys.length - 1) {

                                                        console.table(template);

                                                        const city = vendorData.city;
                                                        const type = vendorData.type;

                                                        const requestsRef = firebase.database().ref(`requests`).child(city).child(type);

                                                        template.forEach(key => {

                                                            requestsRef.child(key).once(`value`, snap => {

                                                                if (snap.exists()) {

                                                                    console.log(`value`);

                                                                    const request = snap.val();
                                                                    const requestTimestamp = request.timestamp;

                                                                    request.time = handleTime(requestTimestamp);
                                                                    answeredRequestsDatasetTemp.push(request);

                                                                }

                                                            }).then(r => {

                                                                if (answeredRequestsDatasetTemp.length === answeredRequests.length) {

                                                                    setAnsweredRequestsDataset(answeredRequestsDatasetTemp);

                                                                }

                                                            })
                                                        })

                                                    }

                                                }

                                            }

                                        }

                                    }

                                } else if (answeredRequestsKeys.length === answeredRequestsDatasetTemp.length) {

                                }

                            }

                        }

                    } else {

                        setTableDataset([])

                    }

                    break;

                case 2:
                    break;

                default:


                    break;
            }

        }, [answeredRequests, answeredRequestsDataset, props.clickedMenuItemIndex, requestsDataset, vendorData]
    );

    //SORT DATASET
    useEffect(() => {

        if (props.clickedMenuItemIndex === 1) {

            const answeredRequestsTemp = [...answeredRequests];
            const answeredRequestsDatasetTemp = [...answeredRequestsDataset];

            answeredRequestsTemp.forEach(answer => {

                if (answer.count > 0) {

                    answeredRequestsDatasetTemp.forEach((answeredRequest, ind) => {

                        if (answeredRequest.key === answer.requestKey) {

                            console.log({answeredRequest});

                            answeredRequestsDatasetTemp.splice(ind, 1);
                            answeredRequestsDatasetTemp.unshift(answeredRequest);

                        }

                    })

                }

            });
            //change this

            setTableDataset(answeredRequestsDatasetTemp)

        } else {

            setTableDataset(requestsDataset);

        }

    }, [answeredRequests, answeredRequestsDataset, props.clickedMenuItemIndex, requestsDataset]);

    const handleTime = (timestamp) => {

        //Swapping timestamp with formated time

        const trueTimestamp = -timestamp;

        const hoursMinutes = moment(trueTimestamp).locale(`ru`).format(`LT`);
        const dayMonth = moment(trueTimestamp).locale(`ru`).format(`D MMM`);
        const todayDayMonth = moment().locale(`ru`).format(`D MMM`);

        if (todayDayMonth === dayMonth) {

            return hoursMinutes;

        } else {

            return dayMonth;

        }

    };

    const handleRowClick = (id) => {

        const requestKey = tableDataset[id].key;
        const answeredRequestsKeys = [];

        const request = tableDataset[id];
        setRequestData(request);

        for (let i = 0; i < answeredRequests.length; i++) {

            const answeredRequestKey = answeredRequests[i].requestKey;
            answeredRequestsKeys.push(answeredRequestKey);

            if (answeredRequestsKeys.length === answeredRequests.length) {

                if (answeredRequestsKeys.includes(requestKey)) {

                    setDialogChatIsOpen(true);

                    closeSnackbar(requestKey)

                } else {

                    setDialogNewMessageIsOpen(true);

                }

            }

        }

        if (answeredRequests.length === 0) {

            setDialogNewMessageIsOpen(true);

        }


    };

    const renderIsNew = (id) => {

        //may cause issues
        if (id < tableDataset.length) {

            const requestKey = tableDataset[id].key;
            const answeredRequestsKeys = [];

            if (answeredRequests.length === 0) {

                return (<span className={classes.circle}/>)

            } else {

                for (let i = 0; i < answeredRequests.length; i++) {

                    const answeredRequestKey = answeredRequests[i].requestKey;

                    answeredRequestsKeys.push(answeredRequestKey);

                    if (answeredRequestsKeys.length === answeredRequests.length) {

                        if (answeredRequestsKeys.includes(requestKey)) {

                            const ind = answeredRequestsKeys.indexOf(requestKey);

                            if (answeredRequests[ind].count !== null) {

                                const newMessagesCount = answeredRequests[ind].count;

                                if (newMessagesCount !== 0) {

                                    return (<span className={classes.newMessagesCounter}>+{newMessagesCount}</span>)

                                } else {

                                    return (<div/>)

                                }

                            }

                        } else {

                            return (<span className={classes.circle}/>)

                        }

                    }

                }

            }

        }

    };

    const renderBoldFont = (id) => {

        //may cause issues

        if (id < tableDataset.length) {

            const requestKey = tableDataset[id].key;
            const answeredRequestsKeys = [];

            if (answeredRequests.length === 0) {

                return ('600')

            } else {

                for (let i = 0; i < answeredRequests.length; i++) {

                    const answeredRequestKey = answeredRequests[i].requestKey;

                    answeredRequestsKeys.push(answeredRequestKey);

                    if (answeredRequestsKeys.length === answeredRequests.length) {

                        if (answeredRequestsKeys.includes(requestKey)) {

                            return (`400`);

                        } else {

                            return ('600')

                        }

                    }

                }

            }

        }


    };

    const handlePageChange = (page) => {

        const desiredRequestsDatasetLength = (page + 1) * 10;
        const requestsDatasetLength = requestsDataset.length;

        if (requestsDatasetLength === desiredRequestsDatasetLength) {

            const lastRequestTimestamp = requestsDataset[requestsDataset.length - 1].timestamp;

            const city = vendorData.city;
            const type = vendorData.type;

            const requestsRef = firebase.database().ref(`requests`).child(city).child(type);

            requestsRef.orderByChild(`timestamp`).startAt(lastRequestTimestamp + 1).limitToFirst(10).once(`value`, snap => {

                console.log(`child_value`);

                if (snap.exists()) {
                    const newRequests = snap.val();

                    const newRequestsKeys = Object.keys(newRequests);
                    const temp = [];

                    for (let i = 0; i < newRequestsKeys.length; i++) {

                        const requestKey = newRequestsKeys[i];
                        const request = newRequests[requestKey];

                        const requestTimestamp = request.timestamp;

                        request.time = handleTime(requestTimestamp);
                        temp.push(request);

                        if (i === newRequestsKeys.length - 1) {
                            setRequestsDataset([...requestsDataset.concat(temp.reverse())])
                        }

                    }
                }


            }).then(r => {

            })

        }

    };

    return (
        <div className={classes.table}>
            <MaterialTable
                isLoading={isLoading}
                data={tableDataset}
                title={props.tableTitle}
                columns={[
                    {
                        field: 'isNew',
                        cellStyle: {
                            paddingLeft: 15,
                            paddingRight: 0,
                            margin: 0,
                            marginBottom: 2,
                            textAlign: "center",
                            verticalAlign: "center",
                            color: "#5369d9"
                        },
                        Title: '',
                        render: (rowData) => renderIsNew(rowData.tableData.id)
                    },
                    {
                        title: "Марка",
                        field: "make",
                        cellStyle: {
                            fontSize: 15,
                            fontWeight: `inherit`,
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingRight: 0,
                            paddingLeft: 15
                        },
                    },
                    {
                        title: "Модель",
                        field: "model",
                        cellStyle: {
                            fontSize: 15,
                            fontWeight: `inherit`,
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingRight: 0,
                            paddingLeft: 15
                        }
                    },
                    {
                        title: "Год",
                        field: "year",
                        cellStyle: {
                            fontSize: 15,
                            fontWeight: `inherit`,
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingRight: 0,
                            paddingLeft: 15

                        }
                    },
                    {
                        title: "VIN",
                        field: "VIN",
                        cellStyle: {
                            fontSize: 15,
                            fontWeight: `inherit`,
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingRight: 0,
                            paddingLeft: 15
                        }
                    },
                    {
                        title: "Описание",
                        field: "description",
                        cellStyle: {
                            fontSize: 15,
                            fontWeight: `inherit`,
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingRight: 0,
                            paddingLeft: 15
                        }
                    },
                    {
                        title: "Время",
                        field: "time",
                        cellStyle: {
                            fontSize: 15,
                            fontWeight: `inherit`,
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingRight: 0,
                            paddingLeft: 15
                        }
                    },

                ]}
                onChangePage={handlePageChange}
                onRowClick={(event, rowData) => {
                    handleRowClick(rowData.tableData.id);
                }}
                localization={
                    {
                        toolbar: {
                            searchTooltip: "Поиск",
                            searchPlaceholder: "Поиск",
                            showColumnsTitle: "Настройка таблицы",
                            addRemoveColumns: "Показать или скрыть столбцы"
                        },
                        body: {emptyDataSourceMessage: "Нет данных"},
                        pagination: {
                            labelRowsSelect: `заявок`,
                            labelDisplayedRows: `{from}-{to}`,
                            firstTooltip: `Первая страница`,
                            previousTooltip: `Предыдущая страница`,
                            nextTooltip: `Следующая страница`,
                            lastTooltip: `Последняя страница`,
                        },
                    }
                }
                options={{
                    rowStyle: rowData => ({
                        fontWeight: renderBoldFont(rowData.tableData.id),
                    }),
                    headerStyle: {fontWeight: "bold", paddingLeft: 15, fontSize: 16},
                    columnsButton: true,
                    draggable: true,
                    paging: true,
                    pageSize: 10,
                    pageSizeOptions: [10],
                    paginationType: `normal`,
                    padding: "dense",
                    sorting: false,
                }}/>
            <DialogNewMessage open={dialogNewMessageIsOpen} handleClose={setDialogNewMessageIsOpen}
                              clickedRowData={requestData}
                              vendorData={vendorData} answeredRequests={answeredRequests}/>
            <DialogChat open={dialogChatIsOpen} handleClose={setDialogChatIsOpen}
                        vendorData={vendorData}
                        clickedRowData={requestData}/>

        </div>
    )

}

export default withSnackbar(TheTable)