```diff
--- a/src/components/MoneyRequestConfirmationList.tsx
+++ b/src/components/MoneyRequestConfirmationList.tsx
@@ -1,5 +1,5 @@
 import {useIsFocused} from '@react-navigation/native';
-import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState, useContext} from 'react';
 import {View} from 'react-native';
 import type {ValueOf} from 'type-fest';
 import {useOnyx} from 'react-native-onyx';
@@ -50,6 +50,7 @@ import type {PaymentMethod} from '@src/types/onyx/PaymentMethod';
 import type {Participant} from '@src/types/onyx/IOU';
 import type {Receipt} from '@src/types/onyx/Transaction';
 import type {SelectedParticipant} from '@src/types/onyx/IOU';
+import {PaymentMethodContext} from '@src/pages/home/report/ReportScreenContext';
 
 type MoneyRequestConfirmationListProps = {
     /** Callback to inform parent modal with current step to be taken  */
@@ -175,6 +176,8 @@ function MoneyRequestConfirmationList(
         [iouType, selectedParticipants, transaction],
     );
 
+    const paymentMethod = useContext(PaymentMethodContext);
+
     const isPolicyExpenseChat = useMemo(() => isPolicyExpenseChatReportUtil(report), [report]);
     const isMoneyRequest = useMemo(() => isMoneyRequestReportUtil(report), [report]);
     const isInvoiceReport = useMemo(() => isInvoiceReportUtil(report), [report]);
@@ -456,7 +459,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -476,7 +479,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -496,7 +499,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -516,7 +519,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -536,7 +539,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -556,7 +559,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -576,7 +579,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -596,7 +599,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -616,7 +619,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -636,7 +639,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -656,7 +659,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -676,7 +679,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -696,7 +699,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -716,7 +719,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -736,7 +739,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -756,7 +759,7 @@ function MoneyRequestConfirmationList(
             return false;
         }
 
-        if (iouType === CONST.IOU.TYPE.PAY) {
+        if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
             return true;
         }
 
@@ -776,7 +779,7 @@