```diff
--- a/src/components/SelectionList/BaseSelectionList.tsx
+++ b/src/components/SelectionList/BaseSelectionList.tsx
@@ -1,5 +1,5 @@
 import {useFocusEffect} from '@react-navigation/native';
-import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
+import React, {useCallback, useEffect, useMemo, useRef, useState, useContext} from 'react';
 import {View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
@@ -32,6 +32,7 @@ import type {
     SelectionListHandle,
     SelectionListItemType,
 } from './types';
+import {SelectionListContext} from './SelectionListContext';
 
 type BaseSelectionListProps<TItem extends ListItem> = SelectionListProps<TItem> & {
     /** Custom ListItem component to render */
@@ -79,6 +80,7 @@ function BaseSelectionList<TItem extends ListItem>(
     const [flattenedSections, setFlattenedSections] = useState(allSectionsFlattened);
     const [focusedIndex, setFocusedIndex] = useState(() => computeFocusedIndex());
     const [isInitialSectionListRender, setIsInitialSectionListRender] = useState(true);
+    const selectionListContextValue = useContext(SelectionListContext);
 
     const {isSmallScreen} = useWindowDimensions();
     const {isKeyboardVisible} = useKeyboardState();
@@ -558,6 +560,7 @@ function BaseSelectionList<TItem extends ListItem>(
                 onLongPressRow={onLongPressRow}
                 shouldShowCheckBox={shouldShowCheckBox}
                 shouldHighlightSelectedItem={shouldHighlightSelectedItem}
+                isSelected={selectionListContextValue?.isSelected?.(item) ?? item.isSelected}
             />
         );
     };
@@ -660,6 +663,7 @@ function BaseSelectionList<TItem extends ListItem>(
                 onLongPressRow={onLongPressRow}
                 shouldShowCheckBox={shouldShowCheckBox}
                 shouldHighlightSelectedItem={shouldHighlightSelectedItem}
+                isSelected={selectionListContextValue?.isSelected?.(item) ?? item.isSelected}
             />
         );
     };
--- a/src/components/SelectionList/SelectionListContext.tsx
+++ b/src/components/SelectionList/SelectionListContext.tsx
@@ -0,0 +1,15 @@
+import React from 'react';
+import type ListItem from './types';
+
+type SelectionListContextType = {
+    /** Function to determine if an item is selected */
+    isSelected?: (item: ListItem) => boolean;
+};
+
+const SelectionListContext = React.createContext<SelectionListContextType | undefined>(undefined);
+
+export default SelectionListContext;
+export type {SelectionListContextType};
--- a/src/components/SelectionList/SelectionList.tsx
+++ b/src/components/SelectionList/SelectionList.tsx
@@ -1,10 +1,12 @@
 import React, {forwardRef} from 'react';
 import BaseSelectionList from './BaseSelectionList';
+import SelectionListContext from './SelectionListContext';
 import type {BaseSelectionListProps, SelectionListHandle} from './types';
 
 function SelectionList<TItem>({...props}: BaseSelectionListProps<TItem>, ref: React.ForwardedRef<SelectionListHandle>) {
+    const {isSelected, ...restProps} = props;
     return (
-        <BaseSelectionList
+        <SelectionListContext.Provider value={{isSelected}}>
+            <BaseSelectionList
             // eslint-disable-next-line react/jsx-props-no-spreading
-            {...props}
+            {...restProps}
             ref={ref}
         />
+        </SelectionListContext.Provider>
     );
 }
 
 export default forwardRef(SelectionList);
--- a/src/components/SelectionList/types.ts
+++ b/src/components/SelectionList/types.ts
@@ -1,5 +1,6 @@
 import type {ReactNode} from 'react';
 import type {GestureResponderEvent, StyleProp, TextStyle, ViewStyle} from 'react-native';
+import type {SelectionListContextType} from './SelectionListContext';
 
 type ListItem = {
     /** Unique key for the item */
@@ -200,6 +201,9 @@ type SelectionListProps<TItem extends ListItem> = {
 
     /** Whether to highlight the selected item */
     shouldHighlightSelectedItem?: boolean;
+
+    /** Optional function to determine if an item is selected */
+    isSelected?: SelectionListContextType['isSelected'];
 };
 
 type SelectionListHandle = {
--- a/src/components/SelectionList/TableItem.tsx
+++ b/src/components/SelectionList/TableItem.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback} from 'react';
+import React, {useCallback, useContext} from 'react';
 import {View} from 'react-native';
 import type {ListRenderItem} from '@shopify/flash-list';
 import type {ValueOf} from 'type-fest';
@@ -16,6 +16,7 @@ import type {
     TableListItem,
 } from './types';
 import {isSectionList} from './types';
+import SelectionListContext from './SelectionListContext';
 
 type TableItemProps<TItem extends ListItem> = {
     /** Function to render each item */
@@ -58,6 +59,9 @@ function TableItem<TItem extends ListItem>({
     const theme = useTheme();
     const styles = useThemeStyles();
     const StyleUtils = useStyleUtils();
+    const selectionListContextValue = useContext(SelectionListContext);
+
+    const isItemSelected = selectionListContextValue?.isSelected?.(item) ?? item.isSelected;
 
     const onLongPress = useCallback(() => {
         if (!onLongPressRow) {
@@ -78,7 +82,7 @@ function TableItem<TItem extends ListItem>({
             <View
                 style={[
                     styles.selectionListPressableItemWrapper,
-                    item.isSelected && styles.selectionListPressableItemSelected,
+                    isItemSelected && styles.selectionListPressableItemSelected,
                     item.isSelected && shouldHighlightSelectedItem && styles.selectionListPressableItemHighlighted,
                 ]}
             >
@@ -93,7 +97,7 @@ function TableItem<TItem extends ListItem>({
                         <View
                             style={[
                                 styles.selectionListCheckbox,
-                                item.isSelected && styles.selectionListCheckboxSelected,
+                                isItemSelected && styles.selectionListCheckboxSelected,
                             ]}
                         >
                             {item.isSelected && (
--- a/src/components/SelectionList/RadioListItem.tsx
+++ b/src/components/SelectionList/RadioListItem.tsx
@@ -1,4 +1,4 @@
-import React, {useCallback} from 'react';
+import React, {useCallback, useContext} from 'react';
 import {View} from 'react-native';
 import type {ListRenderItem} from '@shopify/flash-list