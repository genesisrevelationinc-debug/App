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
@@ -10,6 +10,7 @@ import ScrollView from '@components/ScrollView';
 import Text from '@components/Text';
 import TextLink from '@components/TextLink';
 import useLocalize from '@hooks/useLocalize';
+import usePolicy from '@hooks/usePolicy';
 import useThemeStyles from '@hooks/useThemeStyles';
 import {clearAllData} from '@libs/actions/App';
 import {closeAccount} from '@libs/actions/CloseAccount';
@@ -18,6 +19,7 @@ import {getLatestErrorMessage} from '@libs/ErrorUtils';
 import Navigation from '@libs/Navigation/Navigation';
 import {getAccountManager, getDomainName, getLoginList, getLoginListItem, getPhoneNumber, getSecondaryLogins, getUserDetails, isAdmin, isDomainControlled, isMember} from '@libs/PersonalDetailsUtils';
 import {hasCustomContactMethod} from '@libs/UserUtils';
+import {navigateToConciergeChat} from '@libs/actions/Report';
 import {close} from '@userActions/Session';
 import {toggleTwoFactorAuth} from '@userActions/TwoFactorAuth';
 import {getUserValidateCodeLink} from '@userActions/User';
@@ -29,6 +31,7 @@ import type {SecuritySettingsPageProps} from './types';
 
 function SecuritySettingsPage({route}: SecuritySettingsPageProps) {
     const {translate} = useLocalize();
+    const policy = usePolicy();
     const styles = useThemeStyles();
     const [account] = useOnyx(ONYXKEYS.ACCOUNT);
     const [loginList] = useOnyx(ONYXKEYS.LOGIN_LIST);
@@ -42,6 +45,7 @@ function SecuritySettingsPage({route}: SecuritySettingsPageProps) {
     const [isCloseAccountModalOpen, setIsCloseAccountModalOpen] = useState(false);
     const [isSigningOut, setIsSigningOut] = useState(false);
     const [isSigningOutAndClosingAccount, setIsSigningOutAndClosingAccount] = useState(false);
+    const [isCopiloting, setIsCopiloting] = useState(false);
 
     const isUserAdmin = isAdmin(currentUserDetails);
     const isUserMember = isMember(currentUserDetails);
@@ -131,6 +135,28 @@ function SecuritySettingsPage({route}: SecuritySettingsPageProps) {
         [translate, currentUserDetails?.login, currentUserDetails?.accountID, isSigningOut, isSigningOutAndClosingAccount, styles],
     );
 
+    const handleChatWithAgent = useCallback(() => {
+        if (!accountManager?.accountID) {
+            return;
+        }
+        navigateToConciergeChat(accountManager.accountID);
+    }, [accountManager?.accountID]);
+
+    const handleCopilotWithAgent = useCallback(() => {
+        if (!accountManager?.email) {
+            return;
+        }
+        setIsCopiloting(true);
+        InteractionManager.runAfterInteractions(() => {
+            // Navigate to copilot flow - this will be handled by the copilot action
+            Navigation.navigate(ROUTES.COPILOT.getRoute(accountManager.email));
+            setIsCopiloting(false);
+        });
+    }, [accountManager?.email]);
+
+    const shouldShowAgentButtons = useMemo(() => {
+        return !!accountManager?.accountID && !!accountManager?.email;
+    }, [accountManager]);
+
     const menuItems = useMemo(() => {
         const baseMenuItems = [
             {
@@ -213,6 +239,32 @@ function SecuritySettingsPage({route}: SecuritySettingsPageProps) {
                         <Text style={[styles.textLabelSupporting, styles.mt1]}>{translate('securityPage.accountManager.subtitle')}</Text>
                     </View>
                 )}
+                {shouldShowAgentButton && (
+                    <View style={[styles.flexRow, styles.gap2, styles.mt3]}>
+                        <Button
+                            text={translate('securityPage.accountManager.chat')}
+                            onPress={handleChatWithAgent}
+                            style={styles.flex1}
+                        />
+                        <Button
+                            text={translate('securityPage.accountManager.copilot')}
+                            onPress={handleCopilotWithAgent}
+                            isLoading={isCopiloting}
+                            style={styles.flex1}
+                        />
+                    </View>
+                )}
             </ScrollView>
             <ConfirmModal
                 title={translate('common.areYouSure')}
@@ -232,4 +284,4 @@ function SecuritySettingsPage({route}: SecuritySettingsPageProps) {
 
 SecuritySettingsPage.displayName = 'SecuritySettingsPage';
 
-export default SecuritySettingsPage;
+export default SecuritySettingsPage;
\ No newline at end of file
--- a/src/pages/settings/Security/AddDelegate/ConfirmModal.tsx
+++ b/src/pages/settings/Security/AddDelegate/ConfirmModal.tsx
@@ -1,5 +1,5 @@
 import React, {useCallback, useMemo, useState} from 'react';
-import {View} from 'react-native';
+import {InteractionManager, View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
 import Button from '@components/Button';
 import ConfirmModal from '@components/ConfirmModal';
@@ -10,6 +10,7 @@ import useLocalize from '@hooks/useLocalize';
 import useThemeStyles from '@hooks/useThemeStyles';
 import {addDelegate, requestValidateCodeAction, updateDelegate} from '@libs/actions/Delegate';
 import {getLatestErrorMessage} from '@libs/ErrorUtils';
+import {navigateToConciergeChat} from '@libs/actions/Report';
 import Navigation from '@libs/Navigation/Navigation';
 import {validateCodeActionErrorMessage} from '@libs/ValidateCodeUtils';
 import {clearDelegateErrors} from '@userActions/Delegate';
@@ -31,6 +32,7 @@ function ConfirmModal({onClose, delegateEmail, delegateRole, accessLevel, existin
     const [isValidateCodeActionModalVisible, setIsValidateCodeActionModalVisible] = useState(false);
     const [isLoadingForm, setIsLoadingForm] = useState(false);
     const [isAddingDelegate, setIsAddingDelegate] = useState(false);
+    const [isCopiloting, setIsCopiloting] = useState(false);
     const [formError, setFormError] = useState('');
 
     const validateAndSubmitForm = useCallback(() => {
@@ -91,6 +93,24 @@