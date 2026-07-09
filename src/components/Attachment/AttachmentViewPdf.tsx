import React, {useState} from 'react';
import {View} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import {useWindowDimensions} from 'react-native';
import type {AttachmentViewProps} from './types';
import PDFView from '@components/PDFView';
import Text from '@components/Text';
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const {width: windowWidth} = useWindowDimensions();
    const [loadComplete, setLoadComplete] = useState(false);
    const [error, setError] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const isSmallScreen = containerWidth < 300;

    const pdfContainerStyle: StyleProp<ViewStyle> = [
        styles.w100, 
        styles.h100,
        styles.alignItemsCenter,
        styles.justifyContentCenter,
        StyleUtils.getWidthAndHeightStyle(250, 350),
        style,
    ];
    const isLandscape = containerWidth > 0 && containerWidth > (containerWidth * 0.75);

    const onLayout = (event: {nativeEvent: {layout: {width: number}}}) => {
        setContainerWidth(event.nativeEvent.layout.width);

    return (
        <View
            style={[styles.flex1, styles.alignItemsCenter, styles.justifyContentCenter, style]}
            onLayout={onLayout}
        >
            {!loadComplete && !error && (
                    <PDFView
                        sourceURL={source}
                        style={pdfContainerStyle}
                        onLoadComplete={() => setLoadComplete(true)} 
                        onError={() => setError(true)}
                    />
                )}