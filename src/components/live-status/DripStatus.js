import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { filterDripsArray } from '../../utils/drip';

const database = firebase.database();

const getRunningTime = (_startTime) => {
    const startTime = new Date(_startTime);
    const today = new Date();
    const runningTime = new Date(today - startTime);
    const minutes = (runningTime / 60000).toFixed(2);
    return minutes + ' min';
};

const calculateRunningTimesOfDrips = (drips) => {
    return drips.map((drip) => ({
        ...drip,
        runningTime: getRunningTime(drip.startTime),
    }));
};

export default function DripStatus() {
    const [drips, setDrips] = useState();
    const [state, setState] = useState();
    const userID = firebase.auth().currentUser.uid;

    const runningDrips = drips?.filter((drip) => drip?.status);

    useEffect(() => {
        database.ref(`users/${userID}/drip`).on('value', (snapshot) => {
            if (!snapshot.exists()) {
                setState(false);
                return;
            }
            const snap = snapshot.val();
            setDrips(filterDripsArray(snap));
        });
    }, []);

    useEffect(() => {
        if (!runningDrips) return;
        setState(calculateRunningTimesOfDrips(runningDrips));
    }, [drips]);

    useEffect(() => {
        if (!drips?.length) return;
        const interval = setInterval(
            () =>
                setState((newState) => calculateRunningTimesOfDrips(newState)),
            5000
        );
        return () => clearInterval(interval);
    }, [drips]);

    let cardContent;

    switch (state?.length) {
        case undefined:
            cardContent = <Text>Loading...</Text>;
            break;

        case 0:
            cardContent = <Text>Drip systems are turned off.</Text>;
            break;

        default:
            cardContent = state.map((drip, idx) => (
                <View key={idx} style={styles.bottomBorder}>
                    <Text style={styles.dripNumber}>
                        Drip Number {drip.dripNumber}
                    </Text>
                    <View style={styles.row}>
                        <Text>Running time</Text>
                        <View style={styles.rightContent}>
                            <Text style={styles.statusText}>
                                {drip.runningTime ? drip.runningTime : '-'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text>Water Level</Text>
                        <View style={styles.rightContent}>
                            <Text style={styles.statusText}>
                                {drip.waterLevel ? drip.waterLevel + '%' : '-'}
                            </Text>
                        </View>
                    </View>
                </View>
            ));
    }

    if (state === false) {
        cardContent = (
            <Text>Configuration is not done please check settings</Text>
        );
    }

    return (
        <Card style={styles.card}>
            <Card.Title title="Drip Status" titleStyle={styles.title} />
            <Card.Content>{cardContent}</Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: { margin: 8 },
    title: {
        alignSelf: 'center',
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    red: {
        color: 'red',
    },
    statusText: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    bottomBorder: {
        borderBottomColor: '#555',
        borderBottomWidth: 1,
    },
    dripNumber: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});
