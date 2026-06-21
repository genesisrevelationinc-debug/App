import type {MarkdownTextInputProps} from '@expensify/react-native-live-markdown';
import type {ForwardedRef} from 'react';
import React from 'react';
import {TextInput} from 'react-native';
import type {TextInputProps} from 'react-native';
import type {CustomTextInputProps, CustomTextInputRef} from '@components/TextInput/BaseTextInput/types';
import useLandscapeOnBlurProxy from '@hooks/useLandscapeOnBlurProxy';
import useTheme from '@hooks/useTheme';
 * This component is a workaround for the React Native TextInput bug on Android
 * where the text input doesn't update its value when the value prop changes.
 */
function RNTextInput(props: TextInputProps & CustomTextInputProps & MarkdownTextInputProps, ref: ForwardedRef<CustomTextInputRef | HTMLInputElement>) {
    return (
        <TextInput
            // eslint-disable-next-line react/jsx-props-no-spreading

type RNTextInputWithRefProps = TextInputProps &
    );
}

export default React.forwardRef(RNTextInput);
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
            // eslint-disable-next-line
            {...props}
            onBlur={handleBlur}
        />
    );
}

export default RNTextInputWithRef;
export type {AnimatedTextInputRef};
