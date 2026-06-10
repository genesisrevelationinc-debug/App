import * as Receipt from './Receipts';

/**
 * Process card transaction and apply workspace rules
 * @param {Object} transaction - The card transaction data
 * @returns {Object} transaction with rules applied
 */
export function processCardTransaction(transaction) {
    // Process the transaction normally first
    const processedTransaction = transaction;
    
    // Apply workspace expense rules to the imported transaction
    if (typeof Receipt.applyAllExpenseRules === 'function') {
        // Apply rules after a short delay to ensure transaction is properly initialized
        setTimeout(() => {
            Receipt.applyAllExpenseRules();
        }, 100);
    }
    
    return processedTransaction;
}