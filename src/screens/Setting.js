import React, { Fragment } from 'react';
import { Card, List } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import ChangeHardwareId from './ChangeHardwareId';
import { useNavigation } from '@react-navigation/native';
import NamedHeader from '../components/NamedHeader';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import * as firebase from 'firebase';

const Stack = createStackNavigator();

const ListItemWithRipple = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <List.Item style={styles.li} title={props.displayText} />
        </TouchableNativeFeedback>
    );
};

const SettingsList = () => {
    const logoutUser = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                navigation.navigate('SignIn');
                ToastAndroid.showWithGravity(
                    'Logged Out.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            })
            .catch(function (error) {
                ToastAndroid.showWithGravity(
                    'Failed Log Out.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            });
    };
    const navigation = useNavigation();
    return (
        <Card style={{ margin: 8 }}>
            <ListItemWithRipple
                displayText="Change Hardware Id"
                onPress={() => navigation.navigate('ChangeHardwareId')}
            />
            <ListItemWithRipple displayText="FAQ" />
            <ListItemWithRipple displayText="Logout" onPress={logoutUser} />
        </Card>
    );
};

export default function Setting() {
    return (
        <Fragment>
            <Stack.Navigator mode="modal" initialRouteName="Setting">
                <Stack.Screen
                    name="Setting"
                    component={SettingsList}
                    options={{
                        header: () => <NamedHeader title="Settings" />,
                    }}
                />
                <Stack.Screen
                    name="ChangeHardwareId"
                    component={ChangeHardwareId}
                    options={{
                        header: () => (
                            <NamedHeader title="Change Hardware Id" />
                        ),
                    }}
                />
            </Stack.Navigator>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    li: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
});
