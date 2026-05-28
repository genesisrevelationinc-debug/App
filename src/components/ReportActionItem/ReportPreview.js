    const currency = lodashGet(props, 'previewAction.originalMessage.currency', CONST.CURRENCY.USD);
    const merchant = lodashGet(props, 'previewAction.originalMessage.merchant', '');
    const amount = lodashGet(props, 'previewAction.originalMessage.total', 0);
    const displayAmount = (amount || amount === 0) ? CurrencyUtils.convertToDisplayString(amount, currency) : '';

    const isBillSplit = lodashGet(props, 'previewAction.originalMessage.type') === CONST.IOU.REPORT_ACTION_TYPE.SPLIT;
    