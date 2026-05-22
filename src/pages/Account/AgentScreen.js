import React from 'react';
import {View, Text, Button as ReactButton} from 'react-native';
import Button from '../../../components/Button';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';

const AgentScreen = () => {
    return (
        <ScreenWrapper>
            <AgentScreen />
            <AgentActions />
        </ScreenWrapper>
    );
};