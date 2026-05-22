import ONYXKEYS from '../../ONYXKEYS';
import * as PersistedRequests from '../../PersistedRequests';
import * as Network from '../../Network';
import * as API from '../../API';

/**
 * QuickBooks export utilities
 */

let currentUserEmail;
let currentAccountID;

/**
 * Set the current user's email and accountID
 *
 * @param {String} email
 * @param {Number} accountID
 */
function setCurrentUser(email, accountID) {
    currentUserEmail = email;
    currentAccountID = accountID;
}

/**
 * Handle the case where a transaction is missing from the database
 * but still appears in reports
 *
 * @param {Object} params
 * @returns {Promise}
 */
function handleOrphanedExpenses(params) {
    return API.makeRequestWithSideEffects(
        'HandleOrphanedExpenses',
        {
            ...params,
        },
        {
            withCredentials: true,
        },
    );
}

/**
 * Check if expense exists in database before export
 * and remove orphaned expenses from reports
 *
 * @param {Object} params
 * @returns {Promise}
 */
function validateAndCleanExpenses(params) {
    return API.makeRequestWithSideEffects(
        'ValidateAndCleanExpenses',
        {
            ...params,
        },
        {
            withCredentials: true,
        },
    );
}

export {
    setCurrentUser,
    handleOrphanedExpenses,
    validateAndCleanExpenses,
};