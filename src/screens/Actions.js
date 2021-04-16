import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { List, Text, Switch, Card, IconButton } from 'react-native-paper';
import firebase from 'firebase';

import NamedHeader from '../components/NamedHeader';
import NumberSelectDialog from '../components/NumberSelectDialog';
import { filterDripsArray, getDripStatus } from '../utils/drip';

const initialSlectNumberDialogState = {
    open: false,
    currentNumber: 0,
    field: '',
};

const database = firebase.database();

export default function Actions() {
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [activeDrips, setActiveDrips] = useState({});
    const [selectNumberDialogConfig, setSelectNumberDialogConfig] = useState(
        initialSlectNumberDialogState
    );

    const [drips, setDrips] = useState([]);

    const userID = firebase.auth().currentUser.uid;

    useEffect(() => {
        database.ref(`users/${userID}/`).once('value', (snapshot) => {
            const snap = snapshot.val();
            setTemperature(snap.temperature);
            setHumidity(snap.humidity);
            setDrips(filterDripsArray(snap.drip));
            setActiveDrips(getDripStatus(snap.drip));
        });
    }, []);

    const updateClimateParameter = (newValue) => {
        if (!newValue) {
            setSelectNumberDialogConfig(initialSlectNumberDialogState);
            return;
        }

        switch (selectNumberDialogConfig.field) {
            case 'temperature':
                database
                    .ref(`users/${userID}/requestedTemprature`)
                    .set(newValue)
                    .then(() => {
                        setTemperature(newValue);
                        setSelectNumberDialogConfig(
                            initialSlectNumberDialogState
                        );
                    })
                    .catch(() => {
                        setSelectNumberDialogConfig(
                            initialSlectNumberDialogState
                        );
                    });
                break;

            case 'humidity':
                database
                    .ref(`users/${userID}/requestedHumidity`)
                    .set(newValue)
                    .then(() => {
                        setHumidity(newValue);
                        setSelectNumberDialogConfig(
                            initialSlectNumberDialogState
                        );
                    })
                    .catch(() => {
                        setSelectNumberDialogConfig(
                            initialSlectNumberDialogState
                        );
                    });
                break;

            default:
                setSelectNumberDialogConfig(initialSlectNumberDialogState);
        }
    };

    const onDripStatusChange = (dripNumber, newStatus) => {
        database
            .ref(`users/${userID}/requestedDripStatus`)
            .update({
                ['_' + dripNumber]: newStatus, // The added _ will avoid firebase parsing this object to array
            })
            .then(() => {
                setActiveDrips({
                    ...activeDrips,
                    ['_' + dripNumber]: newStatus,
                });
            })
            .catch(console.error);
    };

    const dripList = drips?.map((drip, idx) => (
        <View key={idx}>
            <List.Item
                title={'Drip ' + drip.dripNumber}
                description="Start or stop drip syatem"
                right={(props) => (
                    <Switch
                        value={activeDrips['_' + drip.dripNumber]}
                        onValueChange={() =>
                            onDripStatusChange(
                                drip.dripNumber,
                                !activeDrips['_' + drip.dripNumber]
                            )
                        }
                    />
                )}
            />
        </View>
    ));

    const getRightUI = ({ field, value }) => (props) => (
        <View
            style={{
                alignItems: 'center',
                flexDirection: 'row',
            }}
        >
            <Text style={{ paddingRight: 8, fontWeight: 'bold' }}>{value}</Text>
            <IconButton
                icon="pencil"
                onPress={() =>
                    setSelectNumberDialogConfig({
                        open: true,
                        currentNumber: value,
                        field: field,
                    })
                }
            />
        </View>
    );

    return (
        <View>
            <NamedHeader title="Actions" />
            <Card style={{ margin: 8 }}>
                <Card.Title title="Drip System" />
                {dripList}
            </Card>
            <Card style={{ margin: 8 }}>
                <Card.Title title="Climate Control" />
                <List.Item
                    title="Temperature"
                    description="Change the temperature."
                    right={getRightUI({
                        field: 'temperature',
                        value: temperature,
                    })}
                />
                <List.Item
                    title="Humidity"
                    description="Change the humidity."
                    right={getRightUI({
                        field: 'humidity',
                        value: humidity,
                    })}
                />
                <NumberSelectDialog
                    open={selectNumberDialogConfig.open}
                    value={selectNumberDialogConfig.currentNumber}
                    title={`Set ${selectNumberDialogConfig.field}`}
                    setNewValue={updateClimateParameter}
                />
            </Card>
        </View>
    );
}
