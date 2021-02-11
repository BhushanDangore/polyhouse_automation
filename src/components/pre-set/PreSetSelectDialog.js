import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Dialog, Portal, Button, RadioButton } from 'react-native-paper';

import { sampleProfiles } from '../../constants/dummyData';

export default function PreSetSelectDialog({ open, setPreSet, currentPreset }) {
    const [defaultProfiles, setDefaultProfiles] = useState([]); // Remove this after DB integration.
    const [selectedPresetId, setSelectedPresetId] = useState(null); // Remove this after DB integration.

    useEffect(() => {
        // fetch all presets
        setDefaultProfiles(sampleProfiles);
    }, []);

    const passPresetToParent = () => {
        const selectedPreset = defaultProfiles.find(
            (ps) => ps.id === selectedPresetId
        );
        if (selectedPresetId) {
            setPreSet(selectedPreset);
            return;
        }
        setPreSet();
    };

    return (
        <Portal>
            <Dialog
                visible={open}
                onDismiss={passPresetToParent}
                style={{ maxHeight: '70%' }}
            >
                <Dialog.Title>Select Pre-set profile</Dialog.Title>
                <Dialog.ScrollArea>
                    <RadioButton.Group
                        onValueChange={(id) => setSelectedPresetId(id)}
                        value={selectedPresetId}
                    >
                        <ScrollView>
                            {defaultProfiles.map((profile) => (
                                <RadioButton.Item
                                    key={profile.id}
                                    label={profile.name}
                                    value={profile.id}
                                />
                            ))}
                        </ScrollView>
                    </RadioButton.Group>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button onPress={passPresetToParent}>Close</Button>
                    <Button
                        style={{ paddingHorizontal: 10, marginHorizontal: 5 }}
                        mode="contained"
                        onPress={passPresetToParent}
                    >
                        Set
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
