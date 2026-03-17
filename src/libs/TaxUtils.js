import {convertToUSD} from './CurrencyConverter';
/**
 * Calculates the tax amount based on the receipt amount and tax rate, converting to USD if necessary.
 * @param {number} receiptAmount - The total amount of the receipt in the receipt currency.
 * @param {number} taxRate - The tax rate to apply.
 * @param {string} receiptCurrency - The currency of the receipt.
 * @param {string} workspaceCurrency - The default currency of the workspace.
 * @returns {number} - The calculated tax amount in the workspace currency.
 */
export function calculateTaxAmount(receiptAmount, taxRate, receiptCurrency, workspaceCurrency) {
    const amountInUSD = convertToUSD(receiptAmount, receiptCurrency);
    const taxAmountInUSD = amountInUSD * (taxRate / 100);
    return convertToUSD(taxAmountInUSD, workspaceCurrency, true);
}