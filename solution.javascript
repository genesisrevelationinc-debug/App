// Fix:
const displayAmount = transaction.modifiedAmount ?? transaction.originalAmount;
// or
const displayAmount = transaction.modifiedAmount !== undefined ? transaction.modifiedAmount : transaction.originalAmount;
