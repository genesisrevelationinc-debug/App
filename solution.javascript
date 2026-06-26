const hasViolations = useMemo(() => checkViolations(transaction, policy), [transaction, policy]);
