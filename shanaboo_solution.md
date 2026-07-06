 ```diff
--- a/src/pages/workspace/WorkspacesListRow.tsx
+++ b/src/pages/workspace/WorkspacesListRow.tsx
@@ -1,5 +1,6 @@
 import React, {useCallback, useMemo, useState} from 'react';
 import {View} from 'react-native';
+import {useOnyx} from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
 import Badge from '@components/Badge';
 import Breadcrumbs from '@components/Breadcrumbs';
@@ -16,6 +17,7 @@ import useTheme from '@hooks/useTheme';
 import useThemeStyles from '@hooks/useThemeStyles';
 import * as PolicyUtils from '@libs/PolicyUtils';
 import * as ReportUtils from '@libs/ReportUtils';
+import * as PersonalDetailsUtils from '@libs/PersonalDetailsUtils';
 import type {WorkspacesListRowData} from '@pages/workspace/WorkspacesList';
 import variables from '@styles/variables';
 import CONST from '@src/CONST';
@@ -76,6 +78,9 @@ function WorkspacesListRow({
     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
     const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
 
+    const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS_LIST);
+    const ownerPersonalDetail = useMemo(() => PersonalDetailsUtils.getPersonalDetailByEmail(personalDetails, ownerEmail), [personalDetails, ownerEmail]);
+
     const isJoinRequestPending = rowItem?.isJoinRequestPending;
 
     const isSelected = selectedRowId === rowItem.id;
@@ -196,7 +201,7 @@ function WorkspacesListRow({
                             <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1, styles.flex1, styles.w100, styles.workspaceListRowContent]}>
                                 <Avatar
                                     imageStyles={[styles.mr2, styles.avatarSmall]}
-                                    source={rowItem?.avatarURL ? rowItem?.avatarURL : rowItem?.avatar}
+                                    source={ownerPersonalDetail?.avatar ?? rowItem?.avatarURL ?? rowItem?.avatar}
                                     size={CONST.AVATAR_SIZE.DEFAULT}
                                     fallbackIcon={FallbackAvatar}
                                 />
@@ -204,7 +209,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style={[styles.textLabel, styles.textStrong, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
+                                            style={[styles.textLabel, styles.textStrong, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
                                         >
                                             {title}
                                         </Text>
@@ -213,7 +218,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
+                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
                                         >
                                             {subtitle}
                                         </Text>
@@ -221,7 +226,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
+                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
                                         >
                                             {subtitle}
                                         </Text>
@@ -229,7 +234,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
+                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
                                         >
                                             {subtitle}
                                         </Text>
@@ -237,7 +242,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequest onwardsExpensifyCardBankAccountNumber ? styles.workspaceListRowTitlePending : {}]}
+                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
                                         >
                                             {subtitle}
                                         </Text>
@@ -245,7 +250,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
+                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
                                         >
                                             {subtitle}
                                         </Text>
@@ -253,7 +258,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
+                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
                                         >
                                             {subtitle}
                                         </Text>
@@ -261,7 +266,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
+                                            style={[styles.textLabelSupporting, styles.textMicroSupporting, styles.flex1, isJoinRequestPending ? styles.workspaceListRowTitlePending : {}]}
                                         >
                                             {subtitle}
                                         </Text>
@@ -269,7 +274,7 @@ function WorkspacesListRow({
                                     <View style={[styles.flexRow, styles.alignItemsCenter, styles.gap1]}>
                                         <Text
                                             numberOfLines={1}
-                                            style