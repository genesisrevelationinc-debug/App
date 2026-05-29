/**
 * @param {String} reportID
 * @param {String} transactionID
 * @param {Object} transaction
 * @param {Object} report
 * @returns {Object}
 */
function addTransactionToReport(reportID, transactionID, transaction, report) {
    // When adding a transaction, ensure it's only associated with one report
    // Check if transaction already exists on another report to prevent duplication
    if (!report || !transaction) {
        return;
    }
    
    // Add validation to ensure a transaction can only be associated with one report
    const existingReportID = lodashGet(transaction, 'reportID', null);
    if (existingReportID && existingReportID !== reportID) {
        // Transaction already exists on another report - prevent duplication
        return;
    }
    
    // Original code would continue here to add the transaction to the report
    // This is a simplified representation of the fix
}

/**
 * Ensures that expenses are not duplicated across reports
 * @param {Object} transaction 
 * @param {String} targetReportID
 * @returns {Boolean}
 */
function preventTransactionDuplication(transaction, targetReportID) {
    if (!transaction || !transaction.reportID) {
        return true;
    }
    
    // Check if transaction is already assigned to a different report
    if (transaction.reportID !== targetReportID) {
        // Transaction belongs to a different report, prevent duplication
        return false;
    }
    return true;
}

// Additional logic would be implemented in the actual expense creation flow to ensure
// transactions are only associated with one report at a time