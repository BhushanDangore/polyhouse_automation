import React from 'react'
import { Header, Body, Title } from 'native-base';
import { useTheme, useRoute } from '@react-navigation/native';

export default function NamedHeader(name) {
    const route = useRoute()
    const { colors } = useTheme();
    // console.log(route);
    return (
        <Header style={{ backgroundColor: colors.primary }}>
            <Body>
                <Title style={{ alignSelf: 'center' }}>{route?.params?.displayName || "name"}</Title>
            </Body>
        </Header>
    )
}