import React from 'react';
import {View} from 'react-native';
import Text from './Text';
import styles from '../styles/styles';
import {withLocalize} from './withLocalize';
import * as ReportUtils from '../libs/ReportUtils';
import {propTypes as reportActionPropTypes, defaultProps as reportActionDefaultTypes} from './ReportActionItem';

const ReportActionItemAmount = (props) => {
    // Extract the details of the report, and initial setup for determining if the report is settled
    const report = props.action.originalMessage.report;
    const isSettled = props.action.originalMessage.isSettled;
    const hasOutstandingIOU = props.action.originalMessage.hasOutstandingIOU;
    const isDeleted = props.action.originalMessage.isDeleted;
    const isReversed = props.action.originalMessage.isReversed;
    const isSplit = props.action.originalMessage.isSplit;
    const isSplitReversed = props.action.originalMessage.isSplitReversed;

    return (
        <View style={[styles.flexRow, styles.alignItemsCenter]}>
            <Text style={[styles.alignItemsCenter]}>
                {isSplit ? 'Split' : props.action.originalMessage.amount}
            </Text>
        </View>
    );
};

export default withLocal