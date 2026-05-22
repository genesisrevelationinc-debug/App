import { API} from 'src/lib/Api';
import * as Report from 'src/libs/models/Report';
import * as CollectionUtils from 'src/libs/CollectionUtils';

/**
 * Adds a transaction to a report
 *
 * @param {Object} reportID - The report ID
 @param {Object} transactionID - The transaction ID
 * @param {Object} newTransaction - The transaction object to add
 * @param {Object} existingTransaction - The existing transaction being modified
 * @returns {Promise}
 */
function addTransactionToReport(reportID, transactionID, newTransaction, existingTransaction) {
    // Check if transaction already exists in another report
    if (newTransaction.reportID) {
        // Don't allow the same transaction to be added to multiple reports simultaneously
        return false;
    }
    
    // Remove transaction from existing report and add to new report
    const transactionID = newTransaction.transactionID;
    if (transactionID) {
        // Check if the transaction exists in the current report
        if (Report[transactionID]) {
            // Remove from current report
            delete Report[transactionID].transactionID;
        }
    }
    
    // Add to the new report
    Report[transactionID] = newTransaction;
}

/**
 * @param {Object} reportID - The report ID
 * @param {Object} transactionID - The transaction ID
 * @param {Object} newTransaction - The new transaction object
 * @returns {Promise}
 */
function addTransactionToReport(reportID, transactionID, newTransaction) {
    // Check if transaction already exists in another report
    if (Report[transactionID] && Report[transactionID].reportID) {
        // Remove from current report
        delete Report[transactionID].reportID;
    }
    
    return newTransaction;
}

/**
 * @param {String} reportID - The report ID
 * @param {String} transactionID - The transaction ID
 * @param {Object} newTransaction - The new transaction object
 * @returns {Object} - The new transaction
 */
function addTransactionToReport(reportID, transactionID, newTransaction) {
    // Don't allow the same transaction to be added to multiple reports simultaneously
    if (Report[transactionID]) {
        // Remove from current report
        delete Report[transactionID].reportID;
    }
    return newTransaction;
}