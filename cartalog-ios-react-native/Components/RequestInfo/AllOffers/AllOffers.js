import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import database from '@react-native-firebase/database';
import OfferCard from './OfferCard/OfferCard';
import {ActivityIndicator} from 'react-native-paper';

const styles = StyleSheet.create({

    indicator: {
        marginTop: '35%',
    },
    offers: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
    noOffers: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5,
    },

});

const AllOffers = (props) => {

    const request = props.request;
    const [allOffersDataset, setAllOffersDataset] = useState([]);
    const [animating, setAnimating] = useState(true);

    const offersCount = request.offersCount;

    useEffect(() => {

        if (offersCount > 0) {

            const city = 'magadan';
            const type = request.type;

            const key = request.key;

            const dbRef = database().ref('messages').child(city).child(type).child(key);

            dbRef.once('value', snap => {

                setAnimating(false);

                const data = snap.val();
                setAllOffersDataset(data);

            });

        } else {

            setTimeout(() => {

                setAnimating(false);

            }, 1000);

        }

    }, [offersCount]);

    const offersCards = () => {

        const vendorIDs = Object.keys(allOffersDataset);

        const cards = vendorIDs.map(vendorID => {

            return (<OfferCard key={vendorID} vendorID={vendorID} allMessages={allOffersDataset[vendorID]} request={request}/>);

        });

        return (cards);

    };

    const requestStatus = () => {

        if (animating === false) {

            const vendorType = () => {

                if (request.type === 'autoparts') {

                    return ('автомагазинов');

                } else {

                    return ('автосервисов');

                }

            };

            const keys = Object.keys(allOffersDataset);

            if (keys.length > 0) {
                return (
                    <Text allowFontScaling={false} style={styles.offers}>Предложения от {vendorType()}:</Text>
                );
            } else {
                return (
                    <Text allowFontScaling={false} style={styles.noOffers}>На вашу заявку еще не ответили...</Text>
                );
            }

        }

    };

    return (

        <View>
            {requestStatus()}
            {offersCards()}
            <View style={styles.indicator}>
                <ActivityIndicator animating={animating} color={'#558cee'} size={'large'}/>
            </View>
        </View>

    );

};

export default AllOffers;
