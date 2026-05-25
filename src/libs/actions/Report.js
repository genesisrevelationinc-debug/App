import {API} from '../API';
import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';
import Onyx from 'react-native-onyx';

/**
 * Fetches the report data with a check for ghost expenses
 * @param {Number} reportID
 * @returns {Promise}
 */
export function fetchReportIfNeeded(reportID) {
    return API.Get({
        returnValueList: 'reportStuff',
        reportID,
    })
        .then((data) => {
            if (data.reports) {
                // Filter out any expenses that are ghosted/missing
                // to prevent them from causing QBO export errors
                const reportData = data.reports[reportID];
                if (reportData && reportData.transactionIDs) {
                    // Check if we have ghost transactions
                    const validTransactionIDs = reportData.transactionIDs.filter(transactionID => {
                        const transaction = reportData.transactions[transactionID];
                        return transaction && transaction.type === 'expense';
                    });
                    
                    // Only include valid transactions (non-ghost)
                    reportData.transactionIDs = validTransactionIDs;
                }
                return data;
            }
            return data;
        });
}

/**
 * Sanitizes report data by removing ghost transactions that could cause export issues
 * @param {Object} report
 * @returns {Object} Cleaned report object
 */
function sanitizeReportTransactions(report) {
    if (!report.transactions) {
        return report;
    }
    
    // Create a clean copy of transactions excluding ghost entries
    const cleanTransactions = {};
    const cleanTransactionIDs = [];
    
    // Filter out any transaction that cannot be accessed or is ghosted
    Object.keys(report.transactions).forEach((transactionID) => {
        const transaction = report.transactions[transactionID];
        if (transaction && transaction.amount && transaction.merchant) {
            // Valid transaction, keep it
            cleanTransactions[transactionID] = transaction;
            cleanTransactionIDs.push(transactionID);
        }
    });
    
    return {
        ...report,
        transactionIDs: cleanTransactionIDs,
        transactions: cleanTransactions,
    };
}

/**
 * Exports report to QBO format handling ghost expense filtering
 * @param {Number} reportID
 * @returns {Promise}
 */
export function exportReportToQBO(reportID) {
    return fetchReportIfNeeded(reportID)
        .then((report) => {
            // Sanitize the report data before QBO export
            const sanitizedReport = sanitizeReportTransactions(report);
            
            // Perform QBO export with clean data only
            return API.QBOExport({
                reportID,
                report: sanitizedReport
            });
        })
        .catch((error) => {
            console.debug('QBO export failed:', error);
            throw error;
        });
}