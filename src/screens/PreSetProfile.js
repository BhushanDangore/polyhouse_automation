import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import NamedHeader from '../components/NamedHeader';
import PreSetSelectDialog from '../components/pre-set/PreSetSelectDialog';
import PresetDetails from '../components/pre-set/PresetDetails';

export default function PreSetProfile() {
    const [preSet, setPreSet] = useState();
    const [preSetSelectOpen, setPreSetSelectOpen] = useState(null);

    useEffect(() => {
        // check for preset in database
        // if not found open select dialog
    }, []);

    const setNewPreSet = (newPreset) => {
        if (!newPreset) {
            setPreSetSelectOpen(false);
            setPreSet(false);
            return;
        }
        setPreSet(newPreset);
        setPreSetSelectOpen(false);
    };

    return (
        <View>
            <NamedHeader title="Pre-Set Profile" />
            <PreSetSelectDialog
                open={preSetSelectOpen}
                setPreSet={setNewPreSet}
            />
            <PresetDetails preset={preSet} />
            <Button onPress={() => setPreSetSelectOpen(true)}>
                {preSet !== null && !preSet
                    ? 'Select Pre-set'
                    : 'Change Pre-set'}
            </Button>
        </View>
    );
}
