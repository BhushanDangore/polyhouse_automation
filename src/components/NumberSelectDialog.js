import React, { useState } from 'react';
import { Dialog, Portal, Button, withTheme } from 'react-native-paper';
import ScrollPicker from 'react-native-wheel-scroll-picker';

const oneToHundred = [];
for (let i = 0; i < 101; i++) {
    oneToHundred.push(i);
}

function PreSetSelectDialog({ open, value, title, setNewValue, theme }) {
    const [currentNumber, setCurrentNumber] = useState(value);
    return (
        <Portal>
            <Dialog visible={open} onDismiss={() => setNewValue()}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content style={{ height: 140 }}>
                    <ScrollPicker
                        dataSource={oneToHundred}
                        selectedIndex={currentNumber}
                        onValueChange={(data) => {
                            setCurrentNumber(data);
                        }}
                        wrapperHeight={120}
                        wrapperWidth={250}
                        itemHeight={40}
                        highlightBorderWidth={1}
                        wrapperBackground={theme.colors.background}
                        highlightColor={theme.colors.backdrop}
                        itemTextStyle={{ color: theme.colors.text }}
                        activeItemTextStyle={{ color: theme.colors.primary }}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setNewValue()}>Close</Button>
                    <Button
                        style={{ paddingHorizontal: 10, marginHorizontal: 5 }}
                        mode="contained"
                        onPress={() => setNewValue(currentNumber)}
                    >
                        Set
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default withTheme(PreSetSelectDialog);
