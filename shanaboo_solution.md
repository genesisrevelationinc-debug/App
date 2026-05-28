```diff
--- a/src/pages/settings/Wallet/WalletPage/WalletPage.tsx
+++ b/src/pages/settings/Wallet/WalletPage/WalletPage.tsx
@@ -1,5 +1,5 @@
 import type {RouteProp} from '@react-navigation/native';
-import {useRoute} from '@react-navigation/native';
+import {useNavigation, useRoute} from '@react-navigation/native';
 import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {ActivityIndicator, InteractionManager, View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
@@ -7,6 +7,7 @@ import type {ValueOf} from 'type-fest';
 import HeaderWithBackButton from '@components/HeaderWithBackButton';
 import * as Expensicons from '@components/Icon/Expensicons';
 import MenuItem from '@components/MenuItem';
+import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
 import ScreenWrapper from '@components/ScreenWrapper';
 import ScrollView from '@components/ScrollView';
 import Text from '@components/Text';
@@ -15,6 +16,7 @@ import useLocalize from '@hooks/useLocalize';
 import useNetwork from '@hooks/useNetwork';
 import useTheme from '@hooks/useTheme';
 import useThemeStyles from '@hooks/useThemeStyles';
+import useWindowDimensions from '@hooks/useWindowDimensions';
 import * as CardUtils from '@libs/CardUtils';
 import * as CurrencyUtils from '@libs/CurrencyUtils';
 import getPaymentMethods from '@libs/getPaymentMethods';
@@ -24,6 +26,7 @@ import * as PersonalDetailsUtils from '@libs/PersonalDetailsUtils';
 import * as PolicyUtils from '@libs/PolicyUtils';
 import * as ValidationUtils from '@libs/ValidationUtils';
 import type {SettingsNavigatorParamList} from '@navigation/types';
+import type {StackNavigationProp} from '@react-navigation/stack';
 import * as BankAccounts from '@userActions/BankAccounts';
 import * as MemberActions from '@userActions/Member';
 import * as PaymentMethods from '@userActions/PaymentMethods';
@@ -33,6 +36,7 @@ import CONST from '@src/CONST';
 import ONYXKEYS from '@src/ONYXKEYS';
 import ROUTES from '@src/ROUTES';
 import type SCREENS from '@src/SCREENS';
+import type {Policy} from '@src/types/onyx';
 import {isEmptyObject} from '@src/types/utils/emptyObject';
 import type {PaymentMethod} from '@src/types/onyx/PaymentMethods';
 import type {AnchorPosition} from '@src/types/onyx/Policy';
@@ -41,6 +45,7 @@ import AddPaymentMethodMenu from './AddPaymentMethodMenu';
 import KYCWall from './KYCWall';
 import PaymentMethodList from './PaymentMethodList';
 import WalletEmptyState from './WalletEmptyState';
+import {getPolicyMembers} from '@libs/PolicyUtils';
 
 type WalletPageOnyxProps = {
     /** Whether the user is in the wallet flow */
@@ -73,6 +78,7 @@ function WalletPage({walletOnfidoData, userWallet, bankAccountList = {}, isNotFo
     const theme = useTheme();
     const styles = useThemeStyles();
     const {translate} = useLocalize();
+    const {isSmallScreenWidth} = useWindowDimensions();
     const [isLoading, setIsLoading] = useState(false);
     const [showAddPaymentMenu, setShowAddPaymentMenu] = useState(false);
     const [showAddBankAccountMenu, setShowAddBankAccountMenu] = useState(false);
@@ -91,6 +97,9 @@ function WalletPage({walletOnfidoData, userWallet, bankAccountList = {}, isNotFo
     const [account] = useOnyx(ONYXKEYS.ACCOUNT);
     const [isUserValidated] = useOnyx(ONYXKEYS.USER, {selector: (user) => !!user?.validated});
     const [policies] = useOnyx(ONYXKEYS.COLLECTION.POLICY);
+    const [allPolicyMembers] = useOnyx(ONYXKEYS.COLLECTION.POLICY_MEMBERS);
+    const [session] = useOnyx(ONYXKEYS.SESSION);
+    const currentUserEmail = session?.email ?? '';
 
     const isLoadingCurrency = isLoadingApp ?? false;
 
@@ -118,6 +127,24 @@ function WalletPage({walletOnfidoData, userWallet, bankAccountList = {}, isNotFo
         return Object.values(policies ?? {}).filter((policy): policy is NonNullable<typeof policy> => PolicyUtils.isPolicyAdmin(policy) && !!policy?.reimbursementChoice);
     }, [policies]);
 
+    const hasWorkspaceMembers = useMemo(() => {
+        if (!policies) {
+            return false;
+        }
+        
+        for (const policy of Object.values(policies)) {
+            if (!policy) continue;
+            const policyMembers = getPolicyMembers(policy.id, allPolicyMembers);
+            const hasOtherMembers = Object.values(policyMembers).some(
+                (member) => member?.email && member.email !== currentUserEmail
+            );
+            if (hasOtherMembers) {
+                return true;
+            }
+        }
+        return false;
+    }, [policies, allPolicyMembers, currentUserEmail]);
+
     const paymentMethodOptions: PaymentMethodOption[] = useMemo(() => {
         const options: PaymentMethodOption[] = [];
 
@@ -145,7 +172,7 @@ function WalletPage({walletOnfidoData, userWallet, bankAccountList = {}, isNotFo
                 icon: Expensicons.Bank,
                 onSelected: () => {
                     if (isActingAsDelegate) {
-                        MemberActions.handleShareBusinessBankAccount();
+                        MemberActions.handleShareBusinessBankAccount(hasWorkspaceMembers);
                         return;
                     }
                     setShouldShowShareBusinessBankAccountModal(true);
@@ -157,7 +184,7 @@ function WalletPage({walletOnfidoData, userWallet, bankAccountList = {}, isNotFo
         }
 
         return options;
-    }, [translate, isActingAsDelegate, shouldShowShareBusinessBankAccountModal]);
+    }, [translate, isActingAsDelegate, shouldShowShareBusinessBankAccountModal, hasWorkspaceMembers]);
 
     const getSelectedPaymentMethodAccountType = useCallback(() => {
         if (paymentMethodSelected?.icon === Expensicons.Bank) {
@@ -310,7 +337,7 @@ function WalletPage({walletOnfidoData, userWallet, bankAccountList = {}, isNotFo
                         shouldShowShareModal={shouldShowShareBusinessBankAccountModal}
                         onCloseShareModal={() => setShouldShowShareBusinessBankAccountModal(false)}
                         onShareButtonPress={() => {
-                            MemberActions.handleShareBusinessBankAccount();
+                            MemberActions.handleShareBusinessBankAccount(has