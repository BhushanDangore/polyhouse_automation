import React, { Fragment } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CurrentStatus from '../components/live-status/CurrentStatus';
import DripStatus from '../components/live-status/DripStatus';
import FertilizerStatus from '../components/live-status/FertilizerStatus';
import NamedHeader from '../components/NamedHeader';
import Graph from '../components/TempratureGraph';

export default function Home() {
    return (
        <Fragment>
            <NamedHeader title="Live Status" />
            <ScrollView>
                <CurrentStatus />
                <FertilizerStatus />
                <DripStatus />
                <Graph
                    title="Temprature Graph"
                    data={[30, 35, 40, 42, 40, 36]}
                    lables={['1PM', '2PM', '3PM', '4PM', '5PM', '6PM']}
                />
                <Graph
                    title="Humidity Graph"
                    data={[30, 35, 40, 42, 40, 36]}
                    lables={['1PM', '2PM', '3PM', '4PM', '5PM', '6PM']}
                />
            </ScrollView>
        </Fragment>
    );
}
