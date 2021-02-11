import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function FertilizerStatus() {
    return (
        <Card style={styles.card}>
            <Card.Title title="Fertilizer Status" titleStyle={styles.title} />
            <Card.Content>
                <View style={styles.row}>
                    <Text>Item 1</Text>
                    <View style={styles.rightContent}>
                        <Text style={styles.statusText}>80%</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text>Item 2</Text>
                    <View style={styles.rightContent}>
                        <Text style={styles.statusText}>40%</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text>Item 3</Text>
                    <View style={styles.rightContent}>
                        <Text style={styles.statusText}>60%</Text>
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
