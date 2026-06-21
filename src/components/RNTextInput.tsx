import type {ForwardedRef} from 'react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeModules} from 'react-native';
import type {TextInput as NativeTextInput} from 'react-native';
import type {TextInputProps} from 'react-native';
import {TextInput} from 'react-native';
import useLandscapeOnBlurProxy from '@hooks/useLandscapeOnBlurProxy';
import useTheme from '@hooks/useTheme';
import textarea from '@styles/textarea';
import type {RNTextInputProps} from './TextInput/BaseTextInput/types';

const {RNTextInputModule} = NativeModules;

// TextInput component using React Native
const RNTextInputWithRef = React.forwardRef(({maxLength, ...props}: RNTextInputProps, ref: ForwardedRef<NativeTextInput>) => {
    const theme = useTheme();
type AnimatedTextInputRef = typeof AnimatedTextInput & TextInput & HTMLInputElement;
    const [selection, setSelection] = useState<{start: number; end: number} | undefined>();
    const [text, setText] = useState('');
    const [textInputWidth, setTextInputWidth] = useState(0);
    const [pastedText, setPastedText] = useState('');

    const handleSelectionChange = useCallback(
        (event: {nativeEvent: {selection: {start: number; end: number}}}) => {
function RNTextInputWithRef({ref, forwardedFSClass = CONST.FULLSTORY.CLASS.UNMASK, ...props}: RNTextInputWithRefProps) {
    const theme = useTheme();
        [setSelection],
    );

    const handleOnPaste = useCallback(
        (event: {nativeEvent: {text: string}}) => {
            const pasted = event.nativeEvent.text;
            setPastedText(pasted);
            
            // Apply markdown formatting to pasted text
            if (pasted && props.onChangeText) {
                props.onChangeText(pasted);
            }
        },
        [props],
    );

    useEffect(() => {
        if (pastedText && props.onChangeText) {
            const timer = setTimeout(() => {
                setPastedText('');
            }, 0);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [pastedText, props]);

    useEffect(() => {
        if (!maxLength || !text || text.length <= maxLength) {
            return;
            textBreakStrategy="simple"
            keyboardAppearance={theme.colorScheme}
            ref={(refHandle: AnimatedTextInputRef) => {
                inputRef.current = refHandle;
                if (typeof ref !== 'function') {
                    return;
                }
                ref(refHandle);
            }}
            // eslint-disable-next-line react/forbid-component-props
            fsClass={forwardedFSClass}
            // eslint-disable-next-line
            {...props}
            onBlur={handleBlur}
        />
    );
}

export default RNTextInputWithRef;
export type {AnimatedTextInputRef};
            onSelectionChange={handleSelectionChange}
            selection={selection}
            onChangeText={handleChangeText}
            onPaste={handleOnPaste}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            maxLength={maxLength}
