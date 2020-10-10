import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Keyboard, Alert, TextInput, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Button, IconButton} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
    },
    backgroundVideo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 10,
    },
    inputCard: {
        height: '50%',
        marginBottom: 30,
        borderColor: 'white',
        marginHorizontal: 30,
    },
    title: {
        position: 'absolute',
        top: '25%',
        width: '100%',
        textAlign: 'center',
    },
    titleText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    subtitleText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        width: '100%',
        alignItems: 'center',
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'white',
    },
    input: {
        height: 50,
        width: '100%',
        fontSize: 20,
        color: 'white',
    },
    button: {
        borderRadius: 35,
        padding: 10,
    },
});

const Login = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [buttonText, setButtonText] = useState('Получить СМС код');
    const [confirmation, setConfirmation] = useState(null);
    const [animating, setAnimating] = useState(false);

    const navigation = useNavigation();

    const inputRef = useRef(null);

    useEffect(() => {

        if (phoneNumber.length === 12) {
            Keyboard.dismiss();
        }

    }, [phoneNumber]);

    useEffect(() => {

        if (verificationCode.length === 6) {
            Keyboard.dismiss();
        }

    }, [verificationCode]);

    useEffect(() => {

        auth().onAuthStateChanged((user) => {

            if (user) {

                setAnimating(false);
                navigation.navigate('AppIntro');

            }

        });

    }, []);

    const onChangePhoneNumber = (text) => {
        console.log(text);
        setPhoneNumber(text);
    };

    const onChangeVerificationeCode = (text) => {
        console.log(text);
        setVerificationCode(text);
    };

    const handleLoginButtonPress = async () => {

        setAnimating(true);

        switch (buttonText) {

            case 'Получить СМС код':

                if (phoneNumber.length === 12) {

                    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

                    setConfirmation(confirmation);

                    setTimeout(() => {
                        setButtonText('Отправить СМС код');
                        setAnimating(false);
                    }, 3500);

                } else {
                    Alert.alert('Ошибка', 'Неверный номер');
                    setAnimating(false);
                }

                break;

            case 'Отправить СМС код':

                if (verificationCode.length === 6) {

                    async function confirmCode() {
                        try {
                            await confirmation.confirm(verificationCode);
                        } catch (error) {
                            Alert.alert('Неверный код');
                        }
                    }

                    await confirmCode();

                } else {
                    Alert.alert('Ошибка', 'Введите СМС код');
                    setAnimating(false);
                }

                break;

        }


    };

    const textInputs = () => {

        switch (buttonText) {

            case 'Получить СМС код':
                return (

                    <View style={styles.inputContainer}>
                        <View style={{margin: 0, paddingTop: 5, paddingLeft: 5}}>
                            <IconButton icon="phone"
                                        color={'white'}
                                        size={36}/>
                        </View>

                        <TextInput
                            allowFontScaling={false}
                            ref={inputRef}
                            style={styles.input}
                            placeholder='Номер телефона'
                            placeholderTextColor={'white'}
                            value={phoneNumber}
                            keyboardType={'phone-pad'}
                            onFocus={() => {
                                setPhoneNumber('+7');
                            }}
                            onChangeText={text => onChangePhoneNumber(text)}
                        />
                    </View>

                );

            case 'Отправить СМС код':

                return (
                    <View style={styles.inputContainer}>
                        <View style={{margin: 0, paddingTop: 5, paddingLeft: 5}}>
                            <IconButton icon="safe"
                                        color={'white'}
                                        size={36}/>
                        </View>

                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder='Код из СМС'
                            placeholderTextColor={'white'}
                            value={verificationCode}
                            keyboardType={'number-pad'}
                            mode={'outlined'}
                            onChangeText={text => onChangeVerificationeCode(text)}
                        />

                    </View>
                );

        }

    };

    const buttonContent = () => {

        if (animating) {
            return (
                <ActivityIndicator size="small" color="white" animating={animating}/>
            );
        } else {
            return (
                <Text style={styles.appbarTitle}>{buttonText}</Text>
            );
        }


    };

    return (

        <View style={{width: '100%', height: '100%', backgroundColor: '#3b559b'}}>

                <Video
                    source={require('../../Assets/Videos/video-background.mp4')}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={'cover'}
                    rate={1.0}
                    ignoreSilentSwitch={'obey'}
                />

                <View style={styles.title}>
                    <Text style={styles.titleText}>CARTALOG</Text>
                    <Text style={styles.subtitleText}>Р Е Г И С Т Р А Ц И Я</Text>
                </View>

                <TouchableOpacity style={styles.root} onPress={() => {
                    inputRef.current.blur();
                }} activeOpacity={1}>
                    <View style={styles.inputCard}>

                        {textInputs()}

                        <View style={{
                            width: '100%',
                            height: 60,
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                            <Button
                                style={styles.button}
                                mode="contained"
                                color={'purple'}
                                onPress={() => handleLoginButtonPress()}
                            >
                                {buttonContent()}
                            </Button>
                        </View>

                    </View>
                </TouchableOpacity>

        </View>
    );

};

export default Login;
