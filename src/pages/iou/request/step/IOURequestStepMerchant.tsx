import React, {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/FormProvider/InputWrapper';
import TextInput from '@components/TextInput';
import useAutoFocusInput from '@hooks/useAutoFocusInput';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useThemeStyles from '@hooks/useThemeStyles';
import * as ErrorUtils from '@libs/ErrorUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as MoneyRequestUtils from '@libs/MoneyRequestUtils';
import * as ValidationUtils from '@libs/ValidationUtils';
import type {SplitDetailsNavigatorParamList} from '@navigation/types';
import * as IOU from '@userActions/IOU';
import usePolicy from '@hooks/usePolicy';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
import type {Transaction} from '@src/types/onyx';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import {isEmptyValue} from '@src/types/utils/EmptyValue';
import INPUT_IDS from '@src/types/form/MoneyRequestMerchantForm';
import type {BaseTextInputRef} from '@src/types/utils/ElementTypes';
import {getTransactionDetails, isExpenseRequest, isPolicyExpenseChat} from '@libs/ReportUtils';
import {hasReceipt} from '@libs/TransactionUtils';
import {isInvalidMerchantValue, isValidInputLength} from '@libs/ValidationUtils';
import {clearMoneyRequestMerchant, setMoneyRequestMerchant} from '@userActions/IOU/MoneyRequest';
import {setDraftSplitTransaction} from '@userActions/IOU/Split';
import {updateMoneyRequestMerchant} from '@userActions/IOU/UpdateMoneyRequest';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
import INPUT_IDS from '@src/types/form/MoneyRequestMerchantForm';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import StepScreenWrapper from './StepScreenWrapper';
import type {WithFullTransactionOrNotFoundProps} from './withFullTransactionOrNotFound';
import withFullTransactionOrNotFound from './withFullTransactionOrNotFound';
import type {WithWritableReportOrNotFoundProps} from './withWritableReportOrNotFound';
import withWritableReportOrNotFound from './withWritableReportOrNotFound';

type IOURequestStepMerchantProps = WithWritableReportOrNotFoundProps<typeof SCREENS.MONEY_REQUEST.STEP_MERCHANT> &
    WithFullTransactionOrNotFoundProps<typeof SCREENS.MONEY_REQUEST.STEP_MERCHANT>;

function IOURequestStepMerchant({
    route: {
        params: {transactionID, reportID, backTo, action, iouType, reportActionID},
    },
    transaction,
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const inputRef = useRef<BaseTextInputRef>(null);
    const [splitDraftTransaction] = useOnyx(`${ONYXKEYS.COLLECTION.SPLIT_DRAFT}${transactionID}`);
    const splitDraftTransactionData = splitDraftTransaction?.transaction;
    const isSplitBill = action === CONST.IOU.ACTION.SPLIT;

    const isEditing = action !== CONST.IOU.ACTION.CREATE;
    const isMerchantEmpty = !transaction?.merchant;
    const [parentReport] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT}${getNonEmptyStringOnyxID(report?.parentReportID)}`);
    const [parentReportNextStep] = useOnyx(`${ONYXKEYS.COLLECTION.NEXT_STEP}${getNonEmptyStringOnyxID(report?.parentReportID)}`);
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {inputCallbackRef, inputRef} = useAutoFocusInput();
    const isEditing = action === CONST.IOU.ACTION.EDIT;
    useRestartOnReceiptFailure(transaction, reportID, iouType, action);

    const shouldShowNotFoundPage = useShowNotFoundPageInIOUStep(action, iouType, reportActionID, report, transaction);
    // In the split flow, when editing we use SPLIT_TRANSACTION_DRAFT to save draft value
    const isEditingSplitBill = iouType === CONST.IOU.TYPE.SPLIT && isEditing;
    const merchant = getTransactionDetails(isEditingSplitBill && !isEmptyObject(splitDraftTransaction) ? splitDraftTransaction : transaction)?.merchant;
    const isEmptyMerchant = isInvalidMerchantValue(merchant);
    const initialMerchant = isEmptyMerchant ? '' : merchant;
    const [currentMerchant, setCurrentMerchant] = useState(initialMerchant);
    const [isSaved, setIsSaved] = useState(false);
    const [isDiscardModalVisible, setIsDiscardModalVisible] = useState(false);
    const shouldNavigateAfterSaveRef = useRef(false);
    const currentUserPersonalDetails = useCurrentUserPersonalDetails();
    const delegateAccountID = useDelegateAccountID();
            return;
        }

        if (isSplitBill && splitDraftTransactionData && !isEmptyObject(splitDraftTransactionData)) {
            const {amount, currency} = splitDraftTransactionData;
            const isValidSplit = MoneyRequestUtils.validateSplitAmount({
                amount: amount ?? 0,
                currency: currency ?? CONST.CURRENCY.USD,
            });
            if (!isValidSplit) {
                return;
            }
        }

        IOU.setMoneyRequestMerchant(transactionID, merchant, !isEditing);
        Navigation.goBack(backTo);
    };
    const isMerchantRequired = isPolicyExpenseChat(report) || isExpenseRequest(report) || transaction?.participants?.some((participant) => !!participant.isPolicyExpenseChat);

    const navigateBack = useCallback(() => {
        Navigation.goBack(backTo);
    }, [backTo]);

    useEffect(() => {
        if (!isSaved || !shouldNavigateAfterSaveRef.current) {
            return;
        }
        shouldNavigateAfterSaveRef.current = false;
        // Only on the save path. The Back button (onBackButtonPress) should still restore focus.
        skipNextFocusRestore();
        navigateBack();
    }, [isSaved, navigateBack]);

    const validate = useCallback(
        (value: FormOnyxValues<typeof ONYXKEYS.FORMS.MONEY_REQUEST_MERCHANT_FORM>) => {
            const errors: FormInputErrors<typeof ONYXKEYS.FORMS.MONEY_REQUEST_MERCHANT_FORM> = {};
            const {isValid, byteLength} = isValidInputLength(value.moneyRequestMerchant, CONST.MERCHANT_NAME_MAX_BYTES);

            const trimmedMerchant = value.moneyRequestMerchant?.trim();
            if (isMerchantRequired && !trimmedMerchant) {
                errors.moneyRequestMerchant = translate('common.error.fieldRequired');
            } else if (trimmedMerchant && isInvalidMerchantValue(trimmedMerchant)) {
                errors.moneyRequestMerchant = translate('iou.error.invalidMerchant');
            } else if (!isValid) {
                errors.moneyRequestMerchant = translate('common.error.characterLimitExceedCounter', byteLength, CONST.MERCHANT_NAME_MAX_BYTES);
            }

            return errors;
        },
        [isMerchantRequired, translate],
    );

    const updateMerchantRef = (value: string) => {
        setCurrentMerchant(value);
    };

    const updateMerchant = (value: FormOnyxValues<typeof ONYXKEYS.FORMS.MONEY_REQUEST_MERCHANT_FORM>) => {
        const newMerchant = value.moneyRequestMerchant?.trim();

        if (isEditingSplitBill) {
            setDraftSplitTransaction(transactionID, splitDraftTransaction, {merchant: newMerchant});
            setIsSaved(true);
            shouldNavigateAfterSaveRef.current = true;
            return;
        }

        if (newMerchant === '' && isInvalidMerchantValue(merchant)) {
            setIsSaved(true);
            shouldNavigateAfterSaveRef.current = true;
            clearMoneyRequestMerchant(transactionID);
            return;
        }
        if (newMerchant === merchant || (newMerchant === '' && isInvalidMerchantValue(merchant))) {
            setIsSaved(true);
            shouldNavigateAfterSaveRef.current = true;
            return;
        }
        // updateMoneyRequestMerchant's optimisticData already sets merchant on TRANSACTION{id},
        // also calling setMoneyRequestMerchant would trigger a redundant Onyx commit and
        // re-render every subscriber of that key for nothing.
        if (isEditing) {
            updateMoneyRequestMerchant({
                transactionID,
                transactionThreadReport: report,
                parentReport,
                value: newMerchant || CONST.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT,
                policy,
                policyTagList: policyTags,
                policyCategories,
                currentUserAccountIDParam,
                currentUserEmailParam,
                isASAPSubmitBetaEnabled,
                parentReportNextStep,
                isOffline,
                delegateAccountID,
            });
        } else if (!newMerchant) {
            clearMoneyRequestMerchant(transactionID);
        } else {
            setMoneyRequestMerchant(transactionID, newMerchant, true, hasReceipt(transaction));
        }
        setIsSaved(true);
        shouldNavigateAfterSaveRef.current = true;
    };

    useDiscardChangesConfirmation({
        onCancel: () => {
            inputRef.current?.focus();
        },
        getHasUnsavedChanges: () => {
            if (isSaved) {
                return false;
            }
            return currentMerchant !== initialMerchant;
        },
        onVisibilityChange: setIsDiscardModalVisible,
    });

    return (
        <StepScreenWrapper
            headerTitle={translate('common.merchant')}
            onBackButtonPress={navigateBack}
            shouldShowWrapper
            testID="IOURequestStepMerchant"
            shouldShowNotFoundPage={shouldShowNotFoundPage}
        >
            <FormProvider
                style={[styles.flexGrow1, styles.ph5]}
                formID={ONYXKEYS.FORMS.MONEY_REQUEST_MERCHANT_FORM}
                onSubmit={updateMerchant}
                validate={validate}
                submitButtonText={translate('common.save')}
                enabledWhenOffline
                shouldHideFixErrorsAlert
                shouldUseStrictHtmlTagValidation
            >
                <View style={styles.mb4}>
                    <InputWrapper
                        valueType="string"
                        InputComponent={TextInput}
                        inputID={INPUT_IDS.MONEY_REQUEST_MERCHANT}
                        name={INPUT_IDS.MONEY_REQUEST_MERCHANT}
                        defaultValue={initialMerchant}
                        onValueChange={updateMerchantRef}
                        label={translate('common.merchant')}
                        accessibilityLabel={translate('common.merchant')}
                        role={CONST.ROLE.PRESENTATION}
                        editable={!isDiscardModalVisible}
                        ref={inputCallbackRef}
                    />
                </View>
            </FormProvider>
        </StepScreenWrapper>
    );
}

export default withWritableReportOrNotFound(withFullTransactionOrNotFound(IOURequestStepMerchant));
