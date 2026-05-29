/**
 * ReportActionItemSingleExpensify - Component to ensure single expense association per report
 */
import React from 'react';
import {View} from 'react-native';
import {checkIfTransactionExistsOnOtherReport} from '../libs/TransactionUtils';

const ReportActionItemSingleExpensify = (props) => {
    // Check if transaction exists on another report first
    const transactionExistsOnOtherReport = checkIfTransactionExistsOnOtherReport(props.transaction);
    
    if (transactionExistsOnOtherReport) {
        // Prevent rendering if this transaction exists on another report
        return null;
    }
    
    return (
        <View>
            {props.children}
        </View>
    );
};

ReportActionItemSingleExpensify.propTypes = {
    // No specific proptypes needed for this fix
};
ReportActionItemSingleExpensify.displayName = 'ReportActionItemSingleExpensify';
export default ReportActionItemSingleExpensify;