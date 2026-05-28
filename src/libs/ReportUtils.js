    const currency = lodashGet(report, 'currency', CONST.CURRENCY.USD);
    const merchant = lodashGet(report, 'merchant', '');
    const amount = lodashGet(report, 'total', 0);
    const displayAmount = (amount || amount === 0) ? CurrencyUtils.convertToDisplayString(amount, currency) : '';
    
    return {
        displayName,