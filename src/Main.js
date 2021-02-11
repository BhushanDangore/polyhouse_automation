import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home';
import ActionsScreen from './screens/Actions';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Setting';
import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const tabs = [
    {
        name: 'Status',
        component: HomeScreen,
        displayName: 'Live Status',
        icon: 'home',
    },
    {
        name: 'Actions',
        component: ActionsScreen,
        displayName: 'Actions',
        icon: 'gesture-tap',
    },
    {
        name: 'Profile',
        component: ProfileScreen,
        displayName: 'Pre-Set Profile',
        icon: 'account-circle-outline',
    },
    {
        name: 'Setting',
        component: SettingsScreen,
        displayName: 'Setting',
        icon: 'tune',
    },
];

export default function Main() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                initialRouteName: 'Home',
                shifting: true,
                style: { paddingBottom: 10, paddingTop: 10, height: 60 },
            }}
        >
            {tabs.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    initialParams={{ displayName: tab.displayName }}
                    options={{
                        tabBarButton: (props) => (
                            <TouchableOpacity
                                style={{ backgroundColor: '#ccc' }}
                                {...props}
                            />
                        ),
                        tabBarIcon: (data) => (
                            <List.Icon color={data.color} icon={tab.icon} />
                        ),
                        title: tab.displayName,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}
