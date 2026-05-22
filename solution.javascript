const getTransactionAmount = (transaction) => {
  return transaction.modifiedAmount || transaction.amount;
};
