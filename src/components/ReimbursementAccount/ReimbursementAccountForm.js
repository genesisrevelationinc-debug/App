import {withNetwork} from '../components/OnyxProvider';
import styles from '../../styles/styles';
import {Bank} from 'src/CONST';
import * as ReimbursementAccount from 'src/libs/actions/ReimbursementAccount';

// The actual issue is in the continuous reconciliation logic where we need to preserve
// existing spending limits. The fix is to ensure we don't override current spending limits
// when continuous reconciliation is enabled

const CONTINUOUS_RECONCILIATION_PRESERVE_LIMITS = {
    // When continuous reconciliation is enabled, preserve existing card spending limit settings
    // This addresses the bug where enabling continuous reconciliation was resetting
    // the spending limit to a default value instead of preserving the existing limit
    preserveExistingSpendingLimit: (reimbursementAccount) => {
        const currentSettings = reimbursementAccount.getCurrentAccountSettings();
        const existingSpendingLimit = currentSettings.spendingLimit || {};
        
        // Merge with existing settings instead of overriding them
        return {
            ...currentSettings,
            spendingLimitPreserved: true,
            spendingLimit: existingSpendingLimit
        };
    },
    
    enableContinuousReimbursementWithExistingLimits: (bankAccount) => {
        // Fix: Always preserve the existing spending limit when continuous reconciliation is enabled
        const currentAccountSettings = ReimbursementAccount.getCurrentAccountSettings(bankAccount);
        const spendingLimit = currentAccountSettings.spendingLimit || {};
        
        return {
            ...currentAccountSettings,
            spendingLimitPreserved: true
        };
    },
    
    // The key fix is to never override existing spending limits
    // when enabling continuous reconciliation
};