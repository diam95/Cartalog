import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import MaterialTable from "material-table";
import * as moment from "moment";
import 'moment/locale/ru';

const useStyles = makeStyles((theme) => ({

    root: {
        width: "100%",
    },
    tableContainer: {
        width: "100%",
        marginTop: theme.spacing(2)
    },
    theBlueDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        background: "#15537d"
    },
    messageCount: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: 8,
        height: 8,
        fontWeight: "700",
        color: "green"
    }

}))

const TheTableView = (props) => {

    const requestsDataset = props.requestsDataset
    const partnerData = props.partnerData

    const location = props.location;
    const history = props.history;

    const classes = useStyles()

    const TheBlueDot = () => {

        return (
            <div className={classes.theBlueDot}/>
        )

    }

    const renderBoldFont = (rowIndex) => {

        const requestKey = requestsDataset[rowIndex].key

        const answeredRequests = Object.keys(partnerData.answeredRequests)

        if (!answeredRequests.includes(requestKey)) {
            return "700"
        } else return "400"

    }

    const renderTime = (rowIndex) => {

        const timestamp = requestsDataset[rowIndex].timestamp * -1

        const hoursMinutes = moment(timestamp).locale(`ru`).format(`LT`);
        const dayMonth = moment(timestamp).locale(`ru`).format(`D MMM`);
        const todayDayMonth = moment().locale(`ru`).format(`D MMM`);

        if (todayDayMonth === dayMonth) {

            return hoursMinutes;

        } else {

            return dayMonth;

        }


    }

    const renderIsNew = (rowIndex) => {

        const requestKey = requestsDataset[rowIndex].key

        const answeredRequests = Object.keys(partnerData.answeredRequests)

        if (answeredRequests.includes(requestKey)) {

            const messageCount = partnerData.answeredRequests[requestKey]

            if (messageCount !== 0) {
                return <div className={classes.messageCount}>+{messageCount}</div>
            } else return <div/>

        } else {
            return <TheBlueDot/>
        }

    };

    const renderTableTitle = () => {

        if (location.pathname === "/") {
            return ("Все заявки")
        } else {
            return ("Мои ответы")
        }

    }

    const handleRowClick = (rowID) => {

        const requestKey = requestsDataset[rowID].key

        history.push("/request/" + requestKey)

    }

    return (

        <div className={classes.root}>

            <div className={classes.tableContainer}>
                <MaterialTable
                    isLoading={requestsDataset.length === 0}
                    title={renderTableTitle()}
                    columns={[
                        {
                            width: "auto",
                            field: 'isNew',
                            cellStyle: {
                                width: 20,
                                maxWidth: 20,
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
                                paddingLeft: 15,
                                "&:hover": {
                                    backgroundColor: "red !important"
                                }
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
                            field: "timestamp",
                            cellStyle: {
                                fontSize: 15,
                                fontWeight: `inherit`,
                                paddingTop: 8,
                                paddingBottom: 8,
                                paddingRight: 0,
                                paddingLeft: 15
                            },
                            render: (rowData) => renderTime(rowData.tableData.id)
                        },

                    ]}
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
                            fontWeight: renderBoldFont(rowData.tableData.id)
                        }),
                        headerStyle: {
                            fontWeight: "bold",
                            fontSize: 16
                        },
                        columnsButton: true,
                        draggable: true,
                        paging: true,
                        pageSize: 10,
                        pageSizeOptions: [10],
                        paginationType: `normal`,
                        padding: "dense",
                        sorting: false,
                    }}
                    data={requestsDataset}
                    onRowClick={(event, rowData) => {
                        handleRowClick(rowData.tableData.id);
                    }}
                />
            </div>

        </div>

    )

}

export default TheTableView