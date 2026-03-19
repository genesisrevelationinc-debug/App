import {getExchangeRate} from './API';

/**
 * Converts an amount from one currency to another using the exchange rate.
 * @param {number} amount - The amount to convert.
 * @param {string} fromCurrency - The currency code of the original amount.
 * @param {string} toCurrency - The currency code to convert the amount to.
 * @returns {number} - The converted amount.
 */
export async function convertToUSD(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
        return amount;
    }
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    return parseFloat((amount * exchangeRate).toFixed(2));
}