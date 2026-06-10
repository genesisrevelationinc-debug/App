import React, {useEffect, useState} from 'react';
import {useOnyx, useOnyxValue} from 'react-native-onyx';
import {useNavigation} from '@react-navigation/native';
import type {ValueOf} from 'type-fest';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type {Connection} from '@src/types/onyx/Policy';
import {isEmptyObject} from '@src/utils/objectUtils';

type QuickbooksDesktopOutOfPlaneConnectionFlowProps = {
    route: RouteProp<SettingsNavigatorParamList, typeof SCREENS.WORKSPACE.QUICKBOOKS_DESKTOP_OUT_OF_PLANE_CONNECTION_FLOW>;
    const [connectionFlowState] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_CONNECTION_MIGRATION}${policyID}`);
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);
    const [isLoading, setIsLoading] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);

    const connectionName: Connection = 'quickbooksDesktop';

            return;
        }

        if (isNavigating) {
            return;
        }

        if (connectionFlowState?.isMigrationFinished) {
            const accountingUrl = getUrlWithBackToParam(
                ROUTES.POLICY_ACCOUNTING.getRoute(policyID, connectionName, {connectionName}),

            // Navigate to the accounting page and clear the connection flow state
            if (accountingUrl) {
                setIsNavigating(true);
                Navigation.navigate(accountingUrl);
            }
            return;
        // If the connection flow state is not present, we need to redirect to the accounting page
        // This happens when the user is already connected and the connection flow state is not present
        if (!connectionFlowState) {
            setIsNavigating(true);
            Navigation.navigate(ROUTES.POLICY_ACCOUNTING.getRoute(policyID, connectionName, {connectionName}));
            return;
        }
        setIsLoading(false);
    }, [connectionFlowState, policy, policyID]);

    if (isLoading || isNavigating) {
        return <FullScreenLoadingIndicator />;
    }
