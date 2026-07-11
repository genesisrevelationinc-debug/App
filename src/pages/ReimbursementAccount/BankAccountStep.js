import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import lodashGet from 'lodash/get';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import useLocalize from '@hooks/useLocalize';
import usePrevious from '@hooks/usePrevious';
import useReimbursementAccountStepFormSubmit from '@hooks/useReimbursementAccountStepFormSubmit';
import type {SubStepProps} from '@hooks/useSubStep/types';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import INPUT_IDS from '@src/types/form/ReimbursementAccountForm';
import type {BankAccountStepProps} from './types';
const BANK_INFO_STEP_KEYS = INPUT_IDS.BANK_INFO_STEP;
const STEP_FIELDS = [BANK_INFO_STEP_KEYS.ROUTING_NUMBER, BANK_INFO_STEP_KEYS.ACCOUNT_NUMBER, BANK_INFO_STEP_KEYS.IBAN];
const localize = useLocalize();
const translate = useLocalize();
function BankAccountStep({onNext, isEditing, reimbursementAccountDraft, getDefaultStateForField}: BankAccountStepProps) {
    const [reimbursementAccount] = useOnyx(ONYXKEYS.REIMBURSEMENT_ACCOUNT);
    const [session] = useOnyx(ONYXKEYS.SESSION);
    const previousReimbursementAccount = usePrevious(reimbursementAccount);
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