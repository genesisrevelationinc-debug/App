import Onyx from 'react-native-onyx';
import type {OnyxEntry, OnyxUpdate} from 'react-native-onyx';
import lodashHas from 'lodash/has';
import lodashClone from 'lodash/cloneDeep';
import type {TupleToUnion} from 'type-fest';
import type {SvgProps} from '@components/Icon/svgs';
import * as CurrencyUtils from '@libs/CurrencyUtils';
    return Object.values(allTransactions ?? {}).filter((transaction): transaction is Transaction => transaction?.reportID === reportID);
}

/**
 * Apply workspace expense rules to a transaction.
 * This is used for imported transactions (company card/bank feed) to ensure
 * merchant rules and other expense rules are applied automatically.
 */
function applyAllExpenseRules(transaction: Transaction): Partial<Transaction> {
    const updatedTransaction: Partial<Transaction> = {};
    
    // Apply merchant rules if the transaction has a merchant
    if (transaction.merchant) {
        const merchantRule = getMerchantRule(transaction.merchant);
        if (merchantRule) {
            updatedTransaction.merchant = merchantRule.newMerchantName;
        }
    }
    
    // Add other rule types here as needed (category rules, tag rules, etc.)
    
    return updatedTransaction;
}

/**
 * Get the matching merchant rule for a given merchant name.
 * Checks workspace rules to find if any merchant rule applies.
 */
function getMerchantRule(merchantName: string): {newMerchantName: string} | undefined {
    // Get all policies to check for merchant rules
    const policies = Object.values(allPolicies ?? {});
    
    for (const policy of policies) {
        if (!policy?.rules?.expenseRules) {
            continue;
        }
        
        const merchantRules = policy.rules.expenseRules.filter(
            (rule): rule is NonNullable<typeof rule> => 
                rule?.type === 'merchant' && 
                rule?.condition === 'contains' &&
                rule?.value !== undefined
        );
        
        for (const rule of merchantRules) {
            const merchantToMatch = merchantName.toLowerCase();
            const ruleValue = rule.value.toLowerCase();
            
            if (merchantToMatch.includes(ruleValue)) {
                return {
                    newMerchantName: rule.newValue ?? merchantName,
                };
            }
        }
    }
    
    return undefined;
}

export {
    buildOptimisticTransaction,
    calculateTaxAmount,
    getAllReportTransactions,
    getTransactionIndex,
    getFormattedCreatedAt,
    applyAllExpenseRules,
    getMerchantRule,
};