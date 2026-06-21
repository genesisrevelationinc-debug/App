import type {MarkdownTextInputProps} from '@expensify/react-native-live-markdown';
import type {ForwardedRef} from 'react';
import React, {forwardRef} from 'react';
import type {TextInput as OriginalTextInput} from 'react-native';
import useLandscapeOnBlurProxy from '@hooks/useLandscapeOnBlurProxy';
// eslint-disable-next-line no-restricted-imports
import type {TextInputProps as RNTextInputProps} from './TextInput/BaseTextInput/types';
import type CustomTextInputProps from './TextInput/BaseTextInput/types';
import MarkdownTextInput from './MarkdownTextInput';

// We can't use the common type for ref because we need to use the ref from the original TextInput component
// eslint-disable-next-line react/function-component-definition, react/no-unused-prop-types
const RNTextInput = forwardRef<OriginalTextInput, RNTextInputProps>(function RNTextInput(props, ref) {
    return <MarkdownTextInput ref={ref as ForwardedRef<MarkdownTextInput>} {...props} />;
});

export default RNTextInput;
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
            // eslint-disable-next-line
            {...props}
            onBlur={handleBlur}
        />
    );
}

export default RNTextInputWithRef;
export type {AnimatedTextInputRef};
