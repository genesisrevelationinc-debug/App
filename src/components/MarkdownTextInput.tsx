import {MarkdownTextInput as OriginalMarkdownTextInput} from '@expensify/react-native-live-markdown';
import type {ClipboardEvent} from '@expensify/react-native-live-markdown/lib/commonjs/MarkdownTextInput';
import React, {ForwardedRef, forwardRef} from 'react';
import type {TextInput} from 'react-native';

// eslint-disable-next-line react/function-component-definition
const MarkdownTextInput = forwardRef<MarkdownTextInputRef, MarkdownTextInputProps>(function MarkdownTextInput(props, ref) {
    return <OriginalMarkdownTextInput ref={ref} {...props} pasteAsPlainText={false} />;
});

export default MarkdownTextInput;