import type {MarkdownTextInputProps} from '@expensify/react-native-live-markdown';
import React, {useCallback, useEffect, useRef} from 'react';
import type {TextInput as RNTextInputComponent, TextInputProps as RNTextInputProps} from 'react-native';
import {TextInput} from 'react-native';
import type {AnimatedTextInputRef} from '@components/RNTextInput';
import useLandscapeOnBlurProxy from '@hooks/useLandscapeOnBlurProxy';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';
import type {TextInputProps} from './TextInput/BaseTextInput/types';
import * as MarkdownUtils from '@libs/MarkdownUtils';

type RNTextInputPropsWithRef = RNTextInputProps & React.RefAttributes<RNTextInputComponent>;

type AnimatedTextInputRef = typeof AnimatedTextInput & TextInput & HTMLInputElement;

type RNTextInputWithRefProps = TextInputProps &
    ForwardedFSClassProps & {
        ref?: ForwardedRef<AnimatedTextInputRef>;
    };

function RNTextInputWithRef({ref, forwardedFSClass = CONST.FULLSTORY.CLASS.UNMASK, ...props}: RNTextInputWithRefProps) {
    const theme = useTheme();
    const inputRef = useRef<AnimatedTextInputRef | null>(null);
    const handleBlur = useLandscapeOnBlurProxy(inputRef, props.onBlur);

    return (
        <AnimatedTextInput
            allowFontScaling={false}
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
    const theme = useTheme();
    const themeStyles = useThemeStyles();
    const ref = useRef<RNTextInputComponent | null>(null);
    const {isMarkdownEnabled} = useMarkdownEnabled();

    useEffect(() => {
        if (!ref.current) {

export default RNTextInputWithRef;
        ref.current.setNativeProps({numberOfLines: {numberOfLines}});
    }, [numberOfLines]);

    const handleOnPaste = useCallback(
        (event: React.ClipboardEvent<HTMLInputElement>) => {
            if (!isMarkdownEnabled || !props.onPaste) {
                return;
            }

            const clipboardData = event.clipboardData;
            if (!clipboardData) {
                return;
            }

            const html = clipboardData.getData('text/html');
            if (!html) {
                return;
            }

            const markdown = MarkdownUtils.htmlToMarkdown(html);
            if (markdown) {
                event.preventDefault();
                props.onPaste(event as unknown as React.ClipboardEvent<RNTextInputComponent>);
            }
        },
        [isMarkdownEnabled, props.onPaste],
    );

    return (
        <TextInput
            ref={(element) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            numberOfLines={0}
            onPaste={handleOnPaste}
        />
    );
}
