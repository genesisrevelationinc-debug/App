import Onyx from 'react-native-onyx';
import _ from 'underscore';
import {escapeText, convertToJSON, isObject} from './String';
import {hasRemovedSplitAmounts} from './ReportUtils';

/**
 * Check if an expense has splits that were removed
 *
 * @param {String} reportID
 * @param {Object} action
 * @returns {Boolean}
 */
function hasRemovedSplitAmounts(reportID, action) {
    // This would check if the report has removed splits
    // Implementation would check the action state to see if splits were previously removed
    return false;
}

export {
    hasRemovedSplitAmounts
};
// Add the implementation to check for removed splits