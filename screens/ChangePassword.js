import React from 'react'
import { View } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button, Text } from 'native-base';

export default function ChangePassword() {
    return (
        <Container>
            <Content>
                <View>
                    <Form style={{ alignItems: "center" }}>
                        <Item floatingLabel style={{ width: '90%', marginTop: 22 }}>
                            <Label>Old Password</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style={{ width: '90%', marginTop: 22 }}>
                            <Label>New Password</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style={{ width: '90%', marginTop: 22 }}>
                            <Label>Conform New Password</Label>
                            <Input />
                        </Item>
                        <Button full last rounded dark style={{ marginTop: 40, marginLeft: '15%', marginRight: '15%' }}>
                            <Text>Save</Text>
                        </Button>
                    </Form>
                </View>
            </Content>
        </Container>
    )
}
