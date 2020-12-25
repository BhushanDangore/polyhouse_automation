import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { Container } from 'native-base';
import { ActivityIndicator } from 'react-native'

import SignInScreen from './screens/SignInScreen';
import './Database';
import * as firebase from "firebase";
import Main from './Main';

const Stack = createStackNavigator();
const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#000',
    }
}

const getFonts = async () => {
    return Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
}

export default function App() {

    const [state, setState] = useState({ loading: true });

    useEffect(() => {
        getFonts().then(() => {
            if (firebase.auth().currentUser) setState({ loading: false, signedIn: true, user: firebase.auth().currentUser });       // Check if user is already signed In.
            firebase.auth().onAuthStateChanged(user => {                  // Set listner for the auth state change.
                if (user != null) {
                    setState({ loading: false, signedIn: true, user })
                    return;
                }
                setState({ loading: false, signedIn: false, user: false })
            })
        })
    }, [])

    if (state.loading) return <ActivityIndicator />;

    return (
        <Container>
            <NavigationContainer theme={customTheme}>
                <Stack.Navigator
                    initialRouteName={state.user ? "Main" : "SignIn"}>
                    <Stack.Screen
                        name="Main"
                        component={Main}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        initialParams={{ displayName: 'Sign In' }}
                        options={{
                            title: 'Sign In',
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Container>
    );
}