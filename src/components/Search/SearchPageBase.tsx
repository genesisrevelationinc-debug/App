import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {FlatListProps, ViewStyle} from 'react-native';
import {FlatList, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
    onEndReached?: () => void;
    onSelectRow?: (item: TransactionListItemType | ReportListItemType | ReportActionListItemType) => void;
    shouldShowEmptyState?: boolean;
    scrollPosition?: number;
    onScroll?: (offset: number) => void;
};

function SearchPageBase({
    onEndReached,
    onSelectRow,
    shouldShowEmptyState,
    scrollPosition,
    onScroll,
}: SearchPageBaseProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const [selectionMode] = useOnyx(ONYXKEYS.SEARCH_SELECTION);
    const [activeCentralPaneScreen] = useOnyx(ONYXKEYS.ACTIVE_CENTRAL_PANE_SCREEN);

    // Restore scroll position when component mounts
    useEffect(() => {
        if (scrollPosition && flatListRef.current) {
            flatListRef.current.scrollToOffset({offset: scrollPosition, animated: false});
        }
    }, [scrollPosition]);

    const handleOnScroll = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const currentOffset = e.nativeEvent.contentOffset.y;
            if (currentOffset > 0 && !isScrollingDown && isScrollingDown !== isScrollingDownRef.current) {
                // User started scrolling down, hide the keyboard
            }
            
            if (onScroll) {
                onScroll(currentOffset);
            }
        },
        [onScroll],
    );

    const shouldShowEmptyState = !isLoading && !searchResults?.data && !isOffline;