Looking at this issue, I need to add collapsable sidebar functionality for the Spend screen on desktop. Let me analyze what's needed:

1. A collapsable sidebar for the Spend tab (desktop only)
2. Default state is expanded
3. Click to collapse, hover to peek/expand temporarily
4. Collapsed sidebar should be 76px wide
5. Section headers become dividers, labels animate out, icons are attached

Since the issue mentions a test PR (#90319) and references the LHN (Left Hand Navigation), I need to find the relevant sidebar components. Based on the file structure and the issue description, I need to look at the sidebar/navigation components.

Let me infer the most likely files that need changes based on common patterns in this repo:

1. The sidebar component for the Spend screen
2. A collapse/expand button component
3. State management for the collapsed state

Given the files shown and the issue, I'll need to create or modify components. Let me look at what I can infer:

- There's likely a sidebar component in `src/components/` or `src/pages/`
- The Spend screen likely has its own navigation/sidebar
- We need state management for the collapsed state

Since I don't have the actual sidebar files shown, I'll need to infer the structure. Based on the issue mentioning "Spend tab" and "LHN", and the reference to `src/components/MoneyRequestReportView/MoneyRequestReportTotalSpend.tsx`, this appears to be in the Expensify App.

Let me create the necessary changes. I'll need to:

1. Create a hook or state for the sidebar collapsed state
2. Modify the sidebar to support collapsing
3. Add a collapse/expand button

Given the constraints and that I need to produce a complete diff, I'll infer the most likely file paths based on the repo structure and create plausible fixes.

```diff
--- a/src/components/Navigation/SpendSidebar.tsx
+++ b/src/components/Navigation/SpendSidebar.tsx
@@ -0,0 +1,156 @@
+import React, {useCallback, useState, useRef} from 'react';
+import {View, Pressable} from 'react-native';
+import Animated, {useAnimatedStyle, withTiming, interpolate, Extrapolation} from 'react-native-reanimated';
+import useThemeStyles from '@hooks/useThemeStyles';
+import Icon from '@components/Icon';
+import * as Expensicons from '@components/Icon/Expensicons';
+import variables from '@styles/variables';
+import useLocalize from '@hooks/useLocalize';
+import Tooltip from '@components/Tooltip';
+
+type SpendSidebarProps = {
+    /** Content to render inside the sidebar */
+    children: React.ReactNode;
+};
+
+const SIDEBAR_EXPANDED_WIDTH = 270;
+const SIDEBAR_COLLAPSED_WIDTH = 76;
+
+function SpendSidebar({children}: SpendSidebarProps) {
+    const styles = useThemeStyles();
+    const {translate} = useLocalize();
+    const [isCollapsed, setIsCollapsed] = useState(false);
+    const [isHovered, setIsHovered] = useState(false);
+    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
+
+    const isTemporarilyExpanded = isCollapsed && isHovered;
+
+    const sidebarAnimatedStyle = useAnimatedStyle(() => {
+        const width = isTemporarilyExpanded
+            ? SIDEBAR_EXPANDED_WIDTH
+            : isCollapsed
+                ? SIDEBAR_COLLAPSED_WIDTH
+                : SIDEBAR_EXPANDED_WIDTH;
+
+        return {
+            width: withTiming(width, {duration: 300}),
+        };
+    }, [isCollapsed, isHovered]);
+
+    const contentOpacityStyle = useAnimatedStyle(() => {
+        const opacity = isTemporarilyExpanded
+            ? withTiming(1, {duration: 200})
+            : isCollapsed
+                ? withTiming(0, {duration: 200})
+                : withTiming(1, {duration: 200});
+
+        return {opacity};
+    }, [isCollapsed, isHovered]);
+
+    const toggleCollapse = useCallback(() => {
+        setIsCollapsed((prev) => !prev);
+    }, []);
+
+    const handleMouseEnter = useCallback(() => {
+        if (hoverTimeoutRef.current) {
+            clearTimeout(hoverTimeoutRef.current);
+            hoverTimeoutRef.current = null;
+        }
+        setIsHovered(true);
+    }, []);
+
+    const handleMouseLeave = useCallback(() => {
+        // Small delay to prevent flickering when moving mouse quickly
+        hoverTimeoutRef.current = setTimeout(() => {
+            setIsHovered(false);
+        }, 100);
+    }, []);
+
+    return (
+        <Animated.View
+            style={[
+                styles.h100,
+                styles.overflowHidden,
+                sidebarAnimatedStyle,
+                isTemporarilyExpanded && styles.absolute,
+                isTemporarilyExpanded && styles.h100,
+                isTemporarilyExpanded && {zIndex: 10},
+            ]}
+            onMouseEnter={handleMouseEnter}
+            onMouseLeave={handleMouseLeave}
+        >
+            <View style={[styles.h100, styles.bgApp, styles.ph2, styles.pv3]}>
+                <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween, styles.mb4, styles.ph2]}>
+                    {!isCollapsed && (
+                        <Animated.View style={contentOpacityStyle}>
+                            {/* Logo or title area */}
+                        </Animated.View>
+                    )}
+                    <Tooltip text={isCollapsed ? translate('common.expand') : translate('common.collapse')}>
+                        <Pressable
+                            onPress={toggleCollapse}
+                            style={[styles.p2, styles.roundedCircle]}
+                            accessibilityLabel={isCollapsed ? translate('common.expand') : translate('common.collapse')}
+                        >
+                            <Icon
+                                src={isCollapsed ? Expensicons.ChevronRight : Expensicons.ChevronLeft}
+                                width={variables.iconSizeSmall}
+                                height={variables.iconSizeSmall}
+                            />
+                        </Pressable>
+                    </Tooltip>
+                </View>
+                <Animated.View style={[styles.flex1, isCollapsed && {opacity: 0, width: 0, height: 0, overflow: 'hidden'}]}>
+                    {!isCollapsed && children}
+                </Animated.View>
+                {isCollapsed && (
+                    <View style={[styles.alignItemsCenter, styles.pt2]}>
+                        {/* Collapsed state - show icons only */}
+                        {React.Children.map(children, (child, index) => {
+                            if (!React.isValidElement(child)) {
+                                return null;
+                            }
+                            // Render simplified version for collapsed state
+                            return (
+                                <View key={index} style={[styles.mb3, styles.alignItemsCenter]}>
+                                    {child.props?.