import type {ForwardedRef} from 'react';
import React from 'react';
import {Platform} from 'react-native';
import type {TextInput as OriginalTextInput} from 'react-native';
import {TextInput} from 'react-native';
import type {CustomTextInputProps, TextInputProps} from './TextInput/BaseTextInput/types';
import useLandscapeOnBlurProxy from '@hooks/useLandscapeOnBlurProxy';
import useTheme from '@hooks/useTheme';
import type {ForwardedFSClassProps} from '@libs/Fullstory/types';
import CONST from '@src/CONST';

// Convert the underlying TextInput into an Animated component so that we can take an animated ref and pass it to a worklet
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type AnimatedTextInputRef = typeof AnimatedTextInput & TextInput & HTMLInputElement;

            allowFontScaling={false}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            // On Android, when pasting text, the text is not automatically formatted with markdown.
            // This is because the native Android text input doesn't trigger the same events as iOS.
            // We need to manually trigger the onChangeText event when the text changes via paste.
            onTextInput={(event) => {
                if (Platform.OS === 'android' && event.nativeEvent.text) {
                    props.onChangeText?.(event.nativeEvent.text);
                }
                props.onTextInput?.(event);
            }}
        />
    );
}
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
