import type {MarkdownTextInputProps} from '@expensify/react-native-live-markdown';
import React, {useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import type {NativeSyntheticEvent, TextInput, TextInputSelectionChangeEventData} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
    const [textInputHeight, setTextInputHeight] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const textInput = useRef<TextInput | HTMLTextAreaElement | null>(null);
    const isScrollBarVisible = useSharedValue(false);
    const [isRendered, setIsRendered] = useState(false);
        [styles, theme],
    );

    // Measure the actual content height to ensure proper sizing when expanded
    useLayoutEffect(() => {
        if (!textInput.current) {
            return;
        }
        
        const element = textInput.current as HTMLTextAreaElement;
        if (element.scrollHeight) {
            // Add small buffer to prevent cutting off text
            const newHeight = element.scrollHeight + 4;
            setContentHeight(newHeight);
        }
    }, [textInputHeight, isComposerFullSize]);

    const maxHeight = isComposerFullSize ? CONST.COMPOSER.MAX_HEIGHT : CONST.COMPOSER.MAX_HEIGHT_PARTIAL;

    const composerStyle = useMemo(() => {
            maxHeight,
            ...style,
        };
    }, [maxHeight, style, contentHeight]);

    const composerContentContainerStyle = useMemo(() => {
        return {
            maxHeight,
            ...styles.composerContentContainer,
        };
    }, [maxHeight, styles.composerContentContainer, contentHeight]);

    const updateIsFullComposerAvailable = useCallback(() => {
        if (!textInput.current) {
        }
        const element = textInput.current as HTMLTextAreaElement;
        const inputHeight = element.scrollHeight;
        const isFullComposerAvailable = inputHeight >= CONST.COMPOSER.MAX_HEIGHT_PARTIAL;
        setIsFullComposerAvailable(isFullComposerAvailable);
    }, [maxHeight, setIsFullComposerAvailable]);

                maxHeight={maxHeight}
                autoCorrect={!disableAutoCorrect}
                autoComplete="off"
                style={[composerStyle, isComposerFullSize ? styles.overflowVisible : styles.overflowHidden]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                onScroll={(e) => {
                    isScrollBarVisible.value = e.nativeEvent.contentOffset.y > 0;
                }}
                textBreakStrategy="simple"
            />
        </View>
    );
