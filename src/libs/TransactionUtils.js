import * as Receipt from './actions/Receipts';

/**
 * @param {Object} transaction 
 * @returns {Object}
    return validTransaction;
}

/**
 * Apply expense rules to imported transactions
 */
export function applyRulesToImportedTransaction(transaction) {
    Receipt.applyAllExpenseRules();
}

/**
 * @param {Object} transaction
 * @returns {Object}
    return validTransaction;
}

/**
 * Process an imported transaction and apply rules
 * @param {Object} transaction
 * @returns {Object} processed transaction with rules applied
 */
export function processImportedTransaction(transaction) {
    const processedTransaction = getValidTransactionData(transaction);
    applyRulesToImportedTransaction(processedTransaction);
    return processedTransaction;
}