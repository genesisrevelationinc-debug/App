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
@@ -7,6 +7,7 @@ import type {ValueOf} from 'type-fest';
 import useLocalize from '@hooks/useLocalize';
 import useNetwork from '@hooks/useNetwork';
 import useThemeStyles from '@hooks/useThemeStyles';
+import * as CurrencyUtils from '@libs/CurrencyUtils';
 import * as DeviceCapabilities from '@libs/DeviceCapabilities';
 import * as IOUUtils from '@libs/IOUUtils';
 import * as MoneyRequestUtils from '@libs/MoneyRequestUtils';
@@ -14,6 +15,7 @@ import Navigation from '@libs/Navigation/Navigation';
 import * as OptionsListUtils from '@libs/OptionsListUtils';
 import * as PolicyUtils from '@libs/PolicyUtils';
 import * as ReportUtils from '@libs/ReportUtils';
+import * as UserUtils from '@libs/UserUtils';
 import type {ParticipantData} from '@pages/iou/request/step/IOURequestStepConfirmation';
 import type {IOUAction, IOUType} from '@src/CONST';
 import CONST from '@src/CONST';
@@ -21,6 +23,7 @@ import ONYXKEYS from '@src/ONYXKEYS';
 import ROUTES from '@src/ROUTES';
 import type {Route} from '@src/ROUTES';
 import type * as OnyxTypes from '@src/types/onyx';
+import type {Participant} from '@src/types/onyx/IOU';
 import type {PaymentMethod} from '@src/types/onyx/OriginalMessage';
 import type {Receipt} from '@src/types/onyx/Transaction';
 import type {Currency} from '@src/types/onyx/WalletTerms';
@@ -30,6 +33,7 @@ import MenuItem from './MenuItem';
 import MenuItemWithTopDescription from './MenuItemWithTopDescription';
 import type {MoneyRequestConfirmationListFooterProps} from './MoneyRequestConfirmationListFooter';
 import MoneyRequestConfirmationListFooter from './MoneyRequestConfirmationListFooter';
+import PaymentMethodOption from './PaymentMethodOption';
 import type {MoneyRequestConfirmationListItemProps} from './MoneyRequestConfirmationListItem';
 import MoneyRequestConfirmationListItem from './MoneyRequestConfirmationListItem';
 import {usePersonalDetails} from './OnyxProvider';
@@ -37,6 +41,7 @@ import SelectionList from './SelectionList';
 import type {ListItem, SectionListDataType} from './SelectionList/types';
 import UserListItem from './UserListItem';
 
+
 type MoneyRequestConfirmationListProps = {
     /** Callback to inform parent modal of success */
     onConfirm?: (selectedParticipants: ParticipantData[], paymentMethod: PaymentMethod | undefined, payAsBusiness?: boolean) => void;
@@ -130,6 +135,9 @@ type MoneyRequestConfirmationListProps = {
 
     /** Whether the money request is being created from the global create menu */
     isGlobalCreateMenu?: boolean;
+
+    /** Whether to show the pay options (Mark as paid / Pay with wallet) */
+    shouldShowPayOptions?: boolean;
 };
 
 function MoneyRequestConfirmationList(
@@ -162,6 +170,7 @@ function MoneyRequestConfirmationList(
         shouldShowSmartScanFields = true,
         isReadOnly = false,
         isGlobalCreateMenu = false,
+        shouldShowPayOptions = false,
     }: MoneyRequestConfirmationListProps,
     forwardedRef: React.ForwardedRef<View>,
 ) {
@@ -178,6 +187,9 @@ function MoneyRequestConfirmationList(
     const [personalDetails] = usePersonalDetails();
     const personalDetailsList = personalDetails ?? EMPTY_OBJECT;
     const [userWallet] = useOnyx(ONYXKEYS.USER_WALLET);
+    const [walletTerms] = useOnyx(ONYXKEYS.WALLET_TERMS);
+    const [bankAccountList] = useOnyx(ONYXKEYS.BANK_ACCOUNT_LIST);
+    const [fundList] = useOnyx(ONYXKEYS.FUND_LIST);
 
     const isTypeRequest = iouType === CONST.IOU.TYPE.REQUEST;
     const isTypeSplit = iouType === CONST.IOU.TYPE.SPLIT;
@@ -192,6 +204,8 @@ function MoneyRequestConfirmationList(
     const isPolicyExpenseChat = useMemo(() => ReportUtils.isPolicyExpenseChat(ReportUtils.getReport(reportID)), [reportID]);
     const isInvoiceRoom = useMemo(() => ReportUtils.isInvoiceRoom(ReportUtils.getReport(reportID)), [reportID]);
 
+    const isSendMoneyFlow = iouType === CONST.IOU.TYPE.PAY;
+
     const isDistanceRequest = useMemo(() => IOUUtils.isDistanceRequest(iouRequestType), [iouRequestType]);
     const isPerDiemRequest = useMemo(() => IOUUtils.isPerDiemRequest(iouRequestType), [iouRequestType]);
 
@@ -222,6 +236,66 @@ function MoneyRequestConfirmationList(
         return selectedParticipants;
     }, [selectedParticipantsProp, participants]);
 
+    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | undefined>(undefined);
+
+    const hasWallet = useMemo(() => {
+        return !!userWallet?.availableBalance && Number(userWallet.availableBalance) > 0;
+    }, [userWallet]);
+
+    const hasBankAccount = useMemo(() => {
+        return !!bankAccountList && Object.keys(bankAccountList).length > 0;
+    }, [bankAccountList]);
+
+    const hasFund = useMemo(() => {
+        return !!fundList && Object.keys(fundList).length > 0;
+    }, [fundList]);
+
+    const paymentOptions = useMemo(() => {
+        const options: {value: PaymentMethod; label: string; icon: string; disabled?: boolean}[] = [];
+
+        if (isSendMoneyFlow && shouldShowPayOptions) {
+            // Mark as paid option (always available for send money)
+            options.push({
+                value: CONST.IOU.PAYMENT_TYPE.ELSEWHERE,
+                label: translate('iou.markAsPaid'),
+                icon: Expensicons.Cash,
+            });
+
+            // Pay with wallet option
+            if (hasWallet) {
+                options.push({
+                    value: CONST.IOU.PAYMENT_TYPE.EXPENSIFY,
+                    label: translate('iou.payWithWallet'),
+                    icon: Expensicons.ExpensifyApp,
+                });
+            }
+        }
+
+        return options;
+    }, [