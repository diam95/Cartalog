import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/core';

const slides = [
    {
        key: 1,
        title: 'ДОБРО ПОЖАЛОВАТЬ В',
        text: 'CARTALOG!',
        image: require('../../Assets/Images/logo2.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Создавайте заявки на поиск запчастей и ремонт',
        image: require('../../Assets/Images/main_activity_1.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Магазины ответят на вашу заявку. Выберите лучшее предложение',
        image: require('../../Assets/Images/request_info.png'),
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        backgroundColor: '#22bcb5',
    },
    {
        key: 4,
        title: 'Воспользуйтесь чатом, если у Вас есть дополнительные вопросы',
        image: require('../../Assets/Images/chat_activity.png'),
        backgroundColor: '#22bcb5',
    },
    {
        key: 5,
        title: 'Посмотрите адрес, номер телефона и часы работы магазина',
        image: require('../../Assets/Images/digest.png'),
        backgroundColor: '#22bcb5',
    },
];

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4a65a3',
        display: 'flex',
        flexDirection: 'column',
    },
    slide: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    image: {
        marginTop: '40%',
        width: 150,
        height: 150,
    },
    title: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    contentText: {
        marginTop: 20,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 40,
    },
    slide2Image: {
        maxWidth: '72%',
        maxHeight: '75%',
    },
    slide2Title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
        textAlign: 'center',
    },
});

const AppIntro = () => {

    const navigation = useNavigation();

    const _renderItem = ({item}) => {

        switch (item.key) {

            case 1:
                return (
                    <View style={styles.slide}>
                        <Image style={styles.image} source={item.image}/>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.text}</Text>
                        <Text style={styles.contentText}>{item.contentText}</Text>
                    </View>
                );

            case 2:
                return (
                    <View style={styles.slide}>
                        <Text numberOfLines={2} allowFontScaling={0}  style={styles.slide2Title}>{item.title}</Text>
                        <Image style={styles.slide2Image} source={item.image}/>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.slide}>
                        <Text numberOfLines={2} allowFontScaling={0} style={styles.slide2Title}>{item.title}</Text>
                        <Image style={styles.slide2Image} source={item.image}/>
                    </View>
                );

            case 4:
                return (
                    <View style={styles.slide}>
                        <Text numberOfLines={2} allowFontScaling={0} style={styles.slide2Title}>{item.title}</Text>
                        <Image style={styles.slide2Image} source={item.image}/>
                    </View>
                );

            case 5:
                return (
                    <View style={styles.slide}>
                        <Text numberOfLines={2} allowFontScaling={0} style={styles.slide2Title}>{item.title}</Text>
                        <Image style={styles.slide2Image} source={item.image}/>
                    </View>
                );

        }

    };

    const handleDonePress = () => {

        navigation.navigate('Content');

    };

    return (

        <View style={{width: '100%', height: '100%', backgroundColor: '#3b559b'}}>

            <SafeAreaView>

                <View style={styles.root}>

                    <AppIntroSlider
                        renderItem={_renderItem}
                        data={slides}
                        doneLabel={'Далее'}
                        nextLabel={"Далее"}
                        onDone={() => {
                            handleDonePress();
                        }}
                    />

                </View>

            </SafeAreaView>

        </View>
    );

};

export default AppIntro;
