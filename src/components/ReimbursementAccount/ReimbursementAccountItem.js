// Business bank account share button visibility logic
import React from 'react';
import {View, Text} from 'react-native';
import lodashGet from 'lodash/get';
import * as Expensicons from '../components/Icon/Expensicons';
import MenuItem from '../components/MenuItem';
import styles from '../styles/styles';
import * as StyleUtils from '../styles/StyleUtils';
import * as ReimbursementAccount from '../libs/actions/ReimbursementAccount';
import * as Report from '../types/onyx/Report';
import * as ReportActions from '../pages/home/report/ReportActionCompose';
import * as ReportAction from '../components/ReportActionItem';
import * as ReportUtils from '../libs/ReportUtils';

const ReimbursementAccountItem = (props) => {
    const {account, policyMembers} = props;
    
    // Check if workspace has members before showing share button
    const hasWorkspaceMembers = policyMembers && policyMembers.length > 0;
    
    return (
        <View style={styles.mb3}>
            <View style={[styles.flexRow, styles.alignItemsCenter, styles.mb3]}>
                <Text style={styles.flex1}>{props.account.accountName}</Text>
                {hasWorkspaceMembers && (
                    <MenuItem
                        title="Share"
                        icon={Expensicons.Switch}
                        onPress={() => {
                            // Handle share action
                        }}
                        shouldShowRightIcon
                    />
                )}
            </View>
            {hasWorkspaceMembers && (
                <Text style={[styles.formHelp, styles.mb3]}>
                    {props.account.description}
                </Text>
            )}
        </View>
    );
};

export default ReimbursementAccountItem;