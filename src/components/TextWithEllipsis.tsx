import React from 'react';
import type {StyleProp, TextStyle} from 'react-native';
import Text from './Text';

type TextWithEllipsisProps = {
    /** The text to display with ellipsis */
    text: string;
    /** Additional styles to apply to the text */
    style?: StyleProp<TextStyle>;
    /** Number of lines to show before truncating */
    numberOfLines?: number;
};

function TextWithEllipsis({text, style, numberOfLines = 1}: TextWithEllipsisProps) {
    return (
        <Text
            style={style}
            numberOfLines={numberOfLines}
            ellipsizeMode="tail"
        >
            {text}
        </Text>
    );
}

TextWithEllipsis.displayName = 'TextWithEllipsis';

export default TextWithEllipsis;