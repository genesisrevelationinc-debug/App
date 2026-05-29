import type {MarkdownTextInputProps} from '@expensify/react-native-live-markdown';
import React, {useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import type {NativeSyntheticEvent, TextInput, TextInputSelectionChangeEventData} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
    const [isRendered, setIsRendered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [textInputHeight, setTextInputHeight] = useState(0);
    const textInput = useRef<TextInput | null>(null);
    const isIOS = getPlatform() === 'ios';
    const isWeb = getPlatform() === 'web';
        [onClear],
    );

    const handleContentSizeChange = useCallback((event: {nativeEvent: {contentSize: {height: number}}}) => {
        const {height} = event.nativeEvent.contentSize;
        if (height > 0) {
            setTextInputHeight(height);
        }
    }, []);

    const handleSelectionChange = useCallback(
        (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
            const {start, end} = event.nativeEvent.selection;
        [onPasteFile],
    );

    useLayoutEffect(() => {
        if (!isExpanded) {
            return;
        }
        const newHeight = textInputHeight + 20;
        if (textInput.current && 'setNativeProps' in textInput.current) {
            textInput.current.setNativeProps({height: newHeight});
        }
    }, [isExpanded, textInputHeight]);

    useEffect(() => {
        if (!autoFocus || !textInput.current) {
            return;
                onSelectionChange={handleSelectionChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onContentSizeChange={handleContentSizeChange}
                style={[
                    styles.textInput,
                    styles.verticalAlignTop,
                    isComposerFullScreen ? styles.composerHeight : undefined,
                    maxHeightStyle,
                    isAutoGrowHeight ? undefined : {height: 'auto'},
                    isExpanded ? {minHeight: textInputHeight + 20} : undefined,
                ]}
                maxHeight={maxHeight}
                maxLines={maxLines}
