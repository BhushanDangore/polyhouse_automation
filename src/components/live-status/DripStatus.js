import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

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
            setDrips(Object.values(snap));
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

    if (!drips) {
        cardContent = <Text>Loading...</Text>;
    } else if (!state) {
        cardContent = <Text>Looking for live status.</Text>;
    } else if (state === false) {
        cardContent = (
            <Text>Configuration is not done please check settings.</Text>
        );
    } else if (state.length === 0)
        cardContent = <Text>All drip systems are turned off.</Text>;
    else if (state.length)
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
