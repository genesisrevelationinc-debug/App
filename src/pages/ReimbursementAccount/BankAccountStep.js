        return reimbursementAccount?.achData?.bankAccountID;
    }, [reimbursementAccount]);
    const defaultIban = getDefaultStateForField?.(BANK_INFO_STEP_KEYS.IBAN) ?? '';
    const defaultValues = useMemo(() => {
        const defaultRoutingNumber = reimbursementAccountDraft?.[BANK_INFO_STEP_KEYS.ROUTING_NUMBER] ?? '';
        const defaultAccountNumber = reimbursementAccountDraft?.[BANK_INFO_STEP_KEYS.ACCOUNT_NUMBER] ?? '';
        return {
            [BANK_INFO_STEP_KEYS.ROUTING_NUMBER]: defaultRoutingNumber,
            [BANK_INFO_STEP_KEYS.ACCOUNT_NUMBER]: defaultAccountNumber,
            [BANK_INFO_STEP_KEYS.IBAN]: defaultIban,
        };
    }, [reimbursementAccountDraft]);
        const bankAccountID = lodashGet(reimbursementAccount, 'achData.bankAccountID', 0);
        const stepValues = {
            [BANK_INFO_STEP_KEYS.ROUTING_NUMBER]: value[BANK_INFO_STEP_KEYS.ROUTING_NUMBER],
            [BANK_INFO_STEP_KEYS.IBAN]: value[BANK_INFO_STEP_KEYS.IBAN],
            [BANK_INFO_STEP_KEYS.ACCOUNT_NUMBER]: value[BANK_INFO_STEP_KEYS.ACCOUNT_NUMBER],
            [BANK_INFO_STEP_KEYS.BANK_ACCOUNT_ID]: bankAccountID,
            [BANK_INFO_STEP_KEYS.PLAID_MASK]: reimbursementAccount?.achData?.plaidMask ?? '',