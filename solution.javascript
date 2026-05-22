function getTransactionAmount(transaction) {
    return transaction.modifiedAmount ?? transaction.amount;
}
