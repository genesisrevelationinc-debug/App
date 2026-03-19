import {convertToUSD} from './CurrencyConverter';

/**
 * Calculates the tax amount based on the receipt amount and tax rate.
 * @param {number} receiptAmount - The amount on the receipt in the receipt's currency.
 * @param {number} taxRate - The tax rate to apply.
 * @param {string} receiptCurrency - The currency of the receipt.
 * @param {string} workspaceCurrency - The default currency of the workspace.
 * @returns {number} - The calculated tax amount in the workspace currency.
 */
export function calculateTaxAmount(receiptAmount, taxRate, receiptCurrency, workspaceCurrency) {
    const taxAmountInReceiptCurrency = receiptAmount * (taxRate / 100);
    return convertToUSD(taxAmountInReceiptCurrency, receiptCurrency, workspaceCurrency);
}