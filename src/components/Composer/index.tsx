import type {MarkdownStyle} from '@expensify/react-native-live-markdown';
import MarkdownTextInput from '@expensify/react-native-live-markdown/lib/commonjs/MarkdownTextInput';
import {parseTextToMarkdown} from '@expensify/react-native-live-markdown/lib/commonjs/MarkdownTextInput';
import type {BaseSyntheticEvent, ForwardedRef, MutableRefObject} from 'react';
import React, {useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import type {NativeSyntheticEvent, TextInput, TextInputSelectionChangeData} from 'react-native';
import type {ComposerProps} from '@components/Composer/types';
import type {TextSelection} from '@components/RNTextInput';
import RNTextInput from '@components/RNTextInput';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Browser from '@libs/Browser';
import * as ComposerUtils from '@libs/ComposerUtils';
import * as EmojiUtils from '@libs/EmojiUtils';
import * as FileUtils from '@libs/FileUtils';
import type {Selection} from '@libs/SelectionHelper';
import * as SelectionHelper from '@libs/SelectionHelper';
import type {TextInputClear} from '@src/types';
import CONST from '@src/CONST';
    const themeStyles = useThemeStyles();
    const textInput = useRef<TextInput | null>(null);
    const [text, setText] = useState(value);
    const {preferredLocale} = useLocalize();

    useEffect(() => {
        setText(value);

    const animatedRef = useAnimatedRef();

    const handlePaste = useCallback((event: BaseSyntheticEvent) => {
        if (Platform.OS !== 'android') {
            return;
        }
        
        const clipboardData = event?.nativeEvent?.clipboardData;
        if (!clipboardData) {
            return;
        }
        
        const pastedText = clipboardData.getData?.('text/plain') || clipboardData.getData?.('text') || '';
        if (!pastedText) {
            return;
        }
        
        // Prevent default paste to handle it manually with markdown
        event.preventDefault?.();
        
        const currentText = value || '';
        const selection = SelectionHelper.getSelection(currentText);
        const newText = currentText.slice(0, selection.start) + pastedText + currentText.slice(selection.end);
        
        // Apply markdown formatting to the pasted text
        onChangeText?.(newText);
    }, [value, onChangeText]);

    const handleOnChangeText = useCallback(
        (newText: string) => {
            setText(newText);
            onSelectionChange={handleSelectionChange}
            selection={selection}
            value={text}
            onPaste={handlePaste}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
