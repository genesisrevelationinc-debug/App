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
@@ -9,6 +10,7 @@ import type {FormInputErrors, FormOnyxValues} from '@components/Form/types';
 import HeaderWithBackButton from '@components/HeaderWithBackButton';
 import * as Expensicons from '@components/Icon/Expensicons';
 import MenuItem from '@components/MenuItem';
+import MoneyRequestConfirmationList from '@components/MoneyRequestConfirmationList';
 import ScreenWrapper from '@components/ScreenWrapper';
 import useLocalize from '@hooks/useLocalize';
 import useNetwork from '@hooks/useNetwork';
@@ -16,6 +18,7 @@ import usePrevious from '@hooks/usePrevious';
 import useThemeStyles from '@hooks/useThemeStyles';
 import * as ErrorUtils from '@libs/ErrorUtils';
 import * as IOUUtils from '@libs/IOUUtils';
+import * as MoneyRequestUtils from '@libs/MoneyRequestUtils';
 import * as OptionsListUtils from '@libs/OptionsListUtils';
 import * as TransactionUtils from '@libs/TransactionUtils';
 import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
@@ -24,6 +27,7 @@ import Navigation from '@navigation/Navigation';
 import type {MoneyRequestNavigatorParamList} from '@navigation/types';
 import CONST from '@src/CONST';
 import ONYXKEYS from '@src/ONYXKEYS';
+import type {Participant} from '@src/types/onyx/IOU';
 import type {Policy, PolicyCategories, PolicyTagList, RecentlyUsedCategories, RecentlyUsedTags, Transaction} from '@src/types/onyx';
 import {isEmptyObject} from '@src/types/utils/EmptyObject';
 import type {WithPolicyAndOnyxProps} from './withPolicyAndOnyx';
@@ -31,6 +35,7 @@ import withPolicyAndOnyx from './withPolicyAndOnyx';
 import type SCREENS from '@src/SCREENS';
 
 type IOURequestStepConfirmationProps = WithPolicyAndOnyxProps & {
+    /** The participants in the money request */
+    participants: Participant[];
 } & PlatformStackScreenProps<MoneyRequestNavigatorParamList, typeof SCREENS.MONEY_REQUEST.STEP_CONFIRMATION>;
 
 function IOURequestStepConfirmation({
@@ -38,6 +43,7 @@ function IOURequestStepConfirmation({
     policy,
     policyCategories,
     policyTagList,
+    participants,
     recentlyUsedCategories,
     recentlyUsedTags,
     transaction,
@@ -50,6 +56,7 @@ function IOURequestStepConfirmation({
     const styles = useThemeStyles();
     const {translate} = useLocalize();
     const {isOffline} = useNetwork();
+    const [splitErrors, setSplitErrors] = useState<FormInputErrors>({});
     const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
     const [isMerchantModalVisible, setIsMerchantModalVisible] = useState(false);
     const [merchant, setMerchant] = useState(transaction?.merchant ?? '');
@@ -57,6 +64,7 @@ function IOURequestStepConfirmation({
     const [category, setCategory] = useState(transaction?.category ?? '');
     const [tag, setTag] = useState(transaction?.tag ?? '');
     const [receiptFile, setReceiptFile] = useState<FileObject | undefined>();
+    const prevParticipants = usePrevious(participants);
 
     const isPolicyExpenseChat = useMemo(() => !!report?.policyID, [report?.policyID]);
     const isScanRequest = useMemo(() => TransactionUtils.isScanRequest(transaction), [transaction]);
@@ -64,6 +72,28 @@ function IOURequestStepConfirmation({
     const isSplitRequest = iouType === CONST.IOU.MONEY_REQUEST_TYPE.SPLIT;
     const isSendRequest = iouType === CONST.IOU.MONEY_REQUEST_TYPE.SEND;
 
+    const validateSplit = useCallback(() => {
+        if (!isSplitRequest || !participants || participants.length === 0) {
+            return {};
+        }
+        const splitAmounts = participants.map((participant) => {
+            if (participant.isSender) {
+                return 0;
+            }
+            return participant.amount ?? 0;
+        });
+        const totalSplitAmount = splitAmounts.reduce((sum, amount) => sum + amount, 0);
+        const totalAmount = transaction?.amount ?? 0;
+        
+        if (totalSplitAmount !== totalAmount) {
+            return {
+                amount: translate('iou.error.invalidSplit'),
+            };
+        }
+        
+        return {};
+    }, [isSplitRequest, participants, transaction?.amount, translate]);
+
     const navigateBack = useCallback(() => {
         Navigation.goBack();
     }, []);
@@ -71,6 +101,14 @@ function IOURequestStepConfirmation({
     const navigateToAddReceipt = useCallback(() => {
         Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_RECEIPT.getRoute(action, iouType, transactionID, reportID));
     }, [action, iouType, transactionID, reportID]);
+
+    useEffect(() => {
+        if (!isSplitRequest) {
+            return;
+        }
+        const errors = validateSplit();
+        setSplitErrors(errors);
+    }, [isSplitRequest, validateSplit, participants]);
 
     const navigateToParticipantPage = useCallback(() => {
         if (isEmptyObject(transaction?.participants)) {
@@ -78,6 +116,7 @@ function IOURequestStepConfirmation({
         }
         Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_PARTICIPANTS.getRoute(iouType, transactionID, reportID));
     }, [iouType, transactionID, reportID, transaction?.participants