import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';

import CurrentStatus from '../components/live-status/CurrentStatus';
import DripStatus from '../components/live-status/DripStatus';
import NamedHeader from '../components/NamedHeader';
import Graph from '../components/TempratureGraph';
import toast from '../utils/toast';

const database = firebase.database();
const firestore = firebase.firestore();

export default function Home() {
    const [state, setstate] = useState({});
    const [hardwareID, setHardwareID] = useState();
    const userID = firebase.auth().currentUser.uid;

    useEffect(() => {
        if (!hardwareID) {
            firestore
                .collection('users')
                .doc(userID)
                .get()
                .then((doc) => {
                    const hid = doc.get('hardwareId');
                    if (!hid) {
                        toast('Please configure hardware ID');
                        return;
                    } else {
                        setHardwareID(hid);
                    }
                });
        }
        database.ref(`users/${userID}`).on('value', (snapshot) => {
            if (!snapshot.exists()) return;
            const snap = snapshot.val();
            setstate({ ...snap });
        });
    }, []);

    return (
        <Fragment>
            <NamedHeader title="Live Status" />
            <ScrollView>
                <CurrentStatus
                    temperature={state.temperature}
                    humidity={state.humidity}
                />
                {/* <FertilizerStatus /> */}
                <DripStatus />
                <Graph
                    title="Temprature Graph"
                    data={[32, 35, 38, 40, 37, 34]}
                    lables={['1PM', '2PM', '3PM', '4PM', '5PM', '6PM']}
                />
                <Graph
                    title="Humidity Graph"
                    yAxisSuffix="%"
                    data={[30, 29, 28, 27, 26, 26]}
                    lables={['1PM', '2PM', '3PM', '4PM', '5PM', '6PM']}
                />
            </ScrollView>
        </Fragment>
    );
}
