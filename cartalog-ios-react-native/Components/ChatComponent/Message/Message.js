import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator} from 'react-native-paper';

const styles = StyleSheet.create({

    mainStart: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
    },
    mainEnd: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-end',
    },
    root: {
        backgroundColor: '#eaf5e9',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 15,
        maxWidth: '80%',
    },
    title: {
        fontSize: 18,
    },
    image: {
        width: 300,
        height:300,
        borderRadius: 15,
        borderColor:'white',
        borderWidth:3
    },
    indicator:{
        position:'absolute',
        top:135,
        left:135
    },
    messageText:{
        fontSize: 18
    },
    messageTextTime:{
        textAlign:'right',
        marginTop:5
    }


});

const Message = (props) => {

    const messageObject = props.messageObject;
    const message = messageObject.message;
    const time = messageObject.time;
    const viewType = messageObject.viewType;
    const navigation = useNavigation();

    const align = () => {

        switch (viewType) {
            case 0:
                return (styles.mainStart);
            case 1:
                return (styles.mainStart);
            case 2:
                return (styles.mainEnd);
            case 3:
                return (styles.mainEnd);
        }

    };

    const handleImageClick = () => {

        navigation.navigate('ImageComponent',{
            source:message
        })

    };

    const body = () => {

        switch (viewType) {
            case 0:
                return (
                    <View style={{...styles.root, padding: 10,
                    }}>
                        <Text style={styles.messageText}>{message}</Text>
                        <Text style={styles.messageTextTime}>{time}</Text>
                    </View>
                );
            case 1:
                return (
                    <TouchableOpacity style={styles.root} onPress={()=>{handleImageClick()}}>
                        <ActivityIndicator style={styles.indicator} animating={true}/>
                        <Image
                            style={styles.image}
                            source={{uri:message}}
                        />
                    </TouchableOpacity>
                );
            case 2:
                return (
                    <View style={{...styles.root, padding: 10,
                    }}>
                        <Text style={styles.messageText}>{message}</Text>
                        <Text style={styles.messageTextTime}>{time}</Text>
                    </View>
                );
            case 3:
                return (
                    <TouchableOpacity style={styles.root} onPress={()=>{handleImageClick()}}>
                        <ActivityIndicator style={styles.indicator} animating={true}/>
                        <Image
                            style={styles.image}
                            source={{uri:message}}
                        />
                    </TouchableOpacity>
                );
        }

    };

    return (
        <View style={align()}>
            {body()}
        </View>
    );

};

export default Message;
