import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({

    root: {
        backgroundColor: '#4d4d4d',
        width: '100%',
        height: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        height: 56,
        backgroundColor: '#558cee',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        color: 'white',
    },
    headerImage: {
        marginHorizontal: 3,
        width: 50,
        height: 50,
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },
    menuItemTitle: {
        color: 'white',
        fontSize: 20,
        marginHorizontal: 10,
    },
    menuItemImage: {
        width: 24,
        height: 24,
    },

});

const Menu = (props) => {

        const [switchValue, setSwitchValue] = useState(true);

        const navigation = useNavigation();

        const handleNewRequest = (type) => {

            navigation.navigate('NewRequest', {
                request: {
                    type: type,
                    userID: props.userID,
                    make: '',
                    model: '',
                    VIN: '',
                    year: '',
                    description: '',
                },
            });

        };

        const handleFeedbackClick = () => {

            navigation.navigate('Feedback', {
                userID: props.userID,
            });

        };

        const handleDigestPress = (type) => {

            navigation.navigate('Digest', {
                type: type,
            });

        };

        const menuItems = () => {

            return (
                <ScrollView>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleNewRequest('autoparts');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/search.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Найти запчасть</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleNewRequest('autoservice');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/gear.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Найти автосевис</Text>
                    </TouchableOpacity>

                    <Divider/>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleDigestPress('autoparts');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/car-parts.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Автозапчасти</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleDigestPress('autoservice');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/wrench.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Автосервисы</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleDigestPress('carwash');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/carWash.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Автомойки</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleDigestPress('tyres');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/tire.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Шинные центры</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleDigestPress('oilchange');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/oil.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Замена масла</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleDigestPress('alignment');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/wheel-alignment.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>3D развал-схождение</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleDigestPress('carinsurance');
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/insurance.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Автострахование</Text>
                    </TouchableOpacity>

                    <Divider/>

                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                        handleFeedbackClick();
                    }}>
                        <Image style={styles.menuItemImage} source={require('../../../Assets/Images/wrench.png')}/>
                        <Text allowFontScaling={false} style={styles.menuItemTitle}>Связаться с нами</Text>
                    </TouchableOpacity>

                    <View style={{height: 150, width: 50}}/>

                </ScrollView>

            );

        };

        return (
            <SafeAreaView>
                <View style={styles.header}>
                    <Image style={styles.headerImage} source={require('../../../Assets/Images/logo.png')}/>
                    <Text allowFontScaling={false} style={styles.headerText}>
                        Cartalog
                    </Text>
                </View>
                <View style={styles.root}>
                    {menuItems()}
                </View>
            </SafeAreaView>

        );

    }
;

export default Menu;
