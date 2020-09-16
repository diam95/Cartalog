import React, {useState, useEffect, useRef} from 'react';
import Toolbar from '../Toolbar/Toolbar';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ImageBackground,
} from 'react-native';
import Message from './Message/Message';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({

    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e3e3e3',
    },
    inputContainer: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    input: {
        width: '75%',
        height: 60,
        color: 'black',
        fontSize: 18,
        paddingLeft: 10,
    },
    indicator: {
        position: 'absolute',
        top: '45%',
        left: '45%',
    },
    requestInfo: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    requestInfoText: {
        textAlign: 'center',
        fontSize: 20,
    },
    requestInfoText2: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },

});

const ChatComponent = (props) => {

    const appBarTitle = props.route.params.title;
    const request = props.route.params.request;
    const vendorID = props.route.params.vendorID;
    const type = request.type;
    const requestKey = request.key;
    const vendorName = props.route.params.vendorName;

    const [allMessages, setAllMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [animating, setAnimating] = useState(true);
    const [isPickingImage, setIsPickingImage] = useState(false);
    const [dynamicMargin, setDynamicMargin] = useState(0);

    const scrollViewRef = useRef(null);

    useEffect(() => {

        const storeData = async (text) => {
            try {
                await AsyncStorage.setItem('@isInChat', text);
            } catch (e) {
                // saving error
            }
        };

        storeData('inChat');

        return (() => {
            storeData('notInChat');
        });

    }, []);

    useEffect(() => {

        const dbRef = database().ref('messages').child('magadan').child(type).child(requestKey).child(vendorID).orderByKey();

        const allMessagesTemp = [];

        dbRef.on('child_added', snap => {

            setAnimating(false);


            allMessagesTemp.push(snap.val());
            setAllMessages([...allMessagesTemp]);

        });

        return (() => {

            dbRef.off('child_added');

        });

    }, []);

    const handleMessageInput = (text) => {

        setMessageInput(text);

    };

    const chatBody = () => {

        const messages = () => {

            const messagesKeys = Object.keys(allMessages);

            const keys = [];
            messagesKeys.forEach(key => {

                    if (key !== 'vendorID') {
                        keys.push(key);
                    }

                },
            );

            const temp = keys.map(key => {

                const messageObject = allMessages[key];

                return (
                    <Message key={key} messageObject={messageObject}/>);
            });

            return (temp);

        };

        return (

            <ScrollView
                onContentSizeChange={() => {
                    scrollViewRef.current.scrollToEnd({animating: true});
                }}
                ref={scrollViewRef}
            >
                <View style={styles.requestInfo}>
                    <Text allowFontScaling={false}
                          style={styles.requestInfoText}>{request.make} {request.model}, {request.year}</Text>
                    <Text allowFontScaling={false} style={styles.requestInfoText2}>{request.description}</Text>
                </View>

                <View style={{marginTop: dynamicMargin}}>

                    {messages()}

                </View>

                <View style={{width: '100%', height: 10}}/>

            </ScrollView>

        );

    };

    const handleSendMessage = (input, viewType) => {

        const getMessage = () => {

            if (viewType === 2) {
                return (messageInput);
            } else if (viewType === 3) {
                return (input);
            }

        };

        const messageContent = getMessage();

        if (messageContent.length > 0) {

            const time = new Date();

            const timestamp = time.getTime();
            const hours = time.getHours();
            const minutes = time.getMinutes();

            const message = {
                key: request.key,
                message: messageContent,
                messageSnackIsShown: 0,
                newAppMessage: 0,
                newWebMessage: 1,
                time: hours + ':' + minutes,
                userID: request.userID,
                vendorID: vendorID,
                viewType: viewType,
                timestamp: -timestamp,

            };

            setMessageInput('');

            const dbRef = database().ref('messages').child('magadan').child(type).child(requestKey).child(vendorID).push();

            dbRef.set(message).then(r => {

            });

        }

    };

    const handleImageAttach = () => {

        if (!isPickingImage) {

            setIsPickingImage(true);

            const options = {
                title: null,
                cancelButtonTitle: 'Отмена',
                takePhotoButtonTitle: 'Открыть камеру',
                chooseFromLibraryButtonTitle: 'Выбрать из галереи',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };

            ImagePicker.showImagePicker(options, (response) => {

                if (response.didCancel) {

                    setIsPickingImage(false);

                } else if (response.error) {

                    setIsPickingImage(false);

                } else if (response.customButton) {

                    setIsPickingImage(false);

                } else {

                    const message = {
                        key: request.key,
                        message: '',
                        messageSnackIsShown: 0,
                        newAppMessage: 0,
                        newWebMessage: 1,
                        time: '',
                        userID: request.userID,
                        vendorID: '',
                        viewType: 3,
                        timestamp: 123,

                    };

                    const temp = [...allMessages];
                    temp.push(message);
                    setAllMessages([...temp]);

                    const fileName = response.uri.substr(response.uri.lastIndexOf('/') + 1);

                    const storageRef = storage().ref('chatImages').child('magadan').child(type).child(requestKey).child(vendorID).child(fileName);

                    const task = storageRef.putFile(response.uri);

                    task.then(() => {

                        storageRef.getDownloadURL().then(url => {

                            temp.splice(temp.length - 1, 1);
                            setAllMessages([...temp]);

                            console.log(url);
                            handleSendMessage(url, 3);
                            setIsPickingImage(false);

                        });


                    });

                }
            });

        }

    };

    return (

        <View style={{width: '100%', height: '100%', backgroundColor: '#3b559b'}}>

            <SafeAreaView>

                <KeyboardAvoidingView behavior="position" enabled>

                    <ImageBackground source={require('../../Assets/Images/backgroundxxhdpi.png')} style={styles.root}>

                        <Toolbar title={appBarTitle} vendorID={vendorID} vendorName={vendorName} type={type}/>

                        {chatBody()}

                        <View style={{width: '100%', height: 1, backgroundColor: '#e3e3e3'}}/>

                        <View style={styles.inputContainer}>

                            <TextInput
                                onFocus={() => {
                                    setDynamicMargin(140);
                                }}
                                onBlur={() => {
                                    setDynamicMargin(0);
                                }}
                                placeholder={'Сообщение...'}
                                placeholderTextColor={'grey'}
                                style={styles.input}
                                onChangeText={text => handleMessageInput(text)}
                                value={messageInput}
                            />

                            <IconButton
                                size={30}
                                style={{margin: 0, padding: 0}}
                                color={'#325791'}
                                onPress={() => {
                                    handleImageAttach();
                                }} icon="camera"/>
                            <IconButton
                                size={30}
                                style={{margin: 0, padding: 0}}
                                color={'#325791'}
                                onPress={() => {
                                    handleSendMessage(messageInput, 2);
                                }} icon="send"/>

                        </View>


                    </ImageBackground>

                </KeyboardAvoidingView>

                <ActivityIndicator style={styles.indicator} animating={animating} color={'#558cee'} size={'large'}/>

            </SafeAreaView>

        </View>
    );

};

export default ChatComponent;
