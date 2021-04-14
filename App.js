import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Provider as PaperProvider,
    DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { YellowBox } from 'react-native';

import './Database';
import themeGenerator from './src/utils/theme-generator';
import SignInScreen from './src/screens/SignInScreen';
import Main from './src/Main';

const Stack = createStackNavigator();

YellowBox.ignoreWarnings(['Setting a timer']);

export default function App() {
    const [state, setState] = useState({ loading: true });

    useEffect(() => {
        if (firebase.auth().currentUser) {
            setState({
                loading: false,
                signedIn: true,
                user: firebase.auth().currentUser,
            });
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setState({ loading: false, signedIn: true, user });
                return;
            }
            setState({ loading: false, signedIn: false, user: false });
        });
    }, []);

    if (state.loading) return <ActivityIndicator />;

    return (
        <PaperProvider theme={themeGenerator(PaperDarkTheme)}>
            <NavigationContainer theme={themeGenerator(NavigationDarkTheme)}>
                <Stack.Navigator
                    initialRouteName={state.user ? 'Main' : 'SignIn'}
                >
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
        </PaperProvider>
    );
}
