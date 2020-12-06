import React, {useEffect} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {useLocation} from 'react-router-dom';
import lottie from "lottie-web";
import officeTeam from "../../assets/39387-business-team.json";
import onlinePay from "../../assets/36521-online-payment-animation.json";
import shipping from "../../assets/33369-sailing-ship.json";
import guarantees from "../../assets/37463-sign-contract-contract-approved.json";
import refund from "../../assets/23035-nfc-payment.json";
import {List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import SearchIcon from '@material-ui/icons/Search';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import ship from '../../assets/ocean-transportation.png';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
        }
    },
    paymentAnimation: {},
    servicesAnimation: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    shippingAnimation: {
        marginBottom: -theme.spacing(2),
        marginTop: -theme.spacing(5),
    },
    emptyCartContainer: {},
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        textAlign: "justify"
    },
    marginTop1: {
        marginTop: theme.spacing(1)
    }

}))

const InfoComponentView = (props) => {

    const classes = useStyles()

    const locationArray = useLocation().pathname.split("/")

    useEffect(() => {

        switch (locationArray[1]) {

            case "services":

                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: officeTeam
                });
                break;

            case "payment":
                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: refund
                });
                break;

            case "shipping":
                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: shipping
                });
                break;

            case "guarantees":
                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: guarantees
                });
                break;


            case "refund":
                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: onlinePay
                });
                break;


            case "about":
                /* lottie.loadAnimation({
                     container: document.querySelector("#react-logo"),
                     renderer: 'svg',
                     loop: true,
                     animationData: refund
                 });*/
                break;

            case "contacts":
                return ("contacts")


        }

        return (() => {
            lottie.destroy()
            lottie.resize()
        })

    }, [locationArray[1]]);

    const renderContent = () => {

        switch (locationArray[1]) {

            case "services":
                return (
                    <div className={classes.infoContainer}>

                        <Typography variant={"h6"}>Услуги</Typography>

                        <List className={classes.root}>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <ImportantDevicesIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Интернет - магазин запчастей"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Более 1 млн. позиций контрактных автозапчастей из Японии без пробега по
                                                РФ
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <SearchIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Поиск запчастей"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Найдем любые детали по полному номеру кузова или VIN
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <AirplanemodeActiveIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Быстрая доставка"
                                    secondary={
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Авиадоставка от 2х дней
                                            </Typography>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Доставка морем 14-18 дней
                                            </Typography>
                                        </div>
                                    }
                                />
                            </ListItem>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <PhoneAndroidIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Мобильное приложение"
                                    secondary={
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Не тратьте время на поиски!
                                            </Typography>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Скачайте мобильное приложение, оставьте заявку и получите лучшее
                                                предложение!
                                            </Typography>
                                        </div>
                                    }
                                />
                            </ListItem>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <BuildOutlinedIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Поиск автосервисов"
                                    secondary={
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Скачайте приложение и запишитесь на ремонт.
                                            </Typography>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                СТО и автосервисы ждут ваших заявкок!
                                            </Typography>
                                        </div>
                                    }
                                />
                            </ListItem>

                        </List>

                    </div>
                )

            case "payment":
                return (
                    <div className={classes.infoContainer}>

                        <Typography variant={"h6"}>Оплата</Typography>

                        <Typography variant={"body2"}>Нашим клиентам доступны следующие способы оплаты:</Typography>

                        <List className={classes.root}>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <ReceiptIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Оплата на сайте"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Добавьте товары в корзину, нажмите
                                                "Оформить заказ" и мы выставим вам счет
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <PaymentIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Перевод на карту"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Выберите вариант "Перевод на карту" при выборе оплаты и мы пришлем вам
                                                платежные реквизиты
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <LocalAtmIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Оплата наличными"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Выберите вариант "Оплата наличными" при выборе оплаты. Оператор свяжется
                                                с вами и даст дальнешие указания
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                        </List>

                    </div>
                )

            case "shipping":
                return (
                    <div className={classes.infoContainer}>

                        <Typography variant={"h6"}>Доставка</Typography>

                        <Typography variant={"body2"}>На выбор доступны следущие варианты доставки:</Typography>

                        <List className={classes.root}>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <AirplanemodeActiveIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Авиадоставка"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Ключевое отличие нашего сервиса - доступная авиадоставка. Срок
                                                2-5 дней с момента оплаты. Стоимость 350р\кг
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <img src={ship} alt={"ship"} style={{width: 24, height: 24}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Доставка по морю"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Бюджетный вариант доставки габаритных и тяжелых запчастей. Средний срок
                                                доставки 2-3 недели
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <LocalShippingOutlinedIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Доставка курьером"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Сообщите место и время. Наши курьеры доставят ваши запчасти вовремя
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                        </List>

                    </div>
                )

            case "guarantees":
                return (
                    <div className={classes.infoContainer}>

                        <Typography variant={"h6"}>Гарантии</Typography>

                        <Typography variant={"body2"}>Приобретая контрактные автозапчасти, следует помнить, что они уже
                            эксплуатировались,
                            являются бывшими в употреблении, не имеют гарантийного срока, не подлежат возврату и обмену
                            на аналогичный товар (постановление Правительства РФ от 19 января 1998г. №55 в ред.
                            Постановлений Правительства РФ от 20.10.1998 №1222, от 06.02.2002 №81)
                        </Typography>

                        <Typography variant={"body2"} style={{color: "red", marginTop: 8}}>Возврат возможен только в
                            случае
                            обнаружения скрытых дефектов,
                            которые невозможно
                            выявить при внешнем осмотре
                        </Typography>

                        <Typography variant={"body2"} style={{marginTop: 8}}>Запчасти запрещено разбирать, производить
                            механическое воздействие, нарушать метки
                            продавца.
                            В нашем магазине установлены следующие сроки на установку и проверку запчастей с момента
                            приобретения:
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemText primary={"КПП"}
                                              secondary={
                                                  <React.Fragment>
                                                      <Typography
                                                          component="span"
                                                          variant="body2"
                                                          color="textPrimary"
                                                      >
                                                          5 дней
                                                      </Typography>
                                                  </React.Fragment>
                                              }
                                >
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Стартеры, генераторы"}
                                              secondary={
                                                  <React.Fragment>
                                                      <Typography
                                                          component="span"
                                                          variant="body2"
                                                          color="textPrimary"
                                                      >
                                                          2 дня
                                                      </Typography>
                                                  </React.Fragment>
                                              }
                                >
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Остальные запчасти"}
                                              secondary={
                                                  <React.Fragment>
                                                      <Typography
                                                          component="span"
                                                          variant="body2"
                                                          color="textPrimary"
                                                      >
                                                          3 дня
                                                      </Typography>
                                                  </React.Fragment>
                                              }
                                >
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Возврату не подлежат"}
                                              secondary={
                                                  <React.Fragment>
                                                      <Typography
                                                          component="span"
                                                          variant="body2"
                                                          color="textPrimary"
                                                      >
                                                          Элементы салона, кузова, оптика и электронные датчики
                                                      </Typography>
                                                  </React.Fragment>
                                              }
                                >
                                </ListItemText>
                            </ListItem>
                        </List>

                        <Typography variant={"body2"}>Вы можете быть уверены, что мы всегда на стороне покупателя и
                            найдем
                            решение в любой ситуации!
                        </Typography>

                    </div>
                )


            case "refund":
                return (
                    <div className={classes.infoContainer}>

                        <Typography variant={"h6"}></Typography>

                    </div>
                )

            case "about":
                return (
                    <div className={classes.infoContainer}>

                        <Typography variant={"body1"}>
                            «Cartalog» — это интернет-магазин запчастей для иномарок, созданный в Магадане и работающий
                            с 2019 года.
                        </Typography>

                        <Typography variant={"body1"} className={classes.marginTop1}>
                            Наша команда предлагает Вам более 1 млн. позиций контрактных запчастей из Японии без пробега
                            по РФ!
                        </Typography>

                        <Typography variant={"body1"} className={classes.marginTop1}>
                            Если Вы не смогли найти нужную Вам запчасть или Вы не знаете как правильно подбирать
                            запчасти, мы с радостью все сделаем за вас!
                        </Typography>

                        <Typography variant={"body1"} className={classes.marginTop1}>
                            Перестаньте тратить свое время на поиск запчастей. Обезопасьте себя от риска стать жертвой
                            мошенников или
                            покупки неподходящей запчасти.
                        </Typography>

                        <Typography variant={"body1"} className={classes.marginTop1}>
                            Скачайте мобильное приложение Cartalog, создайте завяку на поиск запчасти и получите лучшее
                            предложение в городе!
                        </Typography>

                    </div>
                )

            case "contacts":
                return ("contacts")


        }

    }

    const getAnimationRootStyle = () => {

        switch (locationArray[1]) {

            case "payment":
                return classes.paymentAnimation

            case "services":
                return classes.servicesAnimation

            case "shipping":
                return classes.shippingAnimation

            default:
                return classes.emptyCartContainer

        }

    }

    return (
        <div className={classes.root}>
            {renderContent()}
            <div id="react-logo" className={getAnimationRootStyle()}/>
        </div>
    )

}

export default InfoComponentView