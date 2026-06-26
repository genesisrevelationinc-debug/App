 ```diff
--- a/src/components/MoneyRequestConfirmationList.tsx
+++ b/src/components/MoneyRequestConfirmationList.tsx
@@ -1,5 +1,5 @@
 import {useNavigation} from '@react-navigation/native';
-import React, {useCallback, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {View} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
@@ -123,6 +123,7 @@ import {
     getTagNames,
     getTagForDisplay,
     getTagList,
+    getTagListName,
     getTagListUrl,
     getTagListTitle,
     getTagPickerID,
@@ -131,6 +132,7 @@ import {
     isMultiLevelTags,
     isTagListRequired,
     isTagRequired,
+    getTagListIndex,
 } from '@libs/TagsOptionsListUtils';
 import {
     convertToDisplayString,
@@ -1022,6 +1024,7 @@ function MoneyRequestConfirmationList({
     const tagList = useMemo(() => getTagList(policy, policyTagList, hasViolations), [policy, policyTagList, hasViolations]);
     const isMultiLevel = isMultiLevelTags(policy, policyTagList);
     const tagPickerID = getTagPickerID(policy, policyTagList);
+    const [selectedTagListIndex, setSelectedTagListIndex] = useState<number | undefined>(undefined);
 
     const shouldShowTag = useMemo(() => {
         if (isReadOnly) {
@@ -1041,6 +1044,30 @@ function MoneyRequestConfirmationList({
         return !isTagInQuickActionFlow && (isTagRequired(policy, policyTagList) || hasMultipleTags);
     }, [isReadOnly, isTypeInvoice, isFromGlobalCreate, iouType, policy, policyTagList, hasMultipleTags, isTagInQuickActionFlow]);
 
+    // Track which tag list was selected to handle dependent tags
+    useEffect(() => {
+        if (selectedTagListIndex === undefined) {
+            return;
+        }
+
+        // Reset the selected tag list index after a short delay to allow re-selection
+        const timeout = setTimeout(() => {
+            setSelectedTagListIndex(undefined);
+        }, 300);
+
+        return () => clearTimeout(timeout);
+    }, [selectedTagListIndex]);
+
+    const handleTagPress = useCallback(
+        (tagListIndex: number, tagListName: string) => {
+            setSelectedTagListIndex(tagListIndex);
+            Navigation.navigate(
+                ROUTES.MONEY_REQUEST_STEP_TAG.getRoute(action, iouType, transactionID, reportID, tagListName, report?.reportID, Navigation.getActiveRouteWithoutParams()),
+            );
+        },
+        [action, iouType, transactionID, reportID, report?.reportID],
+    );
+
     const shouldShowCategories = useMemo(() => {
         if (isReadOnly) {
             return false;
@@ -1688,16 +1715,12 @@ function MoneyRequestConfirmationList({
                         return (
                             <MenuItemWithTopDescription
                                 key={tagListName}
-                                description={translate('common.tag')}
+                                description={getTagListName(tagListIndex, policy, policyTagList) ?? translate('common.tag')}
                                 title={getTagForDisplay(transaction, tagListIndex, tagListName, policy, policyTagList, shouldShowViolations)}
                                 interactive={!isReadOnly}
                                 shouldShowRightIcon={!isReadOnly}
                                 titleNumberOfLines={2}
-                                onPress={() =>
-                                    Navigation.navigate(
-                                        ROUTES.MONEY_REQUEST_STEP_TAG.getRoute(action, iouType, transactionID, reportID, tagListName, report?.reportID, Navigation.getActiveRouteWithoutParams()),
-                                    )
-                                }
+                                onPress={() => handleTagPress(tagListIndex, tagListName)}
                                 brickRoadIndicator={getFieldViolations(tagListName) ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined}
                                 errorText={getFieldViolations(tagListName) ? translate('common.error.pleaseSelectTag') : ''}
                                 rightComponent={
@@ -1720,7 +1743,7 @@ function MoneyRequestConfirmationList({
                         );
                     }
 
-                    if (!isMultiLevel) {
+                    if (!isMultiLevel || selectedTagListIndex === tagListIndex) {
                         return (
                             <MenuItemWithTopDescription
                                 key={tagListName}
@@ -1729,10 +1752,7 @@ function MoneyRequestConfirmationList({
                                 interactive={!isReadOnly}
                                 shouldShowRightIcon={!isReadOnly}
                                 titleNumberOfLines={2}
-                                onPress={() =>
-                                    Navigation.navigate(
-                                        ROUTES.MONEY_REQUEST_STEP_TAG.getRoute(action, iouType, transactionID, reportID, tagListName, report?.reportID, Navigation.getActiveRouteWithoutParams()),
-                                    )
-                                }
+                                onPress={() => handleTagPress(tagListIndex, tagListName)}
                                 brickRoadIndicator={getFieldViolations(tagListName) ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined}
                                 errorText={getFieldViolations(tagListName) ? translate('common.error.pleaseSelectTag') : ''}
                                 rightComponent={
@@ -1755,6 +1775,28 @@ function MoneyRequestConfirmationList({
                         );
                     }
 
+                    // For dependent multi-level tags, check if we should show this tag list
+                    // A tag list should be shown if all previous tag lists have a selection
+                    const shouldShowDependentTagList = (() => {
+                        if (!isMultiLevel) {
+                            return true;
+                        }
+
+                        // Check if all previous tag lists have a selection
+                        for (let i = 0; i < tagListIndex; i++) {
+                            const previousTagListName = tagList.at(i);
+                            if (!previousTagListName) {
+                                return false;
+                            }
+                            const previousTagValue = transaction?.comment?.tags?.[previousTagListName];
+                            if (!previousTagValue) {
+                                return false;
+                            }
+                        }
+
+                        return true;
+                    })();
+
+                    if (shouldShowDependentTagList) {
                         return (
                             <MenuItemWithTopDescription
                                 key={tagListName}
@@ -1762,10 +1804,7 @@ function MoneyRequestConfirmationList({
                                 interactive={!isReadOnly}
                                 shouldShowRightIcon={!isReadOnly}
                                 titleNumberOfLines={2}
-                                onPress={() =>
-                                    Navigation.navigate(
-                                        ROUTES.MONEY_REQUEST_STEP_TAG.getRoute(action, iouType, transactionID, reportID, tagListName, report?.reportID,