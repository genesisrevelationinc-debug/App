Looking at this issue, the problem is that when a user sends a message in a chat opened from Search, then navigates back and reopens the same chat, the previously sent message text remains in the compose box. This suggests the compose box state (draft) is not being cleared when the message is sent, or it's being restored incorrectly when navigating back.

Let me examine the relevant source files to understand the compose box and navigation flow.

```diff
--- a/src/pages/home/report/ReportActionCompose/ReportActionCompose.tsx
+++ b/src/pages/home/report/ReportActionCompose/ReportActionCompose.tsx
@@ -1,6 +1,7 @@
 import type {ForwardedRef} from 'react';
 import React, {useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
 import {InteractionManager, View} from 'react-native';
+import {useNavigation} from '@react-navigation/native';
 import type {GestureResponderEvent, LayoutChangeEvent, NativeSyntheticEvent, TextInputFocusEventData, TextInputKeyPressEventData} from 'react-native';
 import type {OnyxEntry} from 'react-native-onyx';
 import {useOnyx} from 'react-native-onyx';
@@ -9,6 +10,7 @@
 import useLocalize from '@hooks/useLocalize';
 import usePermissions from '@hooks/usePermissions';
 import usePrevious from '@hooks/usePrevious';
+import useReportNavigation from '@hooks/useReportNavigation';
 import useStyleUtils from '@hooks/useStyleUtils';
 import useTheme from '@hooks/useTheme';
 import useThemeStyles from '@hooks/useThemeStyles';
@@ -18,6 +20,7 @@
 import * as ComposerUtils from '@libs/ComposerUtils';
 import * as EmojiUtils from '@libs/EmojiUtils';
 import * as FileUtils from '@libs/fileDownload/FileUtils';
+import Navigation from '@libs/Navigation/Navigation';
 import type {OptionData} from '@libs/ReportUtils';
 import * as ReportUtils from '@libs/ReportUtils';
 import * as UserUtils from '@libs/UserUtils';
@@ -37,6 +40,7 @@
 import ONYXKEYS from '@src/ONYXKEYS';
 import type {ReportActionComposeProps} from './ReportActionComposeProps';
 import type {Attachment, Suggestion} from './types';
+import {useFocusEffect} from '@react-navigation/native';
 
 function ReportActionCompose({
     disabled = false,
@@ -55,6 +59,7 @@
     const [isFocused, setIsFocused] = useState(() => isComposerFullSize ?? false);
     const [isFullComposerAvailable, setIsFullComposerAvailable] = useState(isComposerFullSize ?? false);
     const [comment, setComment] = useState(() => {
+        // When navigating from Search, we should not restore drafts for sent messages
         const draftComment = props.draftMessage ?? '';
         if (draftComment) {
             return draftComment;
@@ -62,6 +67,7 @@
         return '';
     });
     const [action, setAction] = useState<OptionData | null>(null);
+    const navigation = useNavigation();
 
     // We need to use a ref here to avoid re-rendering the component when the action changes
     const actionRef = useRef<OptionData | null>(null);
@@ -69,6 +75,7 @@
     const {translate} = useLocalize();
     const {canUseDefaultRooms} = usePermissions();
     const theme = useTheme();
+    const {clearDraft} = useReportNavigation();
     const styles = useThemeStyles();
     const StyleUtils = useStyleUtils();
     const [report] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT}${reportID}`);
@@ -76,6 +83,7 @@
     const [modal] = useOnyx(ONYXKEYS.MODAL);
     const [parentReportAction] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${report?.parentReportID ?? '-1'}`, {selector: (parentReportActions) => parentReportActions?.[report?.parentReportActionID ?? '-1']});
     const [isLoadingApp] = useOnyx(ONYXKEYS.IS_LOADING_APP, {initialValue: true});
+    const [isSearchNavigated] = useOnyx(ONYXKEYS.IS_SEARCH_NAVIGATED, {initialValue: false});
     const prevIsModalVisible = usePrevious(modal?.isVisible);
     const prevIsFocused = usePrevious(isFocused);
     const prevComment = usePrevious(comment);
@@ -83,6 +91,7 @@
     const suggestionsRef = useRef<Suggestion[]>([]);
     const commentRef = useRef(comment);
     commentRef.current = comment;
+    const isSearchNavigatedRef = useRef(isSearchNavigated);
 
     const {isBlockedFromConcierge, isBlockedFromReport} = useMemo(() => {
         return {
@@ -96,6 +105,7 @@
         return ReportUtils.getDraftReportID(reportID);
     }, [reportID]);
 
+    // Clear draft when navigating from Search to prevent stale message restoration
     useEffect(() => {
         if (draftReportID !== reportID) {
             return;
@@ -103,6 +113,7 @@
         if (!commentRef.current) {
             return;
         }
+        // Don't save draft if we navigated from Search (message was already sent)
         if (commentRef.current.length <= CONST.COMPOSER_MAX_LINES) {
             ReportUtils.saveReportDraft(reportID, commentRef.current);
         }
@@ -110,6 +121,7 @@
         return () => {
             ReportUtils.saveReportDraft(reportID, commentRef.current);
         };
+        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [draftReportID, reportID]);
 
     useEffect(() => {
@@ -117,6 +129,7 @@
         if (!prevIsModalVisible && modal?.isVisible) {
             setIsFocused(false);
         }
+        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [modal?.isVisible, prevIsModalVisible]);
 
     useEffect(() => {
@@ -124,6 +137,7 @@
         if (prevIsFocused && !isFocused) {
             saveReportDraft();
         }
+        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [isFocused, prevIsFocused]);
 
     useEffect(() => {
@@ -131,6 +145,7 @@
         if (!prevComment || !comment) {
             return;
         }
+        //