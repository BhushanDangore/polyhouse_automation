import * as React from "react";
import { ToastAndroid } from "react-native";
import { Form, Item, Input, Container, Label, Text, Button } from 'native-base';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import NamedHeader from "../components/NamedHeader";
import { useNavigation } from "@react-navigation/native";

export default function App() {
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState("+91");
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [showOTPField, setShowOTPField] = React.useState(false);
    const navigation = useNavigation();

    return (
        <Container>
            <NamedHeader />
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Form style={{ alignItems: "center" }}>
                <Item floatingLabel style={{ width: '80%' }}>
                    <Label>Phone No.</Label>
                    <Input
                        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                        autoFocus
                        autoCompleteType="tel"
                        value={phoneNumber}
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber" />
                </Item>

                <Button
                    full
                    rounded
                    dark
                    style={{ marginTop: 20, marginLeft: '15%', marginRight: '15%' }}
                    disabled={!phoneNumber}
                    onPress={async () => {
                        try {
                            const phoneProvider = new firebase.auth.PhoneAuthProvider();
                            const verificationId = await phoneProvider.verifyPhoneNumber(
                                phoneNumber,
                                recaptchaVerifier.current
                            );
                            setVerificationId(verificationId);
                            setShowOTPField(true);
                            ToastAndroid.showWithGravity(
                                "OTP Sent. ✔",
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            );
                        } catch (err) {
                            ToastAndroid.showWithGravity(
                                "Failed to send Verification code. ❌",
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            );
                        }
                    }}>
                    <Text>Send OTP</Text>
                </Button>
                {
                    showOTPField ?
                        <React.Fragment>
                            <Form style={{ alignItems: "center" }} >
                                <Item floatingLabel style={{ width: '80%' }}>
                                    <Label>OTP</Label>
                                    <Input
                                        onChangeText={setVerificationCode}
                                        autoFocus
                                        autoCompleteType="tel"
                                        editable={!!verificationId} />
                                </Item>
                            </Form>
                            <Button
                                full
                                rounded
                                dark
                                style={{ marginTop: 20, marginLeft: '15%', marginRight: '15%' }}
                                disabled={!verificationId}
                                onPress={async () => {
                                    try {
                                        const credential = firebase.auth.PhoneAuthProvider.credential(
                                            verificationId,
                                            verificationCode
                                        );
                                        await firebase.auth().signInWithCredential(credential);
                                        ToastAndroid.showWithGravity(
                                            "Phone Authentication Successful 👍",
                                            ToastAndroid.SHORT,
                                            ToastAndroid.CENTER
                                        );
                                        navigation.navigate('Main', { screen: "Status" })
                                    } catch (err) {
                                        ToastAndroid.showWithGravity(
                                            "Phone Authentication Failed ❌",
                                            ToastAndroid.SHORT,
                                            ToastAndroid.CENTER
                                        );
                                    }
                                }}
                            >
                                <Text>Confirm OTP</Text>
                            </Button>
                        </React.Fragment>
                        :
                        null
                }
            </Form>
        </Container>
    );
}