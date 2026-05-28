    // ... existing code ...
    
    const amount = lodashGet(report, 'total', 0);
    const displayAmount = (amount || amount === 0) ? CurrencyUtils.convertToDisplayString(amount, currency) : '';
    
    // ... rest of the function ...
}