 ```diff
--- a/src/libs/Navigation/Navigation.ts
+++ b/src/libs/Navigation/Navigation.ts
@@ -1,5 +1,6 @@
 import {findFocusedRoute, getStateFromPath} from '@react-navigation/native';
 import type {EventArg, NavigationContainerEventMap, NavigationState, PartialState, StackNavigationState} from '@react-navigation/native';
+import type {RootStackParamList} from '@navigation/types';
 import {findLastIndex} from 'lodash';
 import {getReportActionHtml} from '@libs/ReportActionsUtils';
 import {shouldUseNarrowLayout} from '@libs/Environment/Environment';
@@ -20,7 +21,6 @@ import type {
     NavigationRoot,
     RootStackParamList,
     StackNavigationAction,
-    NavigationStateRoute,
 } from './types';
 import SCREENS from './SCREENS';
 import type {Route} from './types';
@@ -28,6 +28,7 @@ import type {Route} from './types';
 type GoBackAction = StackNavigationAction | NavigationAction;
 
 type NavigationActionHandler = (action: NavigationAction, state: NavigationState<RootStackParamList>) => NavigationState<RootStackParamList> | undefined;
+type NavigationStateRoute = NavigationState<RootStackParamList>['routes'][number];
 
 // The flag is used to check if we are in the process of navigating. If we are, we should not go back.
 let isNavigating = false;
@@ -35,6 +36,9 @@ let isNavigating = false;
 // The flag is used to check if we should reset the navigation state. If we should, we should not go back.
 let shouldResetNavigationState = false;
 
+// The flag is used to prevent showing "Not Here" page during navigation transitions
+let isTransitioning = false;
+
 // This flag is used to prevent infinite loops in the goBack function. If we are already going back, we should not go back again.
 let isGoingBack = false;
 
@@ -42,6 +46,14 @@ let isGoingBack = false;
 let isNavigationStateSaved = false;
 let onBeforeRemoveListener: (() => void) | null = null;
 
+export function getIsTransitioning(): boolean {
+    return isTransitioning;
+}
+
+export function setIsTransitioning(value: boolean): void {
+    isTransitioning = value;
+}
+
 function setShouldResetNavigationState(value: boolean) {
     shouldResetNavigationState = value;
 }
@@ -50,6 +62,10 @@ function getShouldResetNavigationState(): boolean {
     return shouldResetNavigationState;
 }
 
+function getIsNavigating(): boolean {
+    return isNavigating;
+}
+
 function canGoBack(): boolean {
     const navigation = navigationRef.current;
     if (!navigation) {
@@ -58,10 +74,6 @@ function canGoBack(): boolean {
     return navigation.canGoBack();
 }
 
-function getIsNavigating(): boolean {
-    return isNavigating;
-}
-
 function setIsNavigating(value: boolean) {
     isNavigating = value;
 }
@@ -70,6 +82,10 @@ function getIsGoingBack(): boolean {
     return isGoingBack;
 }
 
+function setIsGoingBack(value: boolean): void {
+    isGoingBack = value;
+}
+
 function getActiveRouteIndex(state: NavigationState<RootStackParamList>, index: number): number {
     const currentState = state.routes.at(index);
     if (!currentState) {
@@ -82,10 +98,6 @@ function getActiveRouteIndex(state: NavigationState<RootStackParamList>, index:
     return getActiveRouteIndex(currentState.state, currentState.state.index);
 }
 
-function setIsGoingBack(value: boolean) {
-    isGoingBack = value;
-}
-
 function getActiveRouteWithoutParams(state: NavigationState<RootStackParamList> | NavigationStateRoute | PartialState<NavigationState<RootStackParamList>> | undefined): string {
     if (!state) {
         return '';
@@ -97,7 +109,7 @@ function getActiveRouteWithoutParams(state: NavigationState<RootStackParamList> |
     return getActiveRouteWithoutParams(currentState.state);
 }
 
-function getTopmostReportId(state: NavigationState<RootStackParamList> | undefined): string | undefined {
+function getTopmostReportId(state: NavigationState<RootStackParamList> | undefined): string | undefined {
     if (!state) {
         return undefined;
     }
@@ -109,7 +121,7 @@ function getTopmostReportId(state: NavigationState<RootStackParamList> | undefin
     return getTopmostReportId(currentState.state);
 }
 
-function getTopmostReportActionId(state: NavigationState<RootStackParamList> | undefined): string | undefined {
+function getTopmostReportActionId(state: NavigationState<RootStackParamList> | undefined): string | undefined {
     if (!state) {
         return undefined;
     }
@@ -121,7 +133,7 @@ function getTopmostReportActionId(state: NavigationState<RootStackParamList> | u
     return getTopmostReportActionId(currentState.state);
 }
 
-function getTopmostTransactionId(state: NavigationState<RootStackParamList> | undefined): string | undefined {
+function getTopmostTransactionId(state: NavigationState<RootStackParamList> | undefined): string | undefined {
     if (!state) {
         return undefined;
     }
@@ -133,7 +145,7 @@ function getTopmostTransactionId(state: NavigationState<RootStackParamList> | und
     return getTopmostTransactionId(currentState.state);
 }
 
-function getTopmostWorkspaceId(state: NavigationState<RootStackParamList> | undefined): string | undefined {
+function getTopmostWorkspaceId(state: NavigationState<RootStackParamList> | undefined): string | undefined {
     if (!state) {
         return undefined;
     }
@@ -145,7 +157,7 @@ function getTopmostWorkspaceId(state: NavigationState<RootStackParamList> | unde
     return getTopmostWorkspaceId(currentState.state);
 }
 
-function getTopmostSearchQuery(state: NavigationState<RootStackParamList> | undefined): string | undefined {
+function getTopmostSearchQuery(state: NavigationState<RootStackParamList> | undefined): string | undefined {
     if (!state) {
         return undefined;
     }
@@ -157,7 +169,7 @@ function getTopmostSearchQuery(state: NavigationState<RootStackParamList> | unde
     return getTopmostSearchQuery(currentState.state);
 }
 
-function getTopmostSearchQueryObject(state: NavigationState<RootStackParamList> | undefined): Record<string, string> | undefined {
+function getTopmostSearchQueryObject(state: NavigationState<RootStackParamList> | undefined): Record<string, string> | undefined {
     if (!state) {
         return undefined;
     }
@@ -169,7 +181,7 @@ function getTopmostSearchQueryObject(state: NavigationState<Root