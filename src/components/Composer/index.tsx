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
        [styles, maxLines, isComposerFullScreen],
    );

    useLayoutEffect(() => {
        if (!textInput.current) {
            return;
        }
        textInput.current.measure((x, y, width, height) => setTextInputHeight(height));
    }, [textInput, isComposerFullScreen, value]);

    const maxHeight = useMemo(() => {
        if (isComposerFullScreen) {
            return undefined;
    const composerStyle = useMemo(
        () => ({
            ...styles.textInput,
            ...(isComposerFullScreen ? {minHeight: textInputHeight} : {}),
            maxHeight,
            ...style,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [maxHeight, isComposerFullScreen, style, styles.textInput, styles.composerHeightFullScreen],
    );

    const handleSelectionChange = useCallback(
        (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
            if (!onSelectionChange) {
