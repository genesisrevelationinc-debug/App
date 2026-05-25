import _ from 'underscore';
import Onyx from 'react-native-onyx';
import ONYXKEYS from '../ONYXKEYS';
import * as DBQuery from './DBQuery';
    return IOU.updateIOUFromRequestPreviewReportID(iouReportID, reportActionID);
}

/**
 * @param {Object} report
 * @returns {Boolean}
 */
function shouldRemoveGhostExpenses(report) {
    // Check if report has ghost expenses that should be filtered out
    const expenses = report.expenses || [];
    const hasGhostExpenses = _.some(expenses, (expense) => (
        !expense.merchant ||
        !expense.created ||
        !expense.amount ||
        !expense.currency
    ));
    
    if (hasGhostExpenses) {
        return true;
    }
    
    return false;
}

/**
 * @param {Object} report
 * @returns {Object}
 */
function removeGhostExpenses(report) {
    // Filter out ghost expenses from report before processing