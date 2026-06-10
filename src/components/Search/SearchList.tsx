import lodashIsEqual from 'lodash/isEqual';
import React, {useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect} from 'react';
import {View} from 'react-native';
import type {FlatListProps} from 'react-native';
import {FlatList} from 'react-native';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {useFocusEffect} from '@react-navigation/native';
import type {SearchReport} from '@src/types/onyx';
import type {SearchDataTypes} from '@src/types/onyx/SearchResults';
import type {SearchQueryJSON} from './types';
    shouldShowEmptyState?: boolean;
    shouldShowYear?: boolean;
    shouldPreventDefault?: boolean;
    scrollToIndex?: number;
};

function SearchList(
        shouldShowEmptyState = true,
        shouldShowYear = false,
        shouldPreventDefault = false,
        scrollToIndex: scrollToIndexProp,
    }: SearchListProps,
    ref: React.ForwardedRef<FlatList>,
) {
    const previousSearchResults = usePrevious(data);
    const previousQueryJSON = usePrevious(queryJSON);
    const previousSortBy = usePrevious(sortBy);
    const initialScrollRestored = useRef(false);

    const shouldShowEmptyStateView = shouldShowEmptyState && !data.length;

        [data, flattenedSections, flattenedAllSections, selectedTransactions, canSelectMultiple, toggleTransaction, shouldShowYear, shouldPreventDefault, queryJSON, searchType],
    );

    // Restore scroll position when returning to the search list
    useFocusEffect(
        useCallback(() => {
            if (initialScrollRestored.current || scrollToIndexProp === undefined || scrollToIndexProp < 0) {
                return;
            }
            
            // Use setTimeout to ensure the list has rendered with data
            const timeout = setTimeout(() => {
                if (flatListRef.current && scrollToIndexProp >= 0 && scrollToIndexProp < data.length) {
                    flatListRef.current.scrollToIndex({
                        index: scrollToIndexProp,
                        animated: false,
                        viewPosition: 0.5,
                    });
                    initialScrollRestored.current = true;
                }
            }, 0);
            
            return () => clearTimeout(timeout);
        }, [scrollToIndexProp, data.length]),
    );

    // Reset the scroll restored flag when leaving the screen
    useEffect(() => {
        initialScrollRestored.current = false;
    }, []);

    useEffect(() => {
        if (!isSmallScreenWidth) {
            setSelectedItems({});