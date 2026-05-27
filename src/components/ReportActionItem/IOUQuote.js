import React, {useMemo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import * as ReportUtils from '../../libs/ReportUtils';
import * as CurrencyUtils from '../../libs/CurrencyUtils';
import * as IOUUtils from '../../libs/IOUUtils';
import * as PolicyUtils from '../../libs/PolicyUtils';
import CONST from '../../CONST';
import useLocalize from '../../hooks/useLocalize';
import SettlementButton from './SettlementButton';
    const formattedAmount = CurrencyUtils.convertToDisplayString(props.iouReport.cachedTotal, props.iouReport.currency);
    const isSettled = ReportUtils.isSettled(props.iouReport.reportID);

    // Check if workspace has other members to determine if share button should be visible
    const shouldShowShareButton = useMemo(() => {
        if (!props.iouReport.policyID) {
            return true; // Non-workspace IOUs can be shared
        }
        const policyMembers = PolicyUtils.getWorkspaceMembers(props.iouReport.policyID);
        return policyMembers && Object.keys(policyMembers).length > 1; // More than just the current user
    }, [props.iouReport.policyID]);

    return (
        <View style={[styles.chatItemMessage, styles.iouPreviewBox]}>
            <View style={styles.iouPreviewContainer}>
                        isDisabled={isSettled}
                        onPress={() => ReportActionContextMenu.showContextMenu(
                            CONTEXT_MENU_TYPES.REPORT_ACTION,
                            event, 
                            props.reportAction.reportActionID,
                            props.reportAction,
                            props.report,
                            props.iouReport,
                        )}
                    />
                    {!isSettled && props.shouldShowShareButton && shouldShowShareButton && (
                        <ReportActionItemSingle
                            reportAction={props.reportAction}
                            report={props.report}