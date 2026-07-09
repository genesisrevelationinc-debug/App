Based on the issue description, the problem is that when a tax rate is deleted offline, it's not displayed in the workspace default settings page. The expected behavior is that deleted tax rates should still be visible but styled with strike-through.

Let me look at the relevant files to understand the codebase structure and find where tax rates are filtered/displayed.

```diff
--- a/src/pages/workspace/taxes/WorkspaceTaxesPage.tsx
+++ b/src/pages/workspace/taxes/WorkspaceTaxesPage.tsx
@@ -1,6 +1,7 @@
 import React, {useCallback, useMemo, useState} from 'react';
 import {View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
+import type {OnyxEntry} from 'react-native-onyx';
 import Button from '@components/Button';
 import ConfirmModal from '@components/ConfirmModal';
 import HeaderWithBackButton from '@components/HeaderWithBackButton';
@@ -18,6 +19,7 @@ import useThemeStyles from '@hooks/useThemeStyles';
 import {clearTaxRateError, deleteTaxRate, setTaxRateEnabled} from '@libs/actions/TaxRate';
 import {getLatestErrorField} from '@libs/ErrorUtils';
 import Navigation from '@libs/Navigation/Navigation';
+import {isPendingDelete} from '@libs/PolicyUtils';
 import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
 import type {SettingsNavigatorParamList} from '@libs/Navigation/types';
 import {getSortedTaxRates} from '@libs/TaxUtils';
@@ -25,6 +27,7 @@ import CONST from '@src/CONST';
 import ONYXKEYS from '@src/ONYXKEYS';
 import ROUTES from '@src/ROUTES';
 import type SCREENS from '@src/SCREENS';
+import type {PolicyTaxRate} from '@src/types/onyx';
 import type {TaxRate} from '@src/types/onyx/Policy';
 
 type WorkspaceTaxesPageProps = PlatformStackScreenProps<SettingsNavigatorParamList, typeof SCREENS.WORKSPACE.TAXES>;
@@ -32,7 +35,7 @@ type WorkspaceTaxesPageProps = PlatformStackScreenProps<SettingsNavigatorParamLi
 function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
     const styles = useThemeStyles();
     const {translate} = useLocalize();
-    const [taxRates] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_TAX_RATE}${route.params.policyID}`);
+    const [taxRates] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_TAX_RATE}${route.params.policyID}`) as [OnyxEntry<Record<string, PolicyTaxRate>>];
     const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${route.params.policyID}`);
     const [deleteTaxRateID, setDeleteTaxRateID] = useState<string | undefined>();
     const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
@@ -49,7 +52,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
     const taxRatesList = useMemo(() => {
         if (!taxRates) {
             return [];
-        }
+        }
         const sortedTaxRates = getSortedTaxRates(taxRates);
         return sortedTaxRates.map((taxRate) => ({
             ...taxRate,
@@ -57,7 +60,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
             pendingAction: taxRate.pendingAction,
             errors: getLatestErrorField(taxRate, 'name') ?? getLatestErrorField(taxRate, 'taxRate'),
         }));
-    }, [taxRates]);
+    }, [taxRates]);
 
     const foreignTaxDefault = policy?.tax?.foreignTaxDefault;
     const defaultExternalID = policy?.tax?.defaultExternalID;
@@ -65,7 +68,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
     const getDefaultTaxName = useCallback(
         (taxRateID: string) => {
             const taxRate = taxRates?.[taxRateID];
-            if (!taxRate) {
+            if (!taxRate || isPendingDelete(taxRate)) {
                 return '';
             }
             return taxRate.name;
@@ -73,7 +76,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
         [taxRates],
     );
 
-    const defaultTaxName = getDefaultTaxName(defaultExternalID);
+    const defaultTaxName = getDefaultTaxName(defaultExternalID);
 
     const navigateToTaxRate = useCallback(
         (taxRateID: string) => {
@@ -81,7 +84,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
         },
         [route.params.policyID],
     );
-    
+
     const toggleTaxRate = useCallback(
         (taxRate: TaxRate) => {
             setTaxRateEnabled(route.params.policyID, taxRate.keyForList, !taxRate.isDisabled);
@@ -89,7 +92,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
         [route.params.policyID],
     );
 
-    const confirmDeleteTaxRate = useCallback(() => {
+    const confirmDeleteTaxRate = useCallback(() => {
         if (!deleteTaxRateID) {
             return;
         }
@@ -97,7 +100,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
         setDeleteTaxRateID(undefined);
     }, [deleteTaxRateID, route.params.policyID]);
 
-    const promptDeleteTaxRate = useCallback((taxRate: TaxRate) => {
+    const promptDeleteTaxRate = useCallback((taxRate: TaxRate) => {
         setDeleteTaxRateID(taxRate.keyForList);
         setIsDeleteModalVisible(true);
     }, []);
@@ -105,7 +108,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
     const dismissDeleteModal = useCallback(() => {
         setIsDeleteModalVisible(false);
         setDeleteTaxRateID(undefined);
-    }, []);
+    }, []);
 
     return (
         <ScreenWrapper
@@ -113,7 +116,7 @@ function WorkspaceTaxesPage({route}: WorkspaceTaxesPageProps) {
             shouldEnableMaxHeight
             testID={WorkspaceTaxesPage.displayName}
         >
-            <HeaderWithBackButton 
+            <HeaderWithBackButton
                 title={translate('workspace.t