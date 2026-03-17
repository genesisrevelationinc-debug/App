import {getExchangeRate} from './API';
/**
 * Converts an amount from one currency to another using the exchange rate.
 * @param {number} amount - The amount to convert.
 * @param {string} fromCurrency - The currency code to convert from.
 * @param {string} toCurrency - The currency code to convert to.
 * @param {boolean} inverse - Whether to invert the conversion (useful for converting tax amounts).
 * @returns {number} - The converted amount.
 */
export function convertToUSD(amount, fromCurrency, inverse = false) {
    if (fromCurrency === 'USD') {
        return amount;
    }
    const exchangeRate = getExchangeRate(fromCurrency, 'USD');
    return inverse ? amount / exchangeRate : amount * exchangeRate;
}
export function convertToCurrency(amount, fromCurrency, toCurrency, inverse = false) {
    if (fromCurrency === toCurrency) {
        return amount;
    }
    const exchangeRateFromUSD = getExchangeRate('USD', toCurrency);
    const amountInUSD = convertToUSD(amount, fromCurrency);
    return inverse ? amountInUSD / exchangeRateFromUSD : amountInUSD * exchangeRateFromUSD;
}