```diff
--- a/src/pages/settings/Security/SecuritySettingsPage.tsx
+++ b/src/pages/settings/Security/SecuritySettingsPage.tsx
@@ -1,5 +1,5 @@
 import React, {useCallback, useMemo, useState} from 'react';
-import {View} from 'react-native';
+import {InteractionManager, View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
 import ConfirmModal from '@components/ConfirmModal';
 import HeaderWithBackButton from '@components/HeaderWithBackButton';
@@ -9,6 +9,7 @@ import MenuItem from '@components/MenuItem';
 import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
 import ScreenWrapper from '@components/ScreenWrapper';
 import ScrollView from '@components/ScrollView';
+import useCurrentUserAccountID from '@hooks/useCurrentUserAccountID';
 import useLocalize from '@hooks/useLocalize';
 import useThemeStyles from '@hooks/useThemeStyles';
 import {clearAllRelatedToAgent} from '@libs/actions/Agent';
@@ -16,6 +17,7 @@ import {clearAllRelatedToAgent} from '@libs/actions/Agent';
 import {getLatestErrorMessage} from '@libs/ErrorUtils';
 import Navigation from '@libs/Navigation/Navigation';
 import {getPersonalDetailByEmail} from '@libs/PersonalDetailsUtils';
+import {getReportIDForChat} from '@libs/ReportUtils';
 import {getDomainName} from '@libs/UserUtils';
 import {clearErrorField, updateErrorField} from '@userActions/FormActions';
 import {requestAccountDeletion} from '@userActions/User';
@@ -23,6 +25,7 @@ import CONST from '@src/CONST';
 import ONYXKEYS from '@src/ONYXKEYS';
 import ROUTES from '@src/ROUTES';
 import type {Agent} from '@src/types/onyx';
+import {navigateToAndOpenReport} from '@userActions/Report';
 import AddDelegate from './AddDelegate';
 import type {SecuritySettingsPageProps} from './types';
 
@@ -33,6 +36,7 @@ function SecuritySettingsPage({route, navigation}: SecuritySettingsPageProps) {
     const [isDeleteDelegateConfirmModalVisible, setIsDeleteDelegateConfirmModalVisible] = useState(false);
     const [isRemoveAccountModalOpen, setIsRemoveAccountModalOpen] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
+    const {currentUserAccountID} = useCurrentUserAccountID();
 
     const [account] = useOnyx(ONYXKEYS.ACCOUNT);
     const [loginList] = useOnyx(ONYXKEYS.LOGIN_LIST);
@@ -72,6 +76,24 @@ function SecuritySettingsPage({route, navigation}: SecuritySettingsPageProps) {
         [account?.delegates, loginList],
     );
 
+    const handleChatWithAgent = useCallback((agent: Agent) => {
+        const personalDetail = getPersonalDetailByEmail(agent.email);
+        if (!personalDetail?.accountID) {
+            return;
+        }
+        const reportID = getReportIDForChat(currentUserAccountID, [personalDetail.accountID]);
+        if (reportID) {
+            InteractionManager.runAfterInteractions(() => {
+                navigateToAndOpenReport([personalDetail.accountID], false);
+            });
+        }
+    }, [currentUserAccountID]);
+
+    const handleCopilotWithAgent = useCallback((agent: Agent) => {
+        // Navigate to copilot flow with the agent's account
+        const personalDetail = getPersonalDetailByEmail(agent.email);
+        Navigation.navigate(ROUTES.SETTINGS_COPILOT.getRoute(personalDetail?.accountID ?? agent.email));
+    }, []);
+
     const menuItems = useMemo(() => {
         const items = [
             {
@@ -162,6 +184,8 @@ function SecuritySettingsPage({route, navigation}: SecuritySettingsPageProps) {
                         agent={selectedAgent}
                         onClose={() => setSelectedAgent(null)}
                         onDelete={() => setIsDeleteDelegateConfirmModalVisible(true)}
+                        onChat={() => handleChatWithAgent(selectedAgent)}
+                        onCopilot={() => handleCopilotWithAgent(selectedAgent)}
                     />
                 )}
                 <ConfirmModal
@@ -196,6 +220,8 @@ function SecuritySettingsPage({route, navigation}: SecuritySettingsPageProps) {
                             key={agent.email}
                             agent={agent}
                             onPress={() => setSelectedAgent(agent)}
+                            onChat={() => handleChatWithAgent(agent)}
+                            onCopilot={() => handleCopilotWithAgent(agent)}
                         />
                     ))}
                 </View>
@@ -209,6 +235,8 @@ function SecuritySettingsPage({route, navigation}: SecuritySettingsPageProps) {
                         agent={selectedAgent}
                         onClose={() => setSelectedAgent(null)}
                         onDelete={() => setIsDeleteDelegateConfirmModalVisible(true)}
+                        onChat={() => handleChatWithAgent(selectedAgent)}
+                        onCopilot={() => handleCopilotWithAgent(selectedAgent)}
                     />
                 )}
                 <ConfirmModal
--- a/src/pages/settings/Security/AgentListItem.tsx
+++ b/src/pages/settings/Security/AgentListItem.tsx
@@ -1,5 +1,6 @@
 import React from 'react';
 import {View} from 'react-native';
+import Button from '@components/Button';
 import Icon from '@components/Icon';
 import * as Expensicons from '@components/Icon/Expensicons';
 import PressableWithFeedback from '@components/Pressable/PressableWithFeedback';
@@ -14,9 +15,11 @@ import type {AgentListItemProps} from './types';
 type AgentListItemProps = {
     agent: Agent;
     onPress: () => void;
+    onChat: () => void;
+    onCopilot: () => void;
 };
 
-function AgentListItem({agent, onPress}: AgentListItemProps) {
+function AgentListItem({agent, onPress, onChat, onCopilot}: AgentListItemProps) {
     const styles = useThemeStyles();
     const {translate} = useLocalize();
     const personalDetail = getPersonalDetailByEmail(agent.email);
@@ -49,6 +52,22 @@ function AgentListItem({agent, onPress}: AgentListItemProps) {
                         />
                     </View>
                 </View>
+                <View style={[styles.flexRow, styles.gap2, styles.mt2]}>
+                    <Button
+                        small
+                        text={translate('common.chat')}
+                        onPress={(e) => {
+                            e?.stopPropagation();
+                            onChat();
+                        }}
+                    />
+                    <Button
+                        small
+                        text={translate('common.copilot')}
+                        onPress={(e) => {
+                            e?.stopPropagation();
+                            onCopilot();
+                        }}
+                    />
+                </View>
             </View>
         </PressableWithFeedback>
     );
--- a/src/pages/settings