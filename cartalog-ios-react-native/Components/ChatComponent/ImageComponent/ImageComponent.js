import React, { useState } from 'react';
import {View, Image, SafeAreaView, StyleSheet, Alert, Text} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import CameraRoll from '@react-native-community/cameraroll';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const styles = StyleSheet.create({

    root: {
        width: '100%',
        height: '100%',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 60,
        zIndex: 1,
        backgroundColor: '#3367c4',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        left: '45%',
        top: '50%',
        zIndex: 1
    },

});

const ImageComponent = (props) => {

    const [isAnimating,setIsAnimating] = useState(true);
    const source = props.route.params.source;

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleDownloadPress = () => {

        CameraRoll.save('https://picsum.photos/200/300', {type:'photo',album:'Cartalog'}).then(r => {
            Alert.alert('Изображение сохранено в галерею');
        });

    };

    return (
        <View style={{width:'100%', height:'100%'}}>
            <SafeAreaView>
                <View style={styles.root}>
                    <View style={styles.toolbar}>
                        <IconButton size={30} icon={'close'} color={'white'} onPress={() => {
                            handleBackPress();
                        }}/>
                        <Text style={{fontSize:22,color:"white",fontWeight:"500"}}>Изображение</Text>
                        <IconButton size={30} icon={'download'} color={'white'} onPress={() => {
                            handleDownloadPress();
                        }}/>
                    </View>
                    <ActivityIndicator color={'#558cee'} size='large' style={styles.indicator} animating={isAnimating}/>

                    <ReactNativeZoomableView
                        maxZoom={1.5}
                        minZoom={0.5}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                    >
                        <View>
                            <Image style={styles.root} source={{uri: source}} resizeMode={'center'} onLoadEnd={()=>{setIsAnimating(false)}}/>
                        </View>
                    </ReactNativeZoomableView>

                </View>

            </SafeAreaView>
        </View>
    );

};

export default ImageComponent;
