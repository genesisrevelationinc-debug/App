import React from 'react';
import {View} from 'react-native';
import Text from './Text';
import styles from '../styles/styles';
import * as ReportUtils from '../libs/ReportUtils';
import withLocalize, {withLocalizePropTypes} from './withLocalize';
import {propTypes as reportActionPropTypes, defaultProps as reportActionDefaultTypes} from './ReportActionItem';

const propTypes = {
    ...withLocalizePropTypes,
    ...reportActionPropTypes,
};

const defaultProps = {
    ...reportActionDefaultTypes,
};

const ReportActionItemAmount = (props) => {
    const formattedAmount = props.action.originalMessage.amount;
    const isSettled = props.action.originalMessage.type === 'CREATED' && props.action.originalMessage.isSettled;
    const hasOutstandingIOU = props.action.originalMessage.isOutstanding;
    const isDeleted = props.action.originalMessage.deleted;
    const isReversed = props.action.originalMessage.isReversed;
    const isSplit = props.action.originalMessage.isSplit;
    const isSplitReversed = props.action.originalMessage.isSplitReversed;

    // Get the correct message from the given context menu type
    const getContextMenuOptions = (config) => {
        return {
            isReversed: props.isReversed,
            isSplit: props.isSplit,
            isSplitReversed: props.isSplitReversed,
        };
    };

    return (
        <View style={[styles.flexRow, styles.alignItemsCenter]}>
            <Text style={[styles.alignItemsCenter]}>
                {isSplit ? 'Split' : formattedAmount}
            </Text>
        </View>
    );
};

export default withLocalize(ReportActionItemAmount);
export {getContextMenuOptions};