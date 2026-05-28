    // ... existing code ...
    
    const renderMoneyRequestAction = (action) => {
        const amount = lodashGet(action, 'originalMessage.amount', 0);
        const displayAmount = (amount || amount === 0) ? CurrencyUtils.convertToDisplayString(amount, currency) : '';
        
        // ... rest of rendering logic
    };
    
    // ... rest of component
};