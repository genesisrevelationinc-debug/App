import React from 'react';
import type {Text as RNText, TextStyle} from 'react-native';
import Text from './Text';
import Tooltip from './Tooltip';

    /** Text to display */
    text: string;

    /** Style for the text */
    style?: TextStyle | TextStyle[];

    /** Number of lines to show */
    numberOfLines?: number;

    /** Maximum width of the tooltip */
    maxWidth?: number;


/** A component that renders a text with a tooltip.
 * The tooltip is shown when the text is hovered over or long-pressed. */
function TextWithTooltip({text, style, numberOfLines = 1, maxWidth = 360, children}: TextWithTooltipProps) {
    return (
        <Tooltip text={text} maxWidth={maxWidth}>
            <Text numberOfLines={numberOfLines} style={style}>
                {children}
            </Text>
        </Tooltip>