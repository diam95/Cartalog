import React, { useRef } from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import BottomSheet from 'reanimated-bottom-sheet';

const styles = StyleSheet.create({

    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 10,
        zIndex: 10,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        width: '100%',
        height: 75,
    },
    sheetTitle: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    sheetTitleThing: {
        width: 50,
        height: 8,
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        marginTop: 10,
    },
    sheetTitleText: {
        marginTop: 5,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    sheetTitleText2: {
        fontSize: 18,
        color: 'grey',
        textAlign: 'center',
    },
    sheetContent: {
        backgroundColor: 'white',
        height: 235,
    },

});

const DigestDetailed = (props) => {

    const type = props.route.params.type;
    const partner = props.route.params.partner;
    const navigation = useNavigation();

    const handleBackPress = () => {

        navigation.goBack();

    };

    const getDescription = () => {

        switch (type) {

            case 'autoparts':
                return ('Автозапчасти');

            case 'autoservice':
                return ('Автосервис');

            case 'carwash':
                return ('Автомойка');

            case 'tyres':
                return ('Шинный центр');

            case 'oilchange':
                return ('Замена масла');

            case 'alignment':
                return ('Развал-схождение');

            case 'carinsurance':
                return ('Автострахование');

        }

    };

    const sheetRenderHeader = () => {
        return (
            <View style={styles.sheetTitle}>

                <TouchableOpacity style={styles.sheetTitleThing}/>

                <Text allowFontScaling={false} style={styles.sheetTitleText}>{partner.name}</Text>
                <Text allowFontScaling={false} style={styles.sheetTitleText2}>{partner.address}</Text>
            </View>
        );
    };

    const sheetRenderContent = () => {
        return (
            <View style={styles.sheetContent}>

                <TouchableOpacity onPress={() => {
                    Linking.openURL(`tel:${partner.tel}`);
                }} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginStart: 15}}>
                    <IconButton icon={'phone'} size={30} style={{margin: 0}}/>
                    <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>{partner.tel}</Text>
                </TouchableOpacity>

                <View style={{display: 'flex', flexDirection: 'row', marginStart: 15}}>

                    <IconButton icon={'timer'} size={30} style={{margin: 0}}/>

                    <View style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                        <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>ПН {partner.mon}</Text>
                        <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>ВТ {partner.tue}</Text>
                        <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>СР {partner.wed}</Text>
                        <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>ЧТ {partner.thu}</Text>
                        <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>ПТ {partner.fri}</Text>
                        <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>СБ {partner.sat}</Text>
                        <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>ВС {partner.sun}</Text>
                    </View>

                </View>

            </View>
        );
    };

    return (
        <View style={{width: '100%', height: '100%', backgroundColor: '#3b559b'}}>

            <SafeAreaView>
                <View>

                    <IconButton
                        style={styles.backButton}
                        size={36}
                        color={'white'}
                        icon={'close'}
                        onPress={() => {
                            handleBackPress();
                        }}
                        showBuildings={true}
                    />

                    <MapView
                        style={{width: '100%', height: '100%'}}
                        initialRegion={{
                            latitude: Number(partner.coord1),
                            longitude: Number(partner.coord2),
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: Number(partner.coord1),
                                longitude: Number(partner.coord2),
                            }}
                            title={partner.name}
                            description={getDescription()}
                            isPreselected={true}
                        />
                    </MapView>

                    <View style={styles.bottomSheet}>
                        <BottomSheet
                            snapPoints={[310, 80, 80]}
                            initialSnap={1}
                            renderContent={() => sheetRenderContent()}
                            renderHeader={() => sheetRenderHeader()}
                        />
                    </View>

                </View>
            </SafeAreaView>
        </View>
    );

};

export default DigestDetailed;
