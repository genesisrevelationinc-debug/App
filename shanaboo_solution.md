Based on the issue description, the problem is that when a user sends a message in a chat opened from Search, then navigates back and reopens the same chat, the previously sent message remains in the compose box. This suggests the compose box state (draft) is not being cleared properly when navigating away from the chat or when the message is sent.

Let me look at the relevant source files to understand the compose box implementation and draft management.

```diff
--- a/src/components/Composer/index.tsx
+++ b/src/components/Composer/index.tsx
@@ -1,6 +1,7 @@
 import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {InteractionManager, NativeSyntheticEvent, TextInput, TextInputSelectionChangeEventData, View} from 'react-native';
 import type {TextSelection} from '@components/Composer/types';
+import {useFocusEffect} from '@react-navigation/native';
 import type {BaseTextInputRef} from '@components/TextInput/BaseTextInput/types';
 import useHtmlPaste from '@hooks/useHtmlPaste';
 import useMarkdownStyle from '@hooks/useMarkdownStyle';
@@ -8,6 +9,7 @@
 import useThemeStyles from '@hooks/useThemeStyles';
 import * as Browser from '@libs/Browser';
 import * as ComposerUtils from '@libs/ComposerUtils';
+import * as ReportUtils from '@libs/ReportUtils';
 import type {ComposerProps} from './types';

 function Composer(
@@ -22,6 +24,7 @@
         onClear,
         onPasteFile,
         shouldCalculateCaretPosition = false,
+        reportID,
     }: ComposerProps,
     ref: React.ForwardedRef<BaseTextInputRef>,
 ) {
@@ -34,6 +37,16 @@
     const styles = useThemeStyles();
     const markdownStyle = useMarkdownStyle(value, !isComposerFullSize);

+    // Clear the composer when the screen loses focus (e.g., navigating away)
+    useFocusEffect(
+        useCallback(() => {
+            return () => {
+                // When blurring (navigating away), clear the draft if the message was sent
+                ReportUtils.clearReportDraft(reportID);
+            };
+        }, [reportID]),
+    );
+
     useEffect(() => {
         if (!shouldCalculateCaretPosition) {
             return;
--- a/src/components/Composer/types.ts
+++ b/src/components/Composer/types.ts
@@ -1,5 +1,6 @@
 import type {BaseTextInputProps} from '@components/TextInput/BaseTextInput/types';

 type ComposerProps = BaseTextInputProps & {
+    reportID?: string;
     /** Whether the composer is full size */
     isComposerFullSize?: boolean;

--- a/src/pages/home/report/ReportActionCompose/ReportActionCompose.tsx
+++ b/src/pages/home/report/ReportActionCompose/ReportActionCompose.tsx
@@ -1,5 +1,6 @@
 import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
 import {InteractionManager, View} from 'react-native';
+import {useFocusEffect} from '@react-navigation/native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
 import type {FileObject} from '@components/AttachmentModal';
@@ -10,6 +11,7 @@
 import useLocalize from '@hooks/useLocalize';
 import useThemeStyles from '@hooks/useThemeStyles';
 import * as Report from '@userActions/Report';
+import * as ReportUtils from '@libs/ReportUtils';
 import type {ComposerRef} from './types';

 type ReportActionComposeProps = {
@@ -23,6 +25,7 @@
     const [report] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`);
     const [parentReportAction] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${report?.parentReportID ?? '-1'}`);
     const [isLoadingOnyxValue = true] = useOnyx(ONYXKEYS.IS_LOADING_REPORT_DATA, {initWithStoredValues: false});
+    const [reportDraft] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT_DRAFT}${reportID}`);

     const styles = useThemeStyles();
     const {translate} = useLocalize();
@@ -30,6 +33,16 @@
     const composerRef = useRef<ComposerRef>(null);
     const [isFocused, setIsFocused] = useState(() => isActive);

+    // Clear the draft when navigating away from the report
+    useFocusEffect(
+        useCallback(() => {
+            return () => {
+                // When the screen loses focus, clear the draft
+                ReportUtils.clearReportDraft(reportID);
+            };
+        }, [reportID]),
+    );
+
     useEffect(() => {
         if (isFocused) {
             return;
@@ -37,6 +50,13 @@
         Report.setReportDraft(reportID, composerRef.current?.getValue() ?? '');
     }, [isFocused, reportID]);

+    // Clear the draft when the message is sent (draft becomes empty)
+    useEffect(() => {
+        if (!reportDraft || reportDraft === '') {
+            composerRef.current?.clear();
+        }
+    }, [reportDraft]);
+
     const onSubmitComment = useCallback(
         (text: string) => {
             Report.submitReportComment(reportID, text);
--- a/src/libs/ReportUtils.ts
+++ b/src/libs/ReportUtils.ts
@@ -1,5 +1,6 @@
 import type {OnyxEntry} from 'react-native-onyx';
 import Onyx from 'react-native-onyx';
+import ONYXKEYS from '@src/ONYXKEYS';

 // ... existing code ...

+function clearReportDraft(reportID: string) {
+    Onyx.merge(`${ONYXKEYS.COLLECTION.REPORT_DRAFT}${reportID}`, '');
+}
+
 export {
     // ... existing exports ...
+    clearReportDraft,
 };
--- a/src/libs/actions/Report.ts
+++ b/src/libs/actions/Report.ts
@@ -1,5 +1,6 @@
 import type {OnyxEntry} from 'react-native-onyx';
 import Onyx from 'react-native-onyx';
+import ONYXKEYS from '@src/ONYXKEYS';

 // ... existing code ...

 function submitReportComment(reportID: string, text: string) {
     // ... existing implementation ...
+   