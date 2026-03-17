import React from 'react';
import {calculateTaxAmount} from '../libs/TaxUtils';
import {convertToCurrency} from '../libs/CurrencyConverter';
const Receipt = ({receiptAmount, taxRate, receiptCurrency, workspaceCurrency}) => {
    const taxAmount = calculateTaxAmount(receiptAmount, taxRate, receiptCurrency, workspaceCurrency);
    const taxAmountInWorkspaceCurrency = convertToCurrency(taxAmount, 'USD', workspaceCurrency);

    return (
        <div>
            <p>Tax Amount: {taxAmountInWorkspaceCurrency.toFixed(2)} {workspaceCurrency}</p>
        </div>
    );
};

export default Receipt;