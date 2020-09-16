import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Toolbar from '../Toolbar/Toolbar';
import database from '@react-native-firebase/database';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({

    partnerCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    cardInnerStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#5895e3',
        width: '100%',
        height: '100%',
    },
    cardText: {
        marginStart: 15,
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    indicator: {
        position: 'absolute',
        top: 250,
        start: '43%',
    },

});

const Digest = (props) => {

    const type = props.route.params.type;

    const [partnersList, setPartnersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {

        if (partnersList.length === 0) {

            const dbRef = database().ref('digest').child('magadan').child(type);

            const list = [];

            dbRef.once('value', snap => {

                if (snap.exists()) {

                    const data = snap.val();

                    const partnersKeys = Object.keys(data);

                    partnersKeys.forEach((key, ind) => {

                        const obj = data[key];

                        list.push(obj);

                        if (partnersKeys.length === ind + 1) {

                            setPartnersList(list);

                        }

                    });

                }

                setIsLoading(false);

            });

        }

    }, [partnersList]);

    const digestList = () => {

        const handleDigestClick = (partner) => {

            navigation.navigate('DigestDetailed', {
                partner: partner,
                type: type,
            });

        };

        const list = partnersList.map(partner => {

            return (

                <TouchableOpacity style={styles.partnerCard} key={partner.uid} onPress={() => {
                    handleDigestClick(partner);
                }}>

                    <View style={styles.cardInnerStyle}>

                        <Text style={styles.cardText}>{partner.name}</Text>

                    </View>

                </TouchableOpacity>

            );

        });

        return (list);

    };

    return (

        <View style={{width: '100%', height: '100%', backgroundColor: '#3b559b'}}>

            <SafeAreaView>

                <View style={{width:'100%',height:'100%',backgroundColor: 'white'}}>

                    <Toolbar title={'Digest'}/>

                    <ScrollView>

                        <View>

                            {digestList()}

                            <View style={{width: '100%', height: 5}}/>

                        </View>

                    </ScrollView>

                    <ActivityIndicator size={'large'} color={'#5895e3'} animating={isLoading} style={styles.indicator}/>

                </View>

            </SafeAreaView>

        </View>
    );
};

export default Digest;
