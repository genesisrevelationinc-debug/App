import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import styles from '../../styles/styles';
import * as Expensicons from '../../components/Icon/Expensicons';
import * as Expensify from '../../libs/Expensify';
import FullscreenLoadingIndicator from '../../components/FullscreenLoadingIndicator';
import * as Illustrations from '../../components/Icon/Illustrations';
import * as LottieAnimations from '../../components/Icon/LottieAnimations';
import * as PersonalDetails from '../../libs/actions/PersonalDetails';
import * as Report from '../../libs/actions/Report';
import * as ReportUtils from '../../libs/ReportUtils';
import * as UserUtils from '../../libs/UserUtils';
import Navigation from '../../libs/Navigation/Navigation';
import ROUTES from '../../ROUTES';
import * as Policy from '../../libs/actions/Policy';
import * as OptionsList from '../../components/OptionsList';
import * as OptionsListUtils from '../../libs/OptionsListUtils';
import * as Parse from '../../libs/parseDate';
import * as PolicyUtils from '../../libs/PolicyUtils';

const AgentProfile = (props) => {
    const {agent, session, translate} = props;
    const [isCopilotButtonLoading, setIsCopilotButtonLoading] = useState(false);
    const [isPromptButtonLoading, setIsPromptButtonLoading] = useState(false);
    
    // Function to handle copilot functionality
    const handleCopilot = () => {
        setIsCopilotButtonLoading(true);
        // Implementation would go here for copilot functionality
        setTimeout(() => setIsCopilotButtonLoading(false), 1000); // Reset loading state
    };
    
    // Function to handle prompt editing
    const handleEditPrompt = () => {
        // Implementation would go here for prompt editing
    };

    return (
        <View style={styles.agentProfileContainer}>
            <View style={styles.pageWrapper}>
                <View style={styles.agentProfileMainContent}>
                    <View style={styles.agentProfileHeader}>
                        <View style={styles.agentProfileDetails}>
                            <Text style={styles.agentProfileName}>
                                {agent.displayName}
                            </Text>
                            <Text style={styles.agentProfileEmail}>
                                {agent.email}
                            </Text>
                        </View>
                    </View>
                    
                    {/* Copilot and Edit Prompt Buttons - Only shown to owner */}
                    {session.accountID === agent.accountID && (
                        <View style={styles.agentProfileButtonRow}>
                            <View style={styles.buttonRow}>
                                <Button
                                    onPress={handleCopilot}
                                    title="Copilot"
                                    loading={isCopilotButtonLoading}
                                    style={styles.agentProfileButton}
                                />
                                <Button
                                    onPress={handleEditPrompt}
                                    title="Custom instructions"
                                    style={styles.agentProfileButton}
                                />
                            </View>
                        </View>
                    )}
                    
                    <View style={styles.agentProfileContent}>
                        <Text style={styles.agentProfileDescription}>
                            Agent ID: {agent.agentID}
                        </Text>
                        <Text style={styles.agentProfileDescription}>
                            Status: {agent.status}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

AgentProfile.propTypes = {
    agent: PropTypes.shape({
        agentID: PropTypes.number,
        displayName: PropTypes.string,
        email: PropTypes.string,
        status: PropTypes.string,
    }),
    session: PropTypes.shape({
        accountID: PropTypes.string,
        authToken: PropTypes.string,
    }),
    translate: PropTypes.func,
};

AgentProfile.defaultProps = {
    agent: {},
    session: {},
    translate: (str) => str,
};

export default AgentProfile;