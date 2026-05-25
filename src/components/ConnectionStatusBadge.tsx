import React from 'react';
import {View} from 'react-native';
import Text from './Text';
import Icon from './Icon';
import * as Expensicons from './Icon/Expensicons';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ConnectionStatus} from '@src/types/onyx/BankAccount';

type ConnectionStatusBadgeProps = {
    status: ConnectionStatus;
    lastSyncTime?: string;
};

function ConnectionStatusBadge({status, lastSyncTime}: ConnectionStatusBadgeProps) {
    const theme = useTheme();
    const styles = useThemeStyles();

    const getStatusConfig = () => {
        switch (status) {
            case 'ACTIVE':
                return {
                    icon: Expensicons.Checkmark,
                    color: theme.success,
                    text: 'Active',
                };
            case 'INACTIVE':
                return {
                    icon: Expensicons.Close,
                    color: theme.danger,
                    text: 'Inactive',
                };
            case 'LOCKED':
                return {
                    icon: Expensicons.Lock,
                    color: theme.danger,
                    text: 'Locked',
                };
            case 'PENDING':
                return {
                    icon: Expensicons.Hourglass,
                    color: theme.warning,
                    text: 'Pending',
                };
            case 'VERIFYING':
                return {
                    icon: Expensicons.Hourglass,
                    color: theme.warning,
                    text: 'Verifying',
                };
            default:
                return {
                    icon: Expensicons.Close,
                    color: theme.textSupporting,
                    text: 'Unknown',
                };
        }
    };

    const config = getStatusConfig();

    return (
        <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
            <Icon
                src={config.icon}
                fill={config.color}
                small
            />
            <Text
                style={[styles.textMicroBold, {color: config.color}]}
            >
                {config.text}
            </Text>
            {lastSyncTime && (
                <Text style={styles.textMicroSupporting}>
                    • Last synced {lastSyncTime}
                </Text>
            )}
        </View>
    );
}

ConnectionStatusBadge.displayName = 'ConnectionStatusBadge';

export default ConnectionStatusBadge;