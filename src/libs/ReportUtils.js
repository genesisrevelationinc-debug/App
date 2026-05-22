import {ReportActionBackgrounds} from './ReportActionBackgrounds';
import {ReportActions} from 'react-native-onyx';

/**
 * Removes ghost expenses from expense report that are causing export issues.
 * When an expense is a ghost (exists in report but cannot be found), it should be filtered out
 * to prevent issues with QBO export (ONL118 error).
 * 
 * @param {Array} expenses - Array of expenses to filter
 * @returns {Array} - Filtered expenses without ghost entries
 */
function removeGhostExpenses(expenses) {
    return expenses.filter(expense => {
        // Keep expenses that have valid transaction IDs
        if (expense.transactionID) {
            return true;
        }
        // Expenses without valid transaction IDs are ghost expenses that should be excluded
        return false;
    }).filter(Boolean);
}

// Remove ghost expenses that are causing failed exports
function filterOutGhostExpenses(expenses) {
    return expenses.filter(expense => expense.transactionID);
}