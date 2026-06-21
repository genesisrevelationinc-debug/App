import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import usePolicy from '@hooks/usePolicy';
import usePrevious from '@hooks/usePrevious';
import useThemeStyles from '@hooks/useThemeStyles';
import * as CurrencyUtils from '@libs/CurrencyUtils';
import DistanceRequestUtils from '@libs/DistanceRequestUtils';
import usePrevious from '@hooks/usePrevious';
import * as PolicyUtils from '@libs/PolicyUtils';
import * as ReportUtils from '@libs/ReportUtils';
import * as TransactionUtils from '@libs/TransactionUtils';
import type {Option} from '@src/types/onyx/IOU';
import type {MoneyRequestConfirmationListProps, MoneyRequestConfirmationListItem} from './MoneyRequestConfirmationList/types';
import MoneyRequestConfirmationList from './MoneyRequestConfirmationList/Base';
import type {BaseMoneyRequestConfirmationListProps} from './MoneyRequestConfirmationList/types';
import type {OptionData} from '@libs/ReportUtils';
function MoneyRequestConfirmationListWithOnyx(props: MoneyRequestConfirmationListProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const {isOffline} = useNetwork();
    const navigation = useNavigation();
    const policy = usePolicy(props.policyID);
    const [betas] = useOnyx(ONYXKEYS.BETAS);
    isGPSDistanceRequest as isGPSDistanceRequestUtil,
    const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS_LIST);
    const [session] = useOnyx(ONYXKEYS.SESSION);
    const [splitSelectedParticipants] = useOnyx(ONYXKEYS.SPLIT_SELECTED_PARTICIPANTS);
    const [iouCustomUnit] = useOnyx(ONYXKEYS.IOU_CUSTOM_UNIT);
    const [lastSelectedDistanceRates] = useOnyx(ONYXKEYS.NVP_LAST_SELECTED_DISTANCE_RATES);
    const [policyCategories] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_CATEGORIES}${props.policyID}`);
    const [policyTags] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_TAGS}${props.policyID}`);
import type {PaymentMethodType} from '@src/types/onyx/OriginalMessage';
    const [policyDraftTags] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_TAGS_DRAFT}${props.policyID}`);
    const [policyDraftCategories] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_CATEGORIES_DRAFT}${props.policyID}`);
    const [draftTransaction] = useOnyx(ONYXKEYS.IOU_DRAFT_TRANSACTION);
    const [iouRequestType] = useOnyx(ONYXKEYS.IOU_REQUEST_TYPE);

    const [isConfirmed, setIsConfirmed] = useState(false);

import useConfirmationCtaText from './MoneyRequestConfirmationList/hooks/useConfirmationCtaText';
        () => ({
            ...props,
            policy,
            betas,
            personalDetails,
            session,
            splitSelectedParticipants,
import useSplitParticipants from './MoneyRequestConfirmationList/hooks/useSplitParticipants';
import useTaxAmount from './MoneyRequestConfirmationList/hooks/useTaxAmount';
import useTransactionReportForConfirmation from './MoneyRequestConfirmationList/hooks/useTransactionReportForConfirmation';
import SplitBillController from './MoneyRequestConfirmationList/SplitBillController';
import TaxController from './MoneyRequestConfirmationList/TaxController';
import MoneyRequestConfirmationListFooter from './MoneyRequestConfirmationListFooter';
import BareUserListItem from './SelectionList/ListItem/BareUserListItem';
import SelectionListWithSections from './SelectionList/SelectionListWithSections';
            draftTransaction,
            iouRequestType,
        }),
        [props, policy, betas, personalDetails, session, splitSelectedParticipants, iouCustomUnit, lastSelectedDistanceRates, policyCategories, policyTags, policyDraftTags, policyDraftCategories, draftTransaction, iouRequestType],
    );

    return (

    /** Whether the parent-owned participant picker modal is currently open (new manual expense flow). Drives amount autofocus on picker close. */
    isParticipantPickerVisible?: boolean;
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    );
}
    /** Callback to toggle the billable state */
    onToggleBillable?: (isOn: boolean) => void;

    /** Selected participants from MoneyRequestModal with login / accountID */
    selectedParticipants: Participant[];

    /** Payee of the expense with login */
    payeePersonalDetails?: OnyxEntry<OnyxTypes.PersonalDetails> | null;

    /** Should the list be read only, and not editable? */
    isReadOnly?: boolean;

    /** Number of expenses to be created */
    expensesNumber?: number;

    /** The policyID of the request */
    policyID?: string;

    /** The reportID of the request */
    reportID?: string;

    /** File path of the receipt */
    receiptPath?: string | number;

    /** File name of the receipt */
    receiptFilename?: string;

    /** Transaction that represents the expense */
    transaction?: OnyxEntry<OnyxTypes.Transaction>;

    /** Whether the expense is an odometer distance expense */
    isOdometerDistanceRequest?: boolean;

    /** Whether the odometer receipt is currently being stitched */
    isLoadingReceipt?: boolean;

    /** Error message from the odometer receipt stitcher, rendered below the receipt */
    receiptStitchError?: string | null;

    /** Whether the expense is a per diem expense */
    isPerDiemRequest?: boolean;

    /** Whether the expense is a time expense */
    isTimeRequest?: boolean;

    /** Whether we're editing a split expense */
    isEditingSplitBill?: boolean;

    /** Whether we can navigate to receipt page */
    shouldDisplayReceipt?: boolean;

    /** Whether we should show the amount, date, and merchant fields. */
    shouldShowSmartScanFields?: boolean;

    /** A flag for verifying that the current report is a sub-report of a expense chat */
    isPolicyExpenseChat?: boolean;

    /** Whether smart scan failed */
    hasSmartScanFailed?: boolean;

    /** The ID of the report action */
    reportActionID?: string;

    /** The action to take */
    action?: IOUAction;

    /** Whether the expense is confirmed or not */
    isConfirmed?: boolean;

    /** Whether the expense is in the process of being confirmed */
    isConfirming?: boolean;

    /** Whether the receipt can be replaced */
    isReceiptEditable?: boolean;

    /** The PDF load error callback */
    onPDFLoadError?: () => void;

    /** The PDF password callback */
    onPDFPassword?: () => void;

    /** Function to toggle reimbursable */
    onToggleReimbursable?: (isOn: boolean) => void;

    /** Show remove expense confirmation modal */
    showRemoveExpenseConfirmModal?: () => void;

    /** When true, hide the "To:" section (e.g. when adding an expense directly to the current report) */
    shouldHideToSection?: boolean;
};

type MoneyRequestConfirmationListItem = (Participant & {keyForList: string}) | OptionData;

function MoneyRequestConfirmationList({
    transaction,
    onSendMoney,
    onConfirm,
    onOpenParticipantPicker,
    isParticipantPickerVisible = false,
    iouType = CONST.IOU.TYPE.SUBMIT,
    isOdometerDistanceRequest = false,
    isLoadingReceipt = false,
    receiptStitchError,
    isPerDiemRequest = false,
    isPolicyExpenseChat = false,
    shouldShowSmartScanFields = true,
    isEditingSplitBill,
    isReceiptEditable,
    selectedParticipants: selectedParticipantsProp,
    payeePersonalDetails: payeePersonalDetailsProp,
    isReadOnly = false,
    policyID,
    reportID = '',
    receiptPath = '',
    receiptFilename = '',
    onToggleBillable,
    hasSmartScanFailed,
    reportActionID,
    action = CONST.IOU.ACTION.CREATE,
    shouldDisplayReceipt = false,
    expensesNumber = 0,
    isConfirmed,
    isConfirming,
    onPDFLoadError,
    onPDFPassword,
    onToggleReimbursable,
    showRemoveExpenseConfirmModal,
    isTimeRequest = false,
    shouldHideToSection = false,
}: MoneyRequestConfirmationListProps) {
    const policyCategories = usePolicyCategoriesForConfirmation(policyID);
    const {policyTags, policyTagLists} = usePolicyTagsForConfirmation(policyID);
    const transactionReport = useTransactionReportForConfirmation(transaction?.reportID);
    const {policyForMovingExpenses, shouldSelectPolicy} = usePolicyForMovingExpenses();
    const isMovingTransactionFromTrackExpense = isMovingTransactionFromTrackExpenseUtil(action);
    const {isBetaEnabled} = usePermissions();
    const isNewManualExpenseFlowEnabled = isBetaEnabled(CONST.BETAS.NEW_MANUAL_EXPENSE_FLOW);
    const {isDelegateAccessRestricted} = useDelegateNoAccessState();
    const {showDelegateNoAccessModal} = useDelegateNoAccessActions();
    const isInLandscapeMode = useIsInLandscapeMode();
    const {translate} = useLocalize();

    const {isTestReceipt, shouldShowProductTrainingTooltip, renderProductTrainingTooltip} = useReceiptTraining({
        transaction,
    });

    const isTrackExpense = iouType === CONST.IOU.TYPE.TRACK;
    const {policy} = usePolicyForTransaction({
        transaction,
        reportPolicyID: policyID,
        action,
        iouType,
        isPerDiemRequest,
    });

    const styles = useThemeStyles();
    const currentUserPersonalDetails = useCurrentUserPersonalDetails();
    const {isRestrictedToPreferredPolicy} = usePreferredPolicy();

    const isDistanceRequest = isDistanceRequestUtil(transaction);
    const isManualDistanceRequest = isManualDistanceRequestUtil(transaction);
    const isGPSDistanceRequest = isGPSDistanceRequestUtil(transaction);

    const iouAmount = hasValidModifiedAmount(transaction) ? Number(transaction?.modifiedAmount) : (transaction?.amount ?? 0);
    const iouCurrencyCode = getCurrency(transaction);
    const iouMerchant = getMerchant(transaction);
    const iouCategory = getCategory(transaction);
    const iouAttendees = useAttendees(transaction);

    const isTypeRequest = iouType === CONST.IOU.TYPE.SUBMIT;
    const isTypeSend = iouType === CONST.IOU.TYPE.PAY;
    const isTypeTrackExpense = iouType === CONST.IOU.TYPE.TRACK;
    const isTypeInvoice = iouType === CONST.IOU.TYPE.INVOICE;
    const isFromGlobalCreateAndCanEditParticipant = !!transaction?.isFromGlobalCreate && !isPerDiemRequest && !isTimeRequest;

    const transactionID = transaction?.transactionID;
    const previousTransactionCurrency = usePrevious(transaction?.currency);
    const customUnitRateID = getRateID(transaction);

    const subRates = transaction?.comment?.customUnit?.subRates ?? [];
    const prevSubRates = usePrevious(subRates);

    const {defaultRate, mileageRate, unit, rate, currency, prevCurrency, distance, shouldCalculateDistanceAmount, hasRoute, isDistanceRequestWithPendingRoute, distanceRequestAmount} =
        useDistanceRequestState({
            transaction,
            policy,
            policyID,
            policyForMovingExpenses,
            isMovingTransactionFromTrackExpense,
            isDistanceRequest,
            iouAmount,
            iouCurrencyCode,
        });

    const shouldShowRateAutoUpdatedTooltip =
        isDistanceRequest && !!transaction?.comment?.customUnit?.rateAutoUpdated && !!transaction.created && DistanceRequestUtils.isRateEligibleForDate(mileageRate, transaction.created);

    const shouldShowCategories = isTrackExpense
        ? !policy || shouldSelectPolicy || !!iouCategory || hasEnabledOptions(Object.values(policyCategories ?? {}))
        : (isPolicyExpenseChat || isTypeInvoice) && (!!iouCategory || hasEnabledOptions(Object.values(policyCategories ?? {})));

    const shouldShowMerchant = (shouldShowSmartScanFields || isTypeSend) && !isDistanceRequest && !isPerDiemRequest && (!isTimeRequest || action !== CONST.IOU.ACTION.CREATE);

    const shouldShowTax = isTaxTrackingEnabled(isPolicyExpenseChat || isTrackExpense, policy, isDistanceRequest, isPerDiemRequest, isTimeRequest);

    const {defaultTaxCode, defaultTaxValue, shouldKeepCurrentTaxSelection, taxAmountInSmallestCurrencyUnits} = useTaxAmount({
        transaction,
        policy,
        policyForMovingExpenses,
        isDistanceRequest,
        isMovingTransactionFromTrackExpense,
        customUnitRateID,
        distance,
        previousTransactionCurrency,
    });

    const {amountToBeUsed, formattedAmount, formattedAmountPerAttendee, isScanRequest} = useConfirmationAmount({
        transaction,
        iouAmount,
        iouCurrencyCode,
        iouAttendees,
        isDistanceRequest,
        isDistanceRequestWithPendingRoute,
        shouldCalculateDistanceAmount,
        distanceRequestAmount,
        distanceCurrency: currency,
        isPerDiemRequest,
        prevCurrency,
        currency,
        prevSubRates,
    });

    const isManualRequest = transaction?.iouRequestType === CONST.IOU.REQUEST_TYPE.MANUAL;
    const shouldForceTopEmptySections = isNewManualExpenseFlowEnabled && (iouType === CONST.IOU.TYPE.CREATE || isManualRequest || isScanRequest);

    const isFocused = useIsFocused();

    const [didConfirm, setDidConfirm] = useState(isConfirmed);
    const [didConfirmSplit, setDidConfirmSplit] = useState(false);
    const [showMoreFields, setShowMoreFields] = useState(false);

    useEffect(() => {
        setShowMoreFields(false);
    }, [transactionID]);

    const routeError = Object.values(transaction?.errorFields?.route ?? {}).at(0);
    const isTypeSplit = iouType === CONST.IOU.TYPE.SPLIT;
    const shouldShowReadOnlySplits = isPolicyExpenseChat || isReadOnly || isScanRequest;

    const {formError, setFormError, clearFormErrors, shouldDisplayFieldError, isMerchantEmpty, isMerchantFieldValid, isMerchantRequired, errorMessage} = useFormErrorManagement({
        transaction,
        transactionReport,
        iouMerchant,
        iouCategory,
        iouAttendees,
        policy,
        policyTags,
        policyCategories,
        currentUserPersonalDetails,
        isEditingSplitBill,
        isPolicyExpenseChat,
        isScanRequest,
        shouldShowMerchant,
        hasSmartScanFailed,
        didConfirmSplit,
        routeError,
        isTypeSplit,
        shouldShowReadOnlySplits,
    });

    const isCategoryRequired = !!policy?.requiresCategory && !isTypeInvoice;

    const isDescriptionRequired = isCategoryDescriptionRequired(policyCategories, iouCategory, policy?.areRulesEnabled);

    // If completing a split expense fails, set didConfirm to false to allow the user to edit the fields again
    if (isEditingSplitBill && didConfirm) {
        setDidConfirm(false);
    }

    useEffect(() => {
        setDidConfirm(isConfirmed);
    }, [isConfirmed]);

    const splitOrRequestOptions = useConfirmationCtaText({
        expensesNumber,
        isTypeInvoice,
        isTypeTrackExpense,
        isTypeSplit,
        isTypeRequest,
        iouAmount,
        iouType,
        policy,
        formattedAmount,
        receiptPath,
        isDistanceRequestWithPendingRoute,
        isPerDiemRequest,
        isNewManualExpenseFlowEnabled,
    });

    const selectedParticipants = selectedParticipantsProp.filter((participant) => participant.selected);
    const payeePersonalDetails = payeePersonalDetailsProp ?? currentUserPersonalDetails;

    const participantRowErrors = useMemo(() => {
        if (formError !== 'iou.error.noParticipantSelected' && formError !== 'violations.missingAttendees') {
            return undefined;
        }
        return {participants: translate(formError)};
    }, [formError, translate]);

    useEffect(() => {
        if (selectedParticipants.length === 0) {
            return;
        }
        clearFormErrors(['iou.error.noParticipantSelected']);
    }, [selectedParticipants.length, clearFormErrors]);

    const dismissParticipantRowError = useCallback(() => {
        clearFormErrors(['iou.error.noParticipantSelected', 'violations.missingAttendees']);
    }, [clearFormErrors]);

    const {splitParticipants, getSplitSectionHeader} = useSplitParticipants({
        isTypeSplit,
        shouldShowReadOnlySplits,
        payeePersonalDetails,
        selectedParticipants,
        transaction,
        iouAmount,
        iouCurrencyCode,
        currentUserAccountID: currentUserPersonalDetails.accountID,
    });

    const canEditParticipant = isFromGlobalCreateAndCanEditParticipant && !isTestReceipt && (!isRestrictedToPreferredPolicy || isTypeInvoice);

    const sections = useConfirmationSections({
        isTypeSplit,
        shouldHideToSection,
        shouldForceTopEmptySections,
        participantRowErrors,
        canEditParticipant,
        payeePersonalDetails,
        splitParticipants,
        selectedParticipants,
        getSplitSectionHeader,
    });

    /**
     * Navigate to the participant step
     */
    const navigateToParticipantPage = () => {
        if (!canEditParticipant) {
            return;
        }

        if (isNewManualExpenseFlowEnabled) {
            onOpenParticipantPicker?.();
            return;
        }

        const newIOUType = iouType === CONST.IOU.TYPE.SUBMIT || iouType === CONST.IOU.TYPE.TRACK ? CONST.IOU.TYPE.CREATE : iouType;
        Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_PARTICIPANTS.getRoute(newIOUType, transactionID, transaction?.reportID, Navigation.getActiveRoute(), action));
    };

    const {validate} = useConfirmationValidation({
        transaction,
        transactionReport,
        transactionID,
        iouType,
        iouAmount,
        iouMerchant,
        iouCategory,
        iouCurrencyCode,
        iouAttendees,
        policy,
        policyTags,
        policyTagLists,
        policyCategories,
        selectedParticipants,
        currentUserPersonalDetails,
        isEditingSplitBill,
        isMerchantRequired,
        isMerchantFieldValid,
        isMerchantEmpty,
        shouldDisplayFieldError,
        shouldShowTax,
        isDistanceRequest,
        isDistanceRequestWithPendingRoute,
        isPerDiemRequest,
        isTimeRequest,
        routeError,
        isNewManualExpenseFlowEnabled,
    });

    const confirm = buildConfirmAction({
        iouType,
        policy,
        transactionID,
        reportID,
        routeError,
        formError,
        selectedParticipants,
        isDelegateAccessRestricted,
        validate,
        setFormError,
        setDidConfirmSplit,
        showDelegateNoAccessModal,
        onConfirm,
        onSendMoney,
    });

    const isCompactMode = !showMoreFields && isScanRequest && !isInLandscapeMode;
    const selectionListStyle = {
        containerStyle: [styles.flexBasisAuto],
        contentContainerStyle: isCompactMode ? [styles.flexGrow1] : undefined,
        listFooterContentStyle: isCompactMode ? [styles.flex1, styles.mv3] : [styles.mv3],
    };

    const footerContent = isReadOnly ? undefined : (
        <ConfirmationFooterContent
            iouType={iouType}
            confirm={confirm}
            iouCurrencyCode={iouCurrencyCode}
            policyID={policyID}
            reportID={reportID}
            isConfirmed={isConfirmed}
            isConfirming={isConfirming}
            isLoadingReceipt={isLoadingReceipt}
            splitOrRequestOptions={splitOrRequestOptions}
            errorMessage={errorMessage}
            expensesNumber={expensesNumber}
            showRemoveExpenseConfirmModal={showRemoveExpenseConfirmModal}
            shouldShowProductTrainingTooltip={shouldShowProductTrainingTooltip}
            renderProductTrainingTooltip={renderProductTrainingTooltip}
        />
    );

    const listFooterContent = (
        <View style={isCompactMode ? styles.flex1 : undefined}>
            <MoneyRequestConfirmationListFooter
                receiptStitchError={receiptStitchError}
                action={action}
                iouType={iouType}
                transactionID={transactionID}
                reportID={reportID}
                reportActionID={reportActionID}
                isScanRequest={isScanRequest}
                policyID={policyID}
                policy={policy}
                policyTags={policyTags}
                selectedParticipants={selectedParticipantsProp}
                isReadOnly={isReadOnly}
                didConfirm={!!didConfirm}
                isEditingSplitBill={isEditingSplitBill}
                isPolicyExpenseChat={isPolicyExpenseChat}
                expenseMode={{isDistance: isDistanceRequest, isTime: isTimeRequest, isInvoice: isTypeInvoice, isPerDiem: isPerDiemRequest}}
                distanceFlags={{isManualDistanceRequest, isOdometerDistanceRequest, isGPSDistanceRequest}}
                distanceData={{distance, hasRoute, unit, rate, distanceRateName: mileageRate.name, distanceRateCurrency: currency, shouldShowRateAutoUpdatedTooltip}}
                amountDisplay={{amount: amountToBeUsed, formattedAmount, formattedAmountPerAttendee}}
                requiredFlags={{isCategoryRequired, isMerchantRequired, isDescriptionRequired}}
                visibilityFlags={{
                    shouldShowSmartScanFields,
                    shouldShowAmountField: !isPerDiemRequest,
                    shouldShowMerchant,
                    shouldShowCategories,
                    shouldShowTax,
                    isParticipantPickerVisible,
                }}
                errorState={{shouldDisplayFieldError, formError, clearFormErrors, setFormError}}
                toggleHandlers={{onToggleReimbursable, onToggleBillable}}
                receiptOptions={{
                    receiptFilename,
                    receiptPath,
                    isLoadingReceipt,
                    isReceiptEditable,
                    shouldDisplayReceipt,
                    onPDFLoadError,
                    onPDFPassword,
                }}
                compactControls={{showMoreFields, setShowMoreFields}}
                onSubmitForm={confirm}
            />
        </View>
    );

    return (
        <>
            <ConfirmationTelemetry transactionID={transactionID} />
            <TaxController
                transactionID={transactionID}
                policyID={policyID}
                isReadOnly={isReadOnly}
                shouldShowTax={shouldShowTax}
                isMovingTransactionFromTrackExpense={isMovingTransactionFromTrackExpense}
                defaultTaxCode={defaultTaxCode}
                defaultTaxValue={defaultTaxValue}
                shouldKeepCurrentTaxSelection={shouldKeepCurrentTaxSelection}
                taxAmountInSmallestCurrencyUnits={taxAmountInSmallestCurrencyUnits}
                transactionTaxAmount={transaction?.taxAmount}
            />
            <DistanceRequestController
                transactionID={transactionID}
                transaction={transaction}
                isDistanceRequest={isDistanceRequest}
                isManualDistanceRequest={isManualDistanceRequest}
                isPolicyExpenseChat={isPolicyExpenseChat}
                customUnitRateID={customUnitRateID}
                mileageRate={mileageRate}
                distance={distance}
                unit={unit}
                rate={rate}
                currency={currency}
                policy={policy}
                isReadOnly={isReadOnly}
                isMovingTransactionFromTrackExpense={isMovingTransactionFromTrackExpense}
                isTypeSplit={isTypeSplit}
                selectedParticipants={selectedParticipants}
                selectedParticipantsProp={selectedParticipantsProp}
                defaultMileageRateCustomUnitRateID={defaultRate}
                hasRoute={hasRoute}
                isDistanceRequestWithPendingRoute={isDistanceRequestWithPendingRoute}
                shouldCalculateDistanceAmount={shouldCalculateDistanceAmount}
                distanceRequestAmount={distanceRequestAmount}
                currentUserAccountID={currentUserPersonalDetails.accountID}
                setFormError={setFormError}
                clearFormErrors={clearFormErrors}
            />
            <SplitBillController
                transaction={transaction}
                isTypeSplit={isTypeSplit}
                iouAmount={iouAmount}
                iouCurrencyCode={iouCurrencyCode}
                currentUserAccountID={currentUserPersonalDetails.accountID}
                isFocused={isFocused}
                onFormError={setFormError}
            />
            <FieldAutoSelector
                transactionID={transactionID}
                transaction={transaction}
                policyCategories={policyCategories}
                policyTagLists={policyTagLists}
                policyTags={policyTags}
                policy={policy}
                shouldShowCategories={shouldShowCategories}
                isCategoryRequired={isCategoryRequired}
                iouCategory={iouCategory}
                isMovingTransactionFromTrackExpense={isMovingTransactionFromTrackExpense}
            />
            <MouseProvider>
                <SelectionListWithSections<MoneyRequestConfirmationListItem>
                    sections={sections}
                    ListItem={BareUserListItem}
                    onSelectRow={navigateToParticipantPage}
                    onDismissError={dismissParticipantRowError}
                    shouldSingleExecuteRowSelect
                    shouldPreventDefaultFocusOnSelectRow
                    shouldShowListEmptyContent={false}
                    footerContent={footerContent}
                    listFooterContent={listFooterContent}
                    style={selectionListStyle}
                    disableKeyboardShortcuts
                />
            </MouseProvider>
        </>
    );
}

export default MoneyRequestConfirmationList;
