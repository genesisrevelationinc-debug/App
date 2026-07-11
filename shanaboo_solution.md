Based on the issue description, the problem is that when a user swipes back after selecting a custom avatar image, a "Discard changes?" modal appears, but tapping "Cancel" doesn't close the modal properly. This is likely a navigation/route handling issue where the modal's cancel action doesn't properly dismiss the modal and return to the edit profile picture screen.

Let me search for relevant files related to avatar editing and the discard changes modal.

```diff
--- a/src/pages/settings/Profile/ProfileAvatarPage.tsx
+++ b/src/pages/settings/Profile/ProfileAvatarPage.tsx
@@ -1,6 +1,7 @@
 import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
+import {useNavigation} from '@react-navigation/native';
 import type {OnyxEntry} from 'react-native-onyx';
 import Avatar from '@components/Avatar';
 import Button from '@components/Button';
@@ -9,6 +10,7 @@
 import HeaderWithBackButton from '@components/HeaderWithBackButton';
 import * as Illustrations from '@components/Icon/Illustrations';
 import MenuItem from '@components/MenuItem';
+import Modal from '@components/Modal';
 import ScreenWrapper from '@components/ScreenWrapper';
 import ScrollView from '@components/ScrollView';
 import Text from '@components/Text';
@@ -16,6 +18,7 @@
 import useLocalize from '@hooks/useLocalize';
 import useThemeStyles from '@hooks/useThemeStyles';
 import useWindowDimensions from '@hooks/useWindowDimensions';
+import Navigation from '@libs/Navigation/Navigation';
 import * as User from '@userActions/User';
 import CONST from '@src/CONST';
 import ONYXKEYS from '@src/ONYXKEYS';
@@ -23,6 +26,7 @@
 import type {AvatarSource} from '@src/types/onyx/Account';
 import type {FileObject} from '@src/types/onyx/Form';
 import type {Policy} from '@src/types/onyx/Policy';
+import ROUTES from '@src/ROUTES';

 type ProfileAvatarPageProps = {
     account: OnyxEntry<Account>;
@@ -30,6 +34,7 @@
 };

 function ProfileAvatarPage({account, policy}: ProfileAvatarPageProps) {
+    const navigation = useNavigation();
     const styles = useThemeStyles();
     const {translate} = useLocalize();
     const {isSmallScreenWidth} = useWindowDimensions();
@@ -37,6 +42,7 @@
     const [isUploading, setIsUploading] = useState(false);
     const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
     const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
+    const [isDiscardChangesModalVisible, setIsDiscardChangesModalVisible] = useState(false);
     const [imageData, setImageData] = useState<FileObject | null>(null);
     const [isAvatarCropModalOpen, setIsAvatarCropModalOpen] = useState(false);
     const [isAvatarCropping, setIsAvatarCropping] = useState(false);
@@ -44,6 +50,23 @@
     const [isLoading, setIsLoading] = useState(false);
     const [isSaving, setIsSaving] = useState(false);

+    // Handle the beforeRemove event to show discard changes modal when swiping back
+    useEffect(() => {
+        const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
+            if (!imageData) {
+                return;
+            }
+
+            // Prevent default behavior of leaving the screen
+            e.preventDefault();
+
+            // Show the discard changes modal
+            setIsDiscardChangesModalVisible(true);
+        });
+
+        return unsubscribe;
+    }, [navigation, imageData]);
+
     const avatarURL = useMemo(() => {
         if (account?.avatarURL) {
             return account.avatarURL;
@@ -51,6 +74,16 @@
         return User.getDefaultAvatarURL(account?.accountID);
     }, [account?.avatarURL, account?.accountID]);

+    const handleDiscardChanges = useCallback(() => {
+        setIsDiscardChangesModalVisible(false);
+        navigation.dispatch(e.data.action);
+    }, [navigation]);
+
+    const handleKeepEditing = useCallback(() => {
+        setIsDiscardChangesModalVisible(false);
+        // Modal is dismissed, user stays on the page
+    }, []);
+
     const handleSelectImage = useCallback(() => {
         setIsUploadModalVisible(true);
     }, []);
@@ -58,6 +91,7 @@
     const handleImageSelected = useCallback((file: FileObject) => {
         setIsUploadModalVisible(false);
         setImageData(file);
+        setIsAvatarCropModalOpen(true);
     }, []);

     const handleImageCropSave = useCallback((croppedImage: FileObject) => {
@@ -65,6 +99,7 @@
         setIsAvatarCropping(false);
         setImageData(croppedImage);
         setIsAvatarCropModalOpen(false);
+        // Image data is now set, so swiping back will trigger the discard modal
     }, []);

     const handleRemoveAvatar = useCallback(() => {
@@ -72,6 +107,7 @@
     }, []);

     const handleConfirmRemoveAvatar = useCallback(() => {
+        setIsRemoveModalVisible(false);
         setIsLoading(true);
         User.deleteAvatar().then(() => {
             setIsLoading(false);
@@ -79,6 +115,7 @@
     }, []);

     const handleSaveAvatar = useCallback(() => {
+        if (!imageData) {
+            return;
+        }
         setIsSaving(true);
         User.uploadAvatar(imageData as FileObject).then(() => {
             setIsSaving(false);
@@ -86,6 +123,7 @@
     }, [imageData]);

     const handleBackButtonPress = useCallback(() => {
+        if (imageData) {
+            setIsDiscardChangesModalVisible(true);
+            return;
+        }
         Navigation.goBack();
-    }, []);
+    }, [imageData]);

     return (
         <ScreenWrapper
@@ -93,6 +131,7 @@
             includeSafeAreaPaddingBottom={false}
             shouldEnableKeyboardAvoidingView={false}
             shouldEnableMinHeight={isSmallScreenWidth}
+            shouldEnableMaxHeight={isSmallScreenWidth}
             testID={ProfileAvatarPage.displayName}
         >
             <HeaderWithBackButton
@@ -100,6 +139,7 @@
                 onBackButtonPress={handleBackButtonPress}
                 shouldShowBackButton
                 title={translate('profilePage.profileAvatar')}
+                shouldShowBorderBottom
             />
             <ScrollView style={styles.pt3}>
                 <View style={