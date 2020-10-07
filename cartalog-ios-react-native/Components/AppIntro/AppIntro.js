import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/core';

const slides = [
    {
        key: 1,
        title: 'Начните искать запчасти для вашего автомобиля по-новому...',
        text: 'Больше не нужно ездить по всему городу в поисках нужной детали!',
        image: require('../../Assets/Images/searchImg.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Любые запчасти в наличии и под заказ',
        text: 'Доставка самолетом и морем в кратчайшие сроки и по самым выгодным ценам!',
        image: require('../../Assets/Images/deliveru.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Запишитесь на ремонт!',
        text: 'Опишите поломку, автосервисы свяжутся с Вами. Обсудите детали во встроенном чате!',
        image: require('../../Assets/Images/repair.png'),
        backgroundColor: '#22bcb5',
    },
    {
        key: 4,
        title: 'Экономьте время и деньги!',
        text: 'Доверьте ремонт и подбор запчастей для вашего авто профессионалам',
        image: require('../../Assets/Images/waiting.png'),
        backgroundColor: '#22bcb5',
    },
];

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    slide: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    image: {
        width: '90%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
    },
    image2: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
    },
    title: {
        marginHorizontal: 25,
        marginTop: 50,
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
    },
    subtitle: {
        marginTop: 10,
        marginHorizontal: 25,
        fontSize: 18,
        fontWeight: 'normal',
        color: 'grey',
    },
    contentText: {
        marginTop: 20,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 40,
    },
    slide2Title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 10,
        textAlign: 'center',
    },
    doneButton: {
        marginTop:10,
    },
    doneButtonText:{
        fontSize:20,
        color:"green",
        fontWeight:"400"
    },
    nextButton: {
        marginTop:10,
    },
    nextButtonText:{
        fontSize:20,
        color:"#515172",
        fontWeight:"400"
    }

});

const AppIntro = () => {

    const navigation = useNavigation();

    const _renderItem = ({item}) => {

        switch (item.key) {

            case 1:
                return (
                    <View style={styles.slide}>
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.subtitle}>{item.text}</Text>
                        </View>
                        <Image style={styles.image} source={item.image} resizeMode={'contain'}/>
                    </View>
                );

            case 2:
                return (
                    <View style={styles.slide}>
                        <Text allowFontScaling={0} style={styles.title}>{item.title}</Text>
                        <Text allowFontScaling={0} style={styles.subtitle}>{item.text}</Text>
                        <Image style={styles.image2} source={item.image} resizeMode={'contain'}/>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.slide}>
                        <Text allowFontScaling={0} style={styles.title}>{item.title}</Text>
                        <Text allowFontScaling={0} style={styles.subtitle}>{item.text}</Text>
                        <Image style={styles.image} source={item.image} resizeMode={'contain'}/>
                    </View>
                );

            case 4:
                return (
                    <View style={styles.slide}>
                        <Text allowFontScaling={0} style={styles.title}>{item.title}</Text>
                        <Text allowFontScaling={0} style={styles.subtitle}>{item.text}</Text>
                        <Image style={styles.image2} source={item.image} resizeMode={'contain'}/>
                    </View>
                );

            case 5:
                return (
                    <View style={styles.slide}>
                        <Text allowFontScaling={0} style={styles.title}>{item.title}</Text>
                        <Text allowFontScaling={0} style={styles.subtitle}>{item.text}</Text>
                        <Image style={styles.slide2Image} source={item.image} resizeMode={'contain'}/>
                    </View>
                );

        }

    };

    const handleDonePress = () => {

        navigation.navigate('Content');

    };

    const renderDoneButton = () => {

        return (

            <View style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Готово</Text>
            </View>

        );

    }

    const renderNextButton = () => {

        return (

            <View style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Далее</Text>
            </View>

        );

    };

    return (

        <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>

            <SafeAreaView>

                <View style={styles.root}>

                    <AppIntroSlider
                        renderItem={_renderItem}
                        data={slides}
                        renderDoneButton={renderDoneButton}
                        renderNextButton={renderNextButton}
                        activeDotStyle={{backgroundColor: '#9f365a'}}
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
