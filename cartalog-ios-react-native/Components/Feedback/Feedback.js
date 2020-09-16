import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Alert} from 'react-native';
import Toolbar from '../Toolbar/Toolbar';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import database from '@react-native-firebase/database';
import ntpClient from 'react-native-ntp-client';

const styles = StyleSheet.create({

    subtitle: {
        fontSize: 16,
        color: '#1b1e38',
        textAlign: 'center',
        margin: 20,
    },
    input: {
        marginHorizontal: 20,
        backgroundColor:'white'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },
    buttonBack: {
        width: '50%',
        paddingHorizontal: 5,
    },
    buttonOK: {
        width: '50%',
        paddingHorizontal: 5,
        backgroundColor: "#558cee"
    },

});

const Feedback = (props) => {

    const [message, setMessage] = useState('');
    const [okDisabled, setOkDisabled] = useState(false);
    const navigation = useNavigation();

    const userID = props.route.params.userID;

    const handleBack = () => {

        navigation.goBack();

    };

    const sendFeedback = () => {

        if (message.length > 0) {

            setOkDisabled(true);

            ntpClient.getNetworkTime('pool.ntp.org', 123, (error, date) => {

                if (error) {

                    console.error(error);
                    setOkDisabled(false);

                } else {

                    const timestamp = new Date(date).getTime();

                    const feedbackObj = {
                        message: message,
                        timestamp: timestamp,
                        userID: userID,
                    };

                    database().ref('feedback').child('magadan').child(userID).push().set(feedbackObj).then(r => {
                        navigation.goBack();
                    });

                }

            });

        } else {

            Alert.alert('Ошибка', 'Введите сообщение');

        }

    };

    return (

        <View style={{width: '100%', height: '100%', backgroundColor: '#3b559b'}}>

            <SafeAreaView>

                <View style={{backgroundColor:'white',width:'100%',height:'100%'}}>

                    <Toolbar title={'Feedback'}/>

                    <View>

                        <Text style={styles.subtitle}>
                            Если у вас возникли трудности, вы обнаружили ошибку, у вас есть предложение или вы хотите стать
                            партнером - напишите нам сообщение и мы обязательно его обработаем!
                        </Text>

                        <TextInput
                            style={styles.input}
                            label='Сообщение'
                            mode={'outlined'}
                            multiline={true}
                            value={message}
                            onChangeText={text => setMessage(text)}
                        />

                        <View style={styles.buttons}>

                            <Button
                                style={styles.buttonBack}
                                mode="text"
                                color={"#558cee"}
                                onPress={() => {
                                    handleBack();
                                }}
                            >
                                Назад
                            </Button>

                            <Button
                                disabled={okDisabled}
                                style={styles.buttonOK}
                                mode="contained"
                                onPress={() => (sendFeedback())}
                            >
                                ОК
                            </Button>

                        </View>

                    </View>

                </View>

            </SafeAreaView>

        </View>

    );

};

export default Feedback;
