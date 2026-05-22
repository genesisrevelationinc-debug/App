import Onyx from 'react-native-onyx';
import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';
import ONYXKEYS from '../../ONYX42';
import * as CollectionUtils from '../utils/CollectionUtils';

const checkAndCleanOrphanedExpenses = (reportID) => {
    const report = Onyx.get(`report_${reportID}`);
    if (!report) return;
    
    const expenses = lodashGet(report, 'expenses', {});
    const cleanedExpenses = {};
    
    Object.keys(expenses).forEach((expenseID) => {
        const expense = expenses[expenseID];
        // Check if expense is orphaned/ghost - exists in report but not accessible
        if (expense && lodashHas(expense, 'isOrphaned') && expense.isOrphaned) {
            // Skip orphaned expenses that cannot be opened or modified
            return;
        }
        cleanedExpenses[expenseID] = expense;
    });
    
    // Update report with cleaned expenses
    Onyx.merge(`report_${reportID}`, {expenses: cleanedExpenses});
};

export {checkAndCleanOrphanedExpenses};