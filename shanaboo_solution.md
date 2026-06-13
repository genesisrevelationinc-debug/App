 ```diff
--- a/src/libs/Notification/LocalNotification/BrowserNotifications.ts
+++ b/src/libs/Notification/LocalNotification/BrowserNotifications.ts
@@ -1,5 +1,6 @@
 import Onyx from 'react-native-onyx';
 import type {ValueOf} from 'type-fest';
+import {isEdge} from '@libs/Browser';
 import * as OnyxUpdates from '@userActions/OnyxUpdates';
 import type ONYXKEYS from '@src/ONYXKEYS';
 import type {ReportActions} from '@src/types/onyx';
@@ -56,7 +57,12 @@ function canUseBrowserNotifications() {
  */
 function getBrowserNotificationPermission() {
     if ('Notification' in window) {
-        return Notification.permission;
+        // Edge browser may return 'default' even when permission is granted
+        // We need to check the actual permission state via the promise-based API
+        if (isEdge() && Notification.permission === 'default') {
+            return 'default';
+        }
+        return Notification.permission as NotificationPermission;
     }
 
     return 'unsupported';
@@ -68,7 +74,7 @@ function getBrowserNotificationPermission() {
  * @returns A promise that resolves with a boolean value indicating whether the user has granted
  *          notification permissions or not.
  */
-function requestBrowserNotificationPermission(): Promise<boolean> {
+function requestBrowserNotificationPermission(): Promise<NotificationPermission | boolean> {
     if (!('Notification' in window)) {
         return Promise.resolve(false);
     }
@@ -77,7 +83,7 @@ function requestBrowserNotificationPermission(): Promise<boolean> {
         return Promise.resolve(false);
     }
 
-    return Notification.requestPermission().then((permission) => permission === 'granted');
+    return Notification.requestPermission();
 }
 
 /**
@@ -91,7 +97,7 @@ function requestBrowserNotificationPermission(): Promise<boolean> {
  */
 function push({
     title,
-    delay,
+    delay = 0,
     body = '',
     icon = '',
     tag = '',
@@ -100,7 +106,7 @@ function push({
     const notificationPermission = getBrowserNotificationPermission();
 
     // If the user has not granted permission to show notifications, or the browser
-    // does not support them, we have nothing to do.
+    // does not support them, or we're on Edge with default permission, we have nothing to do.
     if (notificationPermission !== 'granted') {
         return;
     }
@@ -108,7 +114,7 @@ function push({
     // Set a timeout so the notification is not sent immediately
     const notificationTimeout = setTimeout(() => {
         try {
-            const notification = new Notification(title, {
+            const notification = new window.Notification(title, {
                 body,
                 icon,
                 tag,
@@ -130,7 +136,7 @@ function push({
             }
         }
     }, delay);
-    notificationTimeouts.push(notificationTimeout);
+    notificationTimeouts.push(notificationTimeout as unknown as number);
 }
 
 /**
@@ -141,7 +147,7 @@ function push({
  */
 function canUseNotifications(): boolean {
     // Check if the browser supports the Notification API
-    if (!('Notification' in window)) {
+    if (!('Notification' in window) || !window.Notification) {
         return false;
     }
 
@@ -151,7 +157,7 @@ function canUseNotifications(): boolean {
     }
 
     // Check if the user has granted permission to show notifications
-    if (Notification.permission !== 'granted') {
+    if (getBrowserNotificationPermission() !== 'granted') {
         return false;
     }
 
@@ -167,7 +173,7 @@ function canUseNotifications(): boolean {
  */
 function canRequestNotificationPermission(): boolean {
     // Check if the browser supports the Notification API
-    if (!('Notification' in window)) {
+    if (!('Notification' in window) || !window.Notification) {
         return false;
     }
 
@@ -177,7 +183,7 @@ function canRequestNotificationPermission(): boolean {
     }
 
     // Check if the user has already granted or denied permission
-    if (Notification.permission !== 'default') {
+    if (getBrowserNotificationPermission() !== 'default') {
         return false;
     }
 
@@ -190,7 +196,7 @@ function canRequestNotificationPermission(): boolean {
  * @param onClick - The callback to call when the notification is clicked
  */
 function focusApp() {
-    if (!window || !window.parent) {
+    if (typeof window === 'undefined' || !window.parent) {
         return;
     }
 
@@ -209,7 +215,7 @@ function focusApp() {
  * @param onClick - The callback to call when the notification is clicked
  */
 function focusAppAndShowNotification(notification: Notification) {
-    if (!notification.onclick) {
+    if (!notification.onclick && notification) {
         notification.onclick = () => {
             focusApp();
         };
@@ -224,7 +230,7 @@ function focusAppAndShowNotification(notification: Notification) {
  * @param onClick - The callback to call when the notification is clicked
  */
 function focusAppAndShowNotification(notification: Notification) {
-    if (!notification.onclick) {
+    if (!notification.onclick && notification) {
         notification.onclick = () => {
             focusApp();
         };
@@ -239,7 +245,7 @@ function focusAppAndShowNotification(notification: Notification) {
  * @param onClick - The callback to call when the notification is clicked
  */
 function focusAppAndShowNotification(notification: Notification) {
-    if (!notification.onclick) {
+    if (!notification.onclick && notification) {
         notification.onclick = () => {
             focusApp();
         };
@@ -254,7 +260,7 @@ function focusAppAndShowNotification(notification: Notification) {
  * @param onClick - The callback to call when the notification is clicked
  */
 function focusAppAndShowNotification(notification: Notification) {
-    if (!notification.onclick) {
+    if (!notification.onclick && notification) {
         notification.onclick = () => {
             focusApp();
         };
@@ -269,7 +275,7 @@ function focusAppAndShowNotification(notification: Notification) {
  * @param onClick - The callback to call when the notification is clicked
  */
 function focusAppAndShowNotification(notification: Notification) {
-    if (!notification.onclick) {
+    if (!notification.onclick && notification) {
         notification.onclick = () => {
             focusApp();
         };
@@ -284,7 +290,7 @@ function focusAppAndShowNotification(notification: Notification) {
  * @param onClick - The callback to call when the notification is clicked
  */
 function focusAppAndShowNotification(notification: Notification) {
-    if (!notification.onclick) {
+    if (!notification.onclick && notification) {
         notification.onclick = () => {
             focusApp();
         };
@@ -299,7 +305,7 @@ function focusAppAndShowNotification(notification: Notification) {
  * @param onClick -