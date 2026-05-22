import React from 'react';
import {View, Text, TouchableOpacity, colors} from 'react';
import {usePersonalDetails} from '../hooks';

/**
 * This component displays a user's profile information
 * @param {Object} route
 * @param {Object} route.params
 * @param {String} route.params.accountID
 * @param {String} route.params.policyID
 * @param {String} route.params.sessionToken
 * @param {String} route.params.displayName
 * @param {String} route.params.login
 * @param {String} route.params.avatar
 * @returns {React.Component}
 */
function ProfilePage(props) {
    const {route} = props;
    const {accountID, policyID, sessionToken, displayName, login} = route.params;
    
    // Render a header with the user's profile picture and display name
    return (
        <View>
            <Text style={styles.textLarge}>
                {displayName}
            </Text>
            <View style={styles.container}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button}>
                        <Text>Copilot</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Text>Custom Instructions</Text>
                </View>
            </View>
        </View>
            </View>
        </View>
    );
}

export default function ProfilePage() {
    return (
        <View>
            <View>
                <Text>Profile Page</Text>
            </View>
        </View>
    );
}