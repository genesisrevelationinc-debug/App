import lodashGet from 'lodash/get';
import * as ReportActionsUtils from './ReportActionsUtils';

const chalk = require('chalk');
const Str = require('expensify-common/lib/str');
const CONST = require('../CONST').default;
const DateUtils = require('./DateUtils');
const TransactionUtils = require('./TransactionUtils');
const lodashHas = require('lodash/has');

const allPolicyCategories = {};
const allPolicies = {};
    return false;
}

/**
 * Checks if the IOU report has a submitted action that should be shown
 * @param {Object} report
 * @param {Object} reportActions
 * @returns {Boolean}
 */
function shouldShowSubmittedIndicator(report, reportActions) {
    // If we don't have report actions yet, we can't determine this
    if (!reportActions) {
        return false;
    }
    
    // Check if there's a submit action for this report
    const submitAction = ReportActionsUtils.findLastAction(report.reportID, 'submit', reportActions);
    if (submitAction) {
        return true;
    }
    return false;
}

/**
 * @param {String} policyID
 * @returns {Boolean}
 */

module.exports = {
    shouldShowSubmittedIndicator,
    hasIOUWaitingOnCurrentUserBankAccount,
    // ... other exports
};