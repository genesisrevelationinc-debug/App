 ```diff
--- a/src/components/Search/SearchList.tsx
+++ b/src/components/Search/SearchList.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState, useContext} from 'react';
 import {View} from 'react-native';
 import type {FlatList as RNFlatList, ListRenderItem, ViewToken} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
@@ -31,6 +31,7 @@ import SearchTableHeader from './SearchTableHeader';
 import type {SearchColumnsHook, SearchListItem, SearchListItemHash, SearchListItemKey, SelectedTransactions, SelectedTransactionInfo} from './types';
 import {isSearchListItemReport, isSearchListItemReportAction, isSearchListItemTransaction, isSearchTransactionItem} from './types';
 import {getSearchListItemKey, getSearchListItemValue, isSelectedOnMobile} from './utils';
+import ViolationsContext from '@components/ViolationsContext';
 
 type SearchListProps = {
     queryJSON: SearchQueryJSON;
@@ -112,6 +113,7 @@ function SearchList(
     const [windowHeight] = useOnyx(ONYXKEYS.WINDOW_HEIGHT, {selector: (val) => val ?? 0});
     const [isSmallScreen] = useOnyx(ONYXKEYS.IS_SMALL_SCREEN_WIDTH);
     const [isSyncingOnyxData] = useOnyx(ONYXKEYS.IS_SYNCING_ONYX_DATA);
+    const {violationsMap} = useContext(ViolationsContext);
 
     const {isOffline} = useNetwork();
     const {isScreenFocused} = useScreenFocus({screenName: SCREENS.SEARCH.CENTRAL_PANE});
@@ -340,6 +342,13 @@ function SearchList(
         [data, selectedTransactions, focusedIndex, canSelectMultiple, toggleTransaction, handleOnRowPress, handleOnCheckboxPress, shouldShowCheckboxes, shouldShowSorting, isSyncingOnyxData],
     );
 
+    // Re-render when violations change to update row indicators dynamically
+    useEffect(() => {
+        if (flatListRef.current) {
+            flatListRef.current.forceUpdate();
+        }
+    }, [violationsMap]);
+
     return (
         <View style={[styles.flex1, !shouldShowYear && styles.overflowHidden]}>
             <View style={[styles.flex1, shouldPreventDefault && styles.cursorDefault]}>
--- /dev/null
+++ b/src/components/ViolationsContext.tsx
@@ -0,0 +1,29 @@
+import React, {createContext, useMemo} from 'react';
+import {useOnyx} from 'react-native-onyx';
+import ONYXKEYS from '@src/ONYXKEYS';
+import type {TransactionViolation} from '@src/types/onyx';
+
+type ViolationsContextType = {
+    violationsMap: Record<string, TransactionViolation[]>;
+};
+
+const ViolationsContext = createContext<ViolationsContextType>({
+    violationsMap: {},
+});
+
+function ViolationsProvider({children}: {children: React.ReactNode}) {
+    const [allViolations] = useOnyx(ONYXKEYS.COLLECTION.TRANSACTION_VIOLATIONS);
+
+    const violationsMap = useMemo(() => {
+        return allViolations ?? {};
+    }, [allViolations]);
+
+    return <ViolationsContext.Provider value={{violationsMap}}>{children}</ViolationsContext.Provider>;
+}
+
+export {ViolationsProvider};
+export default ViolationsContext;
+
+export type {ViolationsContextType};
--- a/src/components/Search/SearchList.tsx
+++ b/src/components/Search/SearchList.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState, useContext} from 'react';
 import {View} from 'react-native';
 import type {FlatList as RNFlatList, ListRenderItem, ViewToken} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
@@ -31,6 +31,7 @@ import SearchTableHeader from './SearchTableHeader';
 import type {SearchColumnsHook, SearchListItem, SearchListItemHash, SearchListItemKey, SelectedTransactions, SelectedTransactionInfo} from './types';
 import {isSearchListItemReport, isSearchListItemReportAction, isSearchListItemTransaction, isSearchTransactionItem} from './types';
 import {getSearchListItemKey, getSearchListItemValue, isSelectedOnMobile} from './utils';
+import ViolationsContext from '@components/ViolationsContext';
 
 type SearchListProps = {
     queryJSON: SearchQueryJSON;
@@ -112,6 +113,7 @@ function SearchList(
     const [windowHeight] = useOnyx(ONYXKEYS.WINDOW_HEIGHT, {selector: (val) => val ?? 0});
     const [isSmallScreen] = useOnyx(ONYXKEYS.IS_SMALL_SCREEN_WIDTH);
     const [isSyncingOnyxData] = useOnyx(ONYXKEYS.IS_SYNCING_ONYX_DATA);
+    const {violationsMap} = useContext(ViolationsContext);
 
     const {isOffline} = useNetwork();
     const {isScreenFocused} = useScreenFocus({screenName: SCREENS.SEARCH.CENTRAL_PANE});
@@ -340,6 +342,13 @@ function SearchList(
         [data, selectedTransactions, focusedIndex, canSelectMultiple, toggleTransaction, handleOnRowPress, handleOnCheckboxPress, shouldShowCheckboxes, shouldShowSorting, isSyncingOnyxData],
     );
 
+    // Re-render when violations change to update row indicators dynamically
+    useEffect(() => {
+        if (flatListRef.current) {
+            flatListRef.current.forceUpdate();
+        }
+    }, [violationsMap]);
+
     return (
         <View style={[styles.flex1, !shouldShowYear && styles.overflowHidden]}>
             <View style={[styles.flex1, shouldPreventDefault && styles.cursorDefault]}>
--- a/src/components/Search/SearchList.tsx
+++ b/src/components/Search/SearchList.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState, useContext} from 'react';
 import {View} from 'react-native';
 import type {FlatList as RNFlatList, ListRenderItem, ViewToken} from 'react-native';
 import {useOnyx} from 'react-native-ony