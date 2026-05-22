import type {OnyxUpdate} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import lodashGet from 'lodash/get';
import * as API from '@libs/API';
import type {
    ConnectToQuickbooksOnlineParams,
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {ConnectionName} from '@src/types/onyx/Policy';
import type {Transaction} from '@src/types/onyx/Transaction';
import * as ErrorUtils from '@libs/ErrorUtils';
import * as ReportUtils from '@libs/ReportUtils';
import * as TransactionUtils from '@libs/TransactionUtils';
    return undefined;
}

/**
 * Validates that a transaction is not a ghost/orphaned expense before export.
 * Ghost expenses exist in report data but cannot be opened or modified.
 */
function isValidTransactionForExport(transaction: Transaction | undefined): boolean {
    if (!transaction) {
        return false;
    }
    
    // Check for required fields that would indicate a valid, non-orphaned transaction
    const transactionID = transaction.transactionID;
    const amount = transaction.amount;
    
    // A ghost expense typically has minimal data and may be marked as untagged
    // but the key indicator is that it cannot be retrieved properly
    // If the transactionID is missing or amount is undefined, it's likely orphaned
    return !!transactionID && (amount !== undefined && amount !== null);
}

/**
 * Export a report to QuickBooks Online
 */
        return;
    }
    
    // Filter out any ghost/orphaned transactions before export
    const reportTransactions = ReportUtils.getReportTransactions(reportID);
    const hasInvalidTransactions = reportTransactions.some((transaction) => !isValidTransactionForExport(transaction));
    
    if (hasInvalidTransactions) {
        // Log the issue but don't fail - filter out invalid transactions from the export
        console.warn(`[exportToQuickbooksOnline] Report ${reportID} contains invalid/ghost transactions that will be skipped`);
    }
    
    const validTransactions = reportTransactions.filter((transaction) => isValidTransactionForExport(transaction));
    
    const parameters: ExportToQuickbooksOnlineParams = {
        reportID,
        policyID,
        reimbursable: exportSettings.reimbursable,
        nonReimbursable: exportSettings.nonReimbursable,
        exportDate: exportSettings.exportDate,
        transactionIDs: validTransactions.map((t) => t.transactionID),
    };
    
    API.write(WRITE_COMMANDS.EXPORT_TO_QUICKBOOKS_ONLINE, parameters, {