import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Toolbar from '../Toolbar/Toolbar';
import AllRequests from './AllRequests/AllRequests';
import FloatingButton from './FloatingButton/FloatingButton';
import auth from '@react-native-firebase/auth';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu/Menu';

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
});

const Content = (props) => {

    const [userID, setUserID] = useState(null);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {

            if (user) {

                setUserID(user.uid);

            } else {

                props.navigation.navigate('Login');

            }

        });
    }, []);

    const menu = <Menu navigator={navigator} userID={userID}/>;

    return (
        <View style={{width: '100%', height: '100%'}}>

            <SideMenu menu={menu} isOpen={drawerIsOpen} onChange={() => {
                setDrawerIsOpen(!drawerIsOpen);
            }}>
                <SafeAreaView style={styles.root}>

                    <Toolbar title={'appName'} setDrawerIsOpen={setDrawerIsOpen}/>

                    <AllRequests userID={userID}/>

                    <FloatingButton userID={userID} navigation={props.navigation}/>

                </SafeAreaView>
            </SideMenu>
        </View>
    );

};

export default Content;
