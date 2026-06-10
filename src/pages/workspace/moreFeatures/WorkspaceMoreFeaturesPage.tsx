import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
    const styles = useThemeStyles();
    const {shouldUseNarrowPill} = useResponsiveLayout();
    const [isDisableModalVisible, setIsDisableModalVisible] = useState(false);
    const isNavigatingRef = useRef(false);

    const [isSyncing] = useOnyx(ONYXKEYS.IS_LOADING_APP, {initialValue: true});
    const [isPolicyLoading] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${route.params.policyID}`, {allowStaleData: true});
    const navigateToFeature = useCallback(
        (featureName: ValueOf<typeof CONST.POLICY.MORE_FEATURES>) => {
            const feature = features.find((f) => f.name === featureName);
            
            // Prevent multiple rapid navigation calls
            if (isNavigatingRef.current) {
                return;
            }

            if (!feature) {
                return;
            if (feature.isPendingAction) {
                return;
            }
            
            isNavigatingRef.current = true;

            if (feature.name === CONST.POLICY.MORE_FEATURES.ORGANIZE) {
                Navigation.navigate(ROUTES.WORKSPACE_CATEGORIES.getRoute(route.params.policyID));
            } else if (feature.name === CONST.POLICY.MORE_FEATURES.REPORT) {
                Navigation.navigate(ROUTES.WORKSPACE_TAGS.getRoute(route.params.policyID));
            }
            
            setTimeout(() => { isNavigatingRef.current = false; }, 500);
        },
        [features, route.params.policyID],
    );