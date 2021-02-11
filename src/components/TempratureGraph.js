import React from 'react';
import { Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

export default function TempratureGraph() {
    return (
        <Card>
            <Card.Title>Temprature Graph</Card.Title>
            <LineChart
                data={{
                    labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                    ],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                            ],
                        },
                    ],
                }}
                width={Dimensions.get('window').width}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#ccc',
                    backgroundGradientTo: '#bbb',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </Card>
    );
}
