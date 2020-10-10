import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Toolbar from '../Toolbar/Toolbar';
import {useNavigation} from '@react-navigation/core';
import AllOffers from './AllOffers/AllOffers';
import database from '@react-native-firebase/database';

const styles = StyleSheet.create({

    infoCard: {
        backgroundColor: '#558cee',
        marginHorizontal: 10,
        marginTop: 10,
        minHeight: 100,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 5,
    },
    row: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    text1: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 20,
        color: 'white',
    },
    editButton: {
        marginTop: 10,
    },

});

const RequestInfo = (props) => {

    const request = props.route.params.request;
    const navigation = useNavigation();

    const handleEditPress = () => {

        navigation.navigate('NewRequest', {request: request});

    };

    return (
        <View style={{width: '100%', height: '100%', backgroundColor: '#3b559b'}}>

            <SafeAreaView>

                <View style={{width:'100%',height:'100%',backgroundColor: 'white'}}>
                    <Toolbar title={request.type} renderDelete={true} request={request}/>

                    <View style={styles.infoCard}>

                        <View style={styles.row}>
                            <Text allowFontScaling={false} style={styles.text1}>Автомобиль: </Text>
                            <Text allowFontScaling={false} style={styles.text2}>{request.make} {request.model}, {request.year}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text allowFontScaling={false} style={styles.text1}>VIN: </Text>
                            <Text  allowFontScaling={false} style={styles.text2}>{request.VIN}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text allowFontScaling={false} style={styles.text1}>Описание: </Text>
                            <Text  allowFontScaling={false} style={styles.text2}>{request.description}</Text>
                        </View>

                        <Button style={styles.editButton} icon="pen" mode="contained" color={'white'} onPress={() => {
                            handleEditPress();
                        }}>
                            Изменить
                        </Button>

                    </View>

                    <AllOffers request={request}/>
                </View>

            </SafeAreaView>
        </View>
    );

};

export default RequestInfo;
