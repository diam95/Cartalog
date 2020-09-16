import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {ActivityIndicator, Appbar, IconButton} from 'react-native-paper';
import AppbarBackAction from 'react-native-paper/src/components/Appbar/AppbarBackAction';
import {useNavigation} from '@react-navigation/core';
import database from '@react-native-firebase/database';

const styles = StyleSheet.create({
    appbar: {
        display: 'flex',
        backgroundColor: '#558cee',
        width: '100%',
        justifyContent: 'center',
    },
    appbarContent: {
        display: 'flex',
        flexDirection: 'row',
    },
    appbarTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
    },
});

const Toolbar = (props) => {

    const [toolbarTitle, setToolbarTitle] = useState();
    const [animating, setAnimating] = useState(false);

    useEffect(() => {

        switch (props.title) {

            case 'appName':
                setToolbarTitle('Cartalog');
                break;

            case 'autoparts':
                setToolbarTitle('Найти запчасть');
                break;

            case 'autoservice':
                setToolbarTitle('Найти автосервис');
                break;

            case 'chat':
                const vendorName1 = props.vendorName;
                setToolbarTitle(vendorName1);
                break;

            case 'ImageComponent':
                setToolbarTitle('Изображение');
                break;

            case 'Feedback':
                setToolbarTitle('Обратная связь');
                break;

            case 'Digest':
                setToolbarTitle('Справочник');
                break;

            case 'DigestDetailed':
                const vendorName = props.vendorName;
                setToolbarTitle(vendorName);
                break;

        }

    }, [props.title]);

    const navigation = useNavigation();

    const handleBackButtonPress = () => {

        navigation.goBack();

    };

    const handleDownloadButtonPress = () => {

        console.log('download');

    };

    const toggleDrawer = () => {

        if (props.title === 'appName') {

            props.setDrawerIsOpen(true);

        }

    };

    const leftButton = () => {

        switch (props.title) {

            case 'appName':

                return (
                    <TouchableOpacity style={{position: 'absolute', left:5}}>
                        <IconButton icon='menu' color={'white'} size={30} onPress={() => {
                            toggleDrawer();
                        }}/>
                    </TouchableOpacity>
                );

            case 'autoparts':

                return (
                    <AppbarBackAction style={{position: 'absolute', left: 0}} color={'white'} onPress={() => {
                        handleBackButtonPress();
                    }}/>
                );

            case 'autoservice':

                return (
                    <AppbarBackAction style={{position: 'absolute', left: 0}} color={'white'} onPress={() => {
                        handleBackButtonPress();
                    }}/>
                );

            case 'chat':

                return (
                    <AppbarBackAction style={{position: 'absolute', left: 0}} color={'white'} onPress={() => {
                        handleBackButtonPress();
                    }}/>
                );

            case 'ImageComponent':

                return (
                    <AppbarBackAction style={{position: 'absolute', left: 0}} color={'white'} onPress={() => {
                        handleBackButtonPress();
                    }}/>
                );

            case 'Feedback':

                return (
                    <AppbarBackAction style={{position: 'absolute', left: 0}} color={'white'} onPress={() => {
                        handleBackButtonPress();
                    }}/>
                );

            case 'Digest':

                return (
                    <AppbarBackAction style={{position: 'absolute', left: 0}} color={'white'} onPress={() => {
                        handleBackButtonPress();
                    }}/>
                );

            case 'DigestDetailed':

                return (
                    <AppbarBackAction style={{position: 'absolute', left: 0}} color={'white'} onPress={() => {
                        handleBackButtonPress();
                    }}/>
                );

        }


    };

    const rightButton = () => {

        if (props.title === 'ImageComponent') {

            return (
                <IconButton icon='download' style={{position: 'absolute', right: 0}} color={'white'} onPress={() => {
                    handleDownloadButtonPress();
                }}/>
            );

        } else {

            if (props.renderDelete) {

                const deleteRequest = () => {

                    const request = props.request;
                    const type = request.type;
                    const requestKey = request.key;

                    const dbRef = database().ref('requests').child('magadan').child(type).child(requestKey);


                    const handleDelete = () => {

                        dbRef.remove();
                        navigation.navigate('Content');

                    };

                    Alert.alert(
                        'Удалить заявку?',
                        '',
                        [
                            {text: 'Отмена'},
                            {
                                text: 'Да', onPress: () => {
                                    handleDelete();
                                },
                            },
                        ],
                    );

                };

                return (
                    <IconButton icon='delete' style={{position: 'absolute', right: 0}} color={'white'} onPress={() => {
                        deleteRequest();
                    }}/>
                );

            } else {

                return (<View/>);

            }

        }

    };

    const handleTitlePress = () => {


        if (props.title === 'chat') {

            setAnimating(true);

            const type = props.type;
            const vendorID = props.vendorID;

            const dbRef = database().ref('digest').child('magadan').child(type).child(vendorID);

            dbRef.once('value', snap => {

                navigation.navigate('DigestDetailed', {
                    vendorID: vendorID,
                    vendorName: props.vendorName,
                    type: type,
                    partner: snap.val(),
                });

                setAnimating(false);

            });

        }

    };

    const title = () => {

        if (animating) {
            return (
                <ActivityIndicator size="small" color="white" animating={animating}/>
            );
        } else {
            return (
                <Text allowFontScaling={false} style={styles.appbarTitle}>{toolbarTitle}</Text>
            );
        }


    };

    return (
        <Appbar style={styles.appbar}>
            {leftButton()}
            <View style={styles.appbarContent}>
                <TouchableOpacity onPress={() => {
                    handleTitlePress();
                }}>
                    {title()}
                </TouchableOpacity>
            </View>
            {rightButton()}
        </Appbar>
    );

};

export default Toolbar;
