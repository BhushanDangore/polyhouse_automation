import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function DripStatus() {
    return (
        <Card style={styles.card}>
            <Card.Title title="Drip Status" titleStyle={styles.title} />
            <Card.Content>
                <View style={styles.row}>
                    <Text>Running time</Text>
                    <View style={styles.rightContent}>
                        <Text style={styles.statusText}>-</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text>Water Level</Text>
                    <View style={styles.rightContent}>
                        <Text style={styles.statusText}>23</Text>
                    </View>
                </View>
            </Card.Content>
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
});
