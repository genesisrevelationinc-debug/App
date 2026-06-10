 ```diff
--- a/src/libs/Navigation/Navigation.ts
+++ b/src/libs/Navigation/Navigation.ts
@@ -1,6 +1,7 @@
 import {findFocusedRoute, getStateFromPath} from '@react-navigation/native';
 import type {EventArg, NavigationContainerEventMap} from '@react-navigation/native';
 import {findLastIndex} from 'lodash';
+import type {MutableRefObject} from 'react';
 import {InteractionManager, Linking} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
@@ -38,6 +39,9 @@ let shouldPopAllStateOnUP = false;
 let cleanUpStateCallback: (() => void) | undefined;
 let currentRoute: NavigationStateRoute | undefined;
 
+// Track pending navigation actions to prevent race conditions
+const pendingNavigationActions: MutableRefObject<Set<string>> = {current: new Set()};
+
 function setShouldPopAllStateOnUP(value: boolean) {
     shouldPopAllStateOnUP = value;
 }
@@ -337,6 +341,12 @@ function navigateToReportWithPolicyCheck(
     // If the report is not a thread, check if the report still exists in the user's policy
     const reportBelongsToDifferentWorkspace = !isThread && report?.policyID && report.policyID !== policyID;
 
+    // Prevent duplicate navigation to the same report to avoid "Not Here" flash
+    const navigationKey = `report_${reportID}`;
+    if (pendingNavigationActions.current.has(navigationKey)) {
+        return;
+    }
+
     if (reportBelongsToDifferentWorkspace) {
         // If the report does not belong to the same workspace, navigate to the report without the policy check
         // This is to prevent the user from getting stuck in a loop when the report does not exist in the current workspace
@@ -345,6 +355,8 @@ function navigateToReportWithPolicyCheck(
             reportID,
             reportActionID,
         });
+        pendingNavigationActions.current.add(navigationKey);
+        setTimeout(() => pendingNavigationActions.current.delete(navigationKey), 500);
         return;
     }
 
@@ -355,6 +367,8 @@ function navigateToReportWithPolicyCheck(
         reportID,
         reportActionID,
     });
+    pendingNavigationActions.current.add(navigationKey);
+    setTimeout(() => pendingNavigationActions.current.delete(navigationKey), 500);
 }
 
 /**
@@ -383,6 +397,12 @@ function goBackToWorkspaceChat(policyID: string, shouldPopToTop = false, shouldNa
         return;
     }
 
+    // Prevent duplicate navigation to the same workspace chat
+    const navigationKey = `workspace_chat_${policyID}`;
+    if (pendingNavigationActions.current.has(navigationKey)) {
+        return;
+    }
+
     const workspaceChatReportID = getWorkspaceChatReportID(policyID);
 
     if (!workspaceChatReportID) {
@@ -395,6 +415,9 @@ function goBackToWorkspaceChat(policyID: string, shouldPopToTop = false, shouldNa
         reportID: workspaceChatReportID,
         shouldNavigateToReportAction,
     });
+
+    pendingNavigationActions.current.add(navigationKey);
+    setTimeout(() => pendingNavigationActions.current.delete(navigationKey), 500);
 }
 
 /**
@@ -414,6 +437,12 @@ function goBackToHome(shouldNavigateToReportAction = false) {
         return;
     }
 
+    // Prevent duplicate navigation to home
+    const navigationKey = 'home';
+    if (pendingNavigationActions.current.has(navigationKey)) {
+        return;
+    }
+
     const isSmallScreenWidth = getIsSmallScreenWidth();
     const lastAccessedReportID = getLastAccessedReportID();
 
@@ -423,6 +452,9 @@ function goBackToHome(shouldNavigateToReportAction = false) {
             reportID: lastAccessedReportID,
             shouldNavigateToReportAction,
         });
+
+        pendingNavigationActions.current.add(navigationKey);
+        setTimeout(() => pendingNavigationActions.current.delete(navigationKey), 500);
         return;
     }
 
@@ -431,6 +463,9 @@ function goBackToHome(shouldNavigateToReportAction = false) {
         reportID: lastAccessedReportID,
         shouldNavigateToReportAction,
     });
+
+    pendingNavigationActions.current.add(navigationKey);
+    setTimeout(() => pendingNavigationActions.current.delete(navigationKey), 500);
 }
 
 /**
@@ -449,6 +484,12 @@ function goBackToWorkspaceRoot(navigation: Navigation, policyID: string) {
         return;
     }
 
+    // Prevent duplicate navigation to workspace root
+    const navigationKey = `workspace_root_${policyID}`;
+    if (pendingNavigationActions.current.has(navigationKey)) {
+        return;
+    }
+
     const isSmallScreenWidth = getIsSmallScreenWidth();
 
     if (isSmallScreenWidth) {
@@ -456,6 +497,9 @@ function goBackToWorkspaceRoot(navigation: Navigation, policyID: string) {
         return;
     }
 
+    pendingNavigationActions.current.add(navigationKey);
+    setTimeout(() => pendingNavigationActions.current.delete(navigationKey), 500);
+
     navigation.navigate(ROUTES.WORKSPACE_ROOT.getRoute(policyID));
 }
 
@@ -476,6 +520,12 @@ function goBackToWorkspaceMemberRoute(policyID: string) {
         return;
     }
 
+    // Prevent duplicate navigation to workspace member route
+    const navigationKey = `workspace_member_${policyID}`;
+    if (pendingNavigationActions.current.has(navigationKey)) {
+        return;
+    }
+
     const isSmallScreenWidth = getIsSmallScreenWidth();
 
     if (isSmallScreenWidth) {
@@ -483,6 +533,9 @@ function goBackToWorkspaceMemberRoute(policyID: string) {
         return;
     }
 
+    pendingNavigationActions.current.add(navigationKey);
+    setTimeout(() => pendingNavigationActions.current.delete(navigationKey), 500);
+
     navigate(ROUTES.WORKSPACE_MEMBERS.getRoute(policyID));
 }
 
@@ -502,6 +555,12 @@ function goBackFromWorkspaceCentralScreen(policyID: string, backTo: string) {
         return;
     }
 
+    // Prevent duplicate navigation from workspace central screen
+    const navigationKey = `workspace_central_${policyID}_${backTo}`;
+    if (pendingNavigationActions.current.has(navigationKey)) {
+        return;
+    }
+
     const isSmallScreenWidth = getIsSmallScreenWidth();
 
     if (isSmallScreenWidth) {
@@ -509,6 +568,9 @@ function goBackFromWorkspaceCentralScreen(policyID: string, backTo: string) {
         return;
     }
 
+    pendingNavigationActions.current.add(navigationKey);
+    setTimeout(() => pendingNavigationActions.current.delete(navigationKey