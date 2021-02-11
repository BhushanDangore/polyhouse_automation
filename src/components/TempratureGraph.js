import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Card, withTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

function ClimateGraph({ theme, title, data, lables }) {
    return (
        <Card style={styles.card}>
            <Card.Title title={title} titleStyle={styles.title} />
            <Card.Content style={styles.content}>
                <LineChart
                    data={{
                        labels: lables,
                        datasets: [
                            {
                                data,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    yAxisSuffix="°C"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: theme.colors.background,
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 2,
                        color: () => theme.colors.text + '20',
                        labelColor: () => theme.colors.text + '70',
                        propsForDots: {
                            r: '4',
                            strokeWidth: '1',
                            stroke: '#ffa726',
                        },
                    }}
                    bezier
                />
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
    content: {
        margin: 0,
        paddingHorizontal: 0,
        paddingBottom: 0,
    },
});

export default withTheme(ClimateGraph);
