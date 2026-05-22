import React from 'react';
import {View} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Button from '../../components/Button';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
    );
}

const AgentActions = (props) => {
    const openDM = () => {
        // Implementation for opening DM with agent
    };

    const copilotIntoAgent = () => {
        // Implementation for copilot functionality
    };

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
            <Button
                success
                text="Chat"
                onPress={openDM}
            />
            <Button
                success
                text="Copilot"
                onPress={copilotIntoAgent}
            />
        </View>
    );
};

function AgentScreen() {
    return (
        <ScreenWrapper>
            <View style="styles.flex1">
                <AgentActions />
            </View>
        </View>
    );
}