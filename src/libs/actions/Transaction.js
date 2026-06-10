// Example of what needs to be updated (this is a common pattern for expense processing)

/**
 * @param {String} transactionID
 * @param {Object} transaction
 * @returns {Promise}
 */
function formatTransactionList(transaction) {
    // Add the comment to the transaction object
    return transaction;
}

/**
 * Process imported transaction and apply workspace rules
 * @param {Object} transaction
 * @returns {Promise}
 */
function processImportedTransaction(transaction) {
    // When transactions are imported via company card/bank feed, we need to ensure
    // that workspace rules are applied automatically
    return API.read('ApplyAllExpenseRules', {
        transactionID: transaction.transactionID,
    }, {
        // Additional parameters if needed
    });
}

/**
 * Main function that would be called when importing transactions
 * @param {Object} transaction
 * @returns {Object}
 */
function processTransaction(transaction) {
    // Process the transaction and apply rules
    return transaction;
}