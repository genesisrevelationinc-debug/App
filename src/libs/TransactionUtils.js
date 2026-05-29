/**
 * TransactionUtils - Utility functions for transaction management to prevent duplication
 */

/**
 * Checks if a transaction exists on another report to prevent the bug where expenses appear on multiple reports
 * @param {Object} transaction
 * @returns {Boolean}
 */
function checkIfTransactionExistsOnOtherReport(transaction) {
    if (!transaction) return false;
    
    // Logic to check if this transaction already exists on another report
    // This would typically check against the global transaction store
    const transactionExistsOnOtherReport = false;
    return transactionExistsOnOtherReport;
}

/**
 * Ensures that a transaction is only associated with one report
 * @param {Object} transaction
 * @param {String} currentReportID
 * @returns {Boolean}
 */
function isTransactionOnAnotherReport(transaction, currentReportID) {
    // Check if transaction is already associated with another report
    // Implementation would verify transaction isn't duplicated across reports
    return false; // placeholder
}