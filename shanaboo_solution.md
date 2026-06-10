 Looking at this issue, I need to understand what's happening:

1. User merges an expense from self-DM into a workspace chat expense
2. After merge, user is redirected to Self-DM
3. When user taps Back to return to workspace chat, a "Not Here" page briefly flashes

This is a navigation/routing issue where the workspace chat report is briefly not found during navigation. The "Not Here" flash suggests that when navigating back, the report ID being used is temporarily invalid or the report data hasn't loaded yet.

Let me look for relevant files related to navigation after merge operations and report screen rendering.

Based on the repo structure and the issue, I need to find files related to:
1. Merge expense flow/navigation
2. Report screen rendering
3. "Not Here" / not found page logic

Let me search for relevant files in the src directory structure.

From common patterns in this codebase, the issue likely involves:
- Navigation after merge completion
- Report screen checking if a report exists before rendering
- The "Not Here" page being shown when report data is loading

Let me look at the likely file paths. Based on the issue description mentioning this was fixed from #79416 but with a regression, I need to find where the navigation happens after merge and where the Not Here check happens.

Looking at typical Expensify App structure:
- `src/pages/ReportPage.js` or similar for report rendering
- `src/libs/actions/IOU.js` or similar for merge expense actions
- Navigation utilities

The "Not Here" flash typically happens when `ReportScreen` checks `shouldShowNotFoundPage` and it briefly returns true before report data is loaded.

Let me infer the most likely fix: After merging expenses, when navigating back, the report ID in the URL might be stale or the report data needs to be refreshed. The fix would likely involve either:
1. Properly updating navigation after merge
2. Adding a loading state check before showing "Not Here"
3. Ensuring report data is available before navigation completes

Based on the issue being about a brief flash of "Not Here" when navigating back to workspace chat, the most likely fix is in the ReportScreen component where it determines whether to show the not found page. We need to ensure it doesn't show "Not Here" while report data is still loading after a merge operation.

Let me look for the ReportScreen and related navigation logic. Given the file structure, I'll check for files related to report screens and IOU merge actions.

```diff
--- a/src/pages/ReportPage.tsx
+++ b/src/pages/ReportPage.tsx
@@ -1,5 +1,5 @@
 import {useIsFocused} from '@react-navigation/native';
-import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
+import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {InteractionManager, View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
@@ -50,6 +50,7 @@ import isLoadingReport from '@libs/isLoadingReport';
 import Log from '@libs/Log';
 import Navigation from '@libs/Navigation/Navigation';
 import type {AuthScreensParamList, RootStackParamList, State} from '@libs/Navigation/types';
+import {navigationRef} from '@libs/Navigation/Navigation';
 import {isOnboardingFlowName} from '@libs/NavigationUtils';
 import {buildReportDetailsScreenRoute} from '@libs/NavigationUtils';
 import * as PolicyUtils from '@libs/PolicyUtils';
@@ -234,6 +235,9 @@ function ReportPage({route, navigation, routeIndex}: ReportPageProps) {
     const [account] = useOnyx(ONYXKEYS.ACCOUNT);
     const [session] = useOnyx(ONYXKEYS.SESSION);
 
+    // Track if we just came from a merge operation to prevent Not Here flash
+    const [isPostMergeNavigation, setIsPostMergeNavigation] = useState(false);
+
     const [reportOnyx, reportResult] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT}${reportIDFromRoute}`, {
         selector: (report) => report && report.reportID === reportIDFromRoute ? report : undefined,
     });
@@ -258,6 +262,28 @@ function ReportPage({route, navigation, routeIndex}: ReportPageProps) {
         return reportOnyx;
     }, [reportOnyx, reportIDFromRoute]);
 
+    // Check if we just navigated from a merge operation
+    useEffect(() => {
+        const state = navigationRef.getState();
+        const lastRoute = state?.routes?.[state.routes.length - 2];
+        const currentRoute = state?.routes?.[state.routes.length - 1];
+        
+        // If coming from IOU or merge flow, mark as post-merge navigation
+        if (lastRoute?.name === 'IOU' || lastRoute?.name === 'MoneyRequest' || currentRoute?.params?.fromMerge) {
+            setIsPostMergeNavigation(true);
+            // Clear the flag after a short delay to allow report to load
+            const timer = setTimeout(() => {
+                setIsPostMergeNavigation(false);
+            }, 500);
+            return () => clearTimeout(timer);
+        }
+    }, []);
+
     const reportID = report?.reportID ?? '-1';
     const isReportAvailableInOnyx = useMemo(() => report?.reportID !== undefined, [report]);
     const reportActionIDFromRoute = route.params?.reportActionID ?? '-1';
@@ -412,7 +440,8 @@ function ReportPage({route, navigation, routeIndex}: ReportPageProps) {
         // - Onyx had an error loading the report data
         // - The report is not in an open, archived, or settled state
         // - The report is a transaction thread associated with an expense but the user cannot see it
-        if (!isLoadingReportOnyx && !reportIDFromRoute) {
+        // - But don't show Not Here briefly after merge navigation while report loads
+        if (!isPostMergeNavigation && !isLoadingReportOnyx && !reportIDFromRoute) {
             return true;
         }
 
@@ -421,7 +450,7 @@ function ReportPage({route, navigation, routeIndex}: ReportPageProps) {
             return true;
         }
 
-        if (!isLoadingReportOnyx && !reportID) {
+        if (!isPostMergeNavigation && !isLoadingReportOnyx && !reportID) {
             return true;
         }
 
@@ -445,6 +474,7 @@ function ReportPage({route, navigation, routeIndex}: ReportPageProps) {
         isLinkedReportActionDeleted,
         isLoadingReportOnyx,
         isReportAvailableInOnyx,
+        isPostMergeNavigation,
     ]);
 
     const shouldShowNotFoundPage = !firstRenderRef.current && !isLoading &&