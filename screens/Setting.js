import React, { Fragment } from 'react'
import { Content, ListItem, Text, Container, List } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import ChangePassword from './ChangePassword';
import { useNavigation } from '@react-navigation/native';
import NamedHeader from './../components/NamedHeader';
import { ToastAndroid } from 'react-native';
import * as firebase from "firebase";

const Stack = createStackNavigator();

const ListItemWithRipple = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <ListItem>
                <Text>{props.displayText}</Text>
            </ListItem>
        </TouchableNativeFeedback>
    )
}

const getList = () => {
    const navigation = useNavigation();
    return (
        <Container>
            <Content>
                <List>
                    <ListItemWithRipple displayText="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
                    <ListItemWithRipple displayText="FAQ" />
                    <ListItemWithRipple displayText="Logout" onPress={() => firebase.auth().signOut().then(function () {
                        navigation.navigate('SignIn')
                        ToastAndroid.showWithGravity(
                            "Logged Out.",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                    }).catch(function (error) {
                        ToastAndroid.showWithGravity(
                            "Failed Log Out.",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                    })} />
            </List>
            </Content>
        </Container>)
}

export default function setting() {
    return (
        <Fragment>
            <Stack.Navigator mode='modal' initialRouteName='Setting'>
                <Stack.Screen name="Setting" component={getList} initialParams={{ displayName: 'Pre-Set Profile' }} options={{ header: () => NamedHeader('Settings') }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} initialParams={{ displayName: 'Pre-Set Profile' }} options={{ header: () => NamedHeader('Change Password') }} />
            </Stack.Navigator>
        </Fragment>
    )
}
