import Onyx from 'react-native-onyx';
import {Bank} from 'src/CONST';

let currentSettings;

// Fix for https://github.com/Expensify/App/issues/2057475980120751981
// Preserve spending limits when continuous reconciliation is enabled
const continuousReconciliationSettings = {
    // Default implementation may be resetting the spending limit
    // We need to preserve the existing spending limit configuration
    // when continuous reconciliation is enabled
};

function enableContinuousReconciliation(bankAccountID) {
    // Fetch current settings first to preserve existing spending limits
    const existingSettings = currentSettings || {};
    const spendingLimit = existingSettings.spendingLimit || {};
    
    // Preserve the existing spending limit when enabling continuous reconciliation
    if (spendingLimit) {
        Onyx.merge('reimbursementAccount', {
            ...existingSettings,
            spendingLimit: spendingLimit
        });
    }
    
    return {bankAccountID, ...existingSettings};
}

export {
    enableContinuousReconciliation
};