import React from 'react';
import type {StyleProp, TextStyle} from 'react-native';
import Text from './Text';

type TextWithEllipsisProps = {
    text: string;

    /** Additional text styles */
    style?: StyleProp<TextStyle>;

    /** Optional testID for testing */
    testID?: string;