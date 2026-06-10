import {applyAllExpenseRules} from './Rule';

// When a new transaction is created (including imported ones), apply expense rules
const originalCreateTransaction = createTransaction;

createTransaction = (transactionData) => {
    const transaction = originalCreateTransaction(transactionData);
    
    // Apply expense rules to the newly created transaction
    // This ensures that merchant rules are applied to imported transactions
    applyAllExpenseRules(transaction);
    
    return transaction;
};
