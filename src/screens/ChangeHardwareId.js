import React, { useEffect, useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firebase from 'firebase';
const firestore = firebase.firestore();

export default function ChangePassword() {
    const [hardwareId, setHardwareId] = useState(0);
    const userID = firebase.auth().currentUser.uid;
    useEffect(() => {
        firestore
            .collection('hardwares')
            .doc(userID)
            .get()
            .then((doc) => {
                const _hID = doc.get('hardwareId');
                if (_hID) {
                    setHardwareId(Number(_hID));
                }
            });
    }, []);

    const saveHardwareID = async () => {
        if (!userID) {
            console.log('ID not avalable');
            return;
        }
        firestore
            .collection('hardwares')
            .doc(userID)
            .get()
            .then((doc) => {
                const _hID = doc.get('hardwareId');
                if (_hID) {
                    if (_hID === hardwareId) {
                        throw new Error(
                            'You already have the same Hardware ID'
                        );
                    }
                    throw new Error('You already have hardware connected');
                }
                return firestore.collection('hardwares').doc(userID).set({
                    hardwareId: hardwareId,
                    userId: userID,
                });
            })
            .then(() => {
                ToastAndroid.showWithGravity(
                    'Hardware ID changed',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            })
            .catch((err) => {
                ToastAndroid.showWithGravity(
                    err.message || 'Something went wrong',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            });
    };

    return (
        // <ErrorBoundary>
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}
        >
            <TextInput
                label="Hardware ID"
                style={{ width: '100%' }}
                value={String(hardwareId)}
                onChangeText={(id) => setHardwareId(id)}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
            />
            <Button
                disabled={!hardwareId}
                onPress={saveHardwareID}
                style={{ marginVertical: 20, width: '100%' }}
                mode="outlined"
            >
                Save
            </Button>
        </View>
        // </ErrorBoundary>
    );
}
