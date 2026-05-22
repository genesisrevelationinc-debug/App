useMemo(() => {
  if (!transaction.amount && transaction.amount !== 0) {
    return originalAmount;
  }
  return transaction.amount;
}, [transaction]);
