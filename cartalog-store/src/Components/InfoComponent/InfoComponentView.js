import React, {useEffect} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {useLocation} from 'react-router-dom';
import lottie from "lottie-web";
import officeTeam from "../../assets/39387-business-team.json";
import onlinePay from "../../assets/36521-online-payment-animation.json";
import shipping from "../../assets/33369-sailing-ship.json";
import guarantees from "../../assets/37463-sign-contract-contract-approved.json";
import refund from "../../assets/23035-nfc-payment.json";
import team from "../../assets/38281-team.json";
import contacts from "../../assets/39997-landing-page-contact-us.json";
import {Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
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
import * as clipboard from "clipboard-polyfill/text";
import Button from "@material-ui/core/Button";
import {useSnackbar} from "notistack";

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
    listRoot: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
        }
    },
    paymentAnimation: {
        width: "100%"
    },
    guaranteesAnimation: {
        width: "150%",
        [theme.breakpoints.down("md")]: {
            width: "100%"
        }
    },
    refundAnimation: {
        width: "400%",
        [theme.breakpoints.down("md")]: {
            width: "100%"
        },
        marginLeft: theme.spacing(2)
    },
    servicesAnimation: {
        width: "80%",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            width: "100%"
        }
    },
    shippingAnimation: {
        width: "100%",
        marginBottom: -theme.spacing(2),
        marginTop: -theme.spacing(22),
        [theme.breakpoints.down("md")]: {
            marginTop: -theme.spacing(5),
        }
    },
    aboutAnimation: {
        width: "100%"
    },
    emptyCartContainer: {
        width: "100%"
    },
    infoContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        textAlign: "justify"
    },
    marginTop1: {
        marginBottom: theme.spacing(1)
    },
    download: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        color: "#2a4d93",
        textDecoration: "underline",
        cursor: "pointer"
    },
    infoContainer2: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column"
        }
    }

}))

const InfoComponentView = (props) => {

    const classes = useStyles()

    const locationArray = useLocation().pathname.split("/")
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

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
                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: team
                })
                break;

            case "contacts":
                lottie.loadAnimation({
                    container: document.querySelector("#react-logo"),
                    renderer: 'svg',
                    loop: true,
                    animationData: contacts
                })
                break;

        }

        return (() => {
            lottie.destroy()
            lottie.resize()
        })

    }, [locationArray[1]]);

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const renderContent = () => {

        switch (locationArray[1]) {

            case "services":
                return (
                    <div className={classes.infoContainer}>


                        <div className={classes.infoContainer2}>

                            <div>
                                <Typography variant={"h6"}>Услуги</Typography>
                                <List className={classes.listRoot}>

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
                                                        Более 1 млн. позиций контрактных автозапчастей из Японии без
                                                        пробега
                                                        по
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

                            <div id="react-logo" className={getAnimationRootStyle()}/>

                        </div>


                    </div>
                )

            case "payment":
                return (
                    <div className={classes.infoContainer}>

                        <div className={classes.infoContainer2}>

                            <div>

                                <Typography variant={"h6"}>Оплата</Typography>

                                <Typography variant={"body2"}>Нашим клиентам доступны следующие способы
                                    оплаты:</Typography>

                                <List className={classes.listRoot}>

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
                                                        Выберите вариант "Перевод на карту" при выборе оплаты и мы
                                                        пришлем
                                                        вам
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
                                                        Выберите вариант "Оплата наличными" при выборе оплаты. Оператор
                                                        свяжется
                                                        с вами и даст дальнешие указания
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemAvatar>
                                            <div/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Реквизиты"
                                            secondary={
                                                <React.Fragment>

                                                    <Typography className={classes.propsContainer} variant={"body2"}>ИП
                                                        Крижановский Александр
                                                        Игоревич
                                                    </Typography>

                                                    <Typography variant={"body2"}>Российская Федерация, 685000
                                                    </Typography>

                                                    <Typography variant={"body2"}>Магаданская обл., Г. Магадан
                                                    </Typography>

                                                    <Typography variant={"body2"}>ИНН 490913635792
                                                    </Typography>

                                                    <Typography variant={"body2"}>ОГРНИП 320491000005249
                                                    </Typography>

                                                    <Typography variant={"body2"}>РС 40802810300001723607
                                                    </Typography>

                                                    <Typography variant={"body2"}>ОГРН 320491000005249
                                                    </Typography>

                                                    <Typography variant={"body2"}>АО «Тинькофф Банк»
                                                    </Typography>

                                                </React.Fragment>
                                            }
                                        />

                                    </ListItem>

                                </List>

                            </div>

                            <div id="react-logo" className={getAnimationRootStyle()}/>

                        </div>

                        <div className={classes.download}
                             onClick={() => {
                                 openInNewTab("https://firebasestorage.googleapis.com/v0/b/cartalog-store.appspot.com/o/output.pdf?alt=media&token=7d645ec2-146d-48ca-9f18-923efb1b188b")
                             }}>
                            Реквизиты в pdf
                        </div>

                    </div>
                )

            case "shipping":
                return (
                    <div className={classes.infoContainer}>

                        <div className={classes.infoContainer2}>

                            <div>
                                <Typography variant={"h6"}>Доставка</Typography>

                                <Typography variant={"body2"}>На выбор доступны следущие варианты доставки:</Typography>
                                <List className={classes.listRoot}>

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
                                                        2-5 рабочих дней с момента оплаты. Стоимость 350р\кг
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
                                                        Бюджетный вариант доставки габаритных и тяжелых запчастей.
                                                        Средний
                                                        срок
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
                                                        Сообщите место и время. Наши курьеры доставят ваши запчасти
                                                        вовремя
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>

                                </List>

                            </div>

                            <div id="react-logo" className={getAnimationRootStyle()}/>

                        </div>

                    </div>
                )

            case "guarantees":
                return (
                    <div className={classes.infoContainer}>


                        <div className={classes.infoContainer2}>

                            <div>
                                <Typography variant={"h6"}>Гарантии</Typography>

                                <Typography variant={"body2"}>Приобретая контрактные автозапчасти, следует помнить, что
                                    они уже
                                    эксплуатировались,
                                    являются бывшими в употреблении, не имеют гарантийного срока, не подлежат возврату и
                                    обмену
                                    на аналогичный товар (постановление Правительства РФ от 19 января 1998г. №55 в ред.
                                    Постановлений Правительства РФ от 20.10.1998 №1222, от 06.02.2002 №81)
                                </Typography>

                                <Typography variant={"body2"} style={{color: "red", marginTop: 8}}>Возврат возможен
                                    только в
                                    случае
                                    обнаружения скрытых дефектов,
                                    которые невозможно
                                    выявить при внешнем осмотре
                                </Typography>

                                <Typography variant={"body2"} style={{marginTop: 8}}>Запчасти запрещено разбирать,
                                    производить
                                    механическое воздействие, нарушать метки
                                    продавца.
                                    В нашем магазине установлены следующие сроки на установку и проверку запчастей с
                                    момента
                                    приобретения:
                                </Typography>
                                <List className={classes.listRoot}>
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
                                <Typography variant={"body2"}>Вы можете быть уверены, что мы всегда на стороне
                                    покупателя и
                                    найдем
                                    решение в любой ситуации!
                                </Typography>
                            </div>
                            <div id="react-logo" className={getAnimationRootStyle()}/>

                        </div>

                    </div>
                )

            case "refund":
                return (
                    <div className={classes.infoContainer}>

                        <div className={classes.infoContainer2}>

                            <div>
                                <Typography variant={"h6"}>Возврат</Typography>

                                <Typography variant={"body2"}>В нашем магазине установлены следующие правила возврата
                                    товара:</Typography>

                                <Typography variant={"h6"}
                                            style={{marginTop: 8}}
                                >ДВС</Typography>

                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    Приобретая двигатель, помните, что он уже эксплуатировался в
                                    Японии, является бывшим в употреблении и давать 100% гарантию
                                    на безупречную и безотказную работу агрегата мы не можем.
                                    Замена двигателя должна производится только технически
                                    грамотными специалистами в специализированных автосервисах.
                                </Typography>

                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    style={{marginTop: 8}}
                                >
                                    Возврат двигателя по гарантии производится в течение 5-7 дней
                                    с момента получения только в случае обнаружения скрытых
                                    механических дефектов, не выявленных при внешнем осмотре:
                                    внутренних трещин, прогара поршней и т.д., которые требуют
                                    замены основных деталей и узлов двигателя: головки блока,
                                    коленвала, шатунно-поршневой группы. Износ прокладки,
                                    вкладышей и других быстро изнашивающихся деталей не является
                                    основанием для замены двигателя. При этом запрещается
                                    разбирать двигатель, производить механическое вмешательство,
                                    нарушать метки продавца.
                                </Typography>

                                <Typography variant={"h6"} style={{color: "red", marginTop: 8, marginBottom: 8}}>Все
                                    претензии
                                    клиента оговариваются при
                                    осмотре и до вывоза двигателя
                                    со склада.
                                </Typography>

                                <Typography variant={"body2"}>
                                    В случае просрочки времени свыше 7 дней с момента получения клиентом двигателя, а
                                    также
                                    самостоятельной разборке двигателя или нарушения меток продавца – претензии не
                                    принимаются.
                                </Typography>


                                <Typography variant={"h6"} style={{marginTop: 8}}>
                                    Остальные запчасти
                                </Typography>

                                <Typography variant={"body2"}>
                                    Возврат возможен только в случае обнаружения скрытых дефектов, которые невозможно
                                    выявить
                                    при внешнем осмотре.
                                </Typography>

                                <List className={classes.listRoot}>
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

                            </div>

                            <div id="react-logo" className={getAnimationRootStyle()}/>

                        </div>

                    </div>
                )

            case "about":
                return (
                    <div className={classes.infoContainer}>

                        <div className={classes.infoContainer2}>

                            <div>

                                <Typography variant={"h6"}>
                                    О нас
                                </Typography>

                                <Typography variant={"body1"} className={classes.marginTop1}>
                                    «Cartalog» — это интернет-магазин запчастей для иномарок, созданный в Магадане и
                                    работающий
                                    с 2019 года.
                                </Typography>

                                <Typography variant={"body1"} className={classes.marginTop1}>
                                    Наша команда предлагает Вам более 1 млн. позиций контрактных запчастей из Японии без
                                    пробега
                                    по РФ!
                                </Typography>

                                <Typography variant={"body1"} className={classes.marginTop1}>
                                    Если Вы не смогли найти нужную Вам запчасть или Вы не знаете как правильно подбирать
                                    запчасти, мы с радостью все сделаем за вас!
                                </Typography>

                                <Typography variant={"body1"} className={classes.marginTop1}>
                                    Перестаньте тратить свое время на поиск запчастей. Обезопасьте себя от риска стать
                                    жертвой
                                    мошенников или
                                    покупки неподходящей запчасти.
                                </Typography>

                                <Typography variant={"body1"} className={classes.marginTop1}>
                                    Скачайте мобильное приложение Cartalog, создайте завяку на поиск запчасти и получите
                                    лучшее
                                    предложение в городе!
                                </Typography>

                            </div>

                            <div id="react-logo" className={getAnimationRootStyle()}/>

                        </div>

                    </div>
                )

            case "contacts":
                const handleNumberClick = async (number) => {

                    await clipboard.writeText(number).then(r => {
                        enqueueSnackbar(`Номер скопирован`, {
                            variant: "info",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            },
                            preventDuplicate: true,
                            autoHideDuration: 2000,
                            action: <Button style={{color: "White"}} onClick={() => {
                                handleCall()
                            }}>
                                Позвонить
                            </Button>
                        })
                    });

                    const handleCall = () => {

                        window.open(`tel:${number}`)

                    }

                }
                return (
                    <div className={classes.infoContainer}>

                        <Typography variant={"h6"}>
                            Контакты
                        </Typography>

                        <div className={classes.infoContainer2}>
                            <List className={classes.listRoot}>
                                <ListItem onClick={() => {
                                    handleNumberClick(`+7(914)-030-6366`)
                                }}>
                                    <ListItemText primary={"Отдел продаж"}
                                                  secondary={
                                                      <React.Fragment>
                                                          <Typography
                                                              component="span"
                                                              variant="body2"
                                                              color="textPrimary"
                                                          >
                                                              +7(914)-030-6366
                                                          </Typography>
                                                      </React.Fragment>
                                                  }
                                    >
                                    </ListItemText>
                                </ListItem>
                                <ListItem onClick={() => {
                                    handleNumberClick(`+7(914)-039-0623`)
                                }}>
                                    <ListItemText primary={"Техническая поддержка"}
                                                  secondary={
                                                      <React.Fragment>
                                                          <Typography
                                                              component="span"
                                                              variant="body2"
                                                              color="textPrimary"
                                                          >
                                                              +7(914)-039-0623
                                                          </Typography>
                                                      </React.Fragment>
                                                  }
                                    >
                                    </ListItemText>
                                </ListItem>

                            </List>

                            <div id="react-logo" className={getAnimationRootStyle()}/>

                        </div>

                    </div>
                )

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

            case "about":
                return classes.aboutAnimation

            case "guarantees":
                return classes.guaranteesAnimation

            case "refund":
                return classes.refundAnimation

            default:
                return classes.emptyCartContainer

        }

    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xl={2} lg={2} md={false} sm={false} xs={false}/>
                <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                    {renderContent()}
                </Grid>
                <Grid item xl={2} lg={2} md={false} sm={false} xs={false}/>
            </Grid>
        </div>
    )

}

export default InfoComponentView