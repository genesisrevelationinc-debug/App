import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {NativeModules} from 'react-native';
import type {TextInput as RNTextInputType} from 'react-native';
import type {BaseTextInputProps} from './types';
import RNTextInput from '@components/RNTextInput';
import useThemeStyles from '@hooks/useThemeStyles';
import * as baseTextInputStyles from './baseTextInputStyles';

const {RNTextInputModule} = NativeModules;

function BaseTextInput({
    autoComplete = 'off',
    textInputStyles,
    const [textInputWidth, setTextInputWidth] = useState(0);
    const [text, setText] = useState('');
    const [selection, setSelection] = useState<{start: number; end: number} | undefined>();
    const [isPasting, setIsPasting] = useState(false);

    const handleChangeText = useCallback(
        (value: string) => {
        [onChangeText],
    );

    const handlePaste = useCallback(
        (event: {nativeEvent: {text: string}}) => {
            const pastedText = event.nativeEvent.text;
            setIsPasting(true);
            
            // Apply markdown formatting to pasted text
            if (pastedText) {
                handleChangeText(pastedText);
            }
            
            setTimeout(() => {
                setIsPasting(false);
            }, 0);
        },
        [handleChangeText],
    );

    useEffect(() => {
        if (isPasting) {
            return;
        }
        // Normal text change handling
    }, [isPasting]);

    useEffect(() => {
        if (!maxLength || !text || text.length <= maxLength) {
            return;
                onSelectionChange={handleSelectionChange}
                selection={selection}
                onChangeText={handleChangeText}
                onPaste={handlePaste}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
                maxLength={maxLength}