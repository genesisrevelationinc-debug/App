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
@@ -200,6 +200,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
     const [isLoadingApp] = useOnyx(ONYXKEYS.IS_LOADING_APP, {initialValue: true});
     const [isSidebarLoading] = useOnyx(ONYXKEYS.IS_SIDEBAR_LOADED, {initialValue: false});
     const [reportActionsMap] = useOnyx(ONYXKEYS.MAP_ONYX_TO_STORAGE, {initialValue: {}});
+    const [isReportReadyForScroll, setIsReportReadyForScroll] = useState(false);
 
     const reportIDFromRoute = route.params?.reportID ?? '-1';
     const reportActionIDFromRoute = route.params?.reportActionID ?? '-1';
@@ -520,6 +521,13 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         }
     }, [reportActionIDFromRoute, reportIDFromRoute]);
 
+    // Mark report as ready for scroll after initial load
+    useEffect(() => {
+        if (!isReportReadyForScroll && !isLoadingApp && !isSidebarLoading && reportIDFromRoute !== '-1') {
+            setIsReportReadyForScroll(true);
+        }
+    }, [isLoadingApp, isSidebarLoading, reportIDFromRoute, isReportReadyForScroll]);
+
     const fetchReport = useCallback(() => {
         if (!reportIDFromRoute || reportIDFromRoute === '-1') {
             return;
@@ -570,6 +578,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute === '-1') {
             return;
         }
+
         // After loading the app and opening the report, we want to scroll to the linked report action
         // But we only want to do this once, so we use a ref to track if we've already scrolled
         if (hasScrolledToReportAction.current) {
@@ -577,6 +586,11 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         }
         hasScrolledToReportAction.current = true;
 
+        // Wait for report to be ready before attempting scroll
+        if (!isReportReadyForScroll) {
+            return;
+        }
+
         // Find the report action in the list
         const reportAction = reportActions.find((action) => action.reportActionID === reportActionIDFromRoute);
 
@@ -596,7 +610,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
                 reportActionID: reportActionIDFromRoute,
             });
         }
-    }, [reportActionIDFromRoute, reportActions, reportIDFromRoute]);
+    }, [reportActionIDFromRoute, reportActions, reportIDFromRoute, isReportReadyForScroll]);
 
     useEffect(() => {
         scrollToReportAction();
@@ -606,6 +620,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
     useEffect(() => {
         if (prevReportActionIDFromRoute !== reportActionIDFromRoute) {
             hasScrolledToReportAction.current = false;
+            setIsReportReadyForScroll(false);
         }
     }, [prevReportActionIDFromRoute, reportActionIDFromRoute]);
 
@@ -614,6 +629,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
@@ -635,6 +651,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
@@ -656,6 +673,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
@@ -677,6 +695,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
@@ -698,6 +717,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
@@ -719,6 +739,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
@@ -740,6 +761,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
@@ -761,6 +783,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
@@ -782,6 +805,7 @@ function ReportScreen({route, navigation}: ReportScreenProps) {
         if (reportActionIDFromRoute !== '-1') {
             return;
         }
+
         // We only want to update the last read action when the user is actively looking at the report
         if (!isFocused) {
             return;
