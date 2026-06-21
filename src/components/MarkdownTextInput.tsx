import {MarkdownTextInput as OriginalMarkdownTextInput} from '@expensify/react-native-live-markdown';
import type {MarkdownTextInputProps} from '@expensify/react-native-live-markdown';
import type {ClipboardEvent} from '@expensify/react-native-live-markdown/lib/commonjs/MarkdownTextInput';
import React, {ForwardedRef, forwardRef} from 'react';
import type {TextInput} from 'react-native';


// eslint-disable-next-line react/function-component-definition
const MarkdownTextInput = forwardRef<MarkdownTextInputRef, MarkdownTextInputProps>(function MarkdownTextInput(props, ref) {
    const handlePaste = (event: ClipboardEvent) => {
        // Prevent default paste behavior to handle markdown formatting
        event.preventDefault();
        // The original component will handle the paste with markdown support
        // We need to call the original handler if it exists
        props.onPaste?.(event);
    };

    return <OriginalMarkdownTextInput ref={ref} {...props} onPaste={handlePaste} pasteAsPlainText={false} />;
});

export default MarkdownTextInput;