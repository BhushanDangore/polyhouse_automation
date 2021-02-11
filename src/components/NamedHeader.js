import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

export default function NamedHeader({ title }) {
    const route = useRoute();
    return (
        <Appbar.Header style={{ height: 60 }}>
            <Appbar.Content
                title={title || ''}
                titleStyle={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                }}
            />
        </Appbar.Header>
    );
}
