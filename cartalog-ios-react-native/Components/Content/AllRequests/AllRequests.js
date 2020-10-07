import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import database from '@react-native-firebase/database';
import Request from './Request/Request';
import {ActivityIndicator} from 'react-native-paper';

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    indicator: {
        alignItems: 'center',
        marginTop: '75%',
    },
});

const AllRequests = (props) => {

    const [animating, setAnimating] = useState(true);
    const [requestsDataset, setRequestsDataset] = useState([]);
    const userID = props.userID;

    useEffect(() => {

        if (userID) {


            const dbRefParts = database().ref('requests').child('magadan').child('autoparts').orderByChild('userID').equalTo(userID);
            const dbRefService = database().ref('requests').child('magadan').child('autoservice').orderByChild('userID').equalTo(userID);

            const tempDataset = [];

            const handlChildAdded = () => {

                dbRefParts.on('child_added', snap => {

                    tempDataset.unshift(snap.val());
                    setRequestsDataset([...tempDataset]);

                    setAnimating(false);

                });

                dbRefService.on('child_added', snap => {

                    tempDataset.unshift(snap.val());
                    setRequestsDataset([...tempDataset]);

                    setAnimating(false);

                });

            };

            const handleChildRemoved = () => {

                dbRefParts.on('child_removed', snap => {

                    tempDataset.forEach((request, ind) => {

                        if (request.key === snap.key) {

                            tempDataset.splice(ind, 1);
                            setRequestsDataset([...tempDataset]);

                        }

                    });

                });

                dbRefService.on('child_removed', snap => {

                    tempDataset.forEach((request, ind) => {

                        if (request.key === snap.key) {

                            tempDataset.splice(ind, 1);
                            setRequestsDataset([...tempDataset]);

                        }

                    });

                });

            };

            const handleChildChanged = () => {

                dbRefParts.on('child_changed', snap => {

                    tempDataset.forEach((request, ind) => {

                        if (request.key === snap.key) {

                            tempDataset[ind] = snap.val();
                            setRequestsDataset([...tempDataset]);

                        }

                    });

                });

                dbRefService.on('child_changed', snap => {

                    tempDataset.forEach((request, ind) => {

                        if (request.key === snap.key) {

                            tempDataset[ind] = snap.val();
                            setRequestsDataset([...tempDataset]);

                        }

                    });

                });

            };

            handlChildAdded();
            handleChildRemoved();
            handleChildChanged();

            dbRefParts.once('value', snap => {
                if (snap.exists) {
                    setAnimating(false);
                }
            });

            dbRefService.once('value', snap => {
                if (snap.exists) {
                    setAnimating(false);
                }
            });

        }

    }, [userID]);

    const myRequests = () => {

        if (requestsDataset.length > 0) {
            const allRequests = requestsDataset.map(request =>
                <Request key={request.key} request={request}/>
                );
            return allRequests;
        } else {

            if (animating) {
                return (
                    <View style={styles.indicator}>
                        <ActivityIndicator animating={animating} color={'#558cee'} size={'large'}/>
                    </View>
                );
            } else {
                return (
                    <Image style={{width: '60%', height: '60%', marginHorizontal: '20%', marginTop: '40%'}}
                           source={require('../../../Assets/Images/addRequest.png')}/>
                );
            }

        }


    };

    return (
        <View style={styles.root}>
            {myRequests()}
        </View>
    );

};

export default AllRequests;
