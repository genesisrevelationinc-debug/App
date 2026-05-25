```diff
--- a/src/components/MoneyRequestReportView/MoneyRequestReportTotalSpend.tsx
+++ b/src/components/MoneyRequestReportView/MoneyRequestReportTotalSpend.tsx
@@ -1,6 +1,6 @@
 import {useIsFocused} from '@react-navigation/native';
 import React from 'react';
-import {View} from 'react-native';
+import {View, StyleSheet} from 'react-native';
 import type {StyleProp, ViewStyle} from 'react-native';
 import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
 import Text from '@components/Text';
@@ -9,6 +9,7 @@
 import useResponsiveLayoutOnWideRHP from '@hooks/useResponsiveLayoutOnWideRHP';
 import useThemeStyles from '@hooks/useThemeStyles';
 import type * as OnyxTypes from '@src/types/onyx';
+import useSidebarCollapsedState from '@hooks/useSidebarCollapsedState';
 
 type MoneyRequestReportTotalSpendProps = {
     /** Report for which the total spend is being displayed */
@@ -39,6 +40,7 @@
     const {shouldUseNarrowLayout} = useResponsiveLayoutOnWideRHP();
     const isFocused = useIsFocused();
     const shouldShowComments = hasComments || isLoadingReportActions;
+    const {isCollapsed} = useSidebarCollapsedState();
 
     const commentContainerStyle = [styles.ph5, styles.justifyContentBetween, styles.mb2];
 
@@ -51,7 +53,7 @@
             >
                 {shouldShowComments ? translate('common.comments') : ''}
             </Animated.Text>
-            {!isEmptyTransactions && (
+            {!isEmptyTransactions && !isCollapsed && (
                 <View style={[styles.dFlex, styles.flexRow, styles.alignItemsCenter, styles.pr3, textContainerStyle, shouldUseNarrowLayout && [styles.justifyContentBetween, styles.w100]]}>
                     <Text style={[styles.mr3, styles.textLabelSupporting]}>{translate('common.total')}</Text>
                     <Text style={[shouldUseNarrowLayout ? styles.mnw64p : styles.mnw100p, styles.textAlignRight, styles.textBold, hasPendingAction && styles.opacitySemiTransparent]}>
@@ -62,4 +64,4 @@
     );
 }
 
-export default MoneyRequestReportTotalSpend;
+export default MoneyRequestReportTotalSpend;
\ No newline at end of file
--- /dev/null
+++ b/src/hooks/useSidebarCollapsedState.ts
@@ -0,0 +1,16 @@
+import {createContext, useContext, useState} from 'react';
+
+type SidebarCollapsedStateContextType = {
+    isCollapsed: boolean;
+    setIsCollapsed: (isCollapsed: boolean) => void;
+};
+
+const SidebarCollapsedStateContext = createContext<SidebarCollapsedStateContextType>({
+    isCollapsed: false,
+    setIsCollapsed: () => {},
+});
+
+export const SidebarCollapsedStateProvider = SidebarCollapsedStateContext.Provider;
+
+export default function useSidebarCollapsedState() {
+    return useContext(SidebarCollapsedStateContext);
+}
--- /dev/null
+++ b/src/components/Sidebar/SidebarCollapsible.tsx
@@ -0,0 +1,108 @@
+import React, {useCallback, useRef, useState} from 'react';
+import {View, Pressable, Animated as RNAnimated} from 'react-native';
+import useThemeStyles from '@hooks/useThemeStyles';
+import useSidebarCollapsedState from '@hooks/useSidebarCollapsedState';
+
+const SIDEBAR_EXPANDED_WIDTH = 270;
+const SIDEBAR_COLLAPSED_WIDTH = 76;
+
+type SidebarCollapsibleProps = {
+    children: React.ReactNode;
+};
+
+function SidebarCollapsible({children}: SidebarCollapsibleProps) {
+    const styles = useThemeStyles();
+    const {isCollapsed, setIsCollapsed} = useSidebarCollapsedState();
+    const [isHovered, setIsHovered] = useState(false);
+    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
+    const animatedWidth = useRef(new RNAnimated.Value(isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH)).current;
+
+    const animateTo = useCallback((width: number) => {
+        RNAnimated.timing(animatedWidth, {
+            toValue: width,
+            duration: 200,
+            useNativeDriver: false,
+        }).start();
+    }, [animatedWidth]);
+
+    const handleMouseEnter = useCallback(() => {
+        if (hoverTimeoutRef.current) {
+            clearTimeout(hoverTimeoutRef.current);
+            hoverTimeoutRef.current = null;
+        }
+        if (isCollapsed) {
+            setIsHovered(true);
+            animateTo(SIDEBAR_EXPANDED_WIDTH);
+        }
+    }, [isCollapsed, animateTo]);
+
+    const handleMouseLeave = useCallback(() => {
+        if (isCollapsed) {
+            hoverTimeoutRef.current = setTimeout(() => {
+                setIsHovered(false);
+                animateTo(SIDEBAR_COLLAPSED_WIDTH);
+            }, 150);
+        }
+    }, [isCollapsed, animateTo]);
+
+    const toggleCollapse = useCallback(() => {
+        const newCollapsed = !isCollapsed;
+        setIsCollapsed(newCollapsed);
+        setIsHovered(false);
+        animateTo(newCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH);
+    }, [isCollapsed, setIsCollapsed, animateTo]);
+
+    return (
+        <View style={styles.flexRow}>
+            <RNAnimated.View
+                style={[
+                    styles.h100,
+                    styles.overflowHidden,
+                    {width: animatedWidth},
+                ]}
+                onMouseEnter={handleMouseEnter}
+                onMouseLeave={handleMouseLeave}
+            >
+                <View style={[styles.h100, styles.flex1, isHovered && isCollapsed && styles.absolute, isHovered && isCollapsed && styles.zIndex10]}>
+                    {children}
+                </View>
+                {isCollapsed && !isHovered && (
+                    <Pressable
+                        onPress={toggleCollapse}
+                        style={[styles.absolute, styles.top0, styles.right0, styles.p2, styles.zIndex5]}
+                        accessibilityLabel="Expand sidebar"
+                    >
+                        <View style={[styles.w8, styles.h8, styles.bgTransparent]} />
+                    </Pressable>
+                )}
+            </RNAnimated.View>
+            {!isCollapsed && (
+                <Pressable
+                    onPress={toggleCollapse}
+                    style={[styles.absolute, styles.top0, styles.right0, styles.p2, styles.zIndex5]}
+                    accessibilityLabel="Collapse sidebar"
+                >
+                    <View style={[styles.w8, styles.h8, styles.bgTransparent]} />
+                </Pressable>
+            )}
+        </View>
