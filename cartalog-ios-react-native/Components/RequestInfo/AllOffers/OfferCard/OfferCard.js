import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Avatar, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import database from '@react-native-firebase/database';

const styles = StyleSheet.create({

        root: {
            margin: 10,
            display: 'flex',
            flexDirection: 'row',
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginStart: 10,
        },
        text: {
            fontSize: 18,
        },
        vendorName: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        lastMessage: {
            fontSize: 20,
        },
        divider: {
            marginStart: 69,
        },
    },
);

const OfferCard = (props) => {

    const vendorID = props.vendorID;
    const allMessages = props.allMessages;

    const request = props.request;

    const [vendorData, setVendorData] = useState({});
    const [animating, setAnimating] = useState(true);

    const navigation = useNavigation();

    const lastMessage = () => {

        const messagesKeys = Object.keys(allMessages);

        messagesKeys.sort();

        const lastMessageKey = messagesKeys[messagesKeys.length - 1];

        const lastMessage = allMessages[lastMessageKey];

        if (lastMessage.viewType === 1 || lastMessage.viewType === 3) {

            return ('Изображение');

        } else {

            if (lastMessage.message.length > 20) {

                const message = lastMessage.message.substring(0, 24) + '...';

                return (message);

            } else {

                return (lastMessage.message);

            }


        }

    };

    useEffect(() => {

        const dbRef = database().ref('partners2').child(vendorID).child('info');

        dbRef.once('value', snap => {

            setAnimating(false);
            setVendorData(snap.val());

        });

    }, []);

    const body =()=>{

        if (vendorData.name){
            return(

                <View style={styles.textContainer}>

                    <Text allowFontScaling={false} style={styles.vendorName}>{vendorData.name}</Text>
                    <Text allowFontScaling={false} style={styles.lastMessage}>{lastMessage()}</Text>

                </View>

            )
        }else {
            return (

                <ActivityIndicator style={{marginStart:10}} animating={animating} color={'#558cee'} size={'small'}/>

            )
        }


    };

    return (

        <TouchableOpacity onPress={() => {

            if (!animating){
                navigation.navigate('ChatComponent', {
                    title: 'chat',
                    vendorID: vendorID,
                    allMessages: allMessages,
                    vendorData: vendorData,
                    request: request,
                    vendorName:vendorData.name
                });
            }

        }}>
            <View>

                <View style={styles.root}>

                    <Avatar.Icon style={{backgroundColor: '#558cee'}} color={'white'}  size={48} icon="map-marker"/>

                    {body()}

                </View>

                <Divider style={styles.divider}/>

            </View>

        </TouchableOpacity>

    );

};

export default OfferCard;
