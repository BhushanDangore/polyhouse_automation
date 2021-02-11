import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';

import SignInScreen from './src/screens/SignInScreen';
import './Database';
import * as firebase from 'firebase';
import Main from './src/Main';

const Stack = createStackNavigator();
const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#000',
    },
};

export default function App() {
    const [state, setState] = useState({ loading: true });

    useEffect(() => {
        if (firebase.auth().currentUser)
            setState({
                loading: false,
                signedIn: true,
                user: firebase.auth().currentUser,
            }); // Check if user is already signed In.
        firebase.auth().onAuthStateChanged((user) => {
            // Set listner for the auth state change.
            if (user != null) {
                setState({ loading: false, signedIn: true, user });
                return;
            }
            setState({ loading: false, signedIn: false, user: false });
        });
    }, []);

    if (state.loading) return <ActivityIndicator />;

    return (
        <NavigationContainer theme={customTheme}>
            <Stack.Navigator initialRouteName={state.user ? 'Main' : 'SignIn'}>
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
    );
}
