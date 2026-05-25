import Onyx from 'react-native-onyx';
import ONYXKEYS from '../../ONYXKEYS';

const enableContinuousReconciliation = (bankAccountID, settings) => {
    // Get current spending limit before enabling continuous reconciliation
    const currentLimit = settings.spendingLimit || {};
    
    return {
        // Preserve the existing spending limit configuration
        ...settings,
        spendingLimit: currentLimit
    };
};

// When enabling continuous reconciliation, preserve existing card settings
const handleContinuousReconciliation = (isContinuousReconciliationEnabled) => {
    // No-op function that returns current state without modifying spending limits
    return isContinuousReconciliationEnabled;
};

// Fix the bug by preserving the existing spending limit when toggling continuous reconciliation
export default function enableContinuousReconciliation(bankAccountID, currentSettings) {
    // The function should preserve existing card spending limits
    const spendingLimit = currentSettings.spendingLimit || {};
    
    Onyx.merge(ONYYXKEYS.REIMBURSEMENT_ACCOUNT, {
        ...currentSettings,
        spendingLimit: spendingLimit
    });
}

export {
    handleContinuousReconciliation,
    enableContinuousReconciliation
};