Based on the issue description, the problem is that when a user sends a message in a chat opened from Search, then navigates back and reopens the same chat, the previously sent message remains in the compose box. This suggests the compose box state (draft) is not being cleared after the message is successfully sent.

Let me look at the relevant files to understand the compose box and draft management logic.

```diff
--- a/src/components/Composer/index.tsx
+++ b/src/components/Composer/index.tsx
@@ -1,6 +1,7 @@
 import type {BaseSyntheticEvent, ForwardedRef} from 'react';
 import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
 import {Keyboard, View} from 'react-native';
+import {useNavigation} from '@react-navigation/native';
 import type {NativeSyntheticEvent, TextInputSelectionChangeEventData} from 'react-native';
 import type {AnimatedMarkdownTextInputRef} from '@components/AnimatedMarkdownTextInput';
 import AnimatedMarkdownTextInput from '@components/AnimatedMarkdownTextInput';
@@ -10,6 +11,7 @@
 import useHtmlPaste from '@hooks/useHtmlPaste';
 import useMarkdownStyle from '@hooks/useMarkdownStyle';
 import useTheme from '@hooks/useTheme';
+import useDraft from '@hooks/useDraft';
 import useThemeStyles from '@hooks/useThemeStyles';
 import * as Browser from '@libs/Browser';
 import * as ComposerUtils from '@libs/ComposerUtils';
@@ -18,6 +20,7 @@
 import updateIsFullComposerAvailable from '@userActions/Composer';
 import type {ComposerProps} from './types';
 
+
 function Composer(
     {
         value,
         defaultValue,
         maxLines = -1,
         onKeyPress = () => {},
         style,
         autoFocus = false,
         shouldCalculateCaretPosition = false,
         isDisabled = false,
         isReportActionCompose = false,
         selection: selectionProp,
         onSelectionChange = () => {},
         isComposerFullSize = false,
         checkComposerVisibility = () => false,
         onValueChange = () => {},
         onFocus = () => {},
         onBlur = () => {},
         onPasteFile = () => {},
         shouldContainScroll = true,
         excludedScrollAreas = [],
         isGroupPolicyReport = false,
         ...props
     }: ComposerProps,
     ref: ForwardedRef<AnimatedMarkdownTextInputRef>,
 ) {
     const theme = useTheme();
     const styles = useThemeStyles();
     const markdownStyle = useMarkdownStyle(value, !isDisabled && !isComposerFullSize);
     const textInputRef = useRef<AnimatedMarkdownTextInputRef | null>(null);
     const [selection, setSelection] = useState<
         | {
               start: number;
               end: number;
           }
         | undefined
     >(undefined);
     const [caretContent, setCaretContent] = useState('');
     const [valueBeforeCaret, setValueBeforeCaret] = useState('');
     const [valueAfterCaret, setValueAfterCaret] = useState('');
     const [textInputWidth, setTextInputWidth] = useState('');
     const [isRendered, setIsRendered] = useState(false);
+    const navigation = useNavigation();
+    const {clearDraft} = useDraft();
 
     useEffect(() => {
         setIsRendered(true);
     }, []);
 
+    // Clear draft when navigating away from the screen
+    useEffect(() => {
+        const unsubscribe = navigation.addListener('beforeRemove', () => {
+            clearDraft();
+        });
+        return unsubscribe;
+    }, [navigation, clearDraft]);
+
     /**
      * Set the TextInput Ref
      */
     const setTextInputRef = useCallback((refValue: AnimatedMarkdownTextInputRef | null) => {
         textInputRef.current = refValue;
     }, []);
 
     useImperativeHandle(
         ref,
         () =>
             ({
                 ...(textInputRef.current ?? ({} as AnimatedMarkdownTextInputRef)),
                 // Overwrite these methods to ensure proper behavior
                 blur: () => {
                     textInputRef.current?.blur();
                 },
                 focus: () => {
                     textInputRef.current?.focus();
                 },
                 measure: (callback: (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => void) => {
                     textInputRef.current?.measure(callback);
                 },
                 measureInWindow: (callback: (x: number, y: number, width: number, height: number) => void) => {
                     textInputRef.current?.measureInWindow(callback);
                 },
             } as AnimatedMarkdownTextInputRef),
         [],
     );
 
     const prevValueRef = useRef(value);
     useEffect(() => {
         prevValueRef.current = value;
     }, [value]);
 
     const handleValueChange = useCallback(
         (newValue: string) => {
             onValueChange(newValue);
         },
         [onValueChange],
     );
 
     const handleSelectionChange = useCallback(
         (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
             onSelectionChange(event);
         },
         [onSelectionChange],
     );
 
     const handleFocus = useCallback(
         (event: BaseSyntheticEvent) => {
             onFocus(event);
         },
         [onFocus],
     );
 
     const handleBlur = useCallback(
         (event: BaseSyntheticEvent) => {
             onBlur(event);
         },
         [onBlur],
     );
 
     const handleKeyPress = useCallback(
         (event: BaseSyntheticEvent) => {
             onKeyPress(event);
         },
         [onKeyPress],
     );
 
     const handlePaste = useCallback(
         (event: BaseSyntheticEvent) => {
             onPasteFile(event);
         },
         [onPasteFile],
     );
 
     const handlePasteHtml = useHtmlPaste(textInputRef, handleValueChange, isDisabled);
 
     const handleCheckComposerVisibility = useCallback(() => {
         checkComposerVisibility();
     }, [checkComposerVisibility]);
 
     const handleClear = useCallback(() => {
         handleValueChange('');
     }, [handleValueChange]);
 
     const handleSelection = useCallback(
         (newSelection: {start: number; end: number}) => {
             setSelection(newSelection);
         },
         [],
     );
 
     const handleCaretContent = useCallback(
         (newCaretContent: string) => {
             setCaretContent(newCaretContent);
         },
         [],
     );
 
     const handleValueBeforeCaret = useCallback(
         (newValueBeforeCaret: string) => {
             set