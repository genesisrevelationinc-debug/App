import {applyAllExpenseRules} from './Receipts';

/**
 * @package
 */
 * @param {Object} transaction
 * @returns {void}
 */
/**
 * @param {Object} transaction
 * @returns {void}
 */
export default function Transaction(transaction) {
    // Add the transaction to the store
    addTransaction(transaction);
    // If the transaction has a receipt, validate it
    if (transaction.receipt) {
        validateReceipt(transaction.receipt);
        
        // Apply expense rules when a new transaction is created
        applyAllExpenseRules();
    }
}