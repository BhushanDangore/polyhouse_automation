import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { List, Text, Switch, Card, IconButton } from 'react-native-paper';

import NamedHeader from '../components/NamedHeader';
import NumberSelectDialog from '../components/NumberSelectDialog';

const initialSlectNumberDialogState = {
    open: false,
    currentNumber: 0,
    field: '',
};

export default function Actions() {
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [selectNumberDialogConfig, setSelectNumberDialogConfig] = useState(
        initialSlectNumberDialogState
    );

    useEffect(() => {
        // load current parameters
    }, []);

    const updateClimateParameter = (newValue) => {
        if (!newValue) {
            setSelectNumberDialogConfig(initialSlectNumberDialogState);
            return;
        }

        switch (selectNumberDialogConfig.field) {
            case 'temperature':
                setTemperature(newValue);
                setSelectNumberDialogConfig(initialSlectNumberDialogState);
                break;
            case 'humidity':
                setHumidity(newValue);
                setSelectNumberDialogConfig(initialSlectNumberDialogState);
                break;

            default:
                setSelectNumberDialogConfig(initialSlectNumberDialogState);
        }
    };

    return (
        <View>
            <NamedHeader title="Actions" />
            <Card style={{ margin: 8 }}>
                <Card.Title title="Drip System" />
                <List.Item
                    title="Drip 1"
                    description="Start or stop drip syatem"
                    right={(props) => (
                        <Switch value={true} onValueChange={() => {}} />
                    )}
                />
                <List.Item
                    title="Drip 2"
                    description="Start or stop drip syatem"
                    right={(props) => (
                        <Switch value={true} onValueChange={() => {}} />
                    )}
                />
                <List.Item
                    title="Drip 3"
                    description="Start or stop drip syatem"
                    right={(props) => (
                        <Switch value={true} onValueChange={() => {}} />
                    )}
                />
            </Card>
            <Card style={{ margin: 8 }}>
                <Card.Title title="Climate Control" />
                <List.Item
                    title="Temperature"
                    description="Change the temperature."
                    right={(props) => (
                        <View
                            style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                style={{ paddingRight: 8, fontWeight: 'bold' }}
                            >
                                {temperature}
                            </Text>
                            <IconButton
                                icon="pencil"
                                onPress={() =>
                                    setSelectNumberDialogConfig({
                                        open: true,
                                        currentNumber: temperature,
                                        field: 'temperature',
                                    })
                                }
                            />
                        </View>
                    )}
                />
                <List.Item
                    title="Humidity"
                    description="Change the humidity."
                    right={(props) => (
                        <View
                            style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                style={{ paddingRight: 8, fontWeight: 'bold' }}
                            >
                                {humidity}
                            </Text>
                            <IconButton
                                icon="pencil"
                                onPress={() =>
                                    setSelectNumberDialogConfig({
                                        open: true,
                                        currentNumber: humidity,
                                        field: 'humidity',
                                    })
                                }
                            />
                        </View>
                    )}
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
