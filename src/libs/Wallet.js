    if (!cardName || !transactionData) {
        throw new Error('Card name and transaction data are required');
    }
    if (!/^[a-zA-Z0-9\u00C0-\u017F]+$/.test(cardName)) {
        throw new Error('Card name contains invalid characters');
    }
