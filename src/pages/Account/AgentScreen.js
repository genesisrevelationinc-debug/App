import React from 'react';
import {View, Text, Button as ReactButton} from 'react-native';
import Button from '../../../components/Button';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';

const AgentScreen = () => {
    return (
        <ScreenWrapper>
            <AgentScreen />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
                <Button
                    success
                    text="Chat with Agent"
                    onPress={() => {}}
                />
                <Button
                    success
                    text="Copilot to Agent"
                    onPress={() => {}}
                />
            </View>
        </View>
        </ScreenWrapper>
    );
};