```diff
--- a/src/components/ReportActionItem/ReportActionItem.tsx
+++ b/src/components/ReportActionItem/ReportActionItem.tsx
@@ -1,5 +1,6 @@
 import React, {useMemo} from 'react';
 import {View} from 'react-native';
+import {useNetwork} from '@react-native-community/netinfo';
 import type {OnyxEntry} from 'react-native-onyx';
 import type {OriginalMessageSource} from '@src/types/onyx/OriginalMessage';
 import type {ReportActionBase, ReportActions} from '@src/types/onyx/ReportAction';
@@ -45,7 +46,6 @@ import type {Transaction} from '@src/types/onyx';
 import type {PaymentMethodType} from '@src/types/onyx/PaymentMethod';
 import type {Receipt} from '@src/types/onyx/Transaction';
 import type {ReportActionItemProps, ReportActionItemPropsProvider} from './types';
-import {useNetwork} from '@react-native-community/netinfo';
 
 type ReportActionItemProps = ReportActionItemProps & {
     /** The id of the report */
@@ -123,7 +123,7 @@ function ReportActionItem({
     const [isLoadingReportData] = useOnyx(ONYXKEYS.IS_LOADING_REPORT_DATA);
     const [isLoadingReportActions] = useOnyx(ONYXKEYS.IS_LOADING_REPORT_ACTIONS);
     const [isComposerFullSize] = useOnyx(ONYXKEYS.IS_COMPOSER_FULL_SIZE);
-    const {isOffline} = useNetwork();
+    const network = useNetwork();
 
     const reportAction = action;
     const originalReportID = ReportUtils.getOriginalReportID(reportID, reportAction);
@@ -456,7 +456,7 @@ function ReportActionItem({
                 <ReportActionItemSingle
                     action={action}
                     report={report}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -466,7 +466,7 @@ function ReportActionItem({
             return (
                 <ReportActionItemSingle
                     action={action}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -476,7 +476,7 @@ function ReportActionItem({
         return (
             <ReportActionItemSingle
                 action={action}
-                isOffline={isOffline}
+                isOffline={network.isOffline}
                 showHeader={!isOnlyReportActionWithReceipt}
             >
                 {content}
@@ -485,7 +485,7 @@ function ReportActionItem({
     }, [
         action,
         report,
-        isOffline,
+        network.isOffline,
         isOnlyReportActionWithReceipt,
         content,
         isReportActionLinked,
@@ -531,7 +531,7 @@ function ReportActionItem({
                 <ReportActionItemSingle
                     action={action}
                     report={report}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -541,7 +541,7 @@ function ReportActionItem({
             return (
                 <ReportActionItemSingle
                     action={action}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -551,7 +551,7 @@ function ReportActionItem({
         return (
             <ReportActionItemSingle
                 action={action}
-                isOffline={isOffline}
+                isOffline={network.isOffline}
                 showHeader={!isOnlyReportActionWithReceipt}
             >
                 {content}
@@ -560,7 +560,7 @@ function ReportActionItem({
     }, [
         action,
         report,
-        isOffline,
+        network.isOffline,
         isOnlyReportActionWithReceipt,
         content,
         isReportActionLinked,
@@ -607,7 +607,7 @@ function ReportActionItem({
                 <ReportActionItemSingle
                     action={action}
                     report={report}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -617,7 +617,7 @@ function ReportActionItem({
             return (
                 <ReportActionItemSingle
                     action={action}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -627,7 +627,7 @@ function ReportActionItem({
         return (
             <ReportActionItemSingle
                 action={action}
-                isOffline={isOffline}
+                isOffline={network.isOffline}
                 showHeader={!isOnlyReportActionWithReceipt}
             >
                 {content}
@@ -636,7 +636,7 @@ function ReportActionItem({
     }, [
         action,
         report,
-        isOffline,
+        network.isOffline,
         isOnlyReportActionWithReceipt,
         content,
         isReportActionLinked,
@@ -683,7 +683,7 @@ function ReportActionItem({
                 <ReportActionItemSingle
                     action={action}
                     report={report}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -693,7 +693,7 @@ function ReportActionItem({
             return (
                 <ReportActionItemSingle
                     action={action}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -703,7 +703,7 @@ function ReportActionItem({
         return (
             <ReportActionItemSingle
                 action={action}
-                isOffline={isOffline}
+                isOffline={network.isOffline}
                 showHeader={!isOnlyReportActionWithReceipt}
             >
                 {content}
@@ -712,7 +712,7 @@ function ReportActionItem({
     }, [
         action,
         report,
-        isOffline,
+        network.isOffline,
         isOnlyReportActionWithReceipt,
         content,
         isReportActionLinked,
@@ -759,7 +759,7 @@ function ReportActionItem({
                 <ReportActionItemSingle
                     action={action}
                     report={report}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -769,7 +769,7 @@ function ReportActionItem({
             return (
                 <ReportActionItemSingle
                     action={action}
-                    isOffline={isOffline}
+                    isOffline={network.isOffline}
                     showHeader={!isOnlyReportActionWithReceipt}
                 >
                     {content}
@@ -779