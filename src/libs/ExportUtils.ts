import type {OnyxEntry} from 'react-native-onyx';
import type {Report} from '@src/types/onyx';
import type {Transaction} from '@src/types/onyx';
import * as ReportUtils from './ReportUtils';
import * as TransactionUtils from './TransactionUtils';

    return reportTransactions;
}

/**
 * Filters out invalid/ghost transactions that may exist in report data
 * but cannot be properly accessed or edited in the UI.
 * These transactions typically have missing required fields or
 * are in an inconsistent state.
 */
function getValidTransactionsForExport(transactions: Transaction[]): Transaction[] {
    return transactions.filter((transaction) => {
        // Skip transactions with no transactionID (ghost/orphaned)
        if (!transaction?.transactionID) {
            return false;
        }
        // Skip transactions that are marked as untagged but have no valid data
        if (transaction?.isBeingSmartScanned === undefined && !transaction?.merchant && !transaction?.description && transaction?.amount === 0) {
            return false;
        }
        return true;
    });
}

/**
 * Gets the QBO export data for a report, filtering out any
 * transactions that would cause export failures.
function getQBOExportData(report: OnyxEntry<Report>) {
    const transactions = getExportableReportTransactions(report);
    
    const validTransactions = getValidTransactionsForExport(transactions).filter((transaction) => {
        // Additional QBO-specific validation
        const hasRequiredFields = TransactionUtils.hasRequiredFields(transaction);
        return hasRequiredFields;
    });
    };
}

export {getExportableReportTransactions, getValidTransactionsForExport, getQBOExportData};