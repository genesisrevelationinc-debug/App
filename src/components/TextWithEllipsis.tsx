import React from 'react';
import type {TextStyle} from 'react-native';
import Text from './Text';

type TextWithEllipsisProps = {
    text: string;

    /** Additional text styles */
    style?: TextStyle;

    /** Optional testID for testing */
    testID?: string;