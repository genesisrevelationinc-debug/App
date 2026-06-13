 ```diff
--- a/src/libs/Notification/LocalNotification/index.ts
+++ b/src/libs/Notification/LocalNotification/index.ts
@@ -1,4 +1,5 @@
 import Onyx from 'react-native-onyx';
+import {isEdge} from '@libs/Browser';
 import ONYXKEYS from '@src/ONYXKEYS';
 import type {NotificationData} from './types';
 
@@ -15,6 +16,11 @@ Onyx.connect({
 });
 
 function showCommentNotification(data: NotificationData) {
+    // Edge browser has issues with displaying notifications, so we skip them
+    // but still play the sound to maintain some feedback for the user
+    if (isEdge()) {
+        return;
+    }
     require('./NotificationModule').default.showCommentNotification(data);
 }
 
@@ -23,6 +29,11 @@ function showCommentNotification(data: NotificationData) {
  * @param notificationID The ID of the notification to be removed.
  */
 function hideNotification(notificationID: string) {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return;
+    }
     require('./NotificationModule').default.hideNotification(notificationID);
 }
 
@@ -31,6 +42,11 @@ function hideNotification(notificationID: string) {
  * @param notificationID The ID of the notification to be removed.
  */
 function hideNotificationByMessage(notificationID: string) {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return;
+    }
     require('./NotificationModule').default.hideNotificationByMessage(notificationID);
 }
 
@@ -38,6 +54,11 @@ function hideNotificationByMessage(notificationID: string) {
  * Clears all the notifications from the notification centre.
  */
 function clearAllNotifications() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return;
+    }
     require('./NotificationModule').default.clearAllNotifications();
 }
 
@@ -46,6 +67,11 @@ function clearAllNotifications() {
  * @param notificationID The ID of the notification to be removed.
  */
 function setNotificationBadgeCount(count: number) {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return;
+    }
     require('./NotificationModule').default.setNotificationBadgeCount(count);
 }
 
@@ -53,6 +79,11 @@ function setNotificationBadgeCount(count: number) {
  * Checks if the user has granted permission to show notifications.
  */
 function requestPermission() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return Promise.resolve(false);
+    }
     return require('./NotificationModule').default.requestPermission();
 }
 
@@ -60,6 +91,11 @@ function requestPermission() {
  * Checks if the user has granted permission to show notifications.
  */
 function getPermission() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return Promise.resolve(false);
+    }
     return require('./NotificationModule').default.getPermission();
 }
 
@@ -67,6 +103,11 @@ function getPermission() {
  * Checks if the user has granted permission to show notifications.
  */
 function canUseDefaultBrowser() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return false;
+    }
     return require('./NotificationModule').default.canUseDefaultBrowser();
 }
 
@@ -74,6 +115,11 @@ function canUseDefaultBrowser() {
  * Checks if the user has granted permission to show notifications.
  */
 function canUsePushNotifications() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return false;
+    }
     return require('./NotificationModule').default.canUsePushNotifications();
 }
 
@@ -81,6 +127,11 @@ function canUsePushNotifications() {
  * Checks if the user has granted permission to show notifications.
  */
 function shouldShowPushNotification() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return false;
+    }
     return require('./NotificationModule').default.shouldShowPushNotification();
 }
 
@@ -88,6 +139,11 @@ function shouldShowPushNotification() {
  * Checks if the user has granted permission to show notifications.
  */
 function shouldShowNotificationBadge() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return false;
+    }
     return require('./NotificationModule').default.shouldShowNotificationBadge();
 }
 
@@ -95,6 +151,11 @@ function shouldShowNotificationBadge() {
  * Checks if the user has granted permission to show notifications.
  */
 function shouldShowCustomNotification() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return false;
+    }
     return require('./NotificationModule').default.shouldShowCustomNotification();
 }
 
@@ -102,6 +163,11 @@ function shouldShowCustomNotification() {
  * Checks if the user has granted permission to show notifications.
  */
 function shouldPlaySound() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return true;
+    }
     return require('./NotificationModule').default.shouldPlaySound();
 }
 
@@ -109,6 +175,11 @@ function shouldPlaySound() {
  * Checks if the user has granted permission to show notifications.
  */
 function shouldShowNotification() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return false;
+    }
     return require('./NotificationModule').default.shouldShowNotification();
 }
 
@@ -116,6 +187,11 @@ function shouldShowNotification() {
  * Checks if the user has granted permission to show notifications.
  */
 function shouldShowInForeground() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return false;
+    }
     return require('./NotificationModule').default.shouldShowInForeground();
 }
 
@@ -123,6 +199,11 @@ function shouldShowInForeground() {
  * Checks if the user has granted permission to show notifications.
  */
 function shouldShowInBackground() {
+    // Edge browser has issues with displaying notifications, so we skip them
+    if (isEdge()) {
+        return false;
+    }
     return require('./NotificationModule').default.shouldShowInBackground();
 }
 
@@ -130,6 +211,11 @@ function shouldShowInBackground() {
  * Checks if the user has granted permission to show notifications.
  */
 function