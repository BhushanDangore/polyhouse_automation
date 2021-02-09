import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import ActionsScreen from "./screens/Actions";
import ProfileScreen from "./screens/Profile";
import SettingsScreen from "./screens/Setting";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { TouchableNativeFeedback } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                initialRouteName: "Home",
                shifting: true,
                style: { paddingBottom: 10, paddingTop: 10, height: 60 },
            }}
        >
            <Tab.Screen
                name="Status"
                component={HomeScreen}
                initialParams={{ displayName: "Live Status" }}
                options={{
                    tabBarButton: props => <TouchableOpacity style={{ backgroundColor: "#ccc", }} {...props} />,
                    tabBarIcon: (data) => (
                        <Icon style={{ color: data.color }} name="home" />
                    ),
                    title: "Live Status",
                }}
            />
            <Tab.Screen
                name="Actions"
                component={ActionsScreen}
                initialParams={{ displayName: "Actions" }}
                options={{
                    tabBarButton: props => <TouchableOpacity {...props} />,
                    tabBarIcon: (data) => (
                        <Icon style={{ color: data.color }} name="ios-water" />
                    ),
                    title: "Actions",
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={{ displayName: "Pre-Set Profile" }}
                options={{
                    tabBarButton: props => <TouchableOpacity {...props} />,
                    tabBarIcon: (data) => (
                        <Icon style={{ color: data.color }} name="ios-archive" />
                    ),
                    title: "Pre-Set",
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarButton: props => <TouchableOpacity {...props} />,
                    tabBarIcon: (data) => (
                        <Icon style={{ color: data.color }} name="settings" />
                    ),
                    headerShown: false,
                    header: null,
                }}
            />
        </Tab.Navigator>
    );
}
