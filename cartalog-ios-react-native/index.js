import 'react-native-gesture-handler';
import '@react-native-firebase/crashlytics';
import React, {useEffect} from 'react';
import {Alert, AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Components/Login/Login';
import Content from './Components/Content/Content';
import NewRequest from './Components/NewRequest/NewRequest';
import RequestInfo from './Components/RequestInfo/RequestInfo';
import ChatComponent from './Components/ChatComponent/ChatComponent';
import ImageComponent from './Components/ChatComponent/ImageComponent/ImageComponent';
import Feedback from './Components/Feedback/Feedback';
import Digest from './Components/Digest/Digest';
import DigestDetailed from './Components/Digest/DigestDetailed/DigestDetailed';
import AppIntro from './Components/AppIntro/AppIntro';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

export default function Main() {

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

    const initMessaging = () => {

        async function requestUserPermission() {
            const settings = await messaging().requestPermission();

            if (settings) {
                console.log('Permission settings:', settings);
            }
        }

        const registerAppWithFCM = async () => {
            await messaging().registerDeviceForRemoteMessages();
        };


        requestUserPermission().then(r => {


        });

        registerAppWithFCM().then(r => {});

    };

    initMessaging();

    useEffect(() => {

        const unsubscribe = messaging().onMessage(async remoteMessage => {

            if (remoteMessage.notification) {

                const getData = async () => {

                    try {

                        const value = await AsyncStorage.getItem('@isInChat');

                        if (value !== null) {

                            if (value !== 'inChat') {

                                const title = remoteMessage.notification.title;
                                const body = remoteMessage.notification.body;
                                Alert.alert(title, body);

                            }

                        }
                    } catch (e) {
                        // error reading value
                    }
                };

                getData();



            }

        });

        return unsubscribe;

    }, []);

    useEffect(() => {


        const onRegistered = deviceToken => {

        };

        const onRegistrationError = error => {

        };

        const onRemoteNotification = notification => {

            console.log(notification);

            const details = {
                alertTitle: notification.title,
                alertBody: notification.body,
            };

            PushNotificationIOS.presentLocalNotification(details);

        };

        const onLocalNotification = notification => {
        };

        PushNotificationIOS.requestPermissions();
        PushNotificationIOS.addEventListener('register', onRegistered);
        PushNotificationIOS.addEventListener(
            'registrationError',
            onRegistrationError,
        );
        PushNotificationIOS.addEventListener('notification', onRemoteNotification);
        PushNotificationIOS.addEventListener(
            'localNotification',
            onLocalNotification,
        );
        return () => {
            PushNotificationIOS.removeEventListener('register', onRegistered);
            PushNotificationIOS.removeEventListener(
                'registrationError',
                onRegistrationError,
            );
            PushNotificationIOS.removeEventListener(
                'notification',
                onRemoteNotification,
            );
            PushNotificationIOS.removeEventListener(
                'localNotification',
                onLocalNotification,
            );
        };
    }, []);

    useEffect(() => {

        auth().onAuthStateChanged((user) => {

            if (user) {

                const saveTokenToDatabase = (token) => {

                    const userID = user.uid;

                    const dbRef = database().ref('users').child(userID);

                    const data = {
                        messagingToken: token,
                        city: 'magadan',
                        lastOnline:database.ServerValue.TIMESTAMP,
                        client:"IOS"
                    };

                    dbRef.set(data);

                };

                messaging()
                    .getToken()
                    .then(token => {
                        return saveTokenToDatabase(token);
                    });

            }

        });

    }, []);

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name="Content"
                        component={Content}
                        options={{
                            gestureEnabled: false,
                        }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            gestureEnabled: false,
                        }}
                    />
                    <Stack.Screen
                        name="NewRequest"
                        component={NewRequest}
                    />
                    <Stack.Screen
                        name="RequestInfo"
                        component={RequestInfo}
                    />
                    <Stack.Screen
                        name="ChatComponent"
                        component={ChatComponent}
                    />
                    <Stack.Screen
                        name="ImageComponent"
                        component={ImageComponent}
                    />
                    <Stack.Screen
                        name="Feedback"
                        component={Feedback}
                    />
                    <Stack.Screen
                        name="Digest"
                        component={Digest}
                    />
                    <Stack.Screen
                        name="DigestDetailed"
                        component={DigestDetailed}
                    />
                    <Stack.Screen
                        name="AppIntro"
                        component={AppIntro}
                        options={{
                            gestureEnabled: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
