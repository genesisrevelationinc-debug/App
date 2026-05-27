```diff
--- a/src/components/MoneyRequestReportView/MoneyRequestReportView.tsx
+++ b/src/components/MoneyRequestReportView/MoneyRequestReportView.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback, useEffect, useMemo, useRef} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import type {EdgeInsets} from 'react-native-safe-area-context';
@@ -50,6 +50,7 @@ function MoneyRequestReportView({report, policy, isReportInRHP, route}: MoneyReq
     const {isOffline} = useNetwork();
     const {shouldUseNarrowLayout} = useResponsiveLayout();
     const {isDebugModeEnabled} = useDebugMode();
+    const [isBulkEditing, setIsBulkEditing] = useState(false);
 
     const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
 
@@ -195,6 +196,7 @@ function MoneyRequestReportView({report, policy, isReportInRHP, route}: MoneyReq
             return;
         }
 
+        setIsBulkEditing(true);
         const selectedTransactions = Object.keys(selectedTransactionsID).map((transactionID) => {
             const transaction = allTransactions?.[`${ONYXKEYS.COLLECTION.TRANSACTION}${transactionID}`];
             return transaction;
@@ -210,8 +212,9 @@ function MoneyRequestReportView({report, policy, isReportInRHP, route}: MoneyReq
             }
             return updatedTransaction;
         });
-        IOU.updateMoneyRequestTransactions(updatedTransactions, reportID, true);
+        IOU.updateMoneyRequestTransactions(updatedTransactions, reportID, false);
         setSelectedTransactionsID({});
+        setIsBulkEditing(false);
     }, [selectedTransactionsID, allTransactions, reportID, setSelectedTransactionsID]);
 
     const unselectAllTransactions = useCallback(() => {
@@ -340,6 +343,7 @@ function MoneyRequestReportView({report, policy, isReportInRHP, route}: MoneyReq
                             onSelectAllTransactions={selectAllTransactions}
                             onUnselectAllTransactions={unselectAllTransactions}
                             onBulkAction={handleBulkAction}
+                            isBulkEditing={isBulkEditing}
                         />
                     )}
                 </View>
--- a/src/components/MoneyRequestReportView/ReportActionItemList.tsx
+++ b/src/components/MoneyRequestReportView/ReportActionItemList.tsx
@@ -45,6 +45,7 @@ type ReportActionItemListProps = {
     onSelectAllTransactions: () => void;
     onUnselectAllTransactions: () => void;
     onBulkAction: (action: BulkAction) => void;
+    isBulkEditing?: boolean;
 };
 
 function ReportActionItemList({
@@ -68,6 +69,7 @@ function ReportActionItemList({
     onSelectAllTransactions,
     onUnselectAllTransactions,
     onBulkAction,
+    isBulkEditing,
 }: ReportActionItemListProps) {
     const styles = useThemeStyles();
     const {translate} = useLocalize();
@@ -202,6 +204,7 @@ function ReportActionItemList({
                 onSelectAll={onSelectAllTransactions}
                 onUnselectAll={onUnselectAllTransactions}
                 onBulkAction={onBulkAction}
+                isBulkEditing={isBulkEditing}
             />
             <View style={[styles.flex1]}>
                 <InvertedFlatList
--- a/src/components/SelectionList/Search/ReportBulkActionButton.tsx
+++ b/src/components/SelectionList/Search/ReportBulkActionButton.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback, useMemo, useRef} from 'react';
+import React, {useCallback, useMemo, useRef, useState} from 'react';
 import {View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import * as Expensicons from '@components/Icon/Expensicons';
@@ -20,6 +20,7 @@ type ReportBulkActionButtonProps = {
     onSelectAll: () => void;
     onUnselectAll: () => void;
     onBulkAction: (action: BulkAction) => void;
+    isBulkEditing?: boolean;
 };
 
 function ReportBulkActionButton({
@@ -30,6 +31,7 @@ function ReportBulkActionButton({
     onSelectAll,
     onUnselectAll,
     onBulkAction,
+    isBulkEditing,
 }: ReportBulkActionButtonProps) {
     const styles = useThemeStyles();
     const {translate} = useLocalize();
@@ -37,6 +39,7 @@ function ReportBulkActionButton({
     const selectedTransactionsID = useRef<Set<string>>(new Set());
     const selectedReports = useRef<Set<string>>(new Set());
     const selectedReportsToAction = useRef<Set<string>>(new Set());
+    const [isLoading, setIsLoading] = useState(false);
 
     const handleSelectAll = useCallback(() => {
         onSelectAll();
@@ -46,6 +49,16 @@ function ReportBulkActionButton({
         onUnselectAll();
     }, [onUnselectAll]);
 
+    const handleBulkAction = useCallback((action: BulkAction) => {
+        setIsLoading(true);
+        onBulkAction(action);
+    }, [onBulkAction]);
+
+    // Reset loading state when bulk editing is complete
+    if (isBulkEditing === false && isLoading) {
+        setIsLoading(false);
+    }
+
     const dropdownMenuOptions = useMemo(() => {
         const options: DropdownMenuOption[] = [
             {
@@ -54,7 +67,7 @@ function ReportBulkActionButton({
                 onSelected: () => {
                     selectedReportsToAction.current = new Set(selectedReports.current);
                     selectedReports.current = new Set();
-                    onBulkAction(BulkAction.BILLABLE);
+                    handleBulkAction(BulkAction.BILLABLE);
                 },
             },
             {
@@ -63,7 +76,7 @@ function ReportBulkActionButton({
                 onSelected: () => {
                     selectedReportsToAction.current = new Set(selectedReports.current);
                     selectedReports.current = new Set();
-                    onBulkAction(BulkAction.NON_BILLABLE);
+                    handleBulkAction(BulkAction.NON_BILLABLE);
                 },
             },
             {
@@ -72,7 +85,7 @@ function ReportBulkActionButton({
                 onSelected: () => {
                     selectedReportsToAction.current = new Set(selectedReports.current);
                     selectedReports.current = new Set();
-                    onBulkAction(BulkAction.REIMBURSABLE);
+                    handleBulkAction(BulkAction.REIMBURSABLE);
                 },
             },
             {
@@ -81,7 +94,7 @@ function ReportBulkActionButton({
                 onSelected: () => {
                     selectedReportsTo