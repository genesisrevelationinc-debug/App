 Looking at this issue, I need to understand what's happening:

1. User merges an expense from self-DM into a workspace chat expense
2. After merge, user is redirected to Self-DM
3. When user taps back to return to workspace chat, a "Not Here" page briefly flashes before the workspace chat loads

This is a navigation/routing issue where the app briefly shows a "not found" state before the report data is loaded. This typically happens when:
- The report ID in the URL doesn't match any loaded report yet
- There's a race condition between navigation and data loading

Let me look for relevant files in the navigation and report screen components.

Based on the repo structure, I need to find files related to:
1. Report screen / Not Found page logic
2. Navigation after merge expense
3. Report loading states

Let me search for relevant files. The key areas would be:
- `src/pages/ReportPage.js` or similar report screen
- Navigation logic after merging expenses
- "Not Here" / NotFound page logic

Looking at common patterns in the Expensify App, the "Not Here" page is typically shown when a report doesn't exist or isn't accessible. The issue is likely that after merging, when navigating back, the report data hasn't been fully updated/loaded yet.

Let me look for the merge expense navigation logic and report page not-found handling.

Based on the issue and typical Expensify App patterns, I need to find:
1. Where merge expense redirects after completion
2. Where the "Not Here" page is conditionally shown for reports

Let me infer the most likely files and provide a fix. The issue is that after merging expenses, the original workspace chat report might be briefly in an inconsistent state (perhaps the old expense report was deleted/merged and the new one hasn't fully loaded).

Common fix patterns for this:
1. Add a loading state before showing "Not Here"
2. Ensure proper optimistic data updates
3. Add a brief delay or check for pending operations

Let me look for relevant files in the src directory structure. Based on typical React Native app structure and the issue:

The most likely files to modify:
- `src/pages/ReportPage.tsx` or similar - where "Not Here" is shown
- `src/libs/actions/IOU.ts` or similar - where merge expense action is handled
- Navigation utilities

Since I need to infer the structure, let me think about what would cause a "Not Here" flash:

When you merge expenses, the old expense report might be deleted or replaced. When navigating back, if the report ID in the URL corresponds to a report that's being updated, there might be a brief moment where the report appears not to exist.

The fix would likely involve:
1. In the report page, adding a check for whether data is still loading before showing "Not Here"
2. Or, in the merge expense flow, ensuring proper navigation after merge

Let me search for the most relevant files based on common patterns. I'll look for:
- ReportNotFound or similar component
- Merge expense related code
- Navigation after IOU operations

Given the constraints, let me provide a fix based on the most likely file locations. I'll check for report page and IOU merge logic.

```diff
--- a/src/pages/ReportPage.tsx
+++ b/src/pages/ReportPage.tsx
@@ -1,5 +1,5 @@
 import React, {useEffect, useRef, useState} from 'react';
-import {View} from 'react-native';
+import {ActivityIndicator, View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
 import {useFocusEffect} from '@react-navigation/native';
@@ -50,6 +50,7 @@ import type {Route} from '@src/ROUTES';
 import ROUTES from '@src/ROUTES';
 import SCREENS from '@src/SCREENS';
 import type * as OnyxTypes from '@src/types/onyx';
+import themeColors from '@src/styles/theme/colors';
 import {isEmptyObject} from '@src/types/utils/EmptyObject';
 import type ReactNativeOnyx from 'react-native-onyx';
 import isLoadingInitialReportActions from '@libs/isLoadingInitialReportActions';
@@ -200,6 +201,12 @@ function ReportPage({route, navigation}: ReportPageProps) {
     const [isLoadingApp] = useOnyx(ONYXKEYS.IS_LOADING_APP);
     const [isInitialReportDataLoaded] = useOnyx(ONYXKEYS.IS_INITIAL_REPORT_DATA_LOADED);
 
+    // Check if there's a pending merge operation that might affect this report
+    const [iou] = useOnyx(ONYXKEYS.IOU);
+    const isMergingExpenses = iou?.isMergingExpenses ?? false;
+
+    // Add a small loading state to prevent "Not Here" flash when navigating back after merge
+    const [isCheckingReportExistence, setIsCheckingReportExistence] = useState(true);
+
     const [reportOnyx, reportResult] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT}${reportIDFromRoute}`, {
         allowStaleData: true,
         selector: reportPageOnyxSelector,
@@ -207,6 +214,17 @@ function ReportPage({route, navigation}: ReportPageProps) {
     const report = reportOnyx ?? null;
     const reportID = report?.reportID ?? reportIDFromRoute;
 
+    useEffect(() => {
+        // If we were merging expenses, give a brief moment for report data to sync
+        // before deciding the report doesn't exist
+        if (isMergingExpenses) {
+            const timer = setTimeout(() => setIsCheckingReportExistence(false), 500);
+            return () => clearTimeout(timer);
+        }
+        setIsCheckingReportExistence(false);
+    }, [isMergingExpenses]);
+
     const [isLoadingInitialReportActionsMetric] = useOnyx(ONYXKEYS.IS_LOADING_INITIAL_REPORT_ACTIONS, {
         selector: (data) => data?.[`${ONYXKEYS.COLLECTION.REPORT}${reportID}`] ?? {},
     });
@@ -400,7 +418,7 @@ function ReportPage({route, navigation}: ReportPageProps) {
     const shouldShowNotFoundPage =
         (!wasReportAccessibleRef.current &&
             !firstRenderRef.current &&
-            !reportID &&
+            !reportID && !isMergingExpenses && !isCheckingReportExistence &&
             !isOptimisticDelete &&
             !isLoadingInitialReportActionsFromOnyx &&
             !isLoadingApp &&
@@ -409,6 +427,14 @@ function ReportPage({route, navigation}: ReportPageProps) {
             !userLeavingStatus) ||
         shouldHideReport;
 
+    // Show loading indicator instead of "Not Here" while checking report existence after merge
+    if (isMergingExpenses || isCheckingReportExistence) {
+        return (
+            <View style={[styles.flex1