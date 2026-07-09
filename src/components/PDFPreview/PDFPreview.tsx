import React, {useState, useMemo} from 'react';
import {View} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import useWindowDimensions from '@hooks/useWindowDimensions';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ThemeStyles} from '@styles/index';
import PDFThumbnail from './PDFThumbnail';
    const styles = useThemeStyles();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const {windowWidth} = useWindowDimensions();

    const handleLoadComplete = () => {
        setIsLoading(false);
        [onLoadComplete],
    );

    const containerWidth = windowWidth - styles.pdfPreviewContainer.marginHorizontal * 2;

    return (
        <View style={[styles.pdfPreviewContainer, style, {width: containerWidth}]}>
            <View style={[styles.pdfPreviewWrapper, {width: containerWidth}]}>
                <PDFThumbnail
                    pdfUrl={pdfUrl}
                    page={currentPage}
                    onPress={onPress}
                    isLandscape={isLandscape}
                    onLoadComplete={handleLoadComplete}
                    containerWidth={containerWidth}
                />
                {isLoading && (
                    <View style={styles.pdfPreviewLoadingOverlay}>
            </View>
            {numberOfPages > 1 && (
                <View style={styles.pdfPreviewPageControls}>
                    <PDFPagination
                        currentPage={currentPage}
                        totalPages={numberOfPages}
                        onPageChange={setCurrentPage}