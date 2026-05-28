    const currency = lodashGet(props, 'action.originalMessage.currency', CONST.CURRENCY.USD);
    const isSettled = lodashGet(props, 'action.originalMessage.isSettled', false);
    
    const displayAmount = (amount !== undefined && amount !== null) ? CurrencyUtils.convertToDisplayString(amount, currency) : '';
    
    // If the money request is deleted, don't show the details
    if (lodashGet(props, 'action.originalMessage.type') === 'delete') {