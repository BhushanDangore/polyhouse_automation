import React, { Fragment } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CurrentStatus from '../components/live-status/CurrentStatus';
import DripStatus from '../components/live-status/DripStatus';
import FertilizerStatus from '../components/live-status/FertilizerStatus';
import NamedHeader from '../components/NamedHeader';
import TempratureGraph from '../components/TempratureGraph';

export default function Home() {
    return (
        <Fragment>
            <NamedHeader title="Home" />
            <ScrollView>
                <CurrentStatus />
                <FertilizerStatus />
                <DripStatus />
                <TempratureGraph />
            </ScrollView>
        </Fragment>
    );
}
