import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import type {LayoutChangeEvent} from 'react-native';
import {useWindowDimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import type {Source} from 'react-native-pdf';
import {useOnyx} from 'react-native-onyx';
    const [shouldRequestPassword, setShouldRequestPassword] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const {width: windowWidth} = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
        setContainerWidth(event.nativeEvent.layout.width);
    }, []);

    const pdfWidth = containerWidth || windowWidth;
    const pdfSource = useMemo(() => {
        if (isOffline && !isLocalFile) {
            return undefined;
                    style={[
                        styles.flex1,
                        styles.alignItemsCenter,
                        {width: pdfWidth},
                    ]}
                    onLayout={onLayout}
                >
                            source={pdfSource}
                            style={[
                                styles.w100,
                                {height: pdfWidth * (pageHeight / pageWidth)},
                            ]}
                            onLoadComplete={onLoadComplete}
                            onPageChanged={onPageChanged}