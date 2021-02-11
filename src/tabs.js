import HomeScreen from './screens/Home';
import ActionsScreen from './screens/Actions';
import PreSetProfileScreen from './screens/PreSetProfile';
import SettingsScreen from './screens/Setting';

export default [
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
        name: 'Pre-Set Profile',
        component: PreSetProfileScreen,
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
