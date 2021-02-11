import React, { Fragment } from 'react';
import { List } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import ChangePassword from './ChangePassword';
import { useNavigation } from '@react-navigation/native';
import NamedHeader from '../components/NamedHeader';
import { ToastAndroid } from 'react-native';
import * as firebase from 'firebase';

const Stack = createStackNavigator();

const ListItemWithRipple = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <List.Item title={props.displayText} />
        </TouchableNativeFeedback>
    );
};

const SettingsList = () => {
    const logoutUser = () =>
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
    const navigation = useNavigation();
    return (
        <Fragment>
            <ListItemWithRipple
                displayText="Change Password"
                onPress={() => navigation.navigate('ChangePassword')}
            />
            <ListItemWithRipple displayText="FAQ" />
            <ListItemWithRipple displayText="Logout" onPress={logoutUser} />
        </Fragment>
    );
};

export default function Setting() {
    return (
        <Fragment>
            <Stack.Navigator mode="modal" initialRouteName="Setting">
                <Stack.Screen
                    name="Setting"
                    component={SettingsList}
                    initialParams={{ displayName: 'Pre-Set Profile' }}
                    options={{
                        header: () => NamedHeader({ title: 'Settings' }),
                    }}
                />
                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    initialParams={{ displayName: 'Pre-Set Profile' }}
                    options={{
                        header: () => NamedHeader({ title: 'Change Password' }),
                    }}
                />
            </Stack.Navigator>
        </Fragment>
    );
}
