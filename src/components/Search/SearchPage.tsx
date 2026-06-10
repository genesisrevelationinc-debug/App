import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useOnyx, useOnyxValue} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import FullPageOfflineBlockingView from '@components/BlockingViews/FullPageOfflineBlockingView';
import type {FullPageOfflineBlockingViewProps} from '@components/BlockingViews/FullPageOfflineBlockingView';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useScrollPosition from '@hooks/useScrollPosition';
import useThemeStyles from '@hooks/useThemeStyles';
import * as SearchActions from '@libs/actions/Search';
import * as DeviceCapabilities from '@libs/DeviceCapabilities';
import SearchPageHeader from './SearchPageHeader';
import SearchStatusBar from './SearchStatusBar';
import SearchTypeMenu from './SearchTypeMenu';
import {searchScrollPositionKey} from './types';

type SearchPageProps = {
    route: RouteProp<typeof SCREENS.SEARCH.CENTRAL_PANE>;
    const [selectionMode] = useOnyx(ONYXKEYS.SEARCH_SELECTION);
    const [activeCentralPaneScreen] = useOnyx(ONYXKEYS.ACTIVE_CENTRAL_PANE_SCREEN);

    const {scrollPosition, setScrollPosition} = useScrollPosition(searchScrollPositionKey);

    const {isOffline} = useNetwork();
    const {translate} = useLocalize();
    const {shouldUseNarrowLayout} = useResponsiveLayout();
                        onContentSizeChange={onContentSizeChange}
                        onEndReached={onEndReached}
                        onSelectRow={onSelectRow}
                        scrollPosition={scrollPosition}
                        onScroll={setScrollPosition}
                    />
                </View>
            </FullPageOfflineBlockingView>