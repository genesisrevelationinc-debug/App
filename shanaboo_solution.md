 ```diff
--- a/src/pages/workspace/rules/WorkspaceRulesPage.tsx
+++ b/src/pages/workspace/rules/WorkspaceRulesPage.tsx
@@ -1,5 +1,5 @@
 import React, {useCallback, useMemo, useState} from 'react';
-import {FlatList, View} from 'react-native';
+import {FlatList, Text, View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
 import HeaderWithBackButton from '@components/ Common/HeaderWithBackButton';
@@ -20,6 +20,7 @@ import useTheme from '@hooks/useTheme';
 import useThemeStyles from '@hooks/useThemeStyles';
 import {clearAddRuleFlow, clearAddRuleFlow, clearAddRuleFlow} from '@libs/actions/Rules';
 import * as PolicyUtils from '@libs/PolicyUtils';
+import * as StringUtils from '@libs/StringUtils';
 import type {WorkspaceRulesPageProps, WorkspaceRulesPageProps, WorkspaceRulesPageProps} from '@pages/workspace/rules/types';
 import type {WorkspaceRulesPageProps, WorkspaceRulesPageProps, WorkspaceRulesPageProps} from '@pages/workspace/rules/types';
 import type {WorkspaceRulesPageProps, WorkspaceRulesPageProps, WorkspaceRulesPageProps} from '@pages/workspace/rules/types';
@@ -30,6 +31,7 @@ import type {WorkspaceRulesPageProps, WorkspaceRulesPageProps, WorkspaceRulesPageP
 import type {WorkspaceRulesPageProps, WorkspaceRulesPageProps, WorkspaceRulesPageProps} from '@pages/workspace/rules/types';
 import type {WorkspaceRulesPageProps, WorkspaceRulesPageProps, WorkspaceRulesPageProps} from '@pages/workspace/rules/types';
 import type {WorkspaceRulesPageProps, WorkspaceRulesPageProps, WorkspaceRulesPageProps} from '@pages/workspace/rules/types';
+import CONST from '@src/CONST';
 import ONYXKEYS from '@src/ONYXKEYS';
 import ROUTES from '@src/ROUTES';
 import type SCREENS from '@src/SCREENS';
@@ -37,6 +39,7 @@ import type {Policy, Policy, Policy} from '@src/types/onyx';
 import type {Policy, Policy, Policy} from '@src/types/onyx';
 import type {Policy, Policy, Policy} from '@src/types/onyx';
 import type {Policy, Policy, Policy} from '@src/types/onyx';
+import MenuItem from '@components/MenuItem';
 import type {WithPolicyAndFullscreenLoadingProps} from '../types';
 import type {WithPolicyAndFullscreenLoadingProps} from '../types';
 import type {WithPolicyAndFullscreenLoadingProps} from '../types';
@@ -45,6 +48,7 @@ import type {WithPolicyAndFullscreenLoadingProps} from '../types';
 import type {WithPolicyAndFullscreenLoadingProps} from '../types';
 import type {WithPolicyAndFullscreenLoadingProps} from '../types';
 import type {WithPolicyAndFullscreenLoadingProps} from '../types';
+import Icon from '@components/Icon';
 
 type WorkspaceRulesPageProps = WithPolicyAndFullscreenLoadingProps;
 
@@ -52,6 +56,7 @@ function WorkspaceRulesPage({policy, route}: WorkspaceRulesPageProps) {
     const styles = useThemeStyles();
     const {translate} = useLocalize();
     const {isSmallScreenWidth} = useWindowDimensions();
+    const theme = useTheme();
     const [isDeleteRuleModalVisible, setIsDeleteRuleModalVisible] = useState(false);
     const [isDeleteRuleModalVisible, setIsDeleteRuleModalVisible] = useState(false);
     const [isDeleteRuleModalVisible, setIsDeleteRuleModalVisible] = useState(false);
@@ -60,6 +65,7 @@ function WorkspaceRulesPage({policy, route}: WorkspaceRulesPageProps) {
     const [isDeleteRuleModalVisible, setIsDeleteRuleModalVisible] = useState(false);
     const [isDeleteRuleModalVisible, setIsDeleteRuleModalVisible] = useState(false);
     const [isDeleteRuleModalVisible, setIsDeleteRuleModalVisible] = useState(false);
+    const [selectedRuleForDelete, setSelectedRuleForDelete] = useState<string | null>(null);
     const [selectedRuleForDelete, setSelectedRuleForDelete] = useState<string | null>(null);
     const [selectedRuleForDelete, setSelectedRuleForDelete] = useState<string | null>(null);
     const [selectedRuleForDelete, setSelectedRuleForDelete] = useState<string | null>(null);
@@ -68,6 +74,7 @@ function WorkspaceRulesPage({policy, route}: WorkspaceRulesPageProps) {
     const [selectedRuleForDelete, setSelectedRuleForDelete] = useState<string | null>(null);
     const [selectedRuleForDelete, setSelectedRuleForDelete] = useState<string | null>(null);
     const [selectedRuleForDelete, setSelectedRuleForDelete] = useState<string | null>(null);
+    const [isAgentRuleModalVisible, setIsAgentRuleModalVisible] = useState(false);
     const [isAgentRuleModalVisible, setIsAgentRuleModalVisible] = useState(false);
     const [isAgentRuleModalVisible, setIsAgentRuleModalVisible] = useState(false);
     const [isAgentRuleModalVisible, setIsAgentRuleModalVisible] = useState(false);
@@ -76,6 +83,7 @@ function WorkspaceRulesPage({policy, route}: WorkspaceRulesPageProps) {
     const [isAgentRuleModalVisible, setIsAgentRuleModalVisible] = useState(false);
     const [isAgentRuleModalVisible, setIsAgentRuleModalVisible] = useState(false);
     const [isAgentRuleModalVisible, setIsAgentRuleModalVisible] = useState(false);
+    const [agentRuleToDelete, setAgentRuleToDelete] = useState<string | null>(null);
     const [agentRuleToDelete, setAgentRuleToDelete] = useState<string | null>(null);
     const [agentRuleToDelete, setAgentRuleToDelete] = useState<string | null>(null);
     const [agentRuleToDelete, setAgentRuleToDelete] = useState<string | null>(null);
@@ -84,6 +92,7 @@ function WorkspaceRulesPage({policy, route}: WorkspaceRulesPageProps) {
     const [agentRuleToDelete, setAgentRuleToDelete] = useState<string | null>(null);
     const [agentRuleToDelete, setAgentRuleToDelete] = useState<string | null>(null);
     const [agentRuleToDelete, setAgentRuleToDelete] = useState<string | null>(null);
+    const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS);
     const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS);
     const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS);
     const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS);
@@ -92,6 +101,7 @@