 ```diff
--- a/src/libs/YaplJS/index.ts
+++ b/src/libs/YaplJS/index.ts
@@ -1,4 +1,4 @@
-import {NativeModules} from 'react-native';
+import {NativeModules, Platform} from 'react-native';
 import Log from '@libs/Log';
 
 type YaplJSModule = {
@@ -15,7 +15,22 @@ const YaplJS = {
      * Calls a function in the YAPL JS bridge.
      */
     callFunction(functionName: string, args: Record<string, unknown> = {}): void {
-        YaplJSModule.callFunction(functionName, args);
+        if (Platform.OS === 'ios') {
+            // Offload YAPL JS bridge calls to a background thread on iOS
+            // to prevent main thread blocking that causes App Hangs.
+            // This is a workaround for: APP-7DX
+            const {InteractionManager} = require('react-native');
+            InteractionManager.runAfterInteractions(() => {
+                try {
+                    YaplJSModule.callFunction(functionName, args);
+                } catch (error) {
+                    Log.hmmm('YaplJS.callFunction error after interaction', {functionName, error});
+                }
+            });
+        } else {
+            YaplJSModule.callFunction(functionName, args);
+        }
     },
 
     /**
@@ -23,7 +40,21 @@ const YaplJS = {
      * Calls a function in the YAPL JS bridge and returns a promise.
      */
     callFunctionAsync(functionName: string, args: Record<string, unknown> = {}): Promise<unknown> {
-        return YaplJSModule.callFunctionAsync(functionName, args);
+        if (Platform.OS === 'ios') {
+            // Offload YAPL JS bridge calls to a background thread on iOS
+            // to prevent main thread blocking that causes App Hangs.
+            // This is a workaround for: APP-7DX
+            const {InteractionManager} = require('react-native');
+            return new Promise((resolve, reject) => {
+                InteractionManager.runAfterInteractions(() => {
+                    YaplJSModule.callFunctionAsync(functionName, args)
+                        .then(resolve)
+                        .catch(reject);
+                });
+            });
+        }
+        
+        return YaplJSModule.callFunctionAsync(functionName, args);
     },
 };
 
--- a/src/libs/YaplJS/index.ts
+++ b/src/libs/YaplJS/index.ts
@@ -1,4 +1,4 @@
-import {NativeModules} from 'react-native';
+import {NativeModules, Platform} from 'react-native';
 import Log from '@libs/Log';
 
 type YaplJSModule = {
@@ -15,7 +15,22 @@ const YaplJS = {
      * Calls a function in the YAPL JS bridge.
      */
     callFunction(functionName: string, args: Record<string, unknown> = {}): void {
-        YaplJSModule.callFunction(functionName, args);
+        if (Platform.OS === 'ios') {
+            // Offload YAPL JS bridge calls to a background thread on iOS
+            // to prevent main thread blocking that causes App Hangs.
+            // This is a workaround for: APP-7DX
+            const {InteractionManager} = require('react-native');
+            InteractionManager.runAfterInteractions(() => {
+                try {
+                    YaplJSModule.callFunction(functionName, args);
+                } catch (error) {
+                    Log.hmmm('YaplJS.callFunction error after interaction', {functionName, error});
+                }
+            });
+        } else {
+            YaplJSModule.callFunction(functionName, args);
+        }
     },
 
     /**
@@ -23,7 +40,21 @@ const YaplJS = {
      * Calls a function in the YAPL JS bridge and returns a promise.
      */
     callFunctionAsync(functionName: string, args: Record<string, unknown> = {}): Promise<unknown> {
-        return YaplJSModule.callFunctionAsync(functionName, args);
+        if (Platform.OS === 'ios') {
+            // Offload YAPL JS bridge calls to a background thread on iOS
+            // to prevent main thread blocking that causes App Hangs.
+            // This is a workaround for: APP-7DX
+            const {InteractionManager} = require('react-native');
+            return new Promise((resolve, reject) => {
+                InteractionManager.runAfterInteractions(() => {
+                    YaplJSModule.callFunctionAsync(functionName, args)
+                        .then(resolve)
+                        .catch(reject);
+                });
+            });
+        }
+        
+        return YaplJSModule.callFunctionAsync(functionName, args);
     },
 };
 
--- a/src/libs/YaplJS/index.ts
+++ b/src/libs/YaplJS/index.ts
@@ -1,4 +1,4 @@
-import {NativeModules} from 'react-native';
+import {NativeModules, Platform} from 'react-native';
 import Log from '@libs/Log';
 
 type YaplJSModule = {
@@ -15,7 +15,22 @@ const YaplJS = {
      * Calls a function in the YAPL JS bridge.
      */
     callFunction(functionName: string, args: Record<string, unknown> = {}): void {
-        YaplJSModule.callFunction(functionName, args);
+        if (Platform.OS === 'ios') {
+            // Offload YAPL JS bridge calls to a background thread on iOS
+            // to prevent main thread blocking that causes App Hangs.
+            // This is a workaround for: APP-7DX
+            const {InteractionManager} = require('react-native');
+            InteractionManager.runAfterInteractions(() => {
+                try {
+                    YaplJSModule.callFunction(functionName, args);
+                } catch (error) {
+                    Log.hmmm('YaplJS.callFunction error after interaction', {functionName, error});
+                }
+            });
+        } else {
+            YaplJSModule.callFunction(functionName, args);
+        }
     },
 
     /**
@@ -23,7 +40,21 @@ const YaplJS = {
      * Calls a function in the YAPL JS bridge and returns a promise.
      */
     callFunctionAsync(functionName: string, args: Record<string, unknown> = {}): Promise<unknown> {
-        return YaplJSModule.callFunctionAsync(functionName, args);
+        if (Platform.OS === 'ios') {
+            // Offload YAPL JS bridge calls to a background thread on iOS
+            // to prevent main thread blocking that causes App Hangs.
+            // This is a workaround for: APP-7DX
+            const {InteractionManager} = require('react-native');
+            return new Promise((resolve, reject) => {
+                InteractionManager.runAfterInteractions(() => {
+                    YaplJSModule.callFunctionAsync(functionName, args)
+