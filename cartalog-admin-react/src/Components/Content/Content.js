import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import SideMenu from "./SideMenu/SideMenu";
import NamesListComponent from "./NamesListComponent/NamesListComponent";
import PartnerContent from "./PartnerContent/PartnerContent";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ChatDialog from "./PartnerContent/PartnerTable/ChatDialog/ChatDialog";
import UsersContent from "./UsersContent/UsersContent";
import FeedbackContent from "./FeedbackContent/FeedbackContent";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    addButton: {
        marginTop: theme.spacing(1),
        background: 'green',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    margin1: {
        margin: theme.spacing(1)
    },
    vendorName: {
        padding: theme.spacing(2),
        margin: 5,
        fontSize: 16,
        fontWeight: '500',
        background: '#f5f5f5',
        "&:hover": {
            background: "#e1e1e1"
        },
    }
}));

const Content = ({store}) => {

    console.log('<Content/>');

    const classes = useStyles();

    const [clickedSideMenu, setClickedSideMenu] = useState(0);
    const [partnersList, setPartnersList] = useState([]);
    const [clickedRequest, setClickedRequest] = useState({});
    const [requestsList, setRequestsList] = useState([]);
    const [clickedPartner, setClickedPartner] = useState({});
    const [requestType, setRequestType] = useState(10);
    const [vendorID, setVendorID] = useState('');

    useEffect(() => {

        switch (clickedSideMenu) {

            case 1:

                if (store.partners) {

                    const allPartners = store.partners;
                    const magadanPartners = allPartners.magadan;
                    const magadanPartnersAutoparts = magadanPartners.autoparts;

                    let result = Object.keys(magadanPartnersAutoparts).map(function (key) {

                        return (magadanPartnersAutoparts[key])

                    });

                    setPartnersList(result)

                }

                break;

            case 2:

                if (store.partners) {

                    const allPartners = store.partners;
                    const magadanPartners = allPartners.magadan;
                    const magadanPartnersAutoservice = magadanPartners.autoservice;

                    let result = Object.keys(magadanPartnersAutoservice).map(function (key) {

                        return (magadanPartnersAutoservice[key])

                    });


                    setPartnersList(result)

                }

                break;

        }

    }, [clickedSideMenu, store]);

    useEffect(() => {

        console.log(requestType);

        const allRequests = store.requests;
        const magadanRequests = allRequests.magadan;

        switch (requestType) {

            case 10:

                const magadanRequestsAutoparts = magadanRequests.autoparts;

                let result = Object.keys(magadanRequestsAutoparts).map(function (key) {

                    return (magadanRequestsAutoparts[key])

                });

                result.reverse();

                setRequestsList(result);

                break;

            case 20:

                const magadanRequestsAutoservice = magadanRequests.autoservice;

                let result2 = Object.keys(magadanRequestsAutoservice).map(function (key) {

                    return (magadanRequestsAutoservice[key])

                });

                result2.reverse();

                setRequestsList(result2);

                break;

        }

    }, [requestType, store]);

    const handleRequestTypeChange = (event) => {


        if (event.target.value === '10') {

            setRequestType(10);

        } else {

            setRequestType(20);

        }

    };

    const partnerContent = () => {

        if (clickedPartner) {

            return (
                <PartnerContent clickedPartner={clickedPartner} store={store}/>
            );

        } else {
            return (
                <div></div>
            )
        }

    };

    const body = () => {

        switch (clickedSideMenu) {
            case 0:

                const handleRowClick = (event, rowData, togglePannel) => {

                    const offersCount = requestsList[rowData.tableData.id].offersCount;

                    if (offersCount !== 0) {

                        togglePannel();

                    }

                };

                const answers = (id) => {

                    const offersCount = requestsList[id].offersCount;
                    const type = requestsList[id].type;
                    const requestKey = requestsList[id].key;

                    const allMessages = store.messages;
                    const magadanMessages = allMessages.magadan;
                    const magadanMessagesType = magadanMessages[type];
                    const magadanMessagesTypeRequest = magadanMessagesType[requestKey];

                    const allPartners = store.partners;
                    const magadanPartners = allPartners.magadan;
                    const magadanPartnersAutoparts = magadanPartners.autoparts;
                    const magadanPartnersAutoservice = magadanPartners.autoservice;

                    const getPartners = () => {

                        const partners1 = Object.keys(magadanPartnersAutoparts).map(function (key) {

                            return (magadanPartnersAutoparts[key])

                        });
                        const partners2 = Object.keys(magadanPartnersAutoservice).map(function (key) {

                            return (magadanPartnersAutoservice[key])

                        });

                        const allPartners = partners1.concat(partners2);

                        return (allPartners)

                    };

                    const partners = getPartners();

                    if (magadanMessagesTypeRequest) {

                        const vendorKeys = Object.keys(magadanMessagesTypeRequest);

                        const getChat = (vendorID) => {

                            const vendorNames = [];

                            partners.forEach(partner => {

                                if (partner.uid === vendorID) {
                                    vendorNames.push(partner.name)
                                }

                            });

                            console.log(vendorNames);
                            console.log(partnersList);
                            console.log(vendorID);

                            const handleNameClick = () => {

                                const request = requestsList[id];
                                setClickedRequest(request);
                                setVendorID(vendorID);

                            };


                            const namesList = vendorNames.map(name =>
                                <div onClick={()=>{handleNameClick(vendorID)}} key={vendorID} className={classes.vendorName}>
                                    {name}
                                </div>
                            );

                            return (namesList)

                        };

                        if (offersCount !== 0) {

                            return (vendorKeys.map(key => getChat(key)))

                        } else {
                            return (<div/>)
                        }

                    }


                };

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={2} lg={2}>
                            <SideMenu clickedSideMenu={clickedSideMenu} setClickedSideMenu={setClickedSideMenu}/>
                        </Grid>
                        <Grid item xs={10} lg={10}>
                            <div className={classes.margin1}>
                                <MaterialTable
                                    columns={[
                                        {
                                            field: 'offersCount',
                                            cellStyle: {
                                                margin: 0,
                                                marginBottom: 2,
                                                textAlign: "center",
                                                verticalAlign: "center",
                                                color: "#5369d9"
                                            },
                                            Title: '',
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
                                    data={requestsList}
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
                                        headerStyle: {paddingLeft: 15, fontSize: 16},
                                        columnsButton: true,
                                        draggable: true,
                                        paging: true,
                                        pageSize: 10,
                                        pageSizeOptions: [10],
                                        paginationType: `normal`,
                                        padding: "dense",
                                        sorting: false,
                                    }}
                                    title={
                                        <FormControl variant="outlined" className={classes.margin1}>
                                            <Select
                                                native
                                                onChange={handleRequestTypeChange}
                                                inputProps={{
                                                    name: 'Тип',
                                                    id: 'outlined-age-native-simple',
                                                }}
                                            >
                                                <option value={10}>Автозапчасти</option>
                                                <option value={20}>Ремонт</option>
                                            </Select>
                                        </FormControl>
                                    }
                                    detailPanel={rowData => {
                                        return (
                                            answers(rowData.tableData.id)
                                        )
                                    }}
                                    onRowClick={(event, rowData, togglePanel) => handleRowClick(event, rowData, togglePanel)}
                                />
                            </div>
                            <ChatDialog clickedRequest={clickedRequest} setClickedRequest={setClickedRequest} store={store} vendorID={vendorID}/>
                        </Grid>
                    </Grid>
                );

                break;
            case 1:

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={2} lg={2}>
                            <SideMenu clickedSideMenu={clickedSideMenu} setClickedSideMenu={setClickedSideMenu}/>
                        </Grid>
                        <Grid item xs={2} lg={2}>
                            <NamesListComponent clickedSideMenu={clickedSideMenu} clickedPartner={clickedPartner}
                                                partnersList={partnersList} setCLickedPartner={setClickedPartner}/>
                            <Button className={classes.addButton} variant="contained" fullWidth={true}>
                                +
                            </Button>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            {partnerContent()}
                        </Grid>
                    </Grid>
                );

                break;
            case 2:

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={2} lg={2}>
                            <SideMenu clickedSideMenu={clickedSideMenu} setClickedSideMenu={setClickedSideMenu}/>
                        </Grid>
                        <Grid item xs={2} lg={2}>
                            <NamesListComponent clickedSideMenu={clickedSideMenu} clickedPartner={clickedPartner}
                                                partnersList={partnersList} setCLickedPartner={setClickedPartner}/>
                            <Button className={classes.addButton} variant="contained" fullWidth={true}>
                                +
                            </Button>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            {partnerContent()}
                        </Grid>
                    </Grid>
                );

                break;
            case 3:

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={2} lg={2}>
                            <SideMenu clickedSideMenu={clickedSideMenu} setClickedSideMenu={setClickedSideMenu}/>
                        </Grid>
                        <Grid item xs={10} lg={10}>
                            <UsersContent store={store}/>
                        </Grid>
                    </Grid>
                );

                break;
            case 4:

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={2} lg={2}>
                            <SideMenu clickedSideMenu={clickedSideMenu} setClickedSideMenu={setClickedSideMenu}/>
                        </Grid>
                        <Grid item xs={10} lg={10}>
                            <FeedbackContent store={store}/>
                        </Grid>
                    </Grid>
                );

                break;
        }

    };

    return (
        <div className={classes.root}>
            {body()}
        </div>
    )

};

export default Content;
