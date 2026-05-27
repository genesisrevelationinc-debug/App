```diff
--- a/src/components/ReportActionItem/MoneyRequestReportPreview/MoneyRequestReportPreview.tsx
+++ b/src/components/ReportActionItem/MoneyRequestReportPreview/MoneyRequestReportPreview.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState, useTransition} from 'react';
 import {View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
@@ -123,6 +123,7 @@ function MoneyRequestReportPreview({
     const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
     const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
     const [isHoldMenuVisible, setIsHoldMenuVisible] = useState(false);
+    const [isBulkEditing, setIsBulkEditing] = useState(false);
     const [requestPreviewAction, setRequestPreviewAction] = useState<RequestPreviewAction | null>(null);
     const [isMerchantModalVisible, setIsMerchantModalVisible] = useState(false);
     const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
@@ -131,6 +132,7 @@ function MoneyRequestReportPreview({
     const [isBillableModalVisible, setIsBillableModalVisible] = useState(false);
     const [isTagModalVisible, setIsTagModalVisible] = useState(false);
     const [isTaxRateModalVisible, setIsTaxRateModalVisible] = useState(false);
+    const [isPending, startTransition] = useTransition();
 
     const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS);
     const [betas] = useOnyx(ONYXKEYS.BETAS);
@@ -1000,6 +1002,7 @@ function MoneyRequestReportPreview({
             case CONST.REPORT.REQUEST_PREVIEW_ACTIONS.BULK_EDIT:
                 return {
                     onSelected: () => {
+                        setIsBulkEditing(true);
                         setRequestPreviewAction(null);
                     },
                 };
@@ -1107,6 +1110,8 @@ function MoneyRequestReportPreview({
                         isBillableModalVisible={isBillableModalVisible}
                         setIsBillableModalVisible={setIsBillableModalVisible}
                         reportID={reportID}
+                        isBulkEditing={isBulkEditing}
+                        setIsBulkEditing={setIsBulkEditing}
                     />
                 )}
             </View>
--- a/src/components/ReportActionItem/MoneyRequestReportPreview/ReportPreviewBulkEdit.tsx
+++ b/src/components/ReportActionItem/MoneyRequestReportPreview/ReportPreviewBulkEdit.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useMemo, useRef, useState, useTransition} from 'react';
 import {InteractionManager, View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
@@ -50,6 +50,8 @@ type ReportPreviewBulkEditProps = {
     isBillableModalVisible: boolean;
     setIsBillableModalVisible: (isVisible: boolean) => void;
     reportID: string;
+    isBulkEditing: boolean;
+    setIsBulkEditing: (isBulkEditing: boolean) => void;
 };
 
 function ReportPreviewBulkEdit({
@@ -72,6 +74,8 @@ function ReportPreviewBulkEdit({
     isBillableModalVisible,
     setIsBillableModalVisible,
     reportID,
+    isBulkEditing,
+    setIsBulkEditing,
 }: ReportPreviewBulkEditProps) {
     const styles = useThemeStyles();
     const {translate} = useLocalize();
@@ -79,6 +83,7 @@ function ReportPreviewBulkEdit({
     const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
     const [isAllSelected, setIsAllSelected] = useState(false);
     const [isSaving, setIsSaving] = useState(false);
+    const [isPending, startTransition] = useTransition();
     const selectedTransactionsRef = useRef(selectedTransactions);
     const selectedTransactionsCount = selectedTransactions.size;
     const hasSelectedTransactions = selectedTransactionsCount > 0;
@@ -222,6 +227,7 @@ function ReportPreviewBulkEdit({
     const handleSave = useCallback(() => {
         if (!hasSelectedTransactions) {
             setRequestPreviewAction(null);
+            setIsBulkEditing(false);
             return;
         }
 
@@ -237,6 +243,7 @@ function ReportPreviewBulkEdit({
         setIsSaving(true);
 
         const selectedTransactionIDs = Array.from(selectedTransactions);
+        const updatePromises: Promise<void>[] = [];
 
         selectedTransactionIDs.forEach((transactionID) => {
             const transaction = allTransactions?.[`${ONYXKEYS.COLLECTION.TRANSACTION}${transactionID}`];
@@ -252,7 +259,7 @@ function ReportPreviewBulkEdit({
                         case 'category':
                             if (typeof value === 'string') {
                                 const category = value === '' ? '' : value;
-                                IOU.updateMoneyRequestCategory(transactionID, reportID, category);
+                                updatePromises.push(IOU.updateMoneyRequestCategory(transactionID, reportID, category));
                             }
                             break;
                         case 'tag':
@@ -261,7 +268,7 @@ function ReportPreviewBulkEdit({
                                     const tagList = value.split(',');
                                     const tag = tagList.join(',');
                                     const transactionTag = tag === '' ? '' : tag;
-                                    IOU.updateMoneyRequestTag(transactionID, reportID, transactionTag);
+                                    updatePromises.push(IOU.updateMoneyRequestTag(transactionID, reportID, transactionTag));
                                 }
                             }
                             break;
@@ -269,7 +276,7 @@ function ReportPreviewBulkEdit({
                             if (typeof value === 'boolean') {
                                 const isBillable = value;
                                 if (transaction?.billable !== isBillable) {
-                                    IOU.updateMoneyRequestBillable(transactionID, reportID, isBillable);
+                                    updatePromises.push(IOU.updateMoneyRequestBillable(transactionID, reportID, isBillable));
                                 }
                             }
                             break;
@@ -279,7 +286,7 @@ function ReportPreviewBulkEdit({
                                 const taxAmount = value;
                                 const taxCode = editedFields.taxCode;
                                 if (taxAmount !== undefined && taxCode !== undefined) {
-                                    IOU.updateMoneyRequestTaxAmountAndTaxRate(transactionID, reportID, taxAmount, taxCode, true);
+                                    updatePromises.push(IOU.updateMoneyRequestTaxAmountAndTaxRate(transactionID, reportID, taxAmount, taxCode, true));
                                 }
                            