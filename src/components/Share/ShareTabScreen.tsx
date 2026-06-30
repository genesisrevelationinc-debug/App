import React, {useCallback, useEffect, useRefwtate} from 'react';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf}rol} from 'type-fest';
    const [isSwitching, setIsSwitching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const prevSelectedTab = useRef(selectedTab);
    const isFocusedRef = useRef(true);

    const [currentUserLogin] = useOnyx(ONYXKEYS.SESSION, {selector: (session) => session?.email});
    const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS_LIST);
        [currentUserLogin, personalDetails],
    );

    // Track focus state to handle swipe back gesture
    useFocusEffect(
        useCallback(() => {
            isFocusedRef.current = true;
            return () => {
                isFocusedRef.current = false;
            };
        }, []),
    );

    // Handle hardware back button / swipe back
    const handleBackPress = useCallback(() => {
        Navigation.dismissModal();
    }, []);

    const handleTabSelection = useCallback(
        (newTab: ValueOf<typeof CONST.SHARE.TAB>) => {
            if (newTab === selectedTab) {
            }

            setIsSwitching(true);
            
            // Reset switching state after animation
            setTimeout(() => {
                setIsSwitching(false);
            }, 300);

            if (newTab === CONST.SHARE.TAB.SUBMIT) {
                setIsLoading(true);
            }

            setSelectedTab(newTab);
        },
        [selectedTab],
    );
            <ScreenWrapper
                includeSafeAreaPaddingBottom={false}
                testID={ShareTabScreen.displayName}
                onBackButtonPress={handleBackPress}
            >
                <HeaderWithBackButton
                    title={translate('common.share')}