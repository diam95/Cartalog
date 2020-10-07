import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    Alert,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
} from 'react-native';
import {ActivityIndicator, Button, IconButton} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import welcomeImg from '../../Assets/Images/welcome.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/index';

const styles = StyleSheet.create({

    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    inputCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputContainer: {
        width: '85%',
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#1d316e',
    },
    inputContainerFocus: {
        width: '85%',
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#3b81b7',
    },
    welcomeImg: {
        width: '100%',
        resizeMode: 'contain',
    },
    titleContainer: {
        width: '100%',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 46,
        fontWeight: 'bold',
        color: '#1d316e',
    },
    subTitleText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#1d316e',
    },
    button: {
        marginTop: 10,
        width: '85%',
        height: 56,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d316e',
        marginBottom: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    inputText: {
        width: '100%',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 15,
    },
    hintContainer: {
        position: 'absolute',
        top: -15,
        left: 10,
        padding: 5,
        backgroundColor: 'white',
    },
    hintText: {
        color: '#1d316e',
        fontSize: 14,
    },

});

const Login = () => {

    const [phoneNumber, setPhoneNumber] = useState('+7');
    const [inputFocus, setInputFocus] = useState(false);
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
                    Alert.alert('Введите номер телефона');
                    setAnimating(false);
                    inputRef.current.focus();
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

    const getInputStyle = () => {

        if (inputFocus) {
            return styles.inputContainerFocus;
        } else {
            return styles.inputContainer;
        }

    };

    const textInputs = () => {

        switch (buttonText) {

            case 'Получить СМС код':
                return (

                    <View style={getInputStyle()}>

                        <TextInput
                            allowFontScaling={false}
                            ref={inputRef}
                            style={styles.inputText}
                            placeholder='+7'
                            placeholderTextColor={'grey'}
                            value={phoneNumber}
                            keyboardType={'phone-pad'}
                            onFocus={() => {
                                setInputFocus(true);
                            }}
                            onChangeText={text => onChangePhoneNumber(text)}
                        />

                        <View style={styles.hintContainer}>
                            <Text style={styles.hintText}>Номер телефона</Text>
                        </View>

                    </View>

                );

            case 'Отправить СМС код':

                return (
                    <View style={getInputStyle()}>

                        <TextInput
                            ref={inputRef}
                            style={styles.inputText}
                            placeholder='Код из СМС'
                            placeholderTextColor={'white'}
                            value={verificationCode}
                            keyboardType={'number-pad'}
                            mode={'outlined'}
                            textContentType={'phone-number'}
                            onFocus={() => {
                                setInputFocus(true);
                            }}
                            onChangeText={text => onChangeVerificationeCode(text)}
                        />

                        <View style={styles.hintContainer}>
                            <Text style={styles.hintText}>Код из СМС</Text>
                        </View>

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
                <Text style={styles.buttonText}>{buttonText}</Text>
            );
        }


    };

    return (

        <SafeAreaView style={styles.root}>

            <KeyboardAvoidingView behavior="position" enabled>

                <TouchableOpacity onPress={()=>{inputRef.current.blur()}}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.subTitleText}>Добро пожаловать в</Text>
                        <Text style={styles.titleText}>CARTALOG</Text>
                    </View>

                    <Image source={welcomeImg} style={styles.welcomeImg}/>

                    <TouchableOpacity style={styles.inputCard} onPress={() => {
                        inputRef.current.blur();
                    }} activeOpacity={1}>


                        {textInputs()}

                        <Button
                            style={styles.button}
                            mode="contained"
                            color={'purple'}
                            onPress={() => handleLoginButtonPress()}
                        >
                            {buttonContent()}
                        </Button>


                    </TouchableOpacity>

                </TouchableOpacity>

            </KeyboardAvoidingView>

        </SafeAreaView>

    );

};

export default Login;
