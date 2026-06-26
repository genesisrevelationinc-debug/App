 ```diff
--- a/src/components/MoneyRequestConfirmationList.tsx
+++ b/src/components/MoneyRequestConfirmationList.tsx
@@ -1,5 +1,5 @@
 import {useNavigation} from '@react-navigation/native';
-import React, {useCallback, useMemo, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useState} from 'react';
 import {View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
@@ -7,6 +7,7 @@ import useLocalize from '@hooks/useLocalize';
 import useNetwork from '@hooks/useNetwork';
 import usePolicy from '@hooks/usePolicy';
 import useThemeStyles from '@hooks/useThemeStyles';
+import * as Tag from '@libs/actions/Tag';
 import * as CurrencyUtils from '@libs/CurrencyUtils';
 import DistanceRequestUtils from '@libs/DistanceRequestUtils';
 import * as OptionsListUtils from '@libs/OptionsListUtils';
@@ -14,6 +15,7 ingroup
 import * as PolicyUtils from '@libs/PolicyUtils';
 import * as ReportUtils from '@libs/ReportUtils';
 import * as TransactionUtils from '@libs/TransactionUtils';
+import type {PolicyTag, PolicyTagList, PolicyTags} from '@src/types/onyx/PolicyTag';
 import type {Transaction} from '@src/types/onyx/Transaction';
 import MenuItemWithTopDescription from './MenuItemWithTopDescription';
 import type {MenuItemProps} from './MenuItem';
@@ -22,6 +24,7 @@ import type {Unit} from './MoneyRequestConfirmationList/types';
 import MoneyRequestConfirmationListFooter from './MoneyRequestConfirmationList/MoneyRequestConfirmationListFooter';
 import MoneyRequestConfirmationListHeader from './MoneyRequestConfirmationList/MoneyRequestConfirmationListHeader';
 import type {MoneyRequestConfirmationListProps} from './MoneyRequestConfirmationList/types';
+import ONYXKEYS from '@src/ONYXKEYS';
 
 function MoneyRequestConfirmationList({
     transactionID,
@@ -41,6 +44,7 @@ function MoneyRequestConfirmationList({
     const {isOffline} = useNetwork();
     const policy = usePolicy(policyID);
     const [transaction] = useOnyx<OnyxEntry<Transaction>>(`${ONYXKEYS.COLLECTION.TRANSACTION_DRAFT}${transactionID}`);
+    const [policyTags] = useOnyx<OnyxEntry<PolicyTags>>(`${ONYXKEYS.COLLECTION.POLICY_TAGS}${policyID}`);
 
     const [formState, setFormState] = useState<{
         isLoading: boolean;
@@ -55,6 +59,30 @@ function MoneyRequestConfirmationList({
         errorFields: {},
     });
 
+    // Fetch policy tags if they haven't been loaded yet
+    useEffect(() => {
+        if (!policyID || policyTags) {
+            return;
+        }
+        Tag.getPolicyTags(policyID);
+    }, [policyID, policyTags]);
+
+    // Get dependent tags that need to be shown based on parent tag selection
+    const dependentTags = useMemo(() => {
+        if (!policyTags || !transaction?.tag) {
+            return [];
+        }
+        
+        return Object.entries(policyTags).filter(([tagListKey, tagList]) => {
+            const tagListValue = tagList as PolicyTagList;
+            // Check if this tag list has a parentTagID, meaning it's a dependent tag
+            if (!tagListValue.parentTagID) {
+                return false;
+            }
+            // Check if the parent tag is selected in the transaction
+            return transaction.tag && tagListValue.parentTagID in transaction.tag;
+        });
+    }, [policyTags, transaction?.tag]);
+
     const shouldShowAllFields = iouType !== CONST.IOU_TYPE.SPLIT;
 
     const isTypeInvoice = iouType === CONST.IOU_TYPE.INVOICE;
@@ -72,6 +100,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -89,6 +118,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -106,6 +136,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -123,6 +154,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -140,6 +172,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -157,6 +190,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -174,6 +208,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -191,6 +226,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -208,6 +244,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -225,6 +262,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -242,6 +280,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
 /policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -259,6 +298,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -276,6 +316,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -293,6 +334,7 @@ function MoneyRequestConfirmationList({
         transaction,
         policy,
         policyTags,
+        dependentTags,
         transactionTag,
         shouldShowAllFields,
         isTypeInvoice,
@@ -