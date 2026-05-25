import {API} from './API';
import {exportReportToQBO} from './actions/Report';

/**
 * Exports data to QuickBooks Online format
 * This handles filtering out ghost expenses before export
 * @param {Object} data
 * @returns {Promise}
 */
export function exportToQBO(data) {
    // Filter out ghost expenses before QBO export
    const cleanData = {};
    const report = data.report;
    
    if (report.transactions) {
        // Remove any transactions that are ghosted or cannot be accessed
        const transactionIDs = report.transactionIDs.filter(transactionID => {
            const transaction = report.transactions[transactionID];
            return transaction && transaction.amount && transaction.merchant;
        });
        
        // Rebuild transactionIDs with only valid entries
        cleanData.transactionIDs = transactionIDs;
        cleanData.transactions = {};
        transactionIDs.forEach(id => {
            cleanData.transactions[id] = report.transactions[id];
        });
    }
    
    // Perform the export with clean data
    return API.QBOExport({
        reportID: data.report.reportID,
        report: cleanData
    });
}