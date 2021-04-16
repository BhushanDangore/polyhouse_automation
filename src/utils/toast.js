import { ToastAndroid } from 'react-native';

export default (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
};
