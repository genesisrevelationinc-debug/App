import type {MarkdownTextInputProps} from '@expensify/react-native-live-markdown';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import type {NativeSyntheticEvent, TextInput, TextInputSelectionChangeEventData} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
    const [isRendered, setIsRendered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const textInput = useRef<TextInput | null>(null);
    const isIOS = getPlatform() === 'ios';
    const isWeb = getPlatform() === 'web';
        [styles, maxLines, isComposerFullScreen],
    );

    const maxHeight = useMemo(() => {
        if (isComposerFullScreen) {
            return undefined;
    const composerStyle = useMemo(
        () => ({
            ...styles.textInput,
            ...(isComposerFullScreen ? styles.composerHeightFullScreen : {}),
            maxHeight,
            ...style,
        }),
