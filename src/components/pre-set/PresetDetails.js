import React from 'react';
import { Card, Text, DataTable } from 'react-native-paper';

export default function PresetDetails({ preset }) {
    if (preset === undefined) {
        return (
            <Card style={{ padding: 20, margin: 8 }}>
                <Text>Wait we are looking for your preset</Text>
            </Card>
        );
    }
    if (!preset) {
        return (
            <Card style={{ padding: 20, margin: 8 }}>
                <Text>You have not selected any preset</Text>
            </Card>
        );
    }

    return (
        <Card style={{ padding: 10, margin: 8 }}>
            <Card.Title title="PRE-SET" />
            <Card.Content>
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Crop Name</DataTable.Cell>
                        <DataTable.Cell>{preset.name}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Description</DataTable.Cell>
                        <DataTable.Cell>{preset.description}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Required water</DataTable.Cell>
                        <DataTable.Cell>{preset.reqWater}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell></DataTable.Cell>
                        <DataTable.Cell>{preset.description}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </Card.Content>
        </Card>
    );
}
