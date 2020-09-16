import React, {useState} from 'react';
import {FAB, Portal} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    root: {},
    fab: {},
});

const FloatingButton = (props) => {

    const [open, setOpen] = useState(false);

    const handleStateChange = () => {

        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }

    };

    const handleButtonPress = (type) => {

        props.navigation.navigate('NewRequest', {
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

    return (
        <FAB.Group
            open={open}
            style={styles.fab}
            color={'white'}
            icon={'plus'}
            fabStyle={{backgroundColor: '#558cee'}}
            actions={[
                {
                    icon: 'email',
                    color:'white',
                    label: 'Найти запчасть',
                    style: {backgroundColor: '#558cee', color: '#ffffff'},
                    onPress: () => handleButtonPress('autoparts'),
                },
                {
                    icon: 'star',
                    color:'white',
                    label: 'Найти СТО',
                    style: {backgroundColor: '#558cee', color: 'white'},
                    onPress: () => handleButtonPress('autoservice'),
                },
            ]}
            onStateChange={() => {
                handleStateChange();
            }}
        />
    );

};

export default FloatingButton;
