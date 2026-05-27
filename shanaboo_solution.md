```diff
--- a/src/pages/home/ReportScreen.tsx
+++ b/src/pages/home/ReportScreen.tsx
@@ -1,5 +1,5 @@
 import {useIsFocused} from '@react-navigation/native';
-import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {memo, useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect} from 'react';
 import {useOnyx} from 'react-native-onyx';
 import type {OnyxEntry} from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
@@ -123,6 +123,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
     const [isLoadingApp] = useOnyx(ONYXKEYS.IS_LOADING_APP);
     const [isComposerFullScreen] = useOnyx(ONYXKEYS.IS_COMPOSER_FULL_SCREEN);
     const [shouldShowBanner, setShouldShowBanner] = useState(false);
+    const [isReportReadyForScroll, setIsReportReadyForScroll] = useState(false);
 
     const reportIDFromRoute = route.params?.reportID;
     const reportActionIDFromRoute = route.params?.reportActionID;
@@ -131,6 +132,12 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
     const prevReportActionIDFromRoute = usePrevious(reportActionIDFromRoute);
     const prevReportID = usePrevious(reportID);
 
+    useLayoutEffect(() => {
+        if (reportID && !isReportReadyForScroll) {
+            setIsReportReadyForScroll(true);
+        }
+    }, [reportID, isReportReadyForScroll]);
+
     const [modal] = useOnyx(ONYXKEYS.MODAL);
     const isSidebarScreenFocused = useIsFocused();
 
@@ -556,6 +563,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
                                     reportActions={reportActions}
                                     report={report}
                                     reportID={reportID}
+                                    isReportReadyForScroll={isReportReadyForScroll}
                                 />
                             )}
                             <ReportFooter
--- a/src/pages/home/report/ReportActionsView.tsx
+++ b/src/pages/home/report/ReportActionsView.tsx
@@ -1,5 +1,5 @@
 import {isEmpty} from 'lodash';
-import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect} from 'react';
 import {InteractionManager, View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
@@ -53,6 +53,7 @@ type ReportActionsViewProps = {
     report: OnyxEntry<Report>;
     reportActions: ReportActionsArray;
     reportID: string;
+    isReportReadyForScroll?: boolean;
 };
 
 type ReportActionKey = string;
@@ -61,7 +62,7 @@ const emptyArray: ReportActionsArray = [];
 
 const reportActionSizeCache = new Map<ReportActionKey, number>();
 
-function ReportActionsView({reportActions: reportActionsFromProps, report, reportID}: ReportActionsViewProps) {
+function ReportActionsView({reportActions: reportActionsFromProps, report, reportID, isReportReadyForScroll}: ReportActionsViewProps) {
     const reportActions = useMemo(() => {
         if (isEmpty(reportActionsFromProps)) {
             return emptyArray;
@@ -98,6 +99,7 @@ function ReportActionsView({reportActions: reportActionsFromProps, report, report
     const [isLoadingNewerActions, setIsLoadingNewerActions] = useState(false);
     const [isLoadingOlderActions, setIsLoadingOlderActions] = useState(false);
     const [isReadyForCommentLinkScroll, setIsReadyForCommentLinkScroll] = useState(false);
+    const [hasScrolledToTarget, setHasScrolledToTarget] = useState(false);
     const [reportActionID, setReportActionID] = useState(route?.params?.reportActionID);
     const [isReportFullyVisible, setIsReportFullyVisible] = useState(false);
     const [isNewerActionsPageLoading, setIsNewerActionsPageLoading] = useState(false);
@@ -116,6 +118,20 @@ function ReportActionsView({reportActions: reportActionsFromProps, report, report
     const isFirstLinkedActionReportActionID = reportActionID === linkedReportActionID;
     const isReportActionIDLinkedAction = reportActionID === linkedReportActionID;
 
+    useLayoutEffect(() => {
+        if (!isReportReadyForScroll || hasScrolledToTarget) {
+            return;
+        }
+
+        if (linkedReportActionID && reportActions.length > 0) {
+            const linkedAction = reportActions.find((action) => action.reportActionID === linkedReportActionID);
+            if (linkedAction) {
+                setHasScrolledToTarget(true);
+                setIsReadyForCommentLinkScroll(true);
+            }
+        }
+    }, [isReportReadyForScroll, linkedReportActionID, reportActions, hasScrolledToTarget]);
+
     const reportActionIDFromRoute = route?.params?.reportActionID;
     const prevReportActionIDFromRoute = usePrevious(reportActionIDFromRoute);
     const prevLinkedReportActionID = usePrevious(linkedReportActionID);
@@ -196,7 +212,7 @@ function ReportActionsView({reportActions: reportActionsFromProps, report, report
         if (!linkedReportActionID) {
             return;
         }
-        if (isFirstLinkedActionReportActionID) {
+        if (isFirstLinkedActionReportActionID && !hasScrolledToTarget) {
             setIsReadyForCommentLinkScroll(true);
         }
         if (isReportActionIDLinkedAction) {
@@ -204,7 +220,7 @@ function ReportActionsView({reportActions: reportActionsFromProps, report, report
         }
         // We only want to update the state when the component first mounts
         // eslint-disable-next-line react-hooks/exhaustive-deps
-    }, [linkedReportActionID]);
+    }, [linkedReportActionID, hasScrolledToTarget]);
 
     const handleReportActionLink = useCallback(() => {
         if (!reportActionID) {
@@ -222,7 +238,7 @@ function ReportActionsView({reportActions: reportActionsFromProps, report, report
         if (!reportActionID) {
             return;
         }
-        if (isFirstLinkedActionReportActionID) {
+        if (isFirstLinkedActionReportActionID && !hasScrolledToTarget) {
             return;
         }
         if (isReportActionIDLinkedAction) {
@@ -