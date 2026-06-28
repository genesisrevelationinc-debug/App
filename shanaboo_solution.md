Based on the issue description, the bug is about split expense validation - when a user enters 0 for all splits and then saves a merchant, the validation error disappears and allows splitting with an incorrect total. This suggests the validation state is being reset when the merchant is saved.

Let me look at the relevant files to understand the codebase structure and find where the split validation logic lives.

```diff
--- a/src/pages/iou/request/step/IOURequestStepConfirmation.js
+++ b/src/pages/iou/request/step/IOURequestStepConfirmation.js
@@ -1,6 +1,7 @@
 import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {View} from 'react-native';
 import {withOnyx} from 'react-native-onyx';
+import lodashIsEqual from 'lodash/isEqual';
 import type {OnyxEntry} from 'react-native-onyx';
 import ConfirmModal from '@components/ConfirmModal';
 import FormProvider from '@components/Form';
@@ -9,6 +10,7 @@
 import useLocalize from '@hooks/useLocalize';
 import useNetwork from '@hooks/useNetwork';
 import useThemeStyles from '@hooks/useThemeStyles';
+import usePrevious from '@hooks/usePrevious';
 import * as IOU from '@libs/actions/IOU';
 import * as OptionsListUtils from '@libs/OptionsListUtils';
 import * as PolicyUtils from '@libs/PolicyUtils';
@@ -16,6 +18,7 @@
 import * as TransactionUtils from '@libs/TransactionUtils';
 import Navigation from '@navigation/Navigation';
 import CONST from '@src/CONST';
+import ONYXKEYS from '@src/ONYXKEYS';
 import ROUTES from '@src/ROUTES';
 import type {WithOnyxProps} from '@src/types/onyx/OnyxCommon';
 import type {Participant} from '@src/types/onyx/IOU';
@@ -23,6 +26,7 @@
 import type {Policy, PolicyCategories, PolicyTagList, PolicyTags} from '@src/types/onyx/Policy';
 import type {Transaction} from '@src/types/onyx/Transaction';
 import type {ReceiptErrors, ReceiptSource} from '@src/types/onyx/Transaction';
+import type {SplitShares} from '@src/types/onyx/Transaction';
 import StepScreenWrapper from './StepScreenWrapper';
 import withFullTransactionOrNotFound from './withFullTransactionOrNotFound';
 import withWritableReportOrNotFound from './withWritableReportOrNotFound';
@@ -30,6 +34,7 @@
 type IOURequestStepConfirmationOnyxProps = {
     /** The transaction object being modified */
     transaction: OnyxEntry<Transaction>;
+    splitShares: OnyxEntry<SplitShares>;
 
     /** The policy of the report */
     policy: OnyxEntry<Policy>;
@@ -45,6 +50,7 @@
 
 const IOURequestStepConfirmation = ({
     transaction,
+    splitShares,
     policy,
     policyTags,
     policyCategories,
@@ -52,6 +58,8 @@
     report,
 }: IOURequestStepConfirmationProps) => {
     const {translate} = useLocalize();
+    const prevSplitShares = usePrevious(splitShares);
+    const [hasValidatedSplits, setHasValidatedSplits] = useState(false);
     const styles = useThemeStyles();
     const {isOffline} = useNetwork();
     const [isSearchingForReports] = useOnyx(ONYXKEYS.IS_SEARCHING_FOR_REPORTS);
@@ -59,6 +67,7 @@
     const [didConfirm, setDidConfirm] = useState(false);
     const [shouldShowMerchant, setShouldShowMerchant] = useState(false);
     const [attachReceipt, setAttachReceipt] = useState(false);
+    const [splitError, setSplitError] = useState('');
 
     const isPolicyExpenseChat = useMemo(() => ReportUtils.isPolicyExpenseChat(report), [report]);
     const isScanRequest = useMemo(() => TransactionUtils.isScanRequest(transaction), [transaction]);
@@ -66,6 +75,7 @@
     const isSplitRequest = useMemo(() => iouType === CONST.IOU.MONEY_REQUEST_TYPE.SPLIT, [iouType]);
     const isPerDiemRequest = useMemo(() => iouType === CONST.IOU.MONEY_REQUEST_TYPE.PER_DIEM, [iouType]);
     const isDistanceRequest = useMemo(() => TransactionUtils.isDistanceRequest(transaction), [transaction]);
+    const isManualSplit = useMemo(() => isSplitRequest && iouRequestType === CONST.IOU.MONEY_REQUEST_TYPE.MANUAL, [isSplitRequest, iouRequestType]);
 
     const receiptFilename = transaction?.filename;
     const receiptPath = transaction?.receipt?.source;
@@ -73,6 +83,7 @@
     const receiptSource = transaction?.receipt?.source;
     const hasReceipt = TransactionUtils.hasReceipt(transaction);
     const hasSmartScannedReceipt = TransactionUtils.hasSmartScannedReceipt(transaction);
+    const splitSharesList = useMemo(() => splitShares?.data ?? [], [splitShares]);
 
     const policyTagList = useMemo(() => {
         if (!isPolicyExpenseChat) {
@@ -96,6 +107,7 @@
         [isPolicyExpenseChat, policyCategories, policy],
     );
 
+    // Validate split amounts whenever splitShares change
     useEffect(() => {
         if (!isSplitRequest) {
             return;
@@ -103,6 +115,7 @@
         IOU.resetMoneyRequestCategory();
         IOU.resetMoneyRequestTag();
     }, [isSplitRequest]);
+
     const navigateBack = useCallback(() => {
         Navigation.goBack();
     }, []);
@@ -110,6 +123,7 @@
     const navigateToAddReceipt = useCallback(() => {
         Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_SCAN.getRoute(CONST.IOU.ACTION.CREATE, iouType, transaction?.transactionID ?? '', report?.reportID ?? ''));
     }, [iouType, transaction?.transactionID, report?.reportID]);
+
     const navigateToEditRequest = useCallback(() => {
         Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_AMOUNT.getRoute(CONST.IOU.ACTION.EDIT, iouType, transaction?.transactionID ?? '', report?.reportID ?? ''));
     }, [iouType, transaction?.transactionID, report?.reportID]);
@@ -117,6 +131,7 @@
     const navigateToParticipantPage = useCallback(() => {
         Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_PARTICIPANTS.getRoute(iouType, transaction?.transactionID ?? '', report?.reportID ?? ''));
    