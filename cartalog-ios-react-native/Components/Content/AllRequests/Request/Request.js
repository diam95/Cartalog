import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({
        root: {
            width: '100%',
            margin: 10,
            display: 'flex',
            flexDirection: 'row',
        },
        textContainer: {
            marginStart: 10,
        },
        text: {
            fontSize: 20,
        },
        divider: {
            marginStart: 69,
        },
        countContainer: {
            backgroundColor: 'green',
            borderRadius: 15,
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            right: 15,
        },
        offersCount: {
            marginHorizontal: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
        },
    },
);

const Request = (props) => {

    const request = props.request;
    const navigation = useNavigation();

    const offersCountCard = () => {

        if (request.offersCount > 0) {
            return (
                <View style={styles.countContainer}>
                    <Text allowFontScaling={false} style={styles.offersCount}>Ответы: {request.offersCount}</Text>
                </View>
            );
        } else {
            return (<View></View>);
        }

    };

    const renderAvatar = () => {

        if (request.type === 'autoparts') {
            return (<Avatar.Icon style={{backgroundColor: '#558cee'}} color={'white'} size={48} icon="magnify"/>
            );
        } else {
            return (<Avatar.Icon style={{backgroundColor: '#558cee'}} color={'white'}  size={48} icon="cogs"/>
            );
        }

    };

    return (

        <TouchableOpacity onPress={() => {
            navigation.navigate('RequestInfo', {request: request, renderDelete: true});
        }}>
            <View>

                <View style={styles.root}>

                    {renderAvatar()}

                    <View style={styles.textContainer}>

                        <Text allowFontScaling={false} style={styles.text}>{request.make} {request.model}, {request.year}</Text>
                        <Text allowFontScaling={false} style={{...styles.text, marginTop: 5}}>{request.description}</Text>

                    </View>

                    {offersCountCard()}

                </View>

                <Divider style={styles.divider}/>

            </View>
        </TouchableOpacity>


    );

};

export default Request;
