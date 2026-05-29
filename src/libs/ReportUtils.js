import _ from 'underscore';
import lodashGet from 'lodash/get';
import {escapeText, convertToJSON, isObject} from './String';
import * as Localize from './';

/**
 * Returns the first non-success error message from the error array.
 *
 * @param {Array} errors
 * @returns {String|null}
 */
function getFirstErrorMessage(errors) {
    if (errors && errors.length > 0) {
        return errors[0];
    }
    return null;
}

/**
 * Checks if the given split has been removed from the expense
 *
 * @param {String} reportID
 * @param {Object} action
 * @returns {Boolean}
 */
function hasRemovedSplitAmounts(reportID, action) {
    return lodashGet(action, 'originalMessage.hasRemovedSplits', false);
}

export {
    getFirstErrorMessage,
    hasRemovedSplitAmounts,
};