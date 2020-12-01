import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({

    root: {},
    tinkoffPayRow: {
        display: `block`,
        margin: `1%`,
        width: 160
    }

}))

const PaymentWidgetComponentView = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js"/>
            <form name="TinkoffPayForm" onSubmit="pay(this); return false;">
                <input className={classes.tinkoffPayRow} type="hidden" name="terminalkey" value="1606532686330DEMO"/>
                <input className={classes.tinkoffPayRow} type="hidden" name="frame" value="false"/>
                <input className={classes.tinkoffPayRow} type="hidden" name="language" value="ru"/>
                <input className={classes.tinkoffPayRow} type="text" placeholder="Сумма заказа" name="amount"
                       required/>
                <input className={classes.tinkoffPayRow} type="text" placeholder="Номер заказа" name="order"/>
                <input className={classes.tinkoffPayRow} type="text" placeholder="Описание заказа"
                       name="description"/>
                <input className={classes.tinkoffPayRow} type="text" placeholder="ФИО плательщика"
                       name="name"/>
                <input className={classes.tinkoffPayRow} type="text" placeholder="E-mail"
                       name="email"/>
                <input className={classes.tinkoffPayRow} type="text"
                       placeholder="Контактный телефон" name="phone"/>
                <input className={classes.tinkoffPayRow} type="submit" value="Оплатить"/>
            </form>
        </div>
    )

}

export default PaymentWidgetComponentView