 ```diff
--- a/src/components/MoneyRequestConfirmationList.tsx
+++ b/src/components/MoneyRequestConfirmationList.tsx
@@ -1,5 +1,5 @@
 import {useIsFocused} from '@react-navigation/native';
-import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect} from 'react';
 import {View} from 'react-native';
 import type {ValueOf} from 'type-fest';
 import useAccountLocalDefaultRegion from '@hooks/useAccountLocalDefaultRegion';
@@ -7,6 +7,7 @@ import useLocalize from '@hooks/useLocalize';
 import useNetwork from '@hooks/useNetwork';
 import usePolicy from '@hooks/usePolicy';
 import useThemeStyles from '@hooks/useThemeStyles';
+import usePrevious from '@hooks/usePrevious';
 import * as CurrencyUtils from '@libs/CurrencyUtils';
 import * as DeviceCapabilities from '@libs/DeviceCapabilities';
 import * as MoneyRequestUtils from '@libs/MoneyRequestUtils';
@@ -14,6 +15,7 @@ import Navigation from '@libs/Navigation/Navigation';
 import * as OptionsListUtils from '@libs/OptionsListUtils';
 import * as PolicyUtils from '@libs/PolicyUtils';
 import * as ReceiptUtils from '@libs/ReceiptUtils';
+import * as TagUtils from '@libs/TagUtils';
 import * as TransactionUtils from '@libs/TransactionUtils';
 import type {CustomUnit} from '@src/types/onyx/Policy';
 import type {Unit} from '@src/types/onyx/Tax';
@@ -21,7 +23,6 @@ import type {Unit} from '@src/types/onyx/Tax';
 import type {MoneyRequestConfirmationListProps} from './MoneyRequestConfirmationList/types';
 import MoneyRequestConfirmationListFooter from './MoneyRequestConfirmationListFooter';
 import MoneyRequestConfirmationListHeader from './MoneyRequestConfirmationListHeader';
-import type {TagPickerOption} from './TagPicker';
 
 function MoneyRequestConfirmationList({
     transactionID,
@@ -50,6 +51,7 @@ function MoneyRequestConfirmationList({
     const styles = useThemeStyles();
     const {translate} = useLocalize();
     const {isOffline} = useNetwork();
+    const previousTransactionTag = usePrevious(transactionTag);
 
     const isFocused = useIsFocused();
     const policy = usePolicy(policyID);
@@ -58,6 +60,7 @@ function MoneyRequestConfirmationList({
     const [didConfirm, setDidConfirm] = useState(false);
     const [didInitiatePolicyLoad, setDidInitiatePolicyLoad] = useState(false);
     const [formError, setFormError] = useState('');
+    const [dependentTagOptions, setDependentTagOptions] = useState<Record<string, string[]>>({});
 
     const transaction = useMemo(() => {
         if (!transactionID) {
@@ -73,6 +76,7 @@ function MoneyRequestConfirmationList({
     const isMerchantRequired = policy?.requiresTag;
     const isTagRequired = policy?.requiresTag;
     const isTaxRequired = policy?.tax?.trackingEnabled;
+    const isMultiLevelTags = TagUtils.isMultiLevelTags(policy);
 
     const shouldShowTax = isTaxRequired && !isDistanceRequest;
     const taxRates = policy?.taxRates;
@@ -85,6 +89,40 @@ function MoneyRequestConfirmationList({
         [transaction, policy, policyTagList, policyTags],
     );
 
+    // Fetch dependent tag options when a parent tag is selected
+    useEffect(() => {
+        if (!isMultiLevelTags || !transactionTag) {
+            return;
+        }
+
+        const tagList = policyTagList ?? policyTags;
+        if (!tagList) {
+            return;
+        }
+
+        // For each tag level, check if we need to fetch dependent options
+        const tagLevels = TagUtils.getTagLevels(tagList);
+        if (tagLevels.length <= 1) {
+            return;
+        }
+
+        // Build dependent options map based on selected parent tags
+        const newDependentOptions: Record<string, string[]> = {};
+        
+        for (let i = 1; i < tagLevels.length; i++) {
+            const parentTag = transactionTag[tagLevels[i - 1]];
+            if (!parentTag) {
+                continue;
+            }
+            
+            const dependentOptions = TagUtils.getDependentTagOptions(tagList, tagLevels[i - 1], parentTag, tagLevels[i]);
+            if (dependentOptions) {
+                newDependentOptions[tagLevels[i]] = dependentOptions;
+            }
+        }
+
+        setDependentTagOptions(newDependentOptions);
+    }, [isMultiLevelTags, transactionTag, policyTagList, policyTags]);
+
     const defaultMileageRate = defaultMileageRateOptional ?? {};
     const mileageRate = customUnitRateID ? customUnitRates?.[customUnitRateID] : undefined;
     const distanceRate = mileageRate?.rate ?? defaultMileageRate.rate;
@@ -200,6 +238,7 @@ function MoneyRequestConfirmationList({
             isMerchantRequired,
             isTagRequired,
             isTaxRequired,
+            dependentTagOptions,
         });
     }, [
         transaction,
@@ -216,6 +255,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         isTagRequired,
         isTaxRequired,
+        dependentTagOptions,
     ]);
 
     const shouldShowSmartScanFields = useMemo(() => {
@@ -310,6 +350,7 @@ function MoneyRequestConfirmationList({
             isMerchantRequired,
             isTagRequired,
             isTaxRequired,
+            dependentTagOptions,
         });
     }, [
         transaction,
@@ -326,6 +367,7 @@ function MoneyRequestConfirmationList({
         isMerchantRequired,
         isTagRequired,
         isTaxRequired,
+        dependentTagOptions,
     ]);
 
     const navigateToEditRequest = useCallback(
--- a/src/components/MoneyRequestConfirmationListFooter.tsx
+++ b/src/components/MoneyRequestConfirmationListFooter.tsx
@@ -1,4 +1,4 @@
-import React, {useMemo} from 'react';
+import React, {useMemo, useEffect, useState} from 'react';
 import {View} from 'react-native';
 import useLocalize from '@hooks/useLocalize';
 import useThemeStyles from '@hooks/useThemeStyles';
@@ -7,6 +7,7 @@ import * as CurrencyUtils from '@libs/CurrencyUtils';
 import * as MoneyRequestUtils from '@libs/MoneyRequestUtils';
 import * as OptionsListUtils from '@libs/OptionsListUtils';
 import * as PolicyUtils from '@libs/PolicyUtils';
+import * as TagUtils from '@libs/TagUtils';
 import * as TransactionUtils from '@libs/TransactionUtils';
 import type {CustomUnit} from '@src/types/onyx/Policy';
 import type {Unit} from '@src/types/onyx/Tax