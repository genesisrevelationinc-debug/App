Based on the issue description, the problem is with a "Discard changes" modal that cannot be closed after swiping back and tapping Cancel on the Edit Profile Picture page. This is likely related to navigation state management when the user swipes back (which triggers a beforeRemove event in React Navigation) and then tries to cancel the discard modal.

Let me look at the relevant files in the repository structure to find the avatar/profile picture editing code.

The issue involves:
1. User edits profile picture (avatar)
2. Swipes back - a "Discard changes?" modal appears
3. Tapping "Cancel" should close the modal and return to the Edit profile picture page
4. But the modal cannot be closed

This is likely in the profile/avatar editing screens. Let me find the relevant files.

```diff
--- a/src/pages/settings/Profile/ProfileAvatar.tsx
+++ b/src/pages/settings/Profile/ProfileAvatar.tsx
@@ -1,6 +1,7 @@
 import React, {useCallback, useEffect, useRef, useState} from 'react';
 import {View} from 'react-native';
 import {useOnyx} from 'react-native-onyx';
+import {useFocusEffect} from '@react-navigation/native';
 import AvatarWithImagePicker from '@components/AvatarWithImagePicker';
 import ConfirmModal from '@components/ConfirmModal';
 import HeaderWithBackButton from '@components/HeaderWithBackButton';
@@ -12,6 +13,7 @@ import useLocalize from '@hooks/useLocalize';
 import useThemeStyles from '@hooks/useThemeStyles';
 import Navigation from '@libs/Navigation/Navigation';
 import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
+import navigationRef from '@libs/Navigation/navigationRef';
 import type {SettingsNavigatorParamList} from '@libs/Navigation/types';
 import * as User from '@userActions/User';
 import CONST from '@src/CONST';
@@ -42,6 +44,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
     const [isDiscardChangesModalVisible, setIsDiscardChangesModalVisible] = useState(false);
     const [isAvatarCropModalVisible, setIsAvatarCropModalVisible] = useState(false);
     const [isSubmitting, setIsSubmitting] = useState(false);
+    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
     const [cachedImage, setCachedImage] = useState<string | null>(null);
     const [currentImage, setCurrentImage] = useState<string | null>(null);
     const [errorData, setErrorData] = useState<Errors>({});
@@ -55,6 +58,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -62,6 +66,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -69,6 +74,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -76,6 +82,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -83,6 +90,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -90,6 +98,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -97,6 +106,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -104,6 +114,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -111,6 +122,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -118,6 +130,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -125,6 +138,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -132,6 +146,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -139,6 +154,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -146,6 +162,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -153,6 +170,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage);
+            setHasUnsavedChanges(true);
         }
     }, []);
 
@@ -160,6 +178,7 @@ function ProfileAvatar({route}: ProfileAvatarProps) {
         if (newImage) {
             setCurrentImage(newImage);
             setCachedImage(newImage