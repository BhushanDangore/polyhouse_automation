import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import tabs from './tabs';

const Tab = createBottomTabNavigator();

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
