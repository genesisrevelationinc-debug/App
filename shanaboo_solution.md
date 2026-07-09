Based on the issue description, the bug is about split expense validation - when a user enters 0 for all splits and then saves a merchant, the validation error disappears and allows splitting with an invalid total. This suggests the validation state is being reset when the merchant is saved.

Let me look at the relevant files in the repository structure to find the split expense confirmation page and its validation logic.

```diff
--- a/src/pages/iou/request/step/IOURequestStepConfirmation.tsx
+++ b/src/pages/iou/request/step/IOURequestStepConfirmation.tsx
@@ -1,6 +1,7 @@
 import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
+import lodashIsEqual from 'lodash/isEqual';
 import type {OnyxEntry} from 'react-native-onyx';
 import ConfirmModal from '@components/ConfirmModal';
 import FormProvider from '@components/Form';
@@ -9,6 +10,7 @@
 import useLocalize from '@hooks/useLocalize';
 import useNetwork from '@hooks/useNetwork';
 import useThemeStyles from '@hooks/useThemeStyles';
+import usePrevious from '@hooks/usePrevious';
 import Navigation from '@libs/Navigation/Navigation';
 import * as IOU from '@userActions/IOU';
 import * as TransactionUtils from '@libs/TransactionUtils';
@@ -17,6 +19,7 @@
 import ONYXKEYS from '@src/ONYXKEYS';
 import ROUTES from '@src/ROUTES';
 import type {Route} from '@src/ROUTES';
+import type {SplitShares} from '@src/types/onyx/Transaction';
 
 const IOURequestStepConfirmation = ({route}: {route: Route}) => {
     const {translate} = useLocalize();
@@ -28,6 +31,7 @@
     const [transaction] = useOnyx(`${ONYXKEYS.COLLECTION.TRANSACTION}${transactionID}`);
     const [draftTransaction] = useOnyx(`${ONYXKEYS.COLLECTION.TRANSACTION_DRAFT}${transactionID}`);
     const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${transaction?.policyID ?? '-1'}`);
+    const [prevDraftTransaction, setPrevDraftTransaction] = useState<OnyxEntry<typeof draftTransaction>>(draftTransaction);
 
     const styles = useThemeStyles();
     const {isOffline} = useNetwork();
@@ -36,6 +40,7 @@
     const isPolicyExpenseChat = useMemo(() => ReportUtils.isPolicyExpenseChat(chatReport), [chatReport]);
     const isScanRequest = useMemo(() => TransactionUtils.isScanRequest(transaction), [transaction]);
     const isPerDiemRequest = useMemo(() => TransactionUtils.isPerDiemRequest(transaction), [transaction]);
+    const prevShares = usePrevious(draftTransaction?.splitShares);
 
     const splitAmount = useMemo(() => {
         if (!draftTransaction?.splitShares) {
@@ -49,6 +54,7 @@
         return sum;
     }, [draftTransaction?.splitShares]);
 
+    const [hasInvalidSplit, setHasInvalidSplit] = useState(false);
     const [merchantError, setMerchantError] = useState(false);
     const [shouldShowMerchantError, setShouldShowMerchantError] = useState(false);
 
@@ -56,6 +62,25 @@
         setShouldShowMerchantError(false);
     }, []);
 
+    useEffect(() => {
+        if (!draftTransaction?.splitShares || !draftTransaction?.amount) {
+            setHasInvalidSplit(false);
+            return;
+        }
+
+        const totalAmount = IOUUtils.calculateAmount(prevDraftTransaction?.amount ?? draftTransaction.amount, prevDraftTransaction?.currency ?? draftTransaction.currency, false);
+        const splitSum = Object.values(draftTransaction.splitShares).reduce((sum: number, share: SplitShares) => sum + (share.amount ?? 0), 0);
+        const isInvalid = Math.abs(totalAmount - splitSum) > 0.01;
+        setHasInvalidSplit(isInvalid);
+    }, [draftTransaction?.splitShares, draftTransaction?.amount, draftTransaction?.currency, prevDraftTransaction]);
+
+    useEffect(() => {
+        if (!lodashIsEqual(draftTransaction, prevDraftTransaction)) {
+            setPrevDraftTransaction(draftTransaction);
+        }
+    }, [draftTransaction, prevDraftTransaction]);
+
+    const isSplitValid = useMemo(() => !hasInvalidSplit, [hasInvalidSplit]);
+
     const navigateBack = useCallback(() => {
         Navigation.goBack();
     }, []);
@@ -63,7 +88,7 @@
     const splitOrRequestMoney = useCallback(() => {
         if (!transaction || !draftTransaction) {
             return;
-        }
+        }   
         if (isPerDiemRequest) {
             IOU.createPerDiemRequest(transaction, draftTransaction);
             return;
@@ -71,6 +96,10 @@
         if (isScanRequest) {
             IOU.replaceReceipt(transaction, draftTransaction);
         }
+        if (hasInvalidSplit) {
+            setShouldShowMerchantError(true);
+            return;
+        }
         IOU.splitBill(
             chatReport,
             draftTransaction,
@@ -78,7 +107,7 @@
             draftTransaction.amount,
             draftTransaction.currency,
         );
-    }, [transaction, draftTransaction, chatReport, isScanRequest, isPerDiemRequest]);
+    }, [transaction, draftTransaction, chatReport, isScanRequest, isPerDiemRequest, hasInvalidSplit]);
 
     const confirm = useCallback(() => {
         if (!draftTransaction) {
@@ -86,6 +115,10 @@
         }
         if (draftTransaction.merchant === '' && !isScanRequest && !isPerDiemRequest) {
             setShouldShowMerchantError(true);
+            return;
+        }
+        if (hasInvalidSplit) {
+            setShouldShowMerchantError(true);
             return;
         }
         splitOrRequestMoney();
@@ -93,7 +126,7 @@
             setShouldShowMerchantError(false);
             setMerchantError(false);
         }
-    }, [draftTransaction, splitOrRequestMoney, isScanRequest, isPerDiemRequest]);
+    }, [draftTransaction, splitOrRequestMoney, isScanRequest, isPerDiemRequest, hasInvalidSplit]);
 
     const isMerchantRequired = useMemo(() => {
         if (isScanRequest || isPerDiemRequest) {
@@ -101,6 +134,7 @@
         }
