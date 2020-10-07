import React, {useState} from 'react';
import {View, StyleSheet, Alert, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toolbar from '../Toolbar/Toolbar';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({
    inputContainer: {
        margin: 10,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    inputVIN: {
        width: '50%',
        backgroundColor: 'white',
        paddingRight: 5,
    },
    inputYear: {
        width: '50%',
        paddingLeft: 5,
        backgroundColor: 'white',
    },
    inputDescr: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    button: {
        padding: 5,
        margin: 10  ,
        textAlign: 'center',
        backgroundColor: '#3367c4',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
});

const NewRequest = (props) => {

    const type = props.route.params.request.type;
    const userID = props.route.params.request.userID;
    const key = props.route.params.request.key;

    const request = props.route.params.request;

    const [make, setMake] = useState(props.route.params.request.make);
    const [model, setModel] = useState(props.route.params.request.model);
    const [VIN, setVIN] = useState(props.route.params.request.VIN);
    const [year, setYear] = useState(props.route.params.request.year);
    const [description, setDescription] = useState(props.route.params.request.description);
    const [buttonText, setButtonText] = useState('OK');
    const [animating, setAnimating] = useState(false);

    const navigation = useNavigation();

    const handleInputChange = (type, value) => {

        switch (type) {

            case 'make':

                setMake(value);

                break;

            case 'model':

                setModel(value);

                break;

            case 'VIN':

                setVIN(value);

                break;

            case 'year':

                setYear(value);

                break;

            case 'description':

                setDescription(value);

                break;

        }

    };

    const sendRequest = () => {

        const handleSend = () => {

            setButtonText('');
            setAnimating(true);

            const dbRef = database().ref('requests').child('magadan').child(type).push();

            const timestamp = -new Date().getTime();

            const request = {
                timestamp: timestamp,
                key: dbRef.key,
                offersCount: 0,
                make: make,
                model: model,
                VIN: VIN,
                year: year,
                description: description,
                type: type,
                userID: userID,
            };

            dbRef.set(request).then(r => {

                navigation.navigate('Content');

            });

        };


        if (make.length > 0 && model.length > 0 && VIN.length > 0 && year.length > 0 && description.length > 0) {

            if (animating === false) {

                if (key) {

                    if (make !== request.make ||
                        model !== request.model ||
                        year !== request.year ||
                        VIN !== request.VIN ||
                        description !== request.description) {

                        Alert.alert(
                            'Вы внесли изменения.',
                            'Все полученные ответы будут удалены',
                            [
                                {text: 'Отмена'},
                                {
                                    text: 'Да', onPress: () => {

                                        const dbRefOld = database().ref('requests').child('magadan').child(type).child(key);
                                        dbRefOld.remove();

                                        handleSend();

                                    },
                                },
                            ],
                        );

                    } else {

                        navigation.goBack();

                    }


                } else {

                    handleSend();

                }

            }

        } else {

            Alert.alert('Ошибка', 'Заполните заявку полностью');

        }

    };

    const buttonContent = () => {

        if (animating) {
            return <ActivityIndicator size="small" color="white" animating={animating}/>;
        } else {
            return <Text style={styles.buttonText}>{buttonText}</Text>;
        }

    };

    return (
        <View style={{width: '100%', height: '100%'}}>
            <SafeAreaView>
                <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                    <Toolbar title={type}/>
                    <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={15}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                mode={'outlined'}
                                style={{
                                    backgroundColor: 'white',
                                }}
                                label='Марка'
                                value={make}
                                onChangeText={(value) => {
                                    handleInputChange('make', value);
                                }}
                            />
                            <TextInput
                                style={{marginTop: 10, backgroundColor: 'white'}}
                                mode={'outlined'}
                                label='Модель'
                                value={model}
                                onChangeText={(value) => {
                                    handleInputChange('model', value);
                                }}
                            />
                            <View style={styles.flexRow}>
                                <TextInput
                                    style={{...styles.inputVIN, marginTop: 10}}
                                    mode={'outlined'}
                                    label='VIN или № кузова'
                                    value={VIN}
                                    onChangeText={(value) => {
                                        handleInputChange('VIN', value);
                                    }}
                                />
                                <TextInput
                                    style={{...styles.inputYear, marginTop: 10}}
                                    mode={'outlined'}
                                    label='Год'
                                    value={year}
                                    onChangeText={(value) => {
                                        handleInputChange('year', value);
                                    }}
                                />
                            </View>
                            <TextInput
                                style={styles.inputDescr}
                                mode={'outlined'}
                                label='Описание'
                                value={description}
                                onChangeText={(value) => {
                                    handleInputChange('description', value);
                                }}
                            />
                        </View>
                    </KeyboardAvoidingView>
                    <Button
                        style={styles.button}
                        mode={'contained'}
                        disabled={animating}
                        onPress={() => {
                            sendRequest();
                        }}>

                        {buttonContent()}
                    </Button>
                </View>
            </SafeAreaView>
        </View>
    );

};

export default NewRequest;
