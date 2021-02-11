import * as React from 'react';
import { ToastAndroid, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import NamedHeader from '../components/NamedHeader';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState('+91');
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const firebaseConfig = firebase.apps.length
        ? firebase.app().options
        : undefined;
    const [showOTPField, setShowOTPField] = React.useState(false);
    const navigation = useNavigation();

    const sendOTP = async () => {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            console.log(recaptchaVerifier.current);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            setShowOTPField(true);
            ToastAndroid.showWithGravity(
                'OTP Sent. ✔',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } catch (err) {
            console.log(err);
            ToastAndroid.showWithGravity(
                'Failed to send Verification code. ❌',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    };

    const confirmOTP = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            ToastAndroid.showWithGravity(
                'Phone Authentication Successful 👍',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            navigation.navigate('Main', {
                screen: 'Status',
            });
        } catch (err) {
            ToastAndroid.showWithGravity(
                'Phone Authentication Failed ❌',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    };

    return (
        <React.Fragment>
            <NamedHeader title="Sign In" />
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <View style={{ paddingHorizontal: 30, marginTop: 30 }}>
                <TextInput
                    label="Phone No"
                    value={phoneNumber}
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                />
                <Button
                    disabled={!phoneNumber}
                    onPress={sendOTP}
                    style={{ marginVertical: 10 }}
                    mode={showOTPField ? 'outlined' : 'contained'}
                >
                    {showOTPField ? 'Send Again' : 'Send OTP'}
                </Button>
            </View>

            {showOTPField ? (
                <View style={{ paddingHorizontal: 30 }}>
                    <TextInput
                        label="OTP"
                        onChangeText={setVerificationCode}
                        autoCompleteType="tel"
                        editable={!!verificationId}
                        autoFocus
                    />
                    <Button
                        mode="contained"
                        disabled={!verificationId}
                        onPress={confirmOTP}
                        style={{ marginVertical: 10 }}
                    >
                        Confirm OTP
                    </Button>
                </View>
            ) : null}
        </React.Fragment>
    );
}
