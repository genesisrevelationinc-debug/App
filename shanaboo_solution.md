```diff
--- a/src/pages/workspace/WorkspacesListPage.tsx
+++ b/src/pages/workspace/WorkspacesListPage.tsx
@@ -1,5 +1,5 @@
 import {useIsFocused} from '@react-navigation/native';
-import React, {useCallback, useMemo, useState} from 'react';
+import React, {useCallback, useMemo, useState, useRef} from 'react';
 import {ActivityIndicator, View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
@@ -47,6 +47,8 @@ import type {FullScreenNavigatorParamList} from '@libs/Navigation/types';
 import * as PolicyUtils from '@libs/PolicyUtils';
 import * as ReportUtils from '@libs/ReportUtils';
 import * as Url from '@libs/Url';
+import * as LocalePhoneNumber from '@libs/LocalePhoneNumber';
+import * as PersonalDetailsUtils from '@libs/PersonalDetailsUtils';
 import type {ThemeStyles} from '@styles/index';
 import variables from '@styles/variables';
 import * as App from '@userActions/App';
@@ -63,6 +65,7 @@ import type {PolicySelector} from './types';
 import type {AnchorPosition} from './types';
 import {isEmptyObject} from '@src/types/utils/EmptyObject';
 import type {Policy} from '@src/types/onyx';
+import type {SortOrder} from '@src/types/onyx/SearchResults';
 
 type WorkspaceItem = {
     title: string;
@@ -76,6 +79,11 @@ type WorkspaceItem = {
     isJoinRequestPending?: boolean;
 };
 
+type SortColumn = 'name' | 'owner';
+type SortConfig = {
+    sortBy: SortColumn;
+    sortOrder: SortOrder;
+};
+
 type WorkspacesListPageProps = {
     /** The list of policies the user has access to. */
     policies: PolicySelector[];
@@ -97,6 +105,7 @@ function WorkspacesListPage({policies, isLoading = false, shouldShowEmptyState =
     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
     const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
     const [isPolicyCreationPending, setIsPolicyCreationPending] = useState(false);
+    const [sortConfig, setSortConfig] = useState<SortConfig>({sortBy: 'name', sortOrder: 'asc'});
 
     const {isOffline} = useNetwork();
     const {isSmallScreenWidth, isNarrowScreen} = useResponsiveLayout();
@@ -118,6 +127,8 @@ function WorkspacesListPage({policies, isLoading = false, shouldShowEmptyState =
     const [isActingAsDelegate] = useOnyx(ONYXKEYS.ACCOUNT, {selector: (account) => account?.delegatedAccess?.delegate});
     const [isActingAsDelegateForWorkspace] = useOnyx(ONYXKEYS.ACCOUNT, {selector: (account) => account?.delegatedAccess?.workspace});
 
+    const prevSortOrder = useRef<SortOrder>('asc');
+
     const isActingAsDelegateForWorkspaceRef = useRef(isActingAsDelegateForWorkspace);
     isActingAsDelegateForWorkspaceRef.current = isActingAsDelegateForWorkspace;
 
@@ -167,6 +178,56 @@ function WorkspacesListPage({policies, isLoading = false, shouldShowEmptyState =
         [policies, isOffline, isNarrowScreen, getPolicyBrickRoadIndicator, getMenuItem, theme, styles],
     );
 
+    const sortedWorkspaceItems = useMemo(() => {
+        const sorted = [...workspaceItems];
+        sorted.sort((a, b) => {
+            let comparison = 0;
+            if (sortConfig.sortBy === 'name') {
+                comparison = a.title.localeCompare(b.title);
+            } else if (sortConfig.sortBy === 'owner') {
+                const aOwner = a.ownerEmail ?? '';
+                const bOwner = b.ownerEmail ?? '';
+                comparison = aOwner.localeCompare(bOwner);
+            }
+            return sortConfig.sortOrder === 'asc' ? comparison : -comparison;
+        });
+        return sorted;
+    }, [workspaceItems, sortConfig]);
+
+    const handleSort = useCallback(
+        (column: SortColumn) => {
+            setSortConfig((prev) => {
+                if (prev.sortBy === column) {
+                    return {
+                        sortBy: column,
+                        sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
+                    };
+                }
+                return {
+                    sortBy: column,
+                    sortOrder: 'asc',
+                };
+            });
+        },
+        [setSortConfig],
+    );
+
+    const getSortIndicator = useCallback(
+        (column: SortColumn) => {
+            if (sortConfig.sortBy !== column) {
+                return null;
+            }
+            return (
+                <Icon
+                    src={sortConfig.sortOrder === 'asc' ? Expensicons.ArrowUp : Expensicons.ArrowDown}
+                    width={variables.iconSizeExtraSmall}
+                    height={variables.iconSizeExtraSmall}
+                    additionalStyles={styles.ml1}
+                    fill={theme.icon}
+                />
+            );
+        },
+        [sortConfig, styles, theme],
+    );
+
     const getHeaderText = (): string => {
         if (isUserAdminOfPolicy) {
             return translate('workspace.common.workspace');
@@ -343,6 +404,8 @@ function WorkspacesListPage({policies, isLoading = false, shouldShowEmptyState =
         );
     };
 
+    const shouldShowTableHeader = !isSmallScreenWidth;
+
     return (
         <ScreenWrapper
             testID={WorkspacesListPage.displayName}
@@ -370,6 +433,44 @@ function WorkspacesListPage({policies, isLoading = false, shouldShowEmptyState =
                         shouldShowOfflineIndicatorInWideScreen
                         shouldShowTopBar
                     >
+                        {shouldShowTableHeader && (
+                            <View style={[styles.flexRow, styles.ph5, styles.pv2, styles.borderBottom]}>
+                                <PressableWithFeedback
+                                    onPress={() => handleSort('name')}
+                                    accessibilityLabel={translate('common.name')}
+                                    style={[styles.flex1, styles.flexRow, styles.alignItemsCenter]}
+                                >
+                                    <Text
+                                        style={[styles.textMicroBold, styles.textSupporting]}
+                                        numberOfLines={1}
+                                    >
+                                        {translate('common.name')}
+                                    </Text>
+                                    {getSortIndicator('name')}
+                                </PressableWithFeedback>
+                                <PressableWithFeedback
+                                    onPress={() => handleSort('owner')}
+                                    accessibilityLabel={translate('common.owner