// Bad - 0 is falsy!
const displayAmount = transaction.modifiedAmount || transaction.originalAmount;

// Good
const displayAmount = transaction.modifiedAmount !== undefined ? transaction.modifiedAmount : transaction.originalAmount;
