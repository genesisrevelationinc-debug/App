import * as NetworkStore from '@libs/NetworkStore';
import * as ReportUtils from '@libs/ReportUtils';
import * as TransactionUtils from '@libs/TransactionUtils';
import * as ExportUtils from '@libs/ExportUtils';
import type {OnyxUpdate} from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Policy, Report} from '@src/types/onyx';
        return;
    }

    const allReportTransactions = ReportUtils.getReportTransactions(reportID);
    const reportTransactions = ExportUtils.getValidTransactionsForExport(allReportTransactions);
    
    if (reportTransactions.length === 0) {
        throw new Error('No valid transactions found for export');
    }
    
    const parameters: ExportReportToQuickBooksOnlineParams = {
        policyID,